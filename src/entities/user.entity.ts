import { BeforeInsert, Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import bcrypt from 'bcryptjs';
import Model from './model.entity';
import { DEFAULT_NAME_PHOTO } from '../types/constants';
import { Cart } from './cart/cart.entity';

export enum TypeRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User extends Model {
  @Column()
  name!: string;

  @Index('email_index')
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: TypeRole,
    default: TypeRole.USER,
  })
  role!: TypeRole.USER;

  @Column({
    default: DEFAULT_NAME_PHOTO,
  })
  photo!: string;

  @Column({
    default: false,
  })
  verified!: boolean;

  @OneToOne(() => Cart, (cart) => cart.id, { cascade: true })
  @JoinColumn()
  cart: Cart;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  // ? Validate password
  static async comparePasswords(candidatePassword: string, hashedPassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }
}
