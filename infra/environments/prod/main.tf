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
  domain_name         = "ghaith-magherbi.com"
  bucket_name         = "ghaith-magherbi.com"
  hosted_zone_id      = "Z0026678267UFMSA9SLXO"
  acm_certificate_arn = "arn:aws:acm:us-east-1:075091538636:certificate/8efdcd14-f7c3-4d6c-8e20-43d81e5cdb3d"
  environment         = "prod"
  aliases             = ["ghaith-magherbi.com", "www.ghaith-magherbi.com"]
}

module "data" {
  source = "../../modules/data"
  region = "eu-central-1"

  environment         = "prod"
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
  environment         = "prod"
  cors_origins = [
    "https://ghaith-magherbi.com",
    "https://www.ghaith-magherbi.com",
  ]

  # Custom API
  api_domain_name = "api.ghaith-magherbi.com"
  acm_certificate_arn = "arn:aws:acm:eu-central-1:075091538636:certificate/c0481aca-c795-4c03-a7c4-52320d6bbee0"
}
