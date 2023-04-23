import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Model from '../model.entity';
import { SmartphoneBrand } from './smartphoneBrands.entity';
import { SmartphoneImage } from './smartphoneImage.entity';
import { Cart } from '../cart/cart.entity';

@Entity('smartphone')
export class Smartphone extends Model {
  @Column()
  model: string;

  @Column()
  display!: string;

  @Column()
  price!: number;

  @Column()
  year!: number;

  @Column()
  cpu!: string;

  @Column()
  frequency!: number;

  @Column()
  memory!: number;

  @Column({ type: 'boolean', default: false })
  nfc!: boolean;

  @ManyToOne(() => Cart, (product) => product.id)
  @JoinColumn()
  cart: Cart;

  @ManyToOne(() => SmartphoneBrand)
  @JoinColumn()
  brand: SmartphoneBrand;

  @OneToMany(() => SmartphoneImage, (image) => image.smartphone, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  images: SmartphoneImage[];
}
