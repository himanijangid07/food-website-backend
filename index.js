const express = require('express')
const app = express()
const port = process.env.PORT || 6003
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()
const jwt = require('jsonwebtoken');
const stripe = require("stripe")(process.env.STRIPE_SECRETkEY);

app.use(express.json())
app.use(cors())

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@foody-cluster.t4uci.mongodb.net/foody-cluster?retryWrites=true&w=majority&appName=Foody-cluster`).then(
    console.log("MongodDb Connected Successfully!")
).catch((error) => console.log("Error", error))

app.post('/jwt', async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1hr'
  })
  res.send({token}) 
})

const productRoutes = require('./api/routes/productRoute')
const cartRoutes = require('./api/routes/cartRoutes')
const userRoutes = require('./api/routes/userRoutes')
const paymentRoutes = require('./api/routes/paymentRoutes')
const contactRoutes = require('./api/routes/contactRoutes');
const adminStats = require('./api/routes/adminStats')
const orderStats = require('./api/routes/orderStats')

app.use('/product', productRoutes);
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);
app.use('/payments', paymentRoutes);
app.use('/contact', contactRoutes);
app.use('/adminStats', adminStats);
app.use("/orderStats", orderStats);

app.post("/create-payment-intent", async (req, res) => {
  const { price  } = req.body;
  const amount = price*100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount ,
    currency: "usd",
    payment_method_types: ["card"]
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})