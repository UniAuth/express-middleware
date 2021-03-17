import * as express from 'express';

import Auth from '../src/app';

const app = express();

/** defining auth middleware */
const uniAuth = new Auth([
  {
    name: 'server1',
    url: 'http://localhost:5000',
    clientId: '605090ca1382586777ea76ff',
    clientSecret: '000e59da-69e4-4859-8301-bb786a547fd1',
    redirectUri: 'http://localhost:3000/callback',
    processor: async (profile, next) => {
      console.log('>>>>>', profile);
      next();
    },
    endpoint: {
      auth: 'account/o/login',
      profile: 'account/o/access',
    },
    jwtConfig: {
      jwtSecret: 'superSecretToken',
      jwtExpire: '1d',
    },
  },
]);

app.use(uniAuth.session('server1'));

app.get('/login', uniAuth.authenticate('server1'));
app.get('/callback', uniAuth.callback('server1'), (req, res) => {
  res.json({ message: 'logged in' });
});
app.get('/auth', (req, res) => {
  console.log(req.cookies, 'cookies');
  res.json({ message: 'authenticated' });
});

app.listen(3000, () => console.log('listening on port 3000'));
