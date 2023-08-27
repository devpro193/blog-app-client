// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { serialize } from "cookie";

export default async function handler(req, res) {
  res.setHeader("Set-Cookie", [
    serialize("parallelVortex", "", {
      maxAge: -1,
      path: "/",
    }),
    serialize("parallel", "", {
      maxAge: -1,
      path: "/",
    }),
    serialize("data", "", {
      maxAge: -1,
      path: "/",
    }),
  ]);

  // console.log('Hello');
  // res.writeHead(302, { Location: "/api/login" });
  res.end();
}
