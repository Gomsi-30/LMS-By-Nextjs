// pages/api/create-checkout-session.js
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { courseId, courseTitle, coursePrice } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: courseTitle,
            },
            unit_amount: coursePrice * 100, // Stripe amount is in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
