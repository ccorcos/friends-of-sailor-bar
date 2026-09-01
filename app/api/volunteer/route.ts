import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim().toLowerCase();
  const interests = form.getAll("interests").map(String).join(", ");
  const message = String(form.get("message") || "").trim();
  if (!name || !email.includes("@")) return NextResponse.json({ error: "Name and valid email required" }, { status: 400 });
  db.prepare("INSERT INTO volunteers (name, email, interests, message) VALUES (?, ?, ?, ?)").run(name, email, interests, message);
  return NextResponse.json({ ok: true });
}
