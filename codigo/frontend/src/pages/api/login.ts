import axios from "axios";

const AUTHURL = `auth/signin`;

export default async (req: any, res: any) => {
  const response = await axios.post(
    `http://${process.env.NEXT_PUBLIC_API_HOST}/${AUTHURL}`,
    req.body
  );
  res.setHeader("Set-Cookie", response.headers["set-cookie"]);
  res.statusCode = 200;
  return res.json({ success: true, token: response.data.token });
};
