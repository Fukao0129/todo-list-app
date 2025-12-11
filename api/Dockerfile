FROM php:8.2-fpm-alpine

# 必要なパッケージのインストール
RUN apk add --no-cache \
    git \
    curl \
    zip \
    unzip

# Composerのインストール
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# PHP拡張機能のインストール
RUN docker-php-ext-install pdo_mysql 

COPY / /var/www/html

WORKDIR /var/www/html
RUN chmod 777 -R /var/www/html/storage