terraform {
  required_version = ">= 1.5.0"

  backend "s3" {
    bucket         = "my-portfolio-terraform-state-staging"      # S3 bucket name (create once manually or via bootstrap TF)
    key            = "global/terraform.tfstate"                  # Path inside the bucket
    region         = "eu-central-1"                              # Best Region for me
    dynamodb_table = "terraform-locks-staging"                   # DynamoDB table for state locking
    encrypt        = true                                        # Encrypt state at rest
  }
}
