"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

type Status = "idle" | "loading" | "done" | "error";

async function postForm(path: string, form: HTMLFormElement) {
  try {
    const response = await fetch(path, { method: "POST", body: new FormData(form) });
    return response.ok;
  } catch {
    return false;
  }
}

export function SubscribeForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("loading");
    const succeeded = await postForm("/api/subscribe", form);
    setStatus(succeeded ? "done" : "error");
    if (succeeded) form.reset();
  }

  if (status === "done") {
    return <p className="form-success" role="status"><Check aria-hidden="true" /> Subscription confirmed.</p>;
  }

  return (
    <form className="subscribe-form" onSubmit={submit}>
      <label>First name <span>(optional)</span><input name="firstName" autoComplete="given-name" /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
      <button className="button button-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Submitting…" : "Subscribe"} <ArrowRight aria-hidden="true" />
      </button>
      {status === "error" && <p className="form-error" role="alert">Please check your connection and try again.</p>}
    </form>
  );
}

export function VolunteerForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("loading");
    const succeeded = await postForm("/api/volunteer", form);
    setStatus(succeeded ? "done" : "error");
    if (succeeded) form.reset();
  }

  if (status === "done") {
    return (
      <div className="form-success" role="status">
        <Check aria-hidden="true" />
        <div><strong>Volunteer form submitted.</strong><p>We will contact you about relevant opportunities.</p></div>
      </div>
    );
  }

  return (
    <form className="volunteer-form" onSubmit={submit}>
      <div className="field-row">
        <label>Your name<input name="name" autoComplete="name" required /></label>
        <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
      </div>
      <fieldset>
        <legend>I’m most interested in</legend>
        <div className="check-grid">
          {["Habitat restoration", "Events", "Accessibility", "Native plants", "Community outreach", "Wherever needed"].map((item) => (
            <label key={item}><input type="checkbox" name="interests" value={item} /> <span>{item}</span></label>
          ))}
        </div>
      </fieldset>
      <label>Additional information<textarea name="message" rows={3} /></label>
      <button className="button button-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Submitting…" : "Submit volunteer interest"} <ArrowRight aria-hidden="true" />
      </button>
      {status === "error" && <p className="form-error" role="alert">Please check your connection and try again.</p>}
    </form>
  );
}
