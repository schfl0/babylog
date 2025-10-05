import { redirect } from "react-router";
import { logFood } from "../../actions.server.js";

export async function action({ context, request }) {
  if (!context?.session?.user) throw redirect("/");

  const formData = await request.formData();
  const food = formData.get("food");
  const g = formData.get("g");

  const date = new Date();
  await logFood(context.session.user.email, food, g, date);
}

export async function loader() {
  return redirect("/");
}
