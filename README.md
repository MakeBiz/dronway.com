# DronWay, многостраничный сайт (Astro)

Информационный и продающий сайт DronWay. Каталог и страницы моделей, услуг, типов дронов и применений генерируются из данных, поэтому добавить новый борт или услугу можно правкой одного файла в `src/data`.

## Структура
- `src/data` — весь контент: `drones.js` (линейка DW), `types.js` (виды дронов), `services.js` (услуги), `applications.js` (применение), `stages.js` (этапы), `site.js` (меню и подвал)
- `src/layouts/Base.astro` — общий каркас: шапка, меню, подвал, шрифты
- `src/components` — `PageHead.astro` (шапка раздела), `CtaBand.astro` (блок призыва)
- `src/pages` — страницы и динамические маршруты (`catalog/[slug]`, `services/[slug]`, `types/[slug]`, `applications/[slug]`)
- `api/lead.js` — serverless функция Vercel, принимает заявку с формы и шлёт в Telegram
- `public/favicon.svg` — иконка

## Локальный запуск
```
npm install
npm run dev
```
Сборка статики:
```
npm run build      # результат в dist/
```

## Деплой на Vercel
1. Залейте проект в репозиторий GitHub (целиком, вместе с папкой `api`)
2. В Vercel импортируйте репозиторий, фреймворк определится как Astro автоматически, билд `astro build`, выход `dist`
3. Папка `api` подхватится как serverless функции, эндпоинт будет `/api/lead`
4. В настройках проекта Vercel задайте переменные окружения:
   - `TELEGRAM_BOT_TOKEN` — токен бота от @BotFather
   - `TELEGRAM_CHAT_ID` — id чата, куда слать заявки (узнать через getUpdates)
5. Передеплойте и подключите домен dronway.com:
   - apex запись A на `76.76.21.21`
   - `www` CNAME на `cname.vercel-dns-0.com`

## Telegram бот
1. @BotFather, команда `/newbot`, получите токен
2. Напишите боту любое сообщение, откройте `https://api.telegram.org/bot<ТОКЕН>/getUpdates`, возьмите `chat.id`
3. Впишите оба значения в переменные окружения Vercel

## Как добавить новый дрон
Добавьте объект в массив в `src/data/drones.js` (slug, name, frame, payload, flight, klass, tagline, desc, features, tasks, options). Карточка в каталоге и отдельная страница модели создадутся сами.
