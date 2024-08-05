import Stripe from "stripe";

export const stripe = new Stripe(process.env.Publishable_key!, {
  apiVersion: "2024-06-20",
  typescript: true,
});
