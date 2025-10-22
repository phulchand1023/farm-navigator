# NASA Farm Navigator - Cloudflare Deployment Guide

## Prerequisites

1. **Install Wrangler CLI (latest version)**
```bash
npm install -g wrangler@latest
```

2. **Login to Cloudflare**
```bash
wrangler login
```

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Cloudflare Resources

**Create D1 Database:**
```bash
wrangler d1 create nasa-farm-db
```

**Create KV Namespace:**
```bash
wrangler kv:namespace create CACHE
wrangler kv:namespace create CACHE --preview
```

**Create R2 Bucket:**
```bash
wrangler r2 bucket create nasa-farm-storage
```

### 3. Update wrangler.toml

Replace the placeholder IDs in `wrangler.toml` with the actual IDs from step 2:
- `database_id` from D1 creation
- `id` and `preview_id` from KV creation

### 4. Run Database Migrations
```bash
wrangler d1 migrations apply nasa-farm-db
```

### 5. Set Environment Variables
```bash
wrangler secret put JWT_SECRET
# Enter your JWT secret when prompted

wrangler secret put NASA_API_KEY
# Enter NASA API key if you have one (optional)
```

### 6. Deploy to Cloudflare Workers

**Development:**
```bash
npm run dev
```

**Staging:**
```bash
npm run deploy:staging
```

**Production:**
```bash
npm run deploy:production
```

## Frontend Deployment (Cloudflare Pages)

### 1. Build the React App
```bash
cd client
npm run build
```

### 2. Deploy to Cloudflare Pages
```bash
wrangler pages deploy dist --project-name nasa-farm-navigator
```

### 3. Set Environment Variables in Pages
In Cloudflare Dashboard → Pages → nasa-farm-navigator → Settings → Environment Variables:
- `VITE_API_URL`: Your Worker URL (e.g., https://nasa-farm-navigator.your-subdomain.workers.dev)

## Monitoring & Maintenance

**View Logs:**
```bash
wrangler tail
```

**Check D1 Database:**
```bash
wrangler d1 execute nasa-farm-db --command "SELECT COUNT(*) FROM users"
```

**Manage KV Cache:**
```bash
wrangler kv:key list --binding CACHE
```

## Custom Domain (Optional)

1. Add custom domain in Cloudflare Dashboard
2. Update `wrangler.toml` routes section
3. Update CORS origins in worker code

## Performance Optimization

- **KV Caching**: NASA data cached for 24 hours
- **D1 Indexing**: Optimized queries with indexes
- **R2 Storage**: For file uploads and static assets
- **Edge Locations**: Global deployment via Cloudflare network

## Security Features

- JWT authentication with secure secrets
- CORS protection
- Input validation with Zod
- SQL injection protection with prepared statements
- Rate limiting (can be added with Cloudflare rules)

## Scaling Considerations

- **D1 Limits**: 100k reads/day, 50k writes/day (free tier)
- **Worker Limits**: 100k requests/day (free tier)
- **KV Limits**: 100k reads/day, 1k writes/day (free tier)
- **R2 Limits**: 10GB storage (free tier)

Upgrade to paid plans for higher limits as needed.