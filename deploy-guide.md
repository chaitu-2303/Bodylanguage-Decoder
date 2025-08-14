# AI Body Language Decoder - Deployment Guide

This guide will help you deploy your AI Body Language Decoder application to the cloud and get a shareable public URL.

## Quick Deployment Options

### 1. Render (Recommended - Free Tier Available)

**Steps:**
1. Create a free account at [render.com](https://render.com)
2. Connect your GitHub repository
3. Use the provided `render.yaml` file for automatic deployment
4. Your app will be available at `https://your-app-name.onrender.com`

**One-Click Deploy:**
```bash
# Install Render CLI
curl -fsSL https://render.com/install.sh | sh

# Deploy
render deploy --yaml render.yaml
```

### 2. Railway (Free Tier Available)

**Steps:**
1. Create a free account at [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Use the provided `railway.toml` file
4. Your app will be available at `https://your-app-name.up.railway.app`

**One-Click Deploy:**
```bash
# Install Railway CLI
curl -fsSL https://railway.app/install.sh | sh

# Login and deploy
railway login
railway up
```

### 3. Fly.io (Pay-as-you-go)

**Steps:**
1. Create an account at [fly.io](https://fly.io)
2. Install Fly CLI
3. Use the provided `fly.toml` file
4. Your app will be available at `https://your-app-name.fly.dev`

**One-Click Deploy:**
```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Deploy
fly deploy
```

### 4. Heroku (Free Tier Available)

**Steps:**
1. Create a free account at [heroku.com](https://heroku.com)
2. Install Heroku CLI
3. Create separate apps for API and Web
4. Your apps will be available at `https://your-app-name.herokuapp.com`

## Environment Variables Setup

Create `.env` files for each service:

### API Environment Variables
```bash
# api/.env
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
PORT=5000
JWT_SECRET=your-jwt-secret
CORS_ORIGIN=https://your-frontend-url.com
```

### Web Environment Variables
```bash
# web/.env
VITE_API_URL=https://your-api-url.com
VITE_ENV=production
```

## Database Setup

### PostgreSQL Options:
1. **Render PostgreSQL** (Recommended - Free tier available)
2. **Railway PostgreSQL** (Free tier available)
3. **Supabase** (Free tier available)
4. **Neon** (Free tier available)

### Database Migration:
```bash
# After deployment, run migrations
npx prisma migrate deploy
npx prisma db seed
```

## SSL/HTTPS Setup

All cloud platforms provide automatic SSL certificates. No additional setup required.

## Custom Domain Setup

Most platforms support custom domains:
1. Add your domain in platform settings
2. Update DNS records
3. SSL certificates will be automatically provisioned

## Monitoring & Logs

### Platform Dashboards:
- **Render**: Dashboard with logs and metrics
- **Railway**: Real-time logs and metrics
- **Fly.io**: Grafana dashboards
- **Heroku**: Application logs via CLI

### Health Checks:
- API health endpoint: `/api/health`
- Database connection check
- Frontend build status

## Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are listed in package.json
   - Ensure environment variables are set correctly

2. **Database Connection Issues**
   - Verify DATABASE_URL format
   - Check firewall settings
   - Ensure database user has correct permissions

3. **CORS Issues**
   - Update CORS_ORIGIN in API environment variables
   - Check frontend API URL configuration

4. **Memory Issues**
   - Upgrade to paid plans for more memory
   - Optimize Docker images
   - Use environment-specific configurations

## Performance Optimization

1. **Enable Caching**
   - Add Redis for session storage
   - Implement CDN for static assets

2. **Database Optimization**
   - Add database indexes
   - Use connection pooling
   - Implement query optimization

3. **Frontend Optimization**
   - Enable gzip compression
   - Optimize images
   - Implement lazy loading

## Security Best Practices

1. **Environment Variables**
   - Never commit secrets to Git
   - Use platform secret management
   - Rotate secrets regularly

2. **HTTPS Enforcement**
   - All platforms enforce HTTPS by default
   - Redirect HTTP to HTTPS

3. **Rate Limiting**
   - Implement API rate limiting
   - Use platform-provided DDoS protection

## Cost Estimates

### Free Tier Limits:
- **Render**: 100GB bandwidth, 512MB RAM
- **Railway**: 500 hours/month, 512MB RAM
- **Fly.io**: $5 credit/month, 256MB RAM
- **Heroku**: 550 dyno hours/month, 512MB RAM

### Paid Plans:
- **Render**: $7/month for 512MB RAM
- **Railway**: $5/month for 512MB RAM
- **Fly.io**: $1.94/month for 256MB RAM
- **Heroku**: $7/month for 512MB RAM

## Support

For deployment issues:
1. Check platform documentation
2. Review application logs
3. Verify environment variables
4. Test locally with Docker
5. Contact platform support

## Next Steps

1. Choose your preferred platform
2. Run the deployment script: `./deploy.sh`
3. Set up monitoring
4. Configure custom domain (optional)
5. Set up CI/CD pipeline
