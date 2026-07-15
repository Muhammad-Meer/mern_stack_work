# -----------------------------------------------------------------------------
# VPC
# -----------------------------------------------------------------------------
module "vpc" {
  source = "./modules/vpc"

  project_name         = var.project_name
  environment          = var.environment
  vpc_cidr             = var.vpc_cidr
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  availability_zones   = var.availability_zones
  enable_nat_gateway   = var.enable_nat_gateway
}

# -----------------------------------------------------------------------------
# Security Groups
# -----------------------------------------------------------------------------
module "security_groups" {
  source = "./modules/security_groups"

  project_name    = var.project_name
  environment     = var.environment
  vpc_id          = module.vpc.vpc_id
  vpc_cidr        = var.vpc_cidr
  ssh_cidr_blocks = var.ssh_cidr_blocks
}

# -----------------------------------------------------------------------------
# Application Load Balancer
# -----------------------------------------------------------------------------
module "alb" {
  source = "./modules/alb"

  project_name      = var.project_name
  environment       = var.environment
  vpc_id            = module.vpc.vpc_id
  public_subnet_ids = module.vpc.public_subnet_ids
  alb_sg_id         = module.security_groups.alb_sg_id
  certificate_arn   = var.certificate_arn
}

# -----------------------------------------------------------------------------
# EC2 Backend
# -----------------------------------------------------------------------------
module "ec2" {
  source = "./modules/ec2"

  project_name         = var.project_name
  environment          = var.environment
  public_subnet_ids    = module.vpc.public_subnet_ids
  ec2_sg_id            = module.security_groups.ec2_sg_id
  instance_type        = var.instance_type
  key_name             = var.key_name
  backend_port         = var.backend_port
  target_group_arn     = module.alb.target_group_arn
  mongo_uri            = var.mongo_uri
  jwt_secret           = var.jwt_secret
  imagekit_endpoint    = var.imagekit_endpoint
  imagekit_public_key  = var.imagekit_public_key
  imagekit_private_key = var.imagekit_private_key
  allowed_origins      = var.allowed_origins
}

# -----------------------------------------------------------------------------
# S3 + CloudFront (Frontend)
# -----------------------------------------------------------------------------
module "s3_cloudfront" {
  source = "./modules/s3_cloudfront"

  project_name    = var.project_name
  environment     = var.environment
  domain_name     = var.domain_name
  alb_domain_name = module.alb.alb_dns_name
  alb_arn         = module.alb.alb_arn
  certificate_arn = var.cloudfront_certificate_arn
}

# -----------------------------------------------------------------------------
# Outputs
# -----------------------------------------------------------------------------
output "vpc_id" {
  description = "ID of the VPC"
  value       = module.vpc.vpc_id
}

output "public_subnet_ids" {
  description = "IDs of public subnets"
  value       = module.vpc.public_subnet_ids
}

output "private_subnet_ids" {
  description = "IDs of private subnets"
  value       = module.vpc.private_subnet_ids
}

output "alb_dns_name" {
  description = "ALB DNS name (Backend API)"
  value       = module.alb.alb_dns_name
}

output "ec2_public_ip" {
  description = "EC2 instance public IP"
  value       = module.ec2.instance_public_ip
}

output "ec2_instance_id" {
  description = "EC2 instance ID"
  value       = module.ec2.instance_id
}

output "s3_bucket_id" {
  description = "S3 bucket for frontend"
  value       = module.s3_cloudfront.s3_bucket_id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain (Frontend URL)"
  value       = module.s3_cloudfront.cloudfront_domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = module.s3_cloudfront.cloudfront_distribution_id
}

output "frontend_url" {
  description = "Frontend URL"
  value       = "https://${module.s3_cloudfront.cloudfront_domain_name}"
}

output "backend_url" {
  description = "Backend API URL"
  value       = "http://${module.alb.alb_dns_name}"
}

output "health_check_url" {
  description = "Health check URL"
  value       = "http://${module.alb.alb_dns_name}/health"
}
