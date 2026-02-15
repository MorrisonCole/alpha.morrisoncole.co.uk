variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "ap-northeast-1"
}

variable "domain_name" {
  description = "Custom domain name for the site"
  type        = string
  default     = "alpha.morrisoncole.co.uk"
}

variable "root_domain_name" {
  description = "Root domain name (for Route53 hosted zone lookup)"
  type        = string
  default     = "morrisoncole.co.uk"
}

variable "github_repo" {
  description = "GitHub repository in format owner/repo"
  type        = string
  default     = "MorrisonCole/alpha.morrisoncole.co.uk"
}
