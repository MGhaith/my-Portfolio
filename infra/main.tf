provider "aws" {
  region = "eu-central-1" # S3 bucket lives here
  alias  = "eu"
}

provider "aws" {
  region = "us-east-1" # Required for ACM/CloudFront
  alias  = "us"
}

resource "aws_route53_record" "root" {
  zone_id = "Z0026678267UFMSA9SLXO"
  name    = "ghaith-magherbi.com"
  type    = "A"

  alias {
    name                   = module.cdn_frontend.cloudfront_domain
    zone_id                = module.cdn_frontend.cloudfront_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "root_ipv6" {
  zone_id = "Z0026678267UFMSA9SLXO"
  name    = "ghaith-magherbi.com"
  type    = "AAAA"

  alias {
    name                   = module.cdn_frontend.cloudfront_domain
    zone_id                = module.cdn_frontend.cloudfront_zone_id
    evaluate_target_health = false
  }
}

module "github_oidc_terraform" {
  source = "./modules/github_oidc_terraform"
}

module "cdn_frontend" {
  providers = {
    aws.us = aws.us
    aws.eu = aws.eu
  }
  source              = "./modules/cdn_frontend"
  domain_name         = "ghaith-magherbi.com"
  bucket_name         = "ghaith-magherbi.com"
  acm_certificate_arn = "arn:aws:acm:us-east-1:075091538636:certificate/8efdcd14-f7c3-4d6c-8e20-43d81e5cdb3d"
}

module "github_oidc_frontend" {
  source                     = "./modules/iam_github_oidc"
  role_name                  = "GitHubActionsFrontendRole"
  github_owner               = "MGhaith"
  github_repo                = "my-Portfolio"
  allowed_ref                = "refs/heads/main"
  site_bucket_name           = module.cdn_frontend.bucket_name
  cloudfront_distribution_id = module.cdn_frontend.cloudfront_distribution_id
}

module "data" {
  source = "./modules/data"
  region = "eu-central-1"
}

module "api_backend" {
  providers = {
    aws.eu = aws.eu
  }

  source = "./modules/api_backend"

  projects_table_name = "PortfolioProjectsTable"
  contacts_table_name = "PortfolioContactsTable"
  ses_email           = "contact@ghaith-magherbi.com"
  acm_certificate_arn = "arn:aws:acm:eu-central-1:075091538636:certificate/c0481aca-c795-4c03-a7c4-52320d6bbee0" # Create a new SSL Cert for api subdomain in same region as API Gateway
}