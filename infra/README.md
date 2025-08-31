# Infrastructure as Code (Terraform)

## Overview

Production-ready AWS infrastructure using Terraform modules with multi-environment support. Demonstrates enterprise DevOps practices including Infrastructure as Code, remote state management, and automated deployments.

## Architecture

### Multi-Environment Structure
```
infra/
├── environments/
│   ├── prod/              # Production environment
│   │   ├── main.tf        # Production configuration
│   │   └── backend.tf     # Remote state config
│   └── staging/           # Staging environment
│       ├── main.tf        # Staging configuration
│       └── backend.tf     # Remote state config
└── modules/
├── api_backend/       # API Gateway + Lambda + DynamoDB
├── cdn_frontend/      # CloudFront + S3 + ACM
├── data/              # DynamoDB data management
└── monitoring/        # CloudWatch monitoring
```

### Core Modules

| Module | Purpose | Resources |
|--------|---------|----------|
| `cdn_frontend` | Static site hosting | S3, CloudFront, ACM, Route53 |
| `api_backend` | Serverless API | API Gateway, Lambda, IAM |
| `data` | Database layer | DynamoDB tables, data seeding |
| `monitoring` | Observability | CloudWatch alarms, dashboards |

## Key Features

### DevOps Best Practices
- **Environment Separation**: Isolated prod/staging environments
- **Remote State**: S3 backend with DynamoDB locking
- **Module Reusability**: DRY principle with parameterized modules
- **Provider Configuration**: Multi-region setup (eu-central-1, us-east-1)

### Security
- **OIDC Authentication**: GitHub Actions integration without static keys
- **Least Privilege IAM**: Minimal required permissions
- **Encrypted State**: S3 encryption at rest
- **SSL/TLS**: End-to-end encryption with ACM certificates

### Operational Excellence
- **Automated Deployments**: GitHub Actions CI/CD
- **State Locking**: Prevents concurrent modifications
- **Resource Tagging**: Consistent tagging strategy
- **Cost Optimization**: Serverless pay-per-use model

## Deployment

### Prerequisites
```bash
terraform --version  # >= 1.5.0
aws configure        # AWS CLI configured
```

### Production Deployment
```bash
cd infra/environments/prod
terraform init
terraform plan
terraform apply
```

### Staging Deployment
```bash
cd infra/environments/staging
terraform init
terraform plan
terraform apply
```

## Infrastructure Metrics

- **Resources**: ~30 AWS resources per environment
- **Modules**: 4 reusable modules
- **Deployment Time**: 3-5 minutes
- **Monthly Cost**: <$15 (serverless pricing)

## Monitoring

- **CloudWatch Logs**: Centralized logging
- **Custom Metrics**: Application-specific monitoring
- **Alarms**: Automated alerting for errors and performance
- **Dashboards**: Real-time infrastructure visibility

---

*Enterprise-grade infrastructure demonstrating production DevOps practices.*