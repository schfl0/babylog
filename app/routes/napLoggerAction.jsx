import { redirect } from "react-router";
import { logNap } from "../../actions.server.js";

export async function action({ context, request }) {
  // if (!context?.session?.user) throw redirect("/");
const resSession = await fetch("https://babylog.fl0dev.net/api/auth/session", {
    headers: {
      Cookie: request.headers.get("Cookie") ?? "",
    },
    credentials: "include",
  });
  const session = await resSession.json();
  const formData = await request.formData();
  const triggerNap = formData.get("triggerNap");
  console.log("Nap:", triggerNap);

  const res = await logNap(session?.user.email, triggerNap);
  console.log(res);
}

export async function loader() {
  return redirect("/");
}
