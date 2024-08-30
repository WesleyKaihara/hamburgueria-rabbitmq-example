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
    const QUEUE= 'PEDIDOS';
    const MESSAGE = 'Hambúrguer';

    channel.assertQueue(QUEUE, {
      durable: false
    });

    channel.sendToQueue(QUEUE, Buffer.from(MESSAGE));
    console.log(" [x] Pedido Enviado: %s", MESSAGE);
  });

  setTimeout(function() {
    connection.close();
    process.exit(0)
  }, 500);
});
