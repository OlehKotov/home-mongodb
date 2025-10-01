import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
// import { getEnvVar } from './utils/getEnvVar.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://home-mongodb-1.onrender.com'],
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use(router);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

// const PORT = Number(getEnvVar('PORT', '3000'));

// export const startServer = () => {
//   const app = express();

//   app.use(express.json());

//   app.use(
//     cors({
//       origin: ['http://localhost:5173', 'https://home-mongodb-1.onrender.com'],
//       credentials: true,
//     }),
//   );

//   app.use(cookieParser());

//   app.use(
//     pino({
//       transport: {
//         target: 'pino-pretty',
//       },
//     }),
//   );

//   app.use(router);

//   app.use(notFoundHandler);

//   app.use(errorHandler);

//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
  
// };
