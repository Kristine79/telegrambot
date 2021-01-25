require('dotenv').config()

let hours = new Date().getHours;
let minutes = new Date().getMinutes;
hours = hours < 10 ? "0"+hours : hours.toString();
minutes = minutes < 10 ? "0"+minutes : minutes.toString();

  var KrisdrupalBot = require('node-telegram-bot-api');

  var token = '1235173343:AAG84nSgfRi5CC0OYDc7zIkmdLO7O1xAcMA';
  var bot = new KrisdrupalBot(token, {polling: true});

  var notes = [];

  bot.onText(/напомни (.+) в (.+) (.+) РІ (.+)/, function (msg, match) {
    var userId = msg.from.id;
    var text = match[1];
    var time = match[2];

    notes.push( { 'uid':userId, 'time':time, 'text':text } );

    bot.sendMessage(userId, 'Отлично! Я обязательно напомню :)');
  });

  setInterval(function(){
    for (var i = 0; i < notes.length; i++){
      var curDate = new Date().getHours() + ':' + new Date().getMinutes();
        if ( notes[i]['time'] == curDate ) {
          bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас');
          notes.splice(i,1);
        }
      }
  },100);