import { Cart } from '../entities/cart/cart.entity';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../utils/database/data-source';

// const cartRepository = AppDataSource.getRepository(Cart);

// export const createCart = async (user: User) => {
//   // const cart = await cartRepository.save(cartRepository.manager.create(Cart, {user}));
//   // return cart;
// }

// export const getCartByUserId = async (userId: string) => {
//   // const cart = await cartRepository.find({ where: { user: { id: userId } } });
//   // return cart;
// };
