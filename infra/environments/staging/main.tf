provider "aws" {
  region = "eu-central-1" # S3 bucket lives here
  alias  = "eu"
}

provider "aws" {
  region = "us-east-1" # Required for ACM/CloudFront
  alias  = "us"
}

module "cdn_frontend" {
  providers = {
    aws.us = aws.us
    aws.eu = aws.eu
  }
  source              = "../../modules/cdn_frontend"
  domain_name         = "staging.ghaith-magherbi.com"
  bucket_name         = "staging.ghaith-magherbi.com"
  hosted_zone_id      = "Z0026678267UFMSA9SLXO"
  acm_certificate_arn = "arn:aws:acm:us-east-1:075091538636:certificate/afd03f4f-7e26-4d60-ab37-b2e3dc22069f"
  environment         = "staging"
  aliases             = ["staging.ghaith-magherbi.com"]
}


module "data" {
  source = "../../modules/data"
  region = "eu-central-1"

  environment         = "staging"
}
#count = var.environment == "prod" ? 1 : 0
module "api_backend" {
  providers = {
    aws.eu = aws.eu
  }

  source = "../../modules/api_backend"

  projects_table_name = module.data.projects_table_name
  contacts_table_name = module.data.contacts_table_name
  ses_email           = "contact@ghaith-magherbi.com"
  environment         = "staging"
  cors_origins = [
    "https://staging.ghaith-magherbi.com",
    "http://localhost:5173",
  ]

  # Custom API
  api_domain_name = "api.staging.ghaith-magherbi.com"
  acm_certificate_arn = "arn:aws:acm:eu-central-1:075091538636:certificate/d5620f39-46c3-4a00-b371-a9687a61553a"
  api_record_name = "api.staging"
}