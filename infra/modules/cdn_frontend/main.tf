terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

variable "domain_name" {}
variable "bucket_name" {}
variable "acm_certificate_arn" {}

resource "aws_s3_bucket" "site" {
    provider = aws.eu
    bucket = var.bucket_name

    force_destroy = true
}

resource "aws_s3_bucket_versioning" "versioning" {
    bucket = aws_s3_bucket.site.id
    versioning_configuration {
        status = "Enabled"
    }
}

resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.site.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "${var.bucket_name}-oac"
  description                       = "OAC for ${var.bucket_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "cdn" {
    provider = aws.us
    enabled = true
    default_root_object = "index.html"

    aliases = [var.domain_name, "www.${var.domain_name}"]

    # important: catch 403/404 and redirect to index.html
    custom_error_response {
      error_code            = 404
      response_code         = 200
      response_page_path    = "/index.html"
    }

    custom_error_response {
      error_code            = 403
      response_code         = 200
      response_page_path    = "/index.html"
    }

    origin {
        domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
        origin_id                = "s3-origin"
        origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
    }

    default_cache_behavior {
        allowed_methods  = ["GET", "HEAD", "OPTIONS"]
        cached_methods   = ["GET", "HEAD"]
        target_origin_id = "s3-origin"

        viewer_protocol_policy = "redirect-to-https"

        forwarded_values {
            query_string = false
            cookies {
                forward = "none"
            }
        }

        function_association {
            event_type   = "viewer-request"
            function_arn = aws_cloudfront_function.redirect_www.arn
        }
    }

    price_class = "PriceClass_100" # US, Canada, EU Only

    restrictions {
        geo_restriction {
        restriction_type = "none" # Allow all countries
        }
    }
    
    viewer_certificate {
        acm_certificate_arn = var.acm_certificate_arn
        ssl_support_method  = "sni-only"
        minimum_protocol_version = "TLSv1.2_2021"
    }
}

# Bucket policy to allow only CloudFront via OAC
resource "aws_s3_bucket_policy" "allow_cloudfront" {
  bucket = aws_s3_bucket.site.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action = "s3:GetObject"
        Resource = "${aws_s3_bucket.site.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.cdn.arn
          }
        }
      }
    ]
  })
}

resource "aws_cloudfront_function" "redirect_www" {
    provider = aws.us
    name    = "www-redirect"
    runtime = "cloudfront-js-2.0"
    publish = true
    code    = <<EOF
function handler(event) {
    var request = event.request;
    var host = request.headers.host.value;

    // Redirect www -> non-www
    if (host === "www.ghaith-magherbi.com") {
        return {
            statusCode: 301,
            statusDescription: "Moved Permanently",
            headers: {
                "location": { "value": "https://ghaith-magherbi.com" + request.uri }
            }
        };
    }

    // Otherwise, continue to origin
    return request;
}
EOF
}

output "bucket_name" {
  value = aws_s3_bucket.site.bucket
}

output "cloudfront_domain" {
  value = aws_cloudfront_distribution.cdn.domain_name
}

output "cloudfront_zone_id" {
  value = aws_cloudfront_distribution.cdn.hosted_zone_id
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.cdn.id
}