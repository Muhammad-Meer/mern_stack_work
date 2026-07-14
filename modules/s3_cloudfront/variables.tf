variable "project_name" {
  description = "Project name"
  type        = string
}

variable "environment" {
  description = "Environment"
  type        = string
}

variable "domain_name" {
  description = "Domain name for CloudFront (optional)"
  type        = string
  default     = ""
}

variable "alb_domain_name" {
  description = "ALB domain name for API origin"
  type        = string
}

variable "alb_arn" {
  description = "ALB ARN"
  type        = string
}

variable "default_root_object" {
  description = "Default root object for CloudFront"
  type        = string
  default     = "index.html"
}

variable "price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_100"
}

variable "certificate_arn" {
  description = "ACM certificate ARN for CloudFront"
  type        = string
  default     = ""
}

variable "origin_id" {
  description = "Origin ID for API"
  type        = string
  default     = "api-origin"
}
