import { SmartphoneBrand } from '../../entities/smartphone/smartphoneBrands.entity';
import { AppDataSource } from '../../utils/database/data-source';

const brandRepository = AppDataSource.getRepository(SmartphoneBrand);

export const createBrand = async (brand: { brand: string }) => {
  const brandData = brandRepository.manager.create(SmartphoneBrand, brand);
  return await brandRepository.manager.save(brandData);
};

export const getBrandByName = async (brand: string) => {
  const brandData = await brandRepository.findOneBy({ brand });
  return brandData;
};

export const getBrands = async () => {
  return await brandRepository.find();
}