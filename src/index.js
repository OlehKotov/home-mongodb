import { initMongoDB } from './db/initMongoDB.js';
// import { startServer } from './server.js';
import app from './server.js';

let isDbConnected = false;

export default async function handler(req, res) {
  if (!isDbConnected) {
    await initMongoDB();
    isDbConnected = true;
  }
  return app(req, res);
}

// const bootstrap = async () => {
//   await initMongoDB();
//   startServer();
// };

// bootstrap();