import { AppDataSource } from './data-source';

export const connectDB = async () => {
  try {
    const dataSource = await AppDataSource.initialize();
    return dataSource.isInitialized;
  } catch (error) {
    console.log('Can\'t connect to database');
    console.error(error);
  }
};
