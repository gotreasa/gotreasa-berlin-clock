import app from './src/api/app.js';

const port = process.env.SERVER_PORT;

const server = app.listen(port, () => {
  console.log(
    `🚀 Template NodeJS app listening at http://localhost:${
      server.address().port
    } built at 'REPLACE_ME'`,
  );
});

export default server;
