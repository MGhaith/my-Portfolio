terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

variable "projects_table_name" {
  type    = string
  default = "PortfolioProjectsTable"
}

variable "contacts_table_name" {
  type    = string
  default = "PortfolioContactsTable"
}

variable "ses_email" {
  type    = string
  default = "contact@ghaith-magherbi.com"
}

variable "environment" {
  type = string
}

data "aws_caller_identity" "current" {}

############################################
# IAM ROLES
############################################

# Role for Projects Lambda
resource "aws_iam_role" "projects_lambda_role" {
  name = "portfolio-projects-lambda-role-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action    = "sts:AssumeRole",
      Effect    = "Allow",
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

# Role for Contact Lambda
resource "aws_iam_role" "contact_lambda_role" {
  name = "portfolio-contact-lambda-role-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action    = "sts:AssumeRole",
      Effect    = "Allow",
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

# Attach basic logging
resource "aws_iam_role_policy_attachment" "projects_lambda_logs" {
  role       = aws_iam_role.projects_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "contact_lambda_logs" {
  role       = aws_iam_role.contact_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Inline policy for Projects Lambda (DynamoDB read)
resource "aws_iam_role_policy" "projects_lambda_policy" {
  name = "portfolio-projects-lambda-policy-${var.environment}"
  role = aws_iam_role.projects_lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect   = "Allow",
      Action   = ["dynamodb:Scan", "dynamodb:GetItem"],
      Resource = "arn:aws:dynamodb:eu-central-1:${data.aws_caller_identity.current.account_id}:table/${var.projects_table_name}"
    }]
  })
}

# Inline policy for Contact Lambda (DynamoDB write + SES)
resource "aws_iam_role_policy" "contact_lambda_policy" {
  name = "portfolio-contact-lambda-policy-${var.environment}"
  role = aws_iam_role.contact_lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = ["dynamodb:PutItem"],
        Resource = "arn:aws:dynamodb:eu-central-1:${data.aws_caller_identity.current.account_id}:table/${var.contacts_table_name}"
      },
      {
        Effect   = "Allow",
        Action   = ["ses:SendEmail", "ses:SendRawEmail"],
        Resource = [
          "arn:aws:ses:eu-central-1:${data.aws_caller_identity.current.account_id}:identity/${var.ses_email}",
          "arn:aws:ses:eu-central-1:${data.aws_caller_identity.current.account_id}:configuration-set/my-first-configuration-set"
        ]
      }
    ]
  })
}

# Package Contact Lambda
data "archive_file" "submitContact" {
  type        = "zip"
  source_dir  = "${path.root}/../../../backend/submitContact"
  output_path = "${path.module}/lambda_build/submitContact.zip"
}

resource "aws_lambda_function" "submitContact" {
  function_name = "PortfolioContactFunction-${var.environment}"
  role          = aws_iam_role.contact_lambda_role.arn
  handler       = "app.lambda_handler"
  runtime       = "python3.13"

  filename         = data.archive_file.submitContact.output_path
  source_code_hash = data.archive_file.submitContact.output_base64sha256

  environment {
    variables = {
      CONTACTS_TABLE_NAME = var.contacts_table_name
      SES_FROM_EMAIL      = var.ses_email
      SES_TO_EMAIL        = var.ses_email
    }
  }
}

# Package Projects Lambda
data "archive_file" "getProjects" {
  type        = "zip"
  source_dir  = "${path.root}/../../../backend/getProjects"
  output_path = "${path.module}/lambda_build/getProjects.zip"
}

resource "aws_lambda_function" "getProjects" {
  function_name = "PortfolioProjectsFunction-${var.environment}"
  role          = aws_iam_role.projects_lambda_role.arn
  handler       = "app.lambda_handler"
  runtime       = "python3.13"

  filename         = data.archive_file.getProjects.output_path
  source_code_hash = data.archive_file.getProjects.output_base64sha256

  environment {
    variables = {
      PROJECTS_TABLE_NAME = var.projects_table_name
    }
  }
}

############################################
# API GATEWAY
############################################

variable "cors_origins" {
  type = list(string)
}

resource "aws_apigatewayv2_api" "http_api" {
  name          = "portfolio-api-${var.environment}"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = var.cors_origins
    allow_methods = ["GET", "POST", "OPTIONS"]
    allow_headers = ["content-type"]
  }
}

# API Gateway Stage
resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"  # $default stage allows direct invocation
  auto_deploy = true
}

# Integrations
resource "aws_apigatewayv2_integration" "contact_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.submitContact.arn
  integration_method     = "POST"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_integration" "getProjects_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.getProjects.arn
  integration_method     = "GET"
  payload_format_version = "2.0"
}

# Routes
resource "aws_apigatewayv2_route" "contact_route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.contact_integration.id}"
}

resource "aws_apigatewayv2_route" "projects_route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /projects"
  target    = "integrations/${aws_apigatewayv2_integration.getProjects_integration.id}"
}

# Lambda Permissions
resource "aws_lambda_permission" "allow_apigw_contact" {
  statement_id  = "AllowAPIGatewayInvokeContact"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.submitContact.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "allow_apigw_projects" {
  statement_id  = "AllowAPIGatewayInvokeProjects"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.getProjects.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}

############################################
# API CUSTOM DOMAIN
############################################

variable "acm_certificate_arn" {}
variable "api_domain_name" {
  type = string
}
variable "api_record_name" {
  type = string
}

resource "aws_apigatewayv2_domain_name" "api_domain" {
  domain_name = var.api_domain_name
  domain_name_configuration {
    certificate_arn = var.acm_certificate_arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_apigatewayv2_api_mapping" "api_mapping" {
  api_id      = aws_apigatewayv2_api.http_api.id  
  domain_name = aws_apigatewayv2_domain_name.api_domain.domain_name
  stage       = "$default"
}

# Route53 record to point subdomain to API Gateway
resource "aws_route53_record" "api_record" {
  zone_id = "Z0026678267UFMSA9SLXO"
  name    = var.api_record_name  # eg: api.ghaith-magherbi.com
  type    = "A"

  alias {
    name                   = aws_apigatewayv2_domain_name.api_domain.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.api_domain.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}

output "projects_lambda_name" {
  value = aws_lambda_function.getProjects.function_name
}

output "contacts_lambda_name" {
  value = aws_lambda_function.submitContact.function_name
}

output "api_name" {
  value = aws_apigatewayv2_api.http_api.name
}