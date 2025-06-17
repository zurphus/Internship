const functions = require('firebase-functions')
const express = require('express')
const stripe = require('stripe')(functions.config().stripe.secret)

const app = express()
app.use(express.json())

app.post('/createCheckoutSession', async (req, res) => {
  const { priceId } = req.body

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: 'https://internship-sooty-one.vercel.app/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://internship-sooty-one.vercel.app/cancel',
    })

    res.json({ sessionId: session.id })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Export Express app as a Firebase Function
exports.api = functions.https.onRequest(app)
