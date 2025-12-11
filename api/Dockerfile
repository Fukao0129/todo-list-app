FROM php:8.2-fpm-alpine

# 必要なパッケージのインストール
RUN apk add --no-cache \
    bash \
    git \
    curl \
    zip \
    unzip

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# PHP拡張機能のインストール
RUN docker-php-ext-install pdo_mysql 

COPY / /var/www/html

WORKDIR /var/www/html
RUN chmod 777 -R /var/www/html/storage

CMD php artisan serve --host=0.0.0.0 --port=$PORT