#!/bin/bash
set -e

echo "==================================="
echo "  Zometo - EC2 Setup Script"
echo "==================================="

# Update system
sudo yum update -y

# Install Node.js 20
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo yum install -y nginx

# Install Git
sudo yum install -y git

# Create app directory
sudo mkdir -p /opt/app
sudo chown ec2-user:ec2-user /opt/app

# Copy nginx config
sudo cp /home/ec2-user/nginx/backend.conf /etc/nginx/conf.d/default.conf
sudo systemctl enable nginx
sudo systemctl restart nginx

# Setup PM2 to start on boot
pm2 startup systemd -u ec2-user --hp /home/ec2-user

echo "Setup complete! Ready to deploy."
