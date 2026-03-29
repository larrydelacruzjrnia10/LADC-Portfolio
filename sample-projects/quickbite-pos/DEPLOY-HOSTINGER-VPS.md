# Deploy QuickBite POS on Hostinger VPS

This guide assumes:

- Ubuntu-based Hostinger VPS
- One domain or subdomain pointing to the VPS
- MongoDB installed on the VPS
- Nginx used for the frontend and API reverse proxy
- PM2 used to keep the Express backend running

## Suggested server layout

```text
/var/www/quickbite-pos/
  repo/   <- git clone of this repository
  site/   <- built frontend files served by Nginx
```

## 1. Install server tools

```bash
sudo apt update
sudo apt install -y nginx git
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

Install MongoDB on the VPS using Hostinger's MongoDB VPS guide, then confirm the service is running.

## 2. Clone the repository

```bash
sudo mkdir -p /var/www/quickbite-pos
sudo chown -R $USER:$USER /var/www/quickbite-pos
cd /var/www/quickbite-pos
git clone https://github.com/larrydelacruzjrnia10/LADC-Portfolio.git repo
```

## 3. Configure backend environment

```bash
cd /var/www/quickbite-pos/repo/sample-projects/quickbite-pos/backend
cp .env.hostinger-vps.example .env
```

Edit `.env` and set:

- `MONGODB_URI`
- `CORS_ORIGIN`
- `PORT` if you do not want `5000`

## 4. Configure frontend production environment

```bash
cd /var/www/quickbite-pos/repo/sample-projects/quickbite-pos/frontend
cp .env.production.example .env.production
```

Default value:

```env
VITE_API_URL=/api
```

That works when Nginx serves the frontend and proxies `/api` to the backend on the same domain.

## 5. Optional: seed demo data

```bash
cd /var/www/quickbite-pos/repo/sample-projects/quickbite-pos/backend
npm install
npm run seed
```

## 6. Deploy backend

```bash
cd /var/www/quickbite-pos/repo
bash sample-projects/quickbite-pos/deployment/hostinger-vps/scripts/deploy-backend.sh
pm2 status
```

## 7. Deploy frontend

```bash
cd /var/www/quickbite-pos/repo
bash sample-projects/quickbite-pos/deployment/hostinger-vps/scripts/deploy-frontend.sh
```

## 8. Configure Nginx

Copy the provided config:

```bash
sudo cp /var/www/quickbite-pos/repo/sample-projects/quickbite-pos/deployment/hostinger-vps/nginx/quickbite-pos.conf /etc/nginx/sites-available/quickbite-pos
```

Edit `server_name` inside the file and replace `your-pos-domain.com` with your real domain or subdomain.

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/quickbite-pos /etc/nginx/sites-enabled/quickbite-pos
sudo nginx -t
sudo systemctl reload nginx
```

## 9. Add SSL

After the domain points to the VPS, install SSL:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-pos-domain.com
```

## 10. Update after future commits

```bash
cd /var/www/quickbite-pos/repo
git pull
bash sample-projects/quickbite-pos/deployment/hostinger-vps/scripts/deploy-backend.sh
bash sample-projects/quickbite-pos/deployment/hostinger-vps/scripts/deploy-frontend.sh
sudo systemctl reload nginx
```
