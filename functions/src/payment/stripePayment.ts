import { Request, Response } from "express";
import Stripe from "stripe";
import * as functions from "firebase-functions";

const stripe = new Stripe(functions.config().stripe.secret_key, {
  apiVersion: "2022-11-15",
});

const handlePayment = async (req: Request, res: Response) => {
  console.log("handling stripe payment");
  try {
    const { amount, paymentMethodId } = req.body;

    await stripe.paymentIntents.create({
      amount: amount,
      currency: "hkd",
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error });
  }
};

export { handlePayment };
