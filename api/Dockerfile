FROM php:8.2-apache

# 必要なパッケージ
RUN apt-get update && apt-get install -y \
    git unzip libonig-dev libzip-dev

# Apache設定: DocumentRootをpublicに向ける
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# ModRewrite有効化
RUN a2enmod rewrite

# 拡張機能
RUN docker-php-ext-install pdo_mysql mbstring zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

# 依存関係インストール
RUN composer install --no-dev --optimize-autoloader

# パーミッション
RUN chown -R www-data:www-data storage bootstrap/cache

# RailwayのPORTに合わせてApacheのポート設定を書き換える（重要）
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Start Command（Apacheはフォアグラウンドで実行）
CMD sh -c "php artisan migrate --force && apache2-foreground"