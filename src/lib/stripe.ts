import Stripe from "stripe";

export const stripe = new Stripe(process.env.Secret_key!, {
  apiVersion: "2024-06-20",
  typescript: true,
});
