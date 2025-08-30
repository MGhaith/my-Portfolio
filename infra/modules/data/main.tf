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

variable "environment" {
  type    = string
}

# --- Portfolio Projects Table ---
resource "aws_dynamodb_table" "projects" {
  provider = aws.data
  name     = "PortfolioProjectsTable-${var.environment}"  
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "projectId"

  attribute {
    name = "projectId"
    type = "S"
  }

  tags = {
    Environment = var.environment
    Service     = "portfolio"
  }
}

# --- Portfolio Contacts Table ---
resource "aws_dynamodb_table" "contacts" {
  provider = aws.data
  name     = "PortfolioContactsTable-${var.environment}"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "contactId"

  attribute {
    name = "contactId"
    type = "S"
  }

  tags = {
    Environment = var.environment
    Service     = "portfolio"
  }
}

#  Add portfolio projects from json file ---
locals {
  projects = jsondecode(file("${path.module}/projects-${var.environment}.json"))
}

resource "aws_dynamodb_table_item" "portfolio_project" {
  count      = length(local.projects)
  provider    = aws.data
  table_name  = aws_dynamodb_table.projects.name
  hash_key    = "projectId"

  item = jsonencode({
    projectId    = { S  = local.projects[count.index].projectId }
    title        = { S  = local.projects[count.index].title }
    description  = { S  = local.projects[count.index].description }
    content      = { S  = local.projects[count.index].content }
    link         = { S  = lookup(local.projects[count.index], "link", "") }
    repo         = { S  = local.projects[count.index].repo }
    technologies = { SS = local.projects[count.index].technologies }
  })
}

output "projects_table_name" {
  value = aws_dynamodb_table.projects.name
}

output "contacts_table_name" {
  value = aws_dynamodb_table.contacts.name
}