output "frontend_role_arn" {
  value = module.github_oidc_frontend.role_arn
}

output "site_bucket_name" {
  value = module.cdn_frontend.bucket_name
}

output "cloudfront_distribution_id" {
  value = module.cdn_frontend.cloudfront_distribution_id
}
