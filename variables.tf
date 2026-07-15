# General
variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "us-east-1"
}

variable "aws_access_key" {
  description = "AWS access key"
  type        = string
  sensitive   = true
}

variable "aws_secret_key" {
  description = "AWS secret key"
  type        = string
  sensitive   = true
}

variable "project_name" {
  description = "Project name used for tagging and resource naming"
  type        = string
  default     = "zometo"
}

variable "environment" {
  description = "Deployment environment (e.g. dev, staging, prod)"
  type        = string
  default     = "dev"
}

# VPC
variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.11.0/24", "10.0.12.0/24"]
}

variable "availability_zones" {
  description = "Availability zones for subnets"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}

variable "enable_nat_gateway" {
  description = "Enable NAT Gateway (~$32/month). Keep false for cost savings."
  type        = bool
  default     = false
}

# EC2
variable "instance_type" {
  description = "EC2 instance type (t3.micro is Free Tier)"
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "AWS SSH key pair name (leave empty if not using SSH)"
  type        = string
  default     = ""
}

variable "backend_port" {
  description = "Backend application port"
  type        = number
  default     = 3200
}

# SSL/Certificates
variable "certificate_arn" {
  description = "ACM certificate ARN for ALB HTTPS (optional)"
  type        = string
  default     = ""
}

variable "cloudfront_certificate_arn" {
  description = "ACM certificate ARN for CloudFront (must be in us-east-1)"
  type        = string
  default     = ""
}

variable "domain_name" {
  description = "Domain name for the application (optional)"
  type        = string
  default     = ""
}

# Application Secrets
variable "mongo_uri" {
  description = "MongoDB Atlas connection URI"
  type        = string
  sensitive   = true
  default     = ""
}

variable "jwt_secret" {
  description = "JWT secret key"
  type        = string
  sensitive   = true
  default     = ""
}

variable "imagekit_endpoint" {
  description = "ImageKit endpoint URL"
  type        = string
  default     = ""
}

variable "imagekit_public_key" {
  description = "ImageKit public key"
  type        = string
  default     = ""
}

variable "imagekit_private_key" {
  description = "ImageKit private key"
  type        = string
  sensitive   = true
  default     = ""
}

variable "allowed_origins" {
  description = "Comma-separated list of allowed CORS origins for backend"
  type        = string
  default     = ""
}

# Security
variable "ssh_cidr_blocks" {
  description = "CIDR blocks allowed for SSH access to EC2"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}
