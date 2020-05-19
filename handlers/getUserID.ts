import { Response, RouteParams } from "https://deno.land/x/oak/mod.ts";
import { getUser } from "../services/users.ts";

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
    response.body = { msg: "User Id Tidak Ditemukan" };
    return;
  }

  const foundUser = await getUser(userId);
  if (!foundUser) {
    response.status = 404;
    response.body = { msg: `user ID ${userId} Tidak Ditemukan` };
    return;
  }

  response.body = foundUser;
};
