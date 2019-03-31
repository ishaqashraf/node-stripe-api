const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const stripe = require('stripe')('YOUR_SECRET_KEY');

app.get('/',(req,res) => {
    res.send('Hello Sripe Payment')
})

app.post('/api/doPayment/', (req, res) => {
    console.log("token",req.body)
  return stripe.charges
    .create({
      amount: 10000, // Unit: cents
      currency: 'usd',
      source: req.body.tokenId,
      description: 'Test payment',
    })
    .then(result => res.status(200).json(result));
});

app.listen(5000);
