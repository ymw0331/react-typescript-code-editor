import express from 'express';

export const serve = (port: number, filename: string, dir: string) => {
  const app = express();

  app.listen(port, () => {console.log('Listening to port', port)]);
};
