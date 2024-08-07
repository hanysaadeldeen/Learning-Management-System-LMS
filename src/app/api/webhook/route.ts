import Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (e) {
    console.log("Error constructing webhook event:", e);
    return new NextResponse("Error", {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      return new NextResponse("Error", {
        status: 400,
      });
    }

    await db.purchase.create({
      data: {
        courseId,
        userId,
      },
    });
  } else {
    console.log("Unhandled event type:", event.type);
    return new NextResponse(`"Unhandled event type",${event.type}`, {
      status: 200,
    });
  }
  return new NextResponse(null, { status: 200 });
}
