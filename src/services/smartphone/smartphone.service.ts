import { Smartphone } from '../../entities/smartphone/smartphone.entity';
import { SmartphoneData } from '../../types/interfaces';
import { AppDataSource } from '../../utils/database/data-source';
import { getBrandByName } from './smartphoneBrand.service';
import { addImage } from './smartphoneImages.service';

const smartphoneRepository = AppDataSource.getRepository(Smartphone);

export const createSmartphone = async (data: SmartphoneData) => {
  const { model, display, price, brand, images, year, cpu, frequency, memory, nfc } = data;
  const brandName = await getBrandByName(brand);

  const smartphoneData = smartphoneRepository.manager.create(Smartphone, {
    model,
    display,
    price,
    brand: brandName,
    year,
    cpu,
    frequency,
    memory,
    nfc
  });
  const smartphone = await smartphoneRepository.manager.save(smartphoneData);
  await Promise.all(images.map((name) => addImage({ name, smartphone })));
};

export const getSmartphoneList = async () => {
  return await smartphoneRepository.find({ relations: { images: true, brand: true } });
};

export const getSmartphone = async (id: string) => {
  return await smartphoneRepository.findOne({
    relations: { images: true, brand: true },
    where: { id },
  });
};

export const deleteSmartphoneByIdList = async (listId: string[]) => {
  return await smartphoneRepository.delete(listId);
};
