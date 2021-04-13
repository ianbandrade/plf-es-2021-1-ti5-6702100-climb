import cookies from 'cookie';
import apiClient from '../../shared/api/api-client';

const AUTHURL = `/auth/signin`;

export default async (req, res) => {
  await apiClient.post(AUTHURL, req.body);
  res.setHeader("Set-Cookie", cookies.serialize("authToken", req.body.token, {httpOnly: true}))
  res.statusCode = 200;
  return res.json({success: true});
}