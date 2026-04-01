# Vercel Deployment Guide

## Setup Complete ✅

Your project has been configured for Vercel deployment with the following changes:

### Files Created:
1. **`src/environments/environment.ts`** - Development environment config
2. **`src/environments/environment.production.ts`** - Production environment config (uses https://quickresponse.runasp.net/api)
3. **`.env`** - Local development environment variables
4. **`.env.production`** - Production environment variables
5. **`vercel.json`** - Vercel deployment configuration

### Updates Made:
- ✅ `api.service.ts` - Now uses environment configuration
- ✅ `auth.service.ts` - Now uses environment configuration  
- ✅ `.gitignore` - Updated to exclude .env files

---

## Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Configure for Vercel deployment with environment variables"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in or create an account
3. Click **"New Project"**
4. Import your GitHub repository
5. Select your project and click **"Import"**

### Step 3: Configure Environment Variables (in Vercel Dashboard)
1. Go to your project settings → **Environment Variables**
2. Add the following environment variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://quickresponse.runasp.net/api`
   - **Environments:** Select "Production"

### Step 4: Deploy
- Click **"Deploy"**
- Vercel will automatically build and deploy your project

---

## API Endpoints
- **Development:** `http://localhost:5044/api`
- **Production:** `https://quickresponse.runasp.net/api`

The correct API URL is automatically selected based on the deployment environment.

---

## Local Development
```bash
npm start
```
This uses the development API URL from `src/environments/environment.ts`

## Production Build
```bash
npm run build
```
This uses the production API URL from `src/environments/environment.production.ts`

---

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure your backend API has CORS enabled for `https://your-vercel-domain.vercel.app`

### Environment Variables Not Loading
- Verify variables are set in Vercel dashboard
- Rebuild the project if you just added environment variables
- Check browser console for any errors

### API Calls Still Using Old URL
- Make sure both `api.service.ts` and `auth.service.ts` files were updated
- Clear browser cache (Ctrl+Shift+Del)
- Rebuild the project

---

## Support
For more info on Angular deployment to Vercel: https://vercel.com/guides/deploy-angular
