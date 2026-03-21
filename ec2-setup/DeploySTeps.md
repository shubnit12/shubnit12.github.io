sudo apt update && sudo apt install -y nginx unzip

mkdir -p ~/portfolio/www

cp deploy.sh ~/portfolio/deploy.sh
chmod +x ~/portfolio/deploy.sh


sudo cp nginx-shubnit.com.conf /etc/nginx/sites-available/shubnit.com
sudo ln -s /etc/nginx/sites-available/shubnit.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx


sudo chmod o+x /home/ubuntu
sudo chmod o+x /home/ubuntu/portfolio
sudo chmod -R o+r /home/ubuntu/portfolio/www

sudo cp logrotate-portfolio /etc/logrotate.d/portfolio

crontab -e

*/5 * * * * /home/ubuntu/portfolio/deploy.sh >> /home/ubuntu/portfolio/deploy.log 2>&1

~/portfolio/deploy.sh
