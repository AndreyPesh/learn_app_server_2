import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartDevice } from './cart_device.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToMany(() => CartDevice, (cartDevices) => cartDevices.cart)
  @JoinColumn()
  cartDevices: CartDevice[];
}
