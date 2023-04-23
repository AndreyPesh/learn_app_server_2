import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import adminRouter from './routes/admin/adminRoutes';
import phonesRouter from './routes/phonesRouter';
import smartphoneRouter from './routes/smartphoneRoutes';
import cartRouter from './routes/cartRoutes';
import smartphoneAdminRouter from './routes/admin/adminSmartphoneRoutes';
import validateEnv from './utils/validateEnv';
import config from 'config';
import { connectRedis } from './utils/connectRedis';
import { connectDB } from './utils/database/connectDB';
import { createApp } from './utils/configureApp';
import { unhandledRouteHandler } from './controllers/unhandled.controller';
import { globalErrorHandler } from './controllers/global.controller';
import { redisHandler } from './controllers/redis.controller';
import { Config } from './types/enums';

const startServer = async () => {
  try {
    const isConnect = await connectDB();
    if (isConnect) {
      validateEnv();
      connectRedis();
      const app = createApp();

      // ROUTES
      app.use('/api/auth', authRouter);
      app.use('/api/users', userRouter);
      app.use('/api/admin', adminRouter);
      app.use('/api/products', phonesRouter);
      app.use('/api/smartphones', smartphoneRouter);
      app.use('/api/smartphones', smartphoneAdminRouter);
      app.use('/api/cart', cartRouter);
      app.get('/api/healthchecker', redisHandler);

      // UNHANDLED ROUTE
      app.all('*', unhandledRouteHandler);

      // GLOBAL ERROR HANDLER
      app.use(globalErrorHandler);

      const port = config.get<number>(Config.port);
      app.listen(port, () => {
        console.log(
          `Server has started on port ${port}. Open http://localhost:${port} to see results`
        );
      });
    } else {
      throw new Error('Can\t start server');
    }
  } catch (error) {
    console.log(error);
  }
};

startServer();
