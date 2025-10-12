// web/app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Ensure Node.js runtime (Stripe needs Node crypto, not Edge)
export const runtime = "nodejs";
// Avoid static optimization for webhooks
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Let the app build/deploy even if Stripe isn't configured yet
  if (!stripeSecret || !webhookSecret) {
    return new Response("Stripe not configured", { status: 200 });
  }

  // Construct the client at request time (not at module load)
  const stripe = new Stripe(stripeSecret);

  // Stripe sends a raw-body signature we must verify
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const payload = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown verification error";
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${msg}` },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        // TODO: fulfill order / activate subscription using `session`
        break;
      }
      case "invoice.payment_succeeded": {
        // TODO: handle successful invoice payments
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.created":
      case "customer.subscription.deleted": {
        // TODO: handle subscription lifecycle
        break;
      }
      default: {
        // Unhandled event types are OK
        break;
      }
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown handler error";
    return NextResponse.json({ error: `Webhook handler error: ${msg}` }, { status: 500 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
