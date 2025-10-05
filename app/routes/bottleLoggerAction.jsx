import { redirect } from "react-router";
import { logBottle } from "../../actions.server.js";

export async function action({ context, request }) {
  if (!context?.session?.user) throw redirect("/");

  const formData = await request.formData();
  const ml = formData.get("ml");
  const date = new Date();
  await logBottle(context.session.user.email, ml, date);
}

export async function loader() {
  return redirect("/");
}
