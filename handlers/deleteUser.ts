import { Response, RouteParams } from "https://deno.land/x/oak/mod.ts";
import { deleteUser, getUser } from "../services/users.ts";

export default async ({
  params,
  response
}: {
  params: RouteParams;
  response: Response;
}) => {
  const userId = params.id;

  if (!userId) {
    response.status = 400;
    response.body = { msg: "User tidak valid" };
    return;
  }

  const foundUser = await getUser(userId);
  if (!foundUser) {
    response.status = 404;
    response.body = { msg: `User tidak ditemuka ${userId}` };
    return;
  }

  await deleteUser(userId);
  response.body = { msg: "User Dihapus" };
};
