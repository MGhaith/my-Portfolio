variable "role_name" {
  type        = string
  description = "Name of the IAM role assumed by GitHub Actions"
}

variable "github_owner" {
  type        = string
  description = "GitHub org/user (e.g., MGhaith)"
}

variable "github_repo" {
  type        = string
  description = "Repository name (e.g., my-portfolio)"
}

variable "allowed_ref" {
  type        = string
  description = "Git ref allowed to assume the role (e.g., refs/heads/main)"
  default     = "refs/heads/main"
}

variable "site_bucket_name" {
  type        = string
  description = "S3 bucket for the frontend artifacts"
}

variable "cloudfront_distribution_id" {
  type        = string
  description = "CloudFront distribution ID to invalidate"
}
