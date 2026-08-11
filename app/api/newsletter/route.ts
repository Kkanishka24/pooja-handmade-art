import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const supabase = createSupabaseAdminClient();

    const { error } = await supabase
      .from("newsletter_subscriptions")
      .insert({ email: email.toLowerCase().trim(), name: name || null });

    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation — already subscribed
        return NextResponse.json({ success: true, already: true });
      }
      console.error("Newsletter insert error:", error);
      return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, already: false });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
