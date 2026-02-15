terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "alpha-morrisoncole-terraform-state"
    key    = "state"
    region = "ap-northeast-1"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "alpha.morrisoncole.co.uk"
      Environment = "Production"
      ManagedBy   = "Terraform"
    }
  }
}

# Amplify App
resource "aws_amplify_app" "main" {
  name         = "alpha-morrisoncole-co-uk"
  repository   = "https://github.com/MorrisonCole/alpha.morrisoncole.co.uk"
  access_token = var.github_token

  # Build settings
  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: dist
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT

  # Environment variables
  environment_variables = {
    NODE_ENV = "production"
  }

  # Enable PR previews
  enable_branch_auto_build           = true
  enable_branch_auto_deletion        = true
  enable_auto_branch_creation        = true
  auto_branch_creation_patterns      = ["feat/*", "fix/*", "chore/*"]
  
  auto_branch_creation_config {
    enable_auto_build             = true
    enable_pull_request_preview   = true
    pull_request_environment_name = "pr"
    framework                     = "React"
    stage                         = "DEVELOPMENT"
  }

  # Custom rules for SPA routing
  custom_rule {
    source = "/<*>"
    status = "404-200"
    target = "/index.html"
  }

  custom_rule {
    source = "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>"
    status = "200"
    target = "/index.html"
  }
}

# Main branch
resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.main.id
  branch_name = "main"

  framework = "React"
  stage     = "PRODUCTION"

  enable_auto_build = true
}

# Domain association for custom domain
resource "aws_amplify_domain_association" "main" {
  app_id      = aws_amplify_app.main.id
  domain_name = var.domain_name

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = ""
  }

  wait_for_verification = false
}
