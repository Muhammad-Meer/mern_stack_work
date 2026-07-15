terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Shared remote state so local + GitHub Actions use the same infrastructure
  backend "s3" {
    bucket         = "zometo-tfstate-018326344476"
    key            = "zometo/dev/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "zometo-terraform-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region

  # Prefer explicit keys when provided; otherwise use env / instance profile / default chain
  access_key = var.aws_access_key != "" ? var.aws_access_key : null
  secret_key = var.aws_secret_key != "" ? var.aws_secret_key : null
}
