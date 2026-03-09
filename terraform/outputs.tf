#Allows us to access container that is behind alb
output "project_alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = aws_lb.project_application_lb.dns_name
}

# Allows us to upload image to repo
output "ecr_repository_url" {
  description = "URL of the ECR repository"
  value       = aws_ecr_repository.project_ecr_repo.repository_url
}