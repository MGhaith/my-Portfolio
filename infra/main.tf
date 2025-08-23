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
  source              = "./modules/cdn_frontend"
  domain_name         = "ghaith-magherbi.com"
  bucket_name         = "ghaith-magherbi.com"
  acm_certificate_arn = "arn:aws:acm:us-east-1:075091538636:certificate/8efdcd14-f7c3-4d6c-8e20-43d81e5cdb3d"
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
