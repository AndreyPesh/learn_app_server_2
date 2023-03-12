import { Smartphone } from '../../entities/smartphone/smartphone.entity';
import { SmartphoneImage } from '../../entities/smartphone/smartphoneImage.entity';
import { AppDataSource } from '../../utils/database/data-source';

const imagesSmartphoneRepository = AppDataSource.getRepository(SmartphoneImage);

export const addImage = async ({ name, smartphone }: { name: string; smartphone: Smartphone }) => {
  const imageData = imagesSmartphoneRepository.manager.create(SmartphoneImage, {
    name,
    smartphone,
  });
  return await imagesSmartphoneRepository.manager.save(imageData);
};

export const getImagesNameList = async (imageIdList: string[]) => {
  const queryListById = imageIdList.map(async (id) => {
    const images = await imagesSmartphoneRepository.find({
      relations: { smartphone: true },
      where: { smartphone: { id } },
    });
    return images.map(({ name }) => name);
  });
  const imageNameList = await Promise.all(queryListById);
  return imageNameList.flat();
};
