variable "project_name" {
  description = "Project name"
  type        = string
}

variable "environment" {
  description = "Environment"
  type        = string
}

variable "public_subnet_ids" {
  description = "Public subnet IDs for EC2"
  type        = list(string)
}

variable "ec2_sg_id" {
  description = "Security group ID for EC2"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "SSH key pair name"
  type        = string
  default     = ""
}

variable "backend_port" {
  description = "Backend port"
  type        = number
  default     = 3200
}

variable "target_group_arn" {
  description = "ALB target group ARN"
  type        = string
}

variable "mongo_uri" {
  description = "MongoDB connection URI"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT secret key"
  type        = string
  sensitive   = true
}

variable "imagekit_endpoint" {
  description = "ImageKit endpoint"
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
  default     = ""
  sensitive   = true
}

variable "allowed_origins" {
  description = "Allowed CORS origins"
  type        = string
  default     = ""
}
