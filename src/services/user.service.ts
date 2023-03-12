import { User } from '../entities/user.entity';
import { CreateUserInput, UpdateUserInput } from '../schemas/user.schema';
import { AppDataSource } from '../utils/database/data-source';

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: CreateUserInput) => {
  return (await AppDataSource.manager.save(AppDataSource.manager.create(User, input))) as User;
};

export const findUserByEmail = async ({ email }: { email: string }) => {
  return await userRepository.findOneBy({ email });
};

export const findUserById = async (userId: string) => {
  return await userRepository.findOneBy({ id: userId });
};

export const findUser = async (query: Object) => {
  return await userRepository.findOneBy(query);
};

export const updateUserById = async (userId: string, data: UpdateUserInput) => {
  return await userRepository.update(userId, data);
};

export const updateUserPhotoById = async (userId: string, namePhoto: string) => {
  return await userRepository.update(userId, { photo: namePhoto });
};

export const getAllUser = async () => {
  return await userRepository.find();
};
