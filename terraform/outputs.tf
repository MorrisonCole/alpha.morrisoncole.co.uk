output "site_bucket" {
  description = "The name of the S3 bucket for the main site"
  value       = aws_s3_bucket.site.bucket
}

output "previews_bucket" {
  description = "The name of the S3 bucket for PR previews"
  value       = aws_s3_bucket.previews.bucket
}

output "cloudfront_distribution_id" {
  description = "The ID of the main CloudFront distribution"
  value       = aws_cloudfront_distribution.site.id
}

output "previews_cloudfront_distribution_id" {
  description = "The ID of the previews CloudFront distribution"
  value       = aws_cloudfront_distribution.previews.id
}

output "github_actions_role_arn" {
  description = "The ARN of the IAM role for GitHub Actions"
  value       = aws_iam_role.github_actions.arn
}

output "site_url" {
  description = "The URL of the site"
  value       = "https://${var.domain_name}"
}

output "preview_url_pattern" {
  description = "The URL pattern for PR previews"
  value       = "https://pr-{number}.previews.${var.domain_name}"
}
