# ── 1. Install everything ──────────────────────────────────────
sudo apt update && sudo apt install -y nginx unzip certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# ── 2. Create folders ──────────────────────────────────────────
mkdir -p ~/portfolio/www ~/blog-backend ~/blog

# ── 3. Portfolio deploy script ─────────────────────────────────
cat > ~/portfolio/deploy.sh << 'SCRIPT'
#!/bin/bash
REPO="shubnit12/shubnit12.github.io"
INSTALL_DIR="$HOME/portfolio/www"
VERSION_FILE="$HOME/portfolio/version.txt"
LATEST_TAG=$(curl -s "https://api.github.com/repos/${REPO}/releases/latest" | grep '"tag_name"' | cut -d '"' -f 4)
if [ -z "$LATEST_TAG" ]; then echo "[$(date)] Could not fetch tag."; exit 1; fi
CURRENT_TAG=$(cat "$VERSION_FILE" 2>/dev/null || echo "none")
if [ "$LATEST_TAG" == "$CURRENT_TAG" ]; then echo "[$(date)] Already on $LATEST_TAG."; exit 0; fi
echo "[$(date)] Deploying $LATEST_TAG..."
curl -sL "https://github.com/${REPO}/releases/download/${LATEST_TAG}/portfolio.zip" -o /tmp/portfolio.zip
rm -rf /tmp/portfolio_extracted && unzip -q /tmp/portfolio.zip -d /tmp/portfolio_extracted
rm -rf "$INSTALL_DIR"/* && cp -r /tmp/portfolio_extracted/. "$INSTALL_DIR"/
echo "$LATEST_TAG" > "$VERSION_FILE"
rm -f /tmp/portfolio.zip && rm -rf /tmp/portfolio_extracted
echo "[$(date)] Successfully deployed $LATEST_TAG."
SCRIPT
chmod +x ~/portfolio/deploy.sh

# ── 4. Blog-backend deploy script ─────────────────────────────
cat > ~/blog-backend/deploy.sh << 'SCRIPT'
#!/bin/bash
REPO="shubnit12/shubnitBlogWebiteBackend"
INSTALL_DIR="$HOME/blog-backend/app"
VERSION_FILE="$HOME/blog-backend/version.txt"
LATEST_TAG=$(curl -s "https://api.github.com/repos/${REPO}/releases/latest" | grep '"tag_name"' | cut -d '"' -f 4)
if [ -z "$LATEST_TAG" ]; then echo "[$(date)] Could not fetch tag."; exit 1; fi
CURRENT_TAG=$(cat "$VERSION_FILE" 2>/dev/null || echo "none")
if [ "$LATEST_TAG" == "$CURRENT_TAG" ]; then echo "[$(date)] Already on $LATEST_TAG."; exit 0; fi
echo "[$(date)] Deploying $LATEST_TAG..."
curl -sL "https://github.com/${REPO}/releases/download/${LATEST_TAG}/backend.zip" -o /tmp/backend.zip
rm -rf /tmp/backend_extracted && unzip -q /tmp/backend.zip -d /tmp/backend_extracted
rm -rf "$INSTALL_DIR" && mkdir -p "$INSTALL_DIR"
cp -r /tmp/backend_extracted/. "$INSTALL_DIR"/
cp "$HOME/blog-backend/.env" "$INSTALL_DIR/.env"
cd "$INSTALL_DIR" && npm install --omit=dev
mkdir -p "$INSTALL_DIR/uploads"
pm2 restart blog-backend 2>/dev/null || pm2 start "$INSTALL_DIR/index.js" --name blog-backend
echo "$LATEST_TAG" > "$VERSION_FILE"
rm -f /tmp/backend.zip && rm -rf /tmp/backend_extracted
echo "[$(date)] Successfully deployed $LATEST_TAG."
SCRIPT
chmod +x ~/blog-backend/deploy.sh

# ── 5. Blog deploy script ──────────────────────────────────────
cat > ~/blog/deploy.sh << 'SCRIPT'
#!/bin/bash
REPO="shubnit12/blog"
INSTALL_DIR="$HOME/blog/app"
VERSION_FILE="$HOME/blog/version.txt"
LATEST_TAG=$(curl -s "https://api.github.com/repos/${REPO}/releases/latest" | grep '"tag_name"' | cut -d '"' -f 4)
if [ -z "$LATEST_TAG" ]; then echo "[$(date)] Could not fetch tag."; exit 1; fi
CURRENT_TAG=$(cat "$VERSION_FILE" 2>/dev/null || echo "none")
if [ "$LATEST_TAG" == "$CURRENT_TAG" ]; then echo "[$(date)] Already on $LATEST_TAG."; exit 0; fi
echo "[$(date)] Deploying $LATEST_TAG..."
curl -sL "https://github.com/${REPO}/releases/download/${LATEST_TAG}/blog.zip" -o /tmp/blog.zip
rm -rf /tmp/blog_extracted && unzip -q /tmp/blog.zip -d /tmp/blog_extracted
rm -rf "$INSTALL_DIR" && mkdir -p "$INSTALL_DIR"
cp -r /tmp/blog_extracted/. "$INSTALL_DIR"/
pm2 restart blog 2>/dev/null || pm2 start "$INSTALL_DIR/expressServer/index.js" --name blog
echo "$LATEST_TAG" > "$VERSION_FILE"
rm -f /tmp/blog.zip && rm -rf /tmp/blog_extracted
echo "[$(date)] Successfully deployed $LATEST_TAG."
SCRIPT
chmod +x ~/blog/deploy.sh

# ── 6. .env for backend ────────────────────────────────────────
nano ~/blog-backend/.env
# Fill in: MONGO_PASSWORD, NODE_ENV, PORT, AWS_*, DELETE_SECRET_PHRASE, MAILTOKEN, EMAIL

# ── 7. Run first deploys ───────────────────────────────────────
~/portfolio/deploy.sh
~/blog-backend/deploy.sh
~/blog/deploy.sh

# ── 8. nginx permissions for portfolio ────────────────────────
sudo chmod o+x /home/ubuntu /home/ubuntu/portfolio
sudo chmod -R o+r /home/ubuntu/portfolio/www

# ── 9. nginx configs ───────────────────────────────────────────
sudo cp ~/portfolio/www/ec2-setup/nginx-shubnit.com.conf /etc/nginx/sites-available/shubnit.com
sudo cp ~/blog-backend/app/deploy/nginx-api.shubnit.com.conf /etc/nginx/sites-available/api.shubnit.com
sudo cp ~/blog/app/deploy/nginx-blog.shubnit.com.conf /etc/nginx/sites-available/blog.shubnit.com
sudo ln -s /etc/nginx/sites-available/shubnit.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/api.shubnit.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/blog.shubnit.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# ── 10. SSL ────────────────────────────────────────────────────
sudo certbot --nginx -d shubnit.com -d www.shubnit.com -d api.shubnit.com -d blog.shubnit.com

# ── 11. pm2 startup ────────────────────────────────────────────
pm2 startup   # copy and run the printed command, then:
pm2 save

# ── 12. Cron jobs ──────────────────────────────────────────────
(crontab -l 2>/dev/null; echo "*/5 * * * * /home/ubuntu/portfolio/deploy.sh >> /home/ubuntu/portfolio/deploy.log 2>&1") | crontab -
(crontab -l 2>/dev/null; echo "*/5 * * * * /home/ubuntu/blog-backend/deploy.sh >> /home/ubuntu/blog-backend/deploy.log 2>&1") | crontab -
(crontab -l 2>/dev/null; echo "*/5 * * * * /home/ubuntu/blog/deploy.sh >> /home/ubuntu/blog/deploy.log 2>&1") | crontab -

# ── 13. Logrotate ──────────────────────────────────────────────
sudo cp ~/portfolio/www/ec2-setup/logrotate-portfolio /etc/logrotate.d/portfolio
sudo cp ~/blog-backend/app/deploy/logrotate-blog-backend /etc/logrotate.d/blog-backend
sudo cp ~/blog/app/deploy/logrotate-blog /etc/logrotate.d/blog
sudo logrotate -d /etc/logrotate.d/portfolio
sudo logrotate -d /etc/logrotate.d/blog-backend
sudo logrotate -d /etc/logrotate.d/blog




bash
sudo npm install -g n
sudo n 20
Then reload the shell:

bash
hash -r
node --version


sudo systemctl stop nginx
sudo certbot certonly --standalone -d shubnit.com -d www.shubnit.com -d api.shubnit.com -d blog.shubnit.com
sudo systemctl start nginx
