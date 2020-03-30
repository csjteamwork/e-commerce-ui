import { getData, postData } from './apiUtil';

export const getProducts = () => getData('/product/get-all');
export const createProduct = data => postData('/product/create', data);
