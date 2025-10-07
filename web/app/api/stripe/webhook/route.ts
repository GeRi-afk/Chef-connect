// Node runtime (Stripe lib isn’t supported on the edge)
export const runtime = 'nodejs';

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20', // or your current pinned version
});

export async function POST(req: Request) {
  const body = await req.text();                 // RAW body
  const sig = (await headers()).get('stripe-signature')!;
  const secret = process.env.STRIPE_WEBHOOK_SECRET!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
      case 'payment_intent.succeeded': {
        // TODO: mark job as paid in Firestore; create review eligibility, etc.
        break;
      }
      case 'account.updated': {
        // TODO: update chef’s Connect onboarding status
        break;
      }
      case 'payout.paid': {
        // TODO: record payout status for chef
        break;
      }
      // add other events as needed
      default:
        break;
    }
    return NextResponse.json({ received: true });
  } catch (e: any) {
    // IMPORTANT: fail gracefully so Stripe can retry
    return new NextResponse(`Handler Error: ${e.message}`, { status: 200 });
  }
}
