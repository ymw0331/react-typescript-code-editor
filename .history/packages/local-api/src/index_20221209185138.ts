import express from 'express';

export const serve = (port: number, filename: string, dir: string) => {
  const app = express();

  // async await syntax
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });

  // app.listen(port, () => {
  //   console.log('Listening to port', port);
  // });


  

};
