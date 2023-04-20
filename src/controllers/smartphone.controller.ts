import { NextFunction, Request, Response } from 'express';
import {
  createSmartphone,
  deleteSmartphoneByIdList,
  getSmartphone,
  getSmartphoneList,
  updateSmartphoneById,
} from '../services/smartphone/smartphone.service';
import { createBrand, getBrands } from '../services/smartphone/smartphoneBrand.service';
import { getImagesNameList } from '../services/smartphone/smartphoneImages.service';
import { STATUS } from '../types/constants';
import { ReqSmartphoneListParameters, RequestImageData } from '../types/interfaces';
import { SmartphoneDescriptionData } from '../types/types';
import { deleteImagesFromStore } from '../utils/filesystem/deleteImages';
import AppError from '../utils/appError';

export const addSmartphone = async (
  req: Request<{}, {}, SmartphoneDescriptionData>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const listImages: string[] = (req.files as Array<RequestImageData>).map(
      (imageData) => imageData.filename
    );

    await createSmartphone({ ...body, images: listImages });
    return res.status(STATUS.CREATED).send();
  } catch (err) {
    next(err);
  }
};

export const getSmartphones = async (
  req: Request<{}, {}, ReqSmartphoneListParameters>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit } = req.query;
    if (page && limit && typeof page === 'string' && typeof limit === 'string') {
      const smartphoneList = await getSmartphoneList(Number(page), Number(limit));
      return res.status(STATUS.OK).send(smartphoneList);
    }
    throw new AppError(STATUS.BAD_REQUEST, 'Bad request');
  } catch (error) {
    next(error);
  }
};

export const updateSmartphone = async (
  req: Request<{ id: string }, {}, SmartphoneDescriptionData>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const listImages: string[] = (req.files as Array<RequestImageData>).map(
      (imageData) => imageData.filename
    );

    const smartphone = await updateSmartphoneById(id, body, listImages);
    return res.status(STATUS.OK).send(smartphone);
  } catch (error) {
    next(error);
  }
};

export const getSmartphoneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const smartphone = await getSmartphone(id);
    return res.status(STATUS.OK).send(smartphone);
  } catch (error) {
    next(error);
  }
};

export const deleteSmartphones = async (
  req: Request<{}, {}, string[]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const imagesNameList = await getImagesNameList(req.body);
    await deleteImagesFromStore(imagesNameList);
    await deleteSmartphoneByIdList(req.body);

    return res.status(STATUS.DELETED).send();
  } catch (err) {
    next(err);
  }
};

export const addBrand = async (
  req: Request<{}, {}, { brand: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    await createBrand(req.body);
    return res.status(STATUS.CREATED).send();
  } catch (err) {
    next(err);
  }
};

export const getListBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brandList = await getBrands();
    return res.status(STATUS.OK).send(brandList);
  } catch (error) {
    next(error);
  }
};
