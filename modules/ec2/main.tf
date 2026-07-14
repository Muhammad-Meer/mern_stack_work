data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_iam_role" "ec2_role" {
  name = "${var.project_name}-${var.environment}-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })

  tags = {
    Name        = "${var.project_name}-${var.environment}-ec2-role"
    Project     = var.project_name
    Environment = var.environment
  }
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "${var.project_name}-${var.environment}-ec2-profile"
  role = aws_iam_role.ec2_role.name
}

resource "aws_iam_role_policy" "ec2_ssm" {
  name = "${var.project_name}-${var.environment}-ssm-policy"
  role = aws_iam_role.ec2_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ssm:GetParameter",
          "ssm:GetParameters",
          "ssm:GetParametersByPath"
        ]
        Resource = "arn:aws:ssm:*:*:parameter/${var.project_name}/${var.environment}/*"
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "*"
      }
    ]
  })
}

resource "aws_instance" "backend" {
  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = var.instance_type
  key_name               = var.key_name != "" ? var.key_name : null
  subnet_id              = var.public_subnet_ids[0]
  vpc_security_group_ids = [var.ec2_sg_id]
  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name

  user_data = base64encode(<<-USERDATA
    #!/bin/bash
    set -e

    # Update system
    yum update -y

    # Install Node.js 20
    curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
    yum install -y nodejs

    # Install PM2
    npm install -g pm2

    # Install Nginx
    yum install -y nginx

    # Configure Nginx
    cat > /etc/nginx/conf.d/backend.conf << 'NGINX'
    server {
        listen 80;
        server_name _;

        location / {
            proxy_pass http://127.0.0.1:${var.backend_port};
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        location /health {
            proxy_pass http://127.0.0.1:${var.backend_port}/health;
        }
    }
    NGINX

    systemctl enable nginx
    systemctl start nginx

    # Create app directory
    mkdir -p /opt/app
    cd /opt/app

    # Write environment file
    cat > .env << 'ENV'
    PORT=${var.backend_port}
    NODE_ENV=production
    MONGO_URI=${var.mongo_uri}
    JWT_SECRET_KEY=${var.jwt_secret}
    IMAGEKIT_ENDPOINT=${var.imagekit_endpoint}
    IMAGEKIT_PUBLIC_KEY=${var.imagekit_public_key}
    IMAGEKIT_PRIVATE_KEY=${var.imagekit_private_key}
    ALLOWED_ORIGINS=${var.allowed_origins}
    ENV

    # Install pm2-logrotate for log management
    pm2 install pm2-logrotate
    pm2 set pm2-logrotate:max_size 10M
    pm2 set pm2-logrotate:retain 7

    echo "User data script completed" > /var/log/user-data.log
  USERDATA

  root_block_device {
    volume_type = "gp3"
    volume_size = 8
    encrypted   = true
  }

  metadata_options {
    http_tokens = "required"  # IMDSv2 for security
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-backend"
    Project     = var.project_name
    Environment = var.environment
  }
}

# Register instance with target group
resource "aws_lb_target_group_attachment" "backend" {
  target_group_arn = var.target_group_arn
  target_id        = aws_instance.backend.id
  port             = var.backend_port
}

output "instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.backend.id
}

output "instance_public_ip" {
  description = "EC2 instance public IP"
  value       = aws_instance.backend.public_ip
}

output "instance_public_dns" {
  description = "EC2 instance public DNS"
  value       = aws_instance.backend.public_dns
}
