// Vercel serverless function: принимает заявку с формы и шлёт её в Telegram.
// Токен и chat id берутся из переменных окружения, в коде их нет.
// Путь файла в репозитории: api/lead.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string'
      ? JSON.parse(req.body || '{}')
      : (req.body || {});

    const name = (body.name || '').toString().slice(0, 200);
    const company = (body.company || '').toString().slice(0, 200);
    const contact = (body.contact || '').toString().slice(0, 200);
    const task = (body.task || '').toString().slice(0, 2000);
    const website = (body.website || '').toString();

    // honeypot: настоящие люди это поле не видят, его заполняют боты
    if (website) {
      return res.status(200).json({ ok: true });
    }

    if (!name && !contact && !company && !task) {
      return res.status(400).json({ ok: false, error: 'Пустая форма' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return res.status(500).json({ ok: false, error: 'Не заданы TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID' });
    }

    const text =
      'Новая заявка с сайта DronWay\n\n' +
      'Имя: ' + (name || '-') + '\n' +
      'Компания: ' + (company || '-') + '\n' +
      'Контакт: ' + (contact || '-') + '\n' +
      'Задача: ' + (task || '-');

    const tg = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        disable_web_page_preview: true
      })
    });

    if (!tg.ok) {
      const detail = await tg.text();
      return res.status(502).json({ ok: false, error: 'Telegram error', detail: detail });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
}
