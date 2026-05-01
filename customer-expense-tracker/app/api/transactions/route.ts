import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
}

const convex = new ConvexHttpClient(convexUrl);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerId, type, amount, note, date } = body;

    if (!customerId || !type || amount === undefined || !date) {
      return NextResponse.json(
        { error: "Missing required fields (customerId, type, amount, date)" },
        { status: 400 }
      );
    }

    const transactionId = await convex.mutation(api.transactions.addTransaction, {
      customerId: customerId as Id<"customers">,
      type,
      amount,
      note,
      date,
    });

    return NextResponse.json({ success: true, transactionId }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
