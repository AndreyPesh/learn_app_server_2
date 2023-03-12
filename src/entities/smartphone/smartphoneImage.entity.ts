import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from '../model.entity';
import { Smartphone } from './smartphone.entity';

@Entity('smartphoneImages')
export class SmartphoneImage extends Model {
  @Column()
  name: string;

  @ManyToOne(() => Smartphone, (smartphone) => smartphone.images, {
    onDelete: 'CASCADE'
  })
  smartphone: Smartphone;
}
