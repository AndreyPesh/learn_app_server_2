import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import Model from '../model.entity';
import { Cart } from './cart.entity';
import { Smartphone } from '../smartphone/smartphone.entity';

@Entity('cart_device')
export class CartDevice extends Model {
  @ManyToOne(() => Cart, (cart) => cart.id)
  cart: Cart;

  @OneToOne(() => Smartphone, (smartphone) => smartphone.id, { eager: true })
  @JoinColumn()
  device_id: Smartphone;
}
