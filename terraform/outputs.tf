output "amplify_app_id" {
  description = "The ID of the Amplify app"
  value       = aws_amplify_app.main.id
}

output "amplify_default_domain" {
  description = "The default domain for the Amplify app"
  value       = aws_amplify_app.main.default_domain
}

output "amplify_branch_url" {
  description = "The URL for the main branch"
  value       = "https://${aws_amplify_branch.main.branch_name}.${aws_amplify_app.main.default_domain}"
}

output "custom_domain_url" {
  description = "The custom domain URL"
  value       = "https://${var.domain_name}"
}
