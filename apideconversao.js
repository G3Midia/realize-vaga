//API DE CONVERSÃO E PIXEL
const https = require('https');

const data = JSON.stringify({
  event_name: 'Lead',
  event_time: Math.floor(new Date() / 1000),
  action_source: 'website',
  event_source_url: 'http://g3midia.github.io/sunflower.html/',
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
  path: `/v11.0/PIXEL_ID/events?access_token=ACESS_TOKEN`, // Substitua 'SEU_PIXEL_ID' e 'SEU_ACCESS_TOKEN'
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