# Lumeo Group - Email Form Deployment Guide

## Overview
This guide will help you deploy the email functionality to AWS Lightsail with your Zoho Mail integration.

## Prerequisites
- AWS Lightsail instance (Ubuntu 20.04+ recommended)
- Domain name (already configured)
- Zoho Mail account with app password

## Step 1: Prepare Your Lightsail Instance

### 1.1 Create Lightsail Instance
1. Go to AWS Lightsail console
2. Create new instance
3. Choose Ubuntu 20.04 LTS
4. Select appropriate plan (minimum $5/month for basic usage)
5. Add your SSH key
6. Launch instance

### 1.2 Connect to Instance
```bash
ssh ubuntu@YOUR_INSTANCE_IP
```

### 1.3 Install Node.js and npm
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 1.4 Install PM2 for process management
```bash
sudo npm install -g pm2
```

## Step 2: Deploy Application

### 2.1 Clone/Upload Your Code
```bash
# Option 1: Clone from GitHub (recommended)
git clone YOUR_REPO_URL lumeo-app
cd lumeo-app

# Option 2: Upload via SCP
scp -r * ubuntu@YOUR_INSTANCE_IP:/home/ubuntu/lumeo-app/
```

### 2.2 Install Dependencies
```bash
npm install
```

### 2.3 Build Frontend
```bash
npm run build
```

### 2.4 Create Production Environment File
```bash
# Create .env file with your production credentials
cat > .env << EOF
# Zoho Mail Configuration
ZOHO_EMAIL=info@lumeogroup.com
ZOHO_PASSWORD=1mU7Kfss7qcu

# Server Configuration
PORT=3001
NODE_ENV=production
EOF
```

## Step 3: Configure Reverse Proxy with Nginx

### 3.1 Install Nginx
```bash
sudo apt update
sudo apt install nginx
```

### 3.2 Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/lumeo
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend (React app)
    location / {
        root /home/ubuntu/lumeo-app/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3.3 Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/lumeo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 4: Start Application with PM2

### 4.1 Start Backend Server
```bash
pm2 start server.js --name lumeo-backend
pm2 startup
pm2 save
```

### 4.2 Verify Everything is Running
```bash
pm2 status
curl http://localhost:3001/api/health
```

## Step 5: SSL Certificate (Let's Encrypt)

### 5.1 Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx
```

### 5.2 Get SSL Certificate
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 5.3 Auto-renewal
```bash
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Step 6: Domain Configuration

### 6.1 Update DNS Records
In your domain registrar:
- A record: `@` → YOUR_LIGHTSAIL_IP
- A record: `www` → YOUR_LIGHTSAIL_IP

### 6.2 Wait for DNS Propagation
This can take up to 24-48 hours, but usually happens within 1-2 hours.

## Step 7: Testing

### 7.1 Test Email Functionality
1. Visit your domain
2. Fill out the contact form
3. Check both:
   - Your Zoho inbox (info@lumeogroup.com)
   - The test email address you used

### 7.2 Monitor Logs
```bash
# Check PM2 logs
pm2 logs lumeo-backend

# Check Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check Zoho app password is correct
   - Verify Zoho SMTP settings
   - Check server logs: `pm2 logs`

2. **Form not submitting**
   - Check browser console for errors
   - Verify API endpoint is accessible: `curl http://your-domain.com/api/health`
   - Check CORS settings

3. **SSL issues**
   - Run: `sudo certbot renew --dry-run`
   - Check Nginx configuration: `sudo nginx -t`

## Security Checklist

- [ ] Change default SSH port
- [ ] Set up firewall (UFW)
- [ ] Regular security updates
- [ ] Monitor server logs
- [ ] Use strong passwords

## Maintenance Commands

```bash
# Update packages
sudo apt update && sudo apt upgrade

# Restart services
pm2 restart lumeo-backend
sudo systemctl restart nginx

# View logs
pm2 logs lumeo-backend --lines 50
```

## Support
If you encounter issues, check:
1. Server logs: `pm2 logs`
2. Nginx logs: `/var/log/nginx/`
3. Test SMTP connection: Use online SMTP testers
