# Express Middleware

![Ensure Build and Test](https://github.com/UniAuth/express-middleware/workflows/Ensure%20Build%20and%20Test/badge.svg)

This middleware is used to quickly integrate UniAuth based applications into express applications. Below are all the configuration options that the package provides.

## Usage

```js
const uniAuth = new Auth([
  {
    name: 'server1',
    url: 'http://localhost:5000',
    clientId: '600ee6ec924dd75267384cb4',
    clientSecret: '986727d0-c253-4adb-a9b8-c233a89cdb25',
    redirectUri: 'http://localhost:3000/callback',
    processor: (profile, next) => {
      console.log('>>>>>', profile);
      next();
    },
    endpoint: {
      auth: 'account/o/login',
      profile: 'account/o/access',
    },
  },
]);

app.get('/login', uniAuth.authenticate('server1'));
app.get('/callback', uniAuth.callback('server1'), (req, res) => {
  res.json({ message: 'logged in' });
});
```

## FAQ
- This repo has a directory named `sample` which contains an express application with auth implemented.
- The server is based on [uniauth-backend](https://github.com/UniAuth/uniauth-backend) and can be configured as per needs.
- Need similar implementation in other languages? Open an issue and let us know.