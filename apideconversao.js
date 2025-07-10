//API DE CONVERSÃO E PIXEL
const https = require('https');

const data = JSON.stringify({
  event_name: 'Lead',
  event_time: Math.floor(new Date() / 1000),
  action_source: 'website',
  event_source_url: 'http://g3midia.github.io/realize-vaga/',
  user_data: {
    em: 'HASHED_EMAIL', // Email do usuário com hash SHA-256
    ph: 'HASHED_PHONE'  // Telefone do usuário com hash SHA-256
  },
  custom_data: {
    currency: 'USD',
    value: 0.00
  }
});

const options = {
  hostname: 'graph.facebook.com',
  path: `/v11.0/1416162726361479/events?access_token=EAAMHvwm4ftwBPG022aB55fgGbND7ptZC87Hv1NeZAPCIlm2a7R0NlNQUAW6jW3WBeTxxz08dYfOkRWULZBG7aZBCueGPJpMmsHsdAOamd7t9PNVXgF1ZCluUohkUjlDizaZBXoDZBgrW72a6cnFFNHnMM34IOppTpM0SXs3RQ0ZAgmffZBhFx5vKMxxL9phtrmFpyrAZDZD`, // Substitua 'SEU_PIXEL_ID' e 'SEU_ACCESS_TOKEN'
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, res => {
  let data = '';

  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(JSON.parse(data));
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
