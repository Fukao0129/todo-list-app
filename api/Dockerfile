FROM php:8.2-apache

# 必要なパッケージ
RUN apt-get update && apt-get install -y \
    git unzip libonig-dev libzip-dev

# Apache設定: DocumentRootをpublicに向ける
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# .htaccessを有効化
RUN sed -ri -e 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# 拡張機能
RUN docker-php-ext-install pdo_mysql mbstring zip

RUN a2enmod rewrite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

# 依存関係インストール
RUN composer install --no-dev --optimize-autoloader

# パーミッション
RUN chown -R www-data:www-data storage bootstrap/cache

# Start Command
# MPM競合を削除 https://qiita.com/pocket8137/items/6fd15e771ebe4a431f06
CMD sh -c "\
    rm -f /etc/apache2/mods-enabled/mpm_event.load \
          /etc/apache2/mods-enabled/mpm_event.conf \
          /etc/apache2/mods-enabled/mpm_worker.load \
          /etc/apache2/mods-enabled/mpm_worker.conf && \
    a2enmod mpm_prefork && \
    sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf && \
    php artisan migrate --force && \
    apache2-foreground"