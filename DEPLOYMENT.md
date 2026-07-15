# ============================================
# Zometo - Production Deployment Guide
# ============================================

## Architecture Overview

```
Internet
  |
  v
Route53 (optional)
  |
  v
ACM SSL Certificate
  |
  v
CloudFront (CDN) ──> S3 (Frontend Static Files)
  |
  v
Application Load Balancer
  |
  v
EC2 t2.micro (Nginx + PM2 + Node.js)
  |
  v
MongoDB Atlas (Database)
  |
  v
ImageKit (Video Uploads)
```

## Cost Estimation (AWS Free Tier - 12 months)

| Service            | Configuration     | Monthly Cost |
|-------------------|-------------------|-------------|
| EC2 t2.micro       | 750 hrs/month     | $0 (Free)   |
| ALB                | 750 hrs/month     | $0 (Free)   |
| S3                 | 5GB storage       | $0 (Free)   |
| CloudFront         | 1TB transfer      | $0 (Free)   |
| ACM Certificate    | SSL               | $0 (Free)   |
| VPC                | Networking        | $0 (Free)   |
| NAT Gateway        | **Disabled**      | $0 (Saved)  |
| MongoDB Atlas      | M0 Free Tier      | $0 (Free)   |
| **Total**          |                   | **~$0/month** |

After Free Tier expires: ~$8-15/month (single t2.micro + storage)

---

## Prerequisites

1. AWS Account with admin access
2. AWS CLI installed and configured (`aws configure`)
3. Terraform >= 1.0 installed
4. Node.js >= 20 installed
5. MongoDB Atlas account (Free Tier M0)
6. ImageKit account (already configured)
7. Git installed

---

## Step 1: Configure AWS Credentials

```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Enter default region: us-east-1
# Enter default output format: json
```

---

## Step 2: Set Up Secrets

### Create a `terraform/secrets.auto.tfvars` file (DO NOT commit this):

```hcl
# MongoDB Atlas connection string
mongo_uri = "mongodb+srv://user:password@cluster.mongodb.net/mern-project"

# JWT Secret (generate a strong random string)
jwt_secret = "your-very-long-random-jwt-secret-key"

# ImageKit credentials
imagekit_endpoint    = "https://your-endpoint.imagekit.io"
imagekit_public_key  = "public_xxxxx"
imagekit_private_key = "private_xxxxx"

# CORS origins (comma-separated)
allowed_origins = "https://d1234567890.cloudfront.net,http://localhost:5173"
```

### Or set as GitHub Secrets for CI/CD:

Deploy jobs use the GitHub **Environment** named `production`. Secrets must be set
either as **repository secrets** or as **environment secrets** on `production`.

**Path:** Repo → **Settings** → **Secrets and variables** → **Actions**  
(or **Settings** → **Environments** → **production** → Environment secrets)

| Secret Name          | Description                    |
|---------------------|--------------------------------|
| AWS_ACCESS_KEY_ID   | AWS access key (**required** for deploy) |
| AWS_SECRET_ACCESS_KEY | AWS secret key (**required** for deploy) |
| MONGO_URI           | MongoDB Atlas connection string |
| JWT_SECRET          | JWT signing secret              |
| IMAGEKIT_ENDPOINT   | ImageKit endpoint URL           |
| IMAGEKIT_PUBLIC_KEY | ImageKit public key             |
| IMAGEKIT_PRIVATE_KEY | ImageKit private key (sensitive) |
| ALLOWED_ORIGINS     | Comma-separated CORS origins    |
| EC2_HOST            | EC2 public IP or DNS            |
| EC2_SSH_KEY         | SSH private key for EC2         |

If `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` are missing, the deploy job fails with:
`Credentials could not be loaded, please check your action inputs`.

Create an IAM user (or access keys) with permissions for Terraform, S3, CloudFront,
EC2, SSM, etc., then paste the keys into the secrets above. Never commit keys to git.

---

## Step 3: Deploy Infrastructure with Terraform

```bash
cd mern_stack_work

# Initialize Terraform
terraform init

# Plan (review changes)
terraform plan

# Apply (deploy)
terraform apply

# Get outputs
terraform output
```

### Important Outputs:
- `frontend_url` - CloudFront URL for the frontend
- `backend_url` - ALB URL for the backend API
- `health_check_url` - Backend health check endpoint
- `s3_bucket_id` - S3 bucket for frontend files
- `cloudfront_distribution_id` - CloudFront distribution ID

---

## Step 4: Deploy Frontend

### Manual deployment:
```bash
cd frontend

# Set the API URL
export VITE_API_BASE_URL=$(cd .. && terraform output -raw backend_url)

# Build
npm run build

# Upload to S3
S3_BUCKET=$(cd .. && terraform output -raw s3_bucket_id)
CF_DIST_ID=$(cd .. && terraform output -raw cloudfront_distribution_id)

aws s3 sync dist/ s3://$S3_BUCKET/ --delete
aws cloudfront create-invalidation --distribution-id $CF_DIST_ID --paths "/*"
```

### Or use CI/CD (push to `main` branch):
Frontend deploys automatically via GitHub Actions.

---

## Step 5: Deploy Backend

### SSH into EC2:
```bash
EC2_IP=$(terraform output -raw ec2_public_ip)
ssh -i your-key.pem ec2-user@$EC2_IP
```

### On EC2, set up the app:
```bash
cd /opt/app

# Copy your backend code (or clone from git)
# Set up .env file with production values

# Install dependencies
npm ci --omit=dev

# Start with PM2
pm2 start server.js --name zometo-backend
pm2 save
pm2 startup
```

### Or use deployment script:
```bash
bash scripts/deploy.sh
```

---

## Step 6: SSL/HTTPS (Optional but Recommended)

### For CloudFront (Frontend):
1. Request certificate in ACM (us-east-1 region)
2. Validate via DNS (Route53) or email
3. Update `cloudfront_certificate_arn` in terraform.tfvars
4. Run `terraform apply`

### For ALB (Backend API):
1. Request certificate in ACM
2. Validate
3. Update `certificate_arn` in terraform.tfvars
4. Run `terraform apply`

---

## API Endpoints

| Method | Endpoint                        | Description           | Auth     |
|--------|--------------------------------|----------------------|----------|
| GET    | `/health`                      | Health check          | No       |
| POST   | `/api/auth/user/register`      | Register user         | No       |
| POST   | `/api/auth/user/login`         | Login user            | No       |
| GET    | `/api/auth/user/logout`        | Logout user           | Cookie   |
| POST   | `/api/auth/food-partner/register` | Register partner   | No       |
| POST   | `/api/auth/food-partner/login` | Login partner         | No       |
| GET    | `/api/auth/food-partner/logout`| Logout partner        | Cookie   |
| POST   | `/api/food`                    | Create food item      | Partner  |
| GET    | `/api/food`                    | Get all food items    | User     |
| POST   | `/api/food/like`               | Like/unlike food      | User     |
| POST   | `/api/food/save`               | Save/unsave food      | User     |
| GET    | `/api/food/save`               | Get saved foods       | User     |
| GET    | `/api/food-partner/:id`        | Get partner profile   | No       |

---

## Rollback Instructions

### Terraform Rollback:
```bash
# List state backups
ls *.tfstate.backup

# Restore previous state
terraform state pull > current.tfstate
terraform state push current.tfstate.backup

# Apply to revert
terraform apply
```

### EC2 Backend Rollback:
```bash
# List backups on EC2
ls /opt/app-backups/

# Restore specific backup
sudo rm -rf /opt/app
sudo cp -r /opt/app-backups/backup-YYYYMMDDHHMMSS /opt/app

# Restart
cd /opt/app
pm2 restart zometo-backend
```

### Frontend Rollback:
```bash
# Redeploy previous build
aws s3 sync s3://$S3_BUCKET-backup/ s3://$S3_BUCKET/ --delete
aws cloudfront create-invalidation --distribution-id $CF_DIST_ID --paths "/*"
```

---

## Monitoring

### CloudWatch:
```bash
# View EC2 metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/EC2 \
  --metric-name CPUUtilization \
  --dimensions Name=InstanceId,Value=$INSTANCE_ID \
  --start-time $(date -u -d '1 hour ago' +%Y-%m-%dT%H:%M:%S) \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
  --period 300 \
  --statistics Average
```

### PM2 Monitoring:
```bash
pm2 monit
pm2 logs zometo-backend
pm2 status
```

### Health Check:
```bash
curl http://YOUR_ALB_DNS/health
# Expected: {"status":"healthy","timestamp":"..."}
```

---

## Security Checklist

- [x] Helmet.js security headers
- [x] Rate limiting (100 req/15min per IP)
- [x] CORS properly configured
- [x] HTTP-only cookies with Secure flag
- [x] JWT token expiration (7 days)
- [x] Password hashing (bcrypt)
- [x] IMDSv2 on EC2 (no IMDSv1)
- [x] Encrypted EBS volumes
- [x] S3 bucket not publicly accessible
- [x] Security groups (least privilege)
- [x] No hardcoded secrets
- [x] Environment variables for all secrets
- [ ] WAF (add when needed)
- [ ] CloudTrail (enable for audit logging)
- [ ] VPC Flow Logs (enable for network monitoring)

---

## File Structure

```
mern_stack_work/
├── backend/
│   ├── .env.example          # Environment template
│   ├── server.js             # Entry point
│   ├── src/
│   │   ├── app.js            # Express app with security middleware
│   │   ├── config/database.js
│   │   ├── controllers/      # Route handlers
│   │   ├── middleware/        # Auth, upload
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API routes
│   │   └── services/         # ImageKit service
│   └── package.json
├── frontend/
│   ├── .env                  # Frontend env vars
│   ├── .env.example
│   ├── src/
│   │   ├── config/api.js     # API base URL config
│   │   ├── pages/            # React pages
│   │   ├── components/       # React components
│   │   ├── createfood/       # Food creation page
│   │   ├── router/           # React Router
│   │   └── styles/           # CSS files
│   ├── vite.config.js
│   └── package.json
├── modules/                  # Terraform modules
│   ├── vpc/                  # VPC + subnets + routing
│   ├── security_groups/      # ALB + EC2 security groups
│   ├── alb/                  # Application Load Balancer
│   ├── ec2/                  # Backend EC2 + IAM + user data
│   ├── s3_cloudfront/        # Frontend hosting
│   └── iam/                  # (unused, IAM in ec2 module)
├── main.tf                   # Root Terraform config
├── variables.tf              # Root variables
├── terraform.tfvars          # Variable values
├── providers.tf              # Provider config
├── Dockerfile                # Container build
├── docker-compose.yml        # Local Docker setup
├── nginx/backend.conf        # Nginx reverse proxy config
├── scripts/
│   ├── deploy.sh             # EC2 deployment script
│   ├── setup-ec2.sh          # EC2 initial setup
│   └── dev.sh                # Local development
├── .github/workflows/
│   └── ci-cd.yml             # GitHub Actions CI/CD
└── .gitignore
```
