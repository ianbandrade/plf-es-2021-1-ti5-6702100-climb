import axios from "axios";

const AUTH_ME_URL = `auth/me`;

export default async (req: any, res: any) => {
  const response = await axios.get(
    `http://${process.env.NEXT_PUBLIC_API_HOST}/${AUTH_ME_URL}`
  );
  return res.json(response.data);
};
