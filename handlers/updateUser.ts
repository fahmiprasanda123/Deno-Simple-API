import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import { updateUser } from "../services/users.ts";

export default async ({
  params,
  request,
  response
}: {
  params: any;
  request: Request;
  response: Response;
}) => {
  const userId = params.id;

  if (!userId) {
    response.status = 400;
    response.body = { msg: "id user tidak valid" };
    return;
  }

  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "user data tidak valid" };
    return;
  }

  const {
    value: { name, role }
  } = await request.body();

  await updateUser(userId, { name, role});

  response.body = { msg: "Memperbaharui user" };
};
