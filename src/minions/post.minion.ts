import { Config } from '../interface/config.interface';
import fetch from 'node-fetch';

export const getProfileData = async (config: Config, accessToken: string) => {
  if (accessToken === undefined) {
    throw new Error('access_token undefined');
  }

  const response = await fetch(`${config.url}/${config.endpoint.profile}`, {
    method: 'post',
    body: JSON.stringify({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      accessToken,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = response.json();
  return data;
};
