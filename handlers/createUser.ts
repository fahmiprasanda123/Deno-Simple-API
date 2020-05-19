import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import { createUser } from "../services/users.ts";

export default async ({
  request,
  response
}: {
  request: Request;
  response: Response;
}) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "user tidak valid" };
    return;
  }

  const {
    value: { name, role }
  } = await request.body();

  // if (!name || !role) {
  //   response.status = 422;
  //   response.body = { msg: "Nama dan role wajib diisi" };
  //   return;
  // }

  const userId = await createUser({ name, role });

  response.body = { msg: "Berhasil", userId };
};
