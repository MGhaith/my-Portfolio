# Infrastructure as Code (Terraform) 🏗️

> Production-ready AWS infrastructure using Terraform modules and DevOps best practices

## 🎯 Purpose & Philosophy

This infrastructure demonstrates **enterprise-grade DevOps practices** using Infrastructure as Code (IaC) principles:

- **Reproducible Infrastructure**: Every resource defined in code
- **Modular Architecture**: Reusable, composable Terraform modules
- **Security First**: Least-privilege IAM, OIDC authentication, encrypted state
- **Operational Excellence**: Remote state management, state locking, automated deployments

## 📁 Project Structure
```markdown
infra/
├── 📄 main.tf              # Root configuration & provider setup
├── 📄 backend.tf            # Remote state configuration
├── 📄 variables.tf          # Input variables
├── 📄 outputs.tf            # Output values
├── 📂 modules/              # Reusable Terraform modules
│   ├── 📂 api_backend/      # API Gateway + Lambda + DynamoDB
│   ├── 📂 cdn_frontend/     # CloudFront + S3 + ACM
│   ├── 📂 data/             # DynamoDB data seeding
│   ├── 📂 github_oidc_terraform/  # OIDC for Terraform
│   └── 📂 iam_github_oidc/  # OIDC for application deployment
└── 📄 .terraform.lock.hcl   # Provider version locking
```
## 🏛️ Architecture Components

### Core Infrastructure Modules

| Module | Purpose | Resources |
|--------|---------|----------|
| `cdn_frontend` | Static site hosting | S3, CloudFront, ACM Certificate |
| `api_backend` | Serverless API | API Gateway, Lambda, DynamoDB, SES |
| `data` | Database seeding | DynamoDB items, project data |

### Multi-Provider Setup

```hcl
provider "aws" {
  region = "eu-central-1"  # Primary region for backend services
  alias  = "eu"
}

provider "aws" {
  region = "us-east-1"     # Required for CloudFront/ACM
  alias  = "us"
}
```

## 🔄 Deployment Workflow

### 1. Local Development
```bash
# Initialize Terraform
terraform init

# Plan changes
terraform plan -out=tfplan

# Apply changes
terraform apply tfplan

# Destroy (if needed)
terraform destroy
```

### 2. CI/CD Pipeline Integration

The GitHub Actions workflow automatically:

1. **Authenticates** via OIDC (no static credentials)
2. **Initializes** Terraform with remote state
3. **Plans** infrastructure changes
4. **Applies** changes on main branch

```yaml
- name: Configure AWS credentials via OIDC
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::075091538636:role/github-oidc-terraform
    aws-region: us-east-1

- run: terraform init
- run: terraform plan -out=tfplan
- run: terraform apply -auto-approve tfplan
```

## 🛡️ Security & Best Practices

### Remote State Management
```hcl
terraform {
  backend "s3" {
    bucket         = "my-portfolio-terraform-state-075091538636"
    key            = "global/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "terraform-locks"  # State locking
    encrypt        = true               # Encryption at rest
  }
}
```

### GitHub OIDC Authentication
- **No Static Credentials**: Uses temporary STS tokens
- **Least Privilege**: Minimal required permissions
- **Repository Scoped**: Access limited to specific repo/branch

### IAM Role Structure
├── github-oidc-terraform        # Terraform deployment role
├── GitHubActionsFrontendRole    # Frontend S3/CloudFront access
├── lambda-execution-roles       # Lambda function permissions
└── api-gateway-roles           # API Gateway logging/monitoring

## 🌍 Multi-Region Strategy

### Regional Resource Placement
- **EU-Central-1**: Backend services (Lambda, DynamoDB, SES)
- **US-East-1**: Global services (CloudFront, ACM certificates)

### Benefits
- **Performance**: CloudFront global edge locations
- **Compliance**: Data residency in EU for backend
- **Cost Optimization**: Regional pricing differences

## 📊 Notable DevOps Features

### 1. Modular Design
- **Reusable Components**: Each module serves a specific purpose
- **Composable Architecture**: Mix and match modules for different environments
- **Version Control**: Module versioning for stability

### 2. Environment Separation
```hcl
# Production
module "api_backend" {
  source = "./modules/api_backend"
  # Production-specific variables
}

# Staging (future)
module "api_backend_staging" {
  source = "./modules/api_backend"
  # Staging-specific variables
}
```

### 3. Automated Resource Tagging
```hcl
default_tags {
  tags = {
    Project     = "Portfolio"
    Environment = "Production"
    ManagedBy   = "Terraform"
    Owner       = "DevOps-Team"
  }
}
```

### 4. Cost Optimization
- **Serverless Architecture**: Pay-per-use pricing
- **S3 Lifecycle Policies**: Automated cost management
- **CloudFront Caching**: Reduced origin requests

## 🔍 Monitoring & Observability

### CloudWatch Integration
- **Lambda Metrics**: Duration, errors, invocations
- **API Gateway Logs**: Request/response logging
- **DynamoDB Metrics**: Read/write capacity, throttling

### Alerting Strategy
```hcl
resource "aws_cloudwatch_alarm" "lambda_errors" {
  alarm_name          = "lambda-error-rate"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "Errors"
  # ... additional configuration
}
```

## 🚀 Scaling Considerations

### Current Architecture Benefits
- **Auto-scaling**: Lambda and DynamoDB scale automatically
- **Global CDN**: CloudFront handles traffic spikes
- **Managed Services**: Reduced operational overhead

### Future Enhancements
- **Multi-environment**: Staging/production separation
- **Blue/Green Deployments**: Zero-downtime deployments
- **Advanced Monitoring**: X-Ray tracing, custom metrics

## 🛠️ Local Development Setup

1. **Prerequisites**
   ```bash
   # Install Terraform
   terraform --version  # >= 1.5.0
   
   # Configure AWS CLI
   aws configure
   ```

2. **Initialize Infrastructure**
   ```bash
   cd infra
   terraform init
   terraform workspace list
   ```

3. **Plan and Apply**
   ```bash
   terraform plan -var-file="terraform.tfvars"
   terraform apply
   ```

## 📈 Infrastructure Metrics

- **Resources Managed**: ~25 AWS resources
- **Modules**: 5 reusable modules
- **Deployment Time**: ~3-5 minutes
- **Cost**: <$10/month (serverless pricing)

---

*This infrastructure showcases production-ready DevOps practices suitable for enterprise cloud environments.*
