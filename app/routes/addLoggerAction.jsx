import { redirect } from "react-router";
import { addLogger } from "../../actions.server.js";
export async function action({ context, request }) {
  // const { addLogger } = await import("actions.server.js");
  const formData = await request.formData();
  const logger = formData.get("addLogger");
  const res = await addLogger(
    context.session?.user.email,
    logger.toLowerCase(),
  );
  return redirect("/");
}

export async function loader() {
  throw redirect("/");
}
