import { permanentRedirect } from "next/navigation";

export default function ArchivedContactRedirect() {
  permanentRedirect("/contact");
}
