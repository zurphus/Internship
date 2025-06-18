const functions = require('firebase-functions')
const stripe = require('stripe')(functions.config().stripe.secret)

exports.createCheckoutSession = functions.region('us-central1').https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(204).send('')
    return
  }

  if (req.method !== 'POST') {
    res.status(405).send({ error: 'Only POST requests are allowed' })
    return
  }

  const { priceId } = req.body

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: 'https://internship-sooty-one.vercel.app/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://internship-sooty-one.vercel.app/cancel',
    })

    res.status(200).json({ sessionId: session.id })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message })
  }
})
