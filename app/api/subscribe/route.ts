import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") || "").trim().toLowerCase();
  const firstName = String(form.get("firstName") || "").trim();
  if (!email || !email.includes("@")) return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  db.prepare(`INSERT INTO subscribers (email, first_name) VALUES (?, ?)
    ON CONFLICT(email) DO UPDATE SET first_name = excluded.first_name`).run(email, firstName);
  return NextResponse.json({ ok: true });
}
