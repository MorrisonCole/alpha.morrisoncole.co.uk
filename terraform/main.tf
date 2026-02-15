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

# Provider for us-east-1 (required for CloudFront certificates)
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = {
      Project     = "alpha.morrisoncole.co.uk"
      Environment = "Production"
      ManagedBy   = "Terraform"
    }
  }
}

# Look up existing Route53 hosted zone
data "aws_route53_zone" "main" {
  name = var.root_domain_name
}

# ============================================
# S3 Buckets
# ============================================

# Main site bucket
resource "aws_s3_bucket" "site" {
  bucket = "alpha-morrisoncole-site"
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# PR previews bucket
resource "aws_s3_bucket" "previews" {
  bucket = "alpha-morrisoncole-previews"
}

resource "aws_s3_bucket_public_access_block" "previews" {
  bucket = aws_s3_bucket.previews.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Lifecycle rule to clean up old previews
resource "aws_s3_bucket_lifecycle_configuration" "previews" {
  bucket = aws_s3_bucket.previews.id

  rule {
    id     = "cleanup-old-previews"
    status = "Enabled"

    filter {
      prefix = ""
    }

    expiration {
      days = 30
    }
  }
}

# ============================================
# CloudFront Origin Access Control
# ============================================

resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "alpha-morrisoncole-site-oac"
  description                       = "OAC for alpha.morrisoncole.co.uk"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_origin_access_control" "previews" {
  name                              = "alpha-morrisoncole-previews-oac"
  description                       = "OAC for PR previews"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# ============================================
# ACM Certificates
# ============================================

# Certificate for main site
resource "aws_acm_certificate" "site" {
  provider          = aws.us_east_1
  domain_name       = var.domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "site_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.site.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.main.zone_id
}

resource "aws_acm_certificate_validation" "site" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.site.arn
  validation_record_fqdns = [for record in aws_route53_record.site_cert_validation : record.fqdn]
}

# Certificate for previews (wildcard)
resource "aws_acm_certificate" "previews" {
  provider          = aws.us_east_1
  domain_name       = "*.previews.${var.domain_name}"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "previews_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.previews.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.main.zone_id
}

resource "aws_acm_certificate_validation" "previews" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.previews.arn
  validation_record_fqdns = [for record in aws_route53_record.previews_cert_validation : record.fqdn]
}

# ============================================
# CloudFront Functions
# ============================================

# Function to handle SPA routing and preview path rewriting
resource "aws_cloudfront_function" "spa_routing" {
  name    = "alpha-morrisoncole-spa-routing"
  runtime = "cloudfront-js-2.0"
  publish = true
  code    = <<-EOF
    function handler(event) {
      var request = event.request;
      var uri = request.uri;
      
      // If URI has a file extension, serve it directly
      if (uri.match(/\.[a-zA-Z0-9]+$/)) {
        return request;
      }
      
      // Otherwise, serve index.html for SPA routing
      request.uri = '/index.html';
      return request;
    }
  EOF
}

# Function for preview routing (rewrite based on subdomain)
resource "aws_cloudfront_function" "preview_routing" {
  name    = "alpha-morrisoncole-preview-routing"
  runtime = "cloudfront-js-2.0"
  publish = true
  code    = <<-EOF
    function handler(event) {
      var request = event.request;
      var host = request.headers.host.value;
      var uri = request.uri;
      
      // Extract PR number from subdomain (e.g., pr-123.previews.alpha.morrisoncole.co.uk)
      var match = host.match(/^pr-(\d+)\./);
      if (match) {
        var prNumber = match[1];
        
        // If URI has a file extension, serve from PR folder
        if (uri.match(/\.[a-zA-Z0-9]+$/)) {
          request.uri = '/pr-' + prNumber + uri;
        } else {
          // SPA routing - serve index.html from PR folder
          request.uri = '/pr-' + prNumber + '/index.html';
        }
      }
      
      return request;
    }
  EOF
}

# ============================================
# CloudFront Distributions
# ============================================

# Main site distribution
resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases             = [var.domain_name]
  price_class         = "PriceClass_100"

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "S3-site"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-site"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.spa_routing.arn
    }

    min_ttl     = 0
    default_ttl = 86400
    max_ttl     = 31536000
  }

  # Cache static assets longer
  ordered_cache_behavior {
    path_pattern           = "/assets/*"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-site"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 31536000
    default_ttl = 31536000
    max_ttl     = 31536000
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.site.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  depends_on = [aws_acm_certificate_validation.site]
}

# Previews distribution
resource "aws_cloudfront_distribution" "previews" {
  enabled         = true
  is_ipv6_enabled = true
  aliases         = ["*.previews.${var.domain_name}"]
  price_class     = "PriceClass_100"

  origin {
    domain_name              = aws_s3_bucket.previews.bucket_regional_domain_name
    origin_id                = "S3-previews"
    origin_access_control_id = aws_cloudfront_origin_access_control.previews.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-previews"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    forwarded_values {
      query_string = false
      headers      = ["Host"]
      cookies {
        forward = "none"
      }
    }

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.preview_routing.arn
    }

    min_ttl     = 0
    default_ttl = 60
    max_ttl     = 300
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.previews.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  depends_on = [aws_acm_certificate_validation.previews]
}

# ============================================
# S3 Bucket Policies (for CloudFront access)
# ============================================

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipal"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.site.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.site.arn
          }
        }
      }
    ]
  })
}

resource "aws_s3_bucket_policy" "previews" {
  bucket = aws_s3_bucket.previews.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipal"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.previews.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.previews.arn
          }
        }
      }
    ]
  })
}

# ============================================
# Route53 Records
# ============================================

# Main site DNS record
resource "aws_route53_record" "site" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

# Wildcard DNS record for previews
resource "aws_route53_record" "previews" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "*.previews.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.previews.domain_name
    zone_id                = aws_cloudfront_distribution.previews.hosted_zone_id
    evaluate_target_health = false
  }
}

# ============================================
# GitHub Actions OIDC
# ============================================

# OIDC Provider for GitHub Actions
resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1", "1c58a3a8518e8759bf075b76b750d4f2df264fcd"]
}

# IAM Role for GitHub Actions
resource "aws_iam_role" "github_actions" {
  name = "alpha-morrisoncole-github-actions"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_repo}:*"
          }
        }
      }
    ]
  })
}

# Policy for GitHub Actions to deploy
resource "aws_iam_role_policy" "github_actions" {
  name = "deploy-policy"
  role = aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.site.arn,
          "${aws_s3_bucket.site.arn}/*",
          aws_s3_bucket.previews.arn,
          "${aws_s3_bucket.previews.arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "cloudfront:CreateInvalidation"
        ]
        Resource = [
          aws_cloudfront_distribution.site.arn,
          aws_cloudfront_distribution.previews.arn
        ]
      }
    ]
  })
}
