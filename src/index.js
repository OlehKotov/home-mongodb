import { initMongoDB } from './db/initMongoDB.js';
import app from './server.js';

let isDbConnected = false;

export default async function handler(req, res) {
  try {
    if (!isDbConnected) {
      await initMongoDB();
      isDbConnected = true;
    }
    app.handle(req, res);
  } catch (err) {
    console.error('Serverless crash:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// import { initMongoDB } from './db/initMongoDB.js';
// import { startServer } from './server.js';

// const bootstrap = async () => {
//   await initMongoDB();
//   startServer();
// };

// bootstrap();

