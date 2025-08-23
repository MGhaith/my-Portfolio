terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

# 1) GitHub OIDC provider (create if not exists in your account)
# If you already have one, you can import or switch to a data source.
resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
}

# 2) IAM role trusted by GitHub OIDC
data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_owner}/${var.github_repo}:ref:${var.allowed_ref}"]
    }
  }
}

resource "aws_iam_role" "github_actions_role" {
  name               = var.role_name
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
  description        = "OIDC role for GitHub Actions to deploy frontend"
  max_session_duration = 3600
}

# 3) Least-privilege policy for S3 + CloudFront
data "aws_iam_policy_document" "frontend_policy" {
  statement {
    sid     = "S3WriteArtifacts"
    effect  = "Allow"
    actions = [
      "s3:PutObject",
      "s3:PutObjectAcl",
      "s3:DeleteObject"
    ]
    resources = [
      "arn:aws:s3:::${var.site_bucket_name}/*"
    ]
  }

  statement {
    sid     = "S3ListBucket"
    effect  = "Allow"
    actions = ["s3:ListBucket"]
    resources = [
      "arn:aws:s3:::${var.site_bucket_name}"
    ]
  }

  statement {
    sid     = "InvalidateCloudFront"
    effect  = "Allow"
    actions = ["cloudfront:CreateInvalidation"]
    resources = ["arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:distribution/${var.cloudfront_distribution_id}"]
  }
}

data "aws_caller_identity" "current" {}

resource "aws_iam_policy" "frontend_policy" {
  name        = "${var.role_name}-policy"
  description = "Permissions for GitHub Actions frontend deployment"
  policy      = data.aws_iam_policy_document.frontend_policy.json
}

resource "aws_iam_role_policy_attachment" "attach" {
  role       = aws_iam_role.github_actions_role.name
  policy_arn = aws_iam_policy.frontend_policy.arn
}

output "role_arn" {
  value = aws_iam_role.github_actions_role.arn
}
