import { Config } from '../interface/config.interface';
import { getProfileData } from './post.minion';

const config: Config = {
  name: 'server1',
  url: 'http://localhost:5000',
  clientId: '600ee6ec924dd75267384cb4',
  clientSecret: '986727d0-c253-4adb-a9b8-c233a89cdb25',
  redirectUri: 'http://localhost:3000/callback',
  processor: async (profile, next) => {
    next();
  },
  endpoint: {
    auth: 'account/o/login',
    profile: 'account/o/access',
  },
};

const targetUrl = `${config.url}/${config.endpoint.profile}`;

const requestBody = {
  method: 'post',
  body: JSON.stringify({
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    accessToken: 'access_token',
  }),
  headers: { 'Content-Type': 'application/json' },
};

describe('post.minion export', () => {
  it('should not be undefined', () => {
    expect(getProfileData).not.toBeUndefined();
  });

  it('should not be null', () => {
    expect(getProfileData).not.toBeNull();
  });

  it('should be a function', () => {
    expect(typeof getProfileData).toBe('function');
  });

  it('should throw error if access_token is undefined', () => {
    expect(getProfileData).rejects.toThrow('access_token undefined');
  });
});
