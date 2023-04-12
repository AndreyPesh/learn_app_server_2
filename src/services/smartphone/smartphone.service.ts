import { Smartphone } from '../../entities/smartphone/smartphone.entity';
import { SmartphoneData } from '../../types/interfaces';
import { SmartphoneDescriptionData } from '../../types/types';
import AppError from '../../utils/appError';
import { AppDataSource } from '../../utils/database/data-source';
import { getBrandByName } from './smartphoneBrand.service';
import { addImage } from './smartphoneImages.service';

const smartphoneRepository = AppDataSource.getRepository(Smartphone);

export const createSmartphone = async (data: SmartphoneData) => {
  const { model, display, price, brand, images, year, cpu, frequency, memory, nfc } = data;
  const brandName = await getBrandByName(brand);

  if (brandName) {
    const smartphoneData = smartphoneRepository.manager.create(Smartphone, {
      model,
      display,
      price,
      brand: brandName,
      year,
      cpu,
      frequency,
      memory,
      nfc,
    });
    const smartphone = await smartphoneRepository.manager.save(smartphoneData);
    await Promise.all(images.map((name) => addImage({ name, smartphone })));
  } else {
    throw new AppError(500, 'Brand is not specified');
  }
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

export const updateSmartphoneById = async (
  id: string,
  dataSmartphone: SmartphoneDescriptionData
) => {
  const { model, display, price, year, cpu, frequency, memory, nfc } = dataSmartphone;
  return await smartphoneRepository.update(id, {
    model,
    display,
    price,
    year,
    cpu,
    frequency,
    memory,
    nfc,
  });
};

export const deleteSmartphoneByIdList = async (listId: string[]) => {
  return await smartphoneRepository.delete(listId);
};
