export interface ConfigDatabase {
  user: string;
  host: string;
  database: string;
  password: string;
  port: string;
}

export interface QueryFailedError extends Error {
  code?: string;
}

export interface RequestImageData {
  originalname: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface SmartphoneData {
  model: string;
  display: string;
  brand: string;
  price: number;
  year: number;
  cpu: string;
  frequency: number;
  memory: number;
  nfc: boolean;
  images: string[];
}

export interface ReqSmartphoneListParameters {
  page: string;
  limit: string;
}
