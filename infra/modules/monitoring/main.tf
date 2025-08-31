variable "environment" {}
variable "alert_email" {}
variable "projects_lambda_name" {}
variable "contacts_lambda_name" {}
variable "api_name" {}
variable "projects_table_name" {}
variable "contacts_table_name" {}


resource "aws_sns_topic" "alerts" {
  name = "${var.environment}-portfolio-alerts"
}

resource "aws_sns_topic_subscription" "email" {
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = var.alert_email
}

# Lambda errors > 0 in 5 min
resource "aws_cloudwatch_metric_alarm" "projects_lambda_errors" {
  alarm_name          = "${var.environment}-projects-lambda-errors"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "Errors"
  namespace           = "AWS/Lambda"
  period              = 300
  statistic           = "Sum"
  threshold           = 0
  alarm_description   = "Lambda function errors > 0"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  dimensions = {
    FunctionName = var.projects_lambda_name
  }
}

resource "aws_cloudwatch_metric_alarm" "contacts_lambda_errors" {
  alarm_name          = "${var.environment}-contacts-lambda-errors"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "Errors"
  namespace           = "AWS/Lambda"
  period              = 300
  statistic           = "Sum"
  threshold           = 0
  alarm_description   = "Lambda function errors > 0"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  dimensions = {
    FunctionName = var.contacts_lambda_name
  }
}

# API Gateway 5xx errors
resource "aws_cloudwatch_metric_alarm" "api_5xx" {
  alarm_name          = "${var.environment}-api-5xx"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "5XXError"
  namespace           = "AWS/ApiGateway"
  period              = 300
  statistic           = "Sum"
  threshold           = 1
  alarm_description   = "API Gateway 5XX errors"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  dimensions = {
    ApiName = var.api_name
  }
}

# DynamoDB throttles
resource "aws_cloudwatch_metric_alarm" "projects_dynamodb_throttles" {
  alarm_name          = "${var.environment}-projects-dynamodb-throttles"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "ThrottledRequests"
  namespace           = "AWS/DynamoDB"
  period              = 300
  statistic           = "Sum"
  threshold           = 0
  alarm_description   = "DynamoDB throttled requests"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  dimensions = {
    TableName = var.projects_table_name
  }
}

resource "aws_cloudwatch_metric_alarm" "contacts_dynamodb_throttles" {
  alarm_name          = "${var.environment}-contacts-dynamodb-throttles"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "ThrottledRequests"
  namespace           = "AWS/DynamoDB"
  period              = 300
  statistic           = "Sum"
  threshold           = 0
  alarm_description   = "DynamoDB throttled requests"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  dimensions = {
    TableName = var.contacts_table_name
  }
}
