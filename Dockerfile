# Temel PHP imajı
FROM php:8.2-cli

# Gerekli PHP eklentilerini yükle (opsiyonel, MySQL vs. kullanıyorsan açabilirsin)
# RUN docker-php-ext-install pdo pdo_mysql

# Çalışma dizini
WORKDIR /app

# Tüm dosyaları kopyala
COPY . .

# 0.0.0.0:10000 portunda PHP built-in server başlat (frontend dizinini public root yap)
CMD ["php", "-S", "0.0.0.0:10000", "-t", "."] 