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
