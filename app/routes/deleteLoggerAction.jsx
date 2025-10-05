import { redirect } from "react-router";
import { deleteLogger } from "../../actions.server.js";
export async function action({ context, request }) {
  // const { deleteLogger } = await import("actions.server.js");
  const formData = await request.formData();
  const logger = formData.get("deleteLogger");
  const res = await deleteLogger(
    context.session?.user.email,
    logger.toLowerCase(),
  );
  return redirect("/");
}

export async function loader() {
  throw redirect("/");
}
