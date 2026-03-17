import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error(`Webhook signature verification failed:`, err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        await handleSuccessfulPayment(paymentIntent)
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object
        await handleFailedPayment(failedPayment)
        break

      case 'checkout.session.completed':
        const session = event.data.object
        await handleCheckoutComplete(session)
        break

      case 'invoice.paid':
        const invoice = event.data.object
        await handleInvoicePaid(invoice)
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object
        await handleInvoiceFailed(failedInvoice)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handleSuccessfulPayment(paymentIntent: Stripe.PaymentIntent) {
  // Update booking status in database
  const { bookingId } = paymentIntent.metadata
  
  // TODO: Update booking status to paid
  console.log(`Payment succeeded for booking: ${bookingId}`)
}

async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
  const { bookingId } = paymentIntent.metadata
  
  // TODO: Update booking status to payment_failed
  console.log(`Payment failed for booking: ${bookingId}`)
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  // Handle successful checkout
  console.log(`Checkout completed: ${session.id}`)
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  // Handle invoice paid
  console.log(`Invoice paid: ${invoice.id}`)
}

async function handleInvoiceFailed(invoice: Stripe.Invoice) {
  // Handle invoice payment failed
  console.log(`Invoice payment failed: ${invoice.id}`)
}