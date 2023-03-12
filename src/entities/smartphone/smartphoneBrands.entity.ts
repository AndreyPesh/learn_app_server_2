import { Column, Entity } from 'typeorm';
import Model from '../model.entity';

@Entity('smartphoneBrand')
export class SmartphoneBrand extends Model {
  @Column()
  brand: string;
}
