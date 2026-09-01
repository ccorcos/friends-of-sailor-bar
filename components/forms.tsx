"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function SubscribeForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/subscribe", { method: "POST", body: form });
    setStatus(response.ok ? "done" : "error");
    if (response.ok) event.currentTarget.reset();
  }
  if (status === "done") return <p className="form-success"><Check size={18} /> You’re on the list. Welcome!</p>;
  return (
    <form className={compact ? "subscribe-form compact" : "subscribe-form"} onSubmit={submit}>
      {!compact && <input name="firstName" aria-label="First name" placeholder="First name" />}
      <input name="email" type="email" required aria-label="Email address" placeholder="Email address" />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Joining…" : "Keep me posted"} <ArrowRight size={17} />
      </button>
      {status === "error" && <span className="form-error">Please try again.</span>}
    </form>
  );
}

export function VolunteerForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/volunteer", { method: "POST", body: form });
    setStatus(response.ok ? "done" : "error");
    if (response.ok) event.currentTarget.reset();
  }
  if (status === "done") return <div className="volunteer-thanks"><Check size={22} /><div><strong>Thank you for raising your hand.</strong><p>We’ll be in touch about ways to help.</p></div></div>;
  return (
    <form className="volunteer-form" onSubmit={submit}>
      <div className="field-row">
        <label>Your name<input name="name" required /></label>
        <label>Email address<input name="email" type="email" required /></label>
      </div>
      <fieldset>
        <legend>I’m most interested in</legend>
        <div className="check-grid">
          {[
            "Habitat restoration", "Events", "Accessibility", "Native plants", "Community outreach", "Wherever needed"
          ].map((item) => <label key={item}><input type="checkbox" name="interests" value={item} /> <span>{item}</span></label>)}
        </div>
      </fieldset>
      <label>Anything else you’d like us to know?<textarea name="message" rows={3} /></label>
      <button className="button button-light" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Offer to volunteer"} <ArrowRight size={18} />
      </button>
      {status === "error" && <span className="form-error">Something went wrong. Please try again.</span>}
    </form>
  );
}
