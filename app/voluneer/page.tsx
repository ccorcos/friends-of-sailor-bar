import { redirect } from "next/navigation";

export default function MisspelledVolunteerRoute() {
  redirect("/volunteer");
}
