terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

variable "region" {
  type    = string
  default = "eu-central-1"
}

provider "aws" {
  region = var.region
  alias  = "data"
}

# --- Portfolio Projects Table ---
resource "aws_dynamodb_table" "projects" {
  provider = aws.data
  name     = "PortfolioProjectsTable"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "projectId"

  attribute {
    name = "projectId"
    type = "S"
  }

  tags = {
    Environment = "prod"
    Service     = "portfolio"
  }
}

# --- Portfolio Contacts Table ---
resource "aws_dynamodb_table" "contacts" {
  provider = aws.data
  name     = "PortfolioContactsTable"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "contactId"

  attribute {
    name = "contactId"
    type = "S"
  }

  tags = {
    Environment = "prod"
    Service     = "portfolio"
  }
}

# --- Example Seed Item (your portfolio project) ---
resource "aws_dynamodb_table_item" "portfolio_project" {
  provider    = aws.data
  table_name  = aws_dynamodb_table.projects.name
  hash_key    = "projectId"

  item = jsonencode({
    projectId   = { S = "project-001" }
    title       = { S = "Personal Cloud Portfolio" }
    description = { S = "Serverless portfolio site with React, AWS Lambda, Terraform, and GitHub Actions" }
    link        = { S = "https://ghaith-magherbi.com" }
    tags        = { SS = ["aws", "devops", "portfolio"] }
  })
}

output "projects_table_name" {
  value = aws_dynamodb_table.projects.name
}

output "contacts_table_name" {
  value = aws_dynamodb_table.contacts.name
}