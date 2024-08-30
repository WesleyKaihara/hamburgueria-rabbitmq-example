const amqp = require('amqplib/callback_api');

const hostname = 'localhost';
const port = 5672;
const username = 'rabbitmq';
const password = 'rabbitmq';

const url = `amqp://${username}:${password}@${hostname}:${port}`

amqp.connect(url, function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    const QUEUE = 'PEDIDOS';

    channel.assertQueue(QUEUE, {
      durable: false
    });

    console.log(" [*] AGUARDANDO: FILA DE %s.", QUEUE);
    channel.consume(QUEUE, function (msg) {
      setTimeout(() => {
        console.log(" [x] PROCESSOU %s", msg.content.toString());
      }, 3000);

    }, {
      noAck: true
    });
  });

});