import * as express from 'express';

import Auth from '../src/app';

const app = express();

/** defining auth middleware */
const uniAuth = new Auth([
  {
    name: 'server1',
    url: 'http://localhost:5000',
    clientId: '600ee6ec924dd75267384cb4',
    clientSecret: '986727d0-c253-4adb-a9b8-c233a89cdb25',
    redirectUri: 'http://localhost:3000/callback',
    processor: async (profile, next) => {
      console.log('>>>>>', profile);
      next();
    },
    endpoint: {
      auth: 'account/o/login',
      profile: 'account/o/access',
    },
  },
]);

app.get('/', (req, res) => {
  res.json({ alive: true });
});

app.get('/login', uniAuth.authenticate('server1'));
app.get('/callback', uniAuth.callback('server1'), (req, res) => {
  res.json({ message: 'logged in' });
});

app.listen(3000, () => console.log('listening on port 3000'));
