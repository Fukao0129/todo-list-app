FROM mysql:8.0.39-bookworm

# 日本語入力できるように設定
RUN rm -f /etc/apt/sources.list.d/mysql.list \
    && apt-get update \
    && apt-get install -y locales \
    && sed -i -e 's/# \(ja_JP.UTF-8\)/\1/' /etc/locale.gen \
    && locale-gen \
    && update-locale LANG=ja_JP.UTF-8

ENV LANG=ja_JP.UTF-8
