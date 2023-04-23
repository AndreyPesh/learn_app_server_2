import { Smartphone } from '../../entities/smartphone/smartphone.entity';
import { SmartphoneData } from '../../types/interfaces';
import { SmartphoneDescriptionData } from '../../types/types';
import AppError from '../../utils/appError';
import { AppDataSource } from '../../utils/database/data-source';
import { getBrandByName } from './smartphoneBrand.service';
import { addImage, removeImages } from './smartphoneImages.service';

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

export const getSmartphoneList = async (page: number, limit: number) => {
  const pageFromZero = page - 1;
  const numberRecords = await smartphoneRepository.count();
  const smartphoneList = await smartphoneRepository.find({
    relations: { images: true, brand: true },
    take: limit,
    skip: pageFromZero * limit,
  });
  return { numberRecords, smartphoneList };
};

export const getSmartphone = async (id: string) => {
  return await smartphoneRepository.findOne({
    relations: { images: true, brand: true },
    where: { id },
  });
};

export const updateSmartphoneById = async (
  id: string,
  dataSmartphone: SmartphoneDescriptionData,
  listImages: string[]
) => {
  try {
    const currentData = await getSmartphone(id);
    await removeImages(currentData.images);
    const { model, display, price, year, cpu, frequency, memory, nfc, brand } = dataSmartphone;
    const newBrand = await getBrandByName(brand);
    if (!newBrand) {
      throw new AppError(500, 'Brand is not specified');
    }
    Object.assign(
      currentData,
      { model, display, price, year, cpu, frequency, memory, nfc },
      { brand: newBrand },
      { images: [] }
    );

    const smartphone = await smartphoneRepository.save(currentData);
    await Promise.all(listImages.map((name) => addImage({ name, smartphone })));
  } catch (err: unknown) {
    throw new AppError(500, String(err));
  }
};

export const deleteSmartphoneByIdList = async (listId: string[]) => {
  return await smartphoneRepository.delete(listId);
};
