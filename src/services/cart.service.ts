import { Cart } from '../entities/cart/cart.entity';
import { CartDevice } from '../entities/cart/cart_device.entity';
import { AppDataSource } from '../utils/database/data-source';

const cartRepository = AppDataSource.getRepository(Cart);

export const getCartByUserId = async (cartId: string) => {
  const cart = await cartRepository.find({ where: { id: cartId } });
  return cart;
};
