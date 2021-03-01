const express = require('express');
const fs = require('fs');
const moment = require('moment');
const app = express();

/**
 * Активируем мидлвары
 */
app.use(express.json()); // Даем знать приложению, что работаем с json'ом
app.use('/', express.static('./../public')); // запросы в корень нашего сайт отдают содержимое public

/**
 * API Каталога
 */
app.get('/api/products', (req, res) => {
  fs.readFile('./db/products.json', 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

/**
 * API Корзины
 */
app.get('/api/cart', (req, res) => {
  fs.readFile('./db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

const getDate = () => {
  return moment(new Date()).format('DD-MM-YYYY, HH:mm:ss');
};

const writeLog = (txt) => {
  fs.readFile('./db/stats.txt', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      fs.writeFile('./db/stats.txt', data + txt, (err) => {})
    }
  });
};

// Добавление нового товара в корзине
app.post('/api/cart', (req, res) => {

  let message = '';

  fs.readFile('./db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      // добавляем новый товар
      cart.contents.push(req.body);
      message += `${getDate()} (Москва) Товар "${req.body.product_name}" добавлен в корзину.\n`;
      // пишем обратно
      fs.writeFile('./db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          writeLog(message);
          res.send('{"result": 1}');
        }
      })
    }
  });
});

// Удаление товара из корзины
app.delete('/api/cart/:id', (req, res) => {

  let message = '';

  fs.readFile('./db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      const cart = JSON.parse(data);

      const find = cart.contents.find(el => el.id_product === +req.params.id);
      message += `${getDate()} (Москва) Товар "${find.product_name}" удален из корзины.\n`;
      cart.contents.forEach(function(el, index) {
        if (find.id_product === el.id_product) cart.contents.splice(index, 1);
      });

      fs.writeFile('./db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          writeLog(message);
          res.send('{"result": 1}');
        }
      })
    }
  });
});

// Изменяем количество товара
app.put('/api/cart/:id', (req, res) => {

  let message = '';

  fs.readFile('./db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      // ищем товар по id
      const find = cart.contents.find(el => el.id_product === +req.params.id);
      // изменяем количество
      find.quantity += req.body.quantity;

      if (+req.body.quantity === 1) {
        message += `${getDate()} (Москва) Товар "${find.product_name}" добавлен в корзину.\n`;
      } else {
        message += `${getDate()} (Москва) Товар "${find.product_name}" удален из корзины.\n`;
      }
      // пишем обратно
      fs.writeFile('./db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          writeLog(message);
          res.send('{"result": 1}');
        }
      })
    }
  });
});

/**
 * Запуск сервера
 * @type {string|number}
 */
// const port = process.env.PORT || 3000;
const port = 8080; // чтобы не смущало process.env.PORT (если не стартует на 3000, то меняем на другой 8080 или 8888)
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});
