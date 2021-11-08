require('dotenv').config()

const KrisdrupalBot = require('node-telegram-bot-api'); // подключаем node-telegram-bot-api

const token = '1235173343:AAG84nSgfRi5CC0OYDc7zIkmdLO7O1xAcMA'; // тут токен кторый мы получили от botFather

// включаем самого обота
const bot = new KrisdrupalBot(token, {polling: true});

//конфиг клавиатуры
const keyboard = [
    [
      {
        text: 'Покажи картинку!', // текст на кнопке
        callback_data: 'showPic' // данные для обработчика событий
      }
    ],
    [
        {
          text: 'В крым',
          callback_data: 'showText'
        }
    ],
    [
        {
          text: 'Хочу проходить курсы',
          url: 'http://ya.ru' //внешняя ссылка
        }
      ]
  ];

// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
  const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

  // отправляем сообщение
  bot.sendMessage(chatId, 'Привет, покупатель! чего хочешь?', { // прикрутим клаву
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
});

// обработчик событий нажатий на клавиатуру
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    let img = '';

    if (query.data === 'showPic') { // если кот
        img = 'pic1.jpg';
    }

    if (query.data === 'showPic2') { // если пёс
        img = 'pes.png';
    }

    if (img) {
        bot.sendPhoto(chatId, img, { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } else {
        bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
  });


