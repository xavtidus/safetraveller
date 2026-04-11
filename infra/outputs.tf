output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (used for cache invalidation)"
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.site.domain_name
}

output "s3_bucket_name" {
  description = "S3 origin bucket name"
  value       = aws_s3_bucket.site.id
}

output "s3_bucket_arn" {
  description = "S3 origin bucket ARN"
  value       = aws_s3_bucket.site.arn
}

output "site_url" {
  description = "URL of the deployed site"
  value       = "https://${aws_cloudfront_distribution.site.domain_name}"
}
