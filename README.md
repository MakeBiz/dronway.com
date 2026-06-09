# Сайт DronWay

Статический одностраничный сайт. Один файл index.html, шрифты подключаются с Google Fonts, иконка в favicon.svg

## Структура
- index.html: весь сайт
- favicon.svg: иконка вкладки
- README.md: этот файл

## Локальный просмотр
Откройте index.html в браузере, сервер не нужен

## Деплой на Vercel
1. Создайте репозиторий на GitHub и загрузите эти файлы в корень
2. В Vercel: Add New → Project → импортируйте репозиторий
3. Framework Preset оставьте Other, поля сборки пустыми, Vercel отдаёт index.html как есть
4. Нажмите Deploy, Vercel выдаст ссылку вида your-project.vercel.app

Конфиг не нужен: статический index.html в корне Vercel подхватывает сам

## Домен dronway.com
1. Проект в Vercel → Settings → Domains → добавьте dronway.com
2. У регистратора домена пропишите записи, которые покажет Vercel, обычно это:
   - dronway.com (apex): A → 76.76.21.21
   - www: CNAME → cname.vercel-dns-0.com
   - либо отдайте весь DNS Vercel через NS ns1.vercel-dns.com и ns2.vercel-dns.com
3. После распространения DNS Vercel сам выпустит сертификат, сайт откроется на dronway.com

Применяйте значения, которые Vercel показывает именно для вашего домена, они приоритетнее
