import { API_PATHS } from '../config/api.environment';
import { deleteById, getAll, getById, save, update } from "./crudData.action";

const saveAccountOperation = (values) => save(API_PATHS.ACCOUNT_OPERATION.CRUD_ACCOUNT_OPERATION, values);
const updateAccountOperation = (uuid, values) => update(API_PATHS.ACCOUNT_OPERATION.CRUD_ACCOUNT_OPERATION_WHIT_PARAM, uuid, values);
const deleteAccountOperationById = (uuid) => deleteById(API_PATHS.ACCOUNT_OPERATION.CRUD_ACCOUNT_OPERATION_WHIT_PARAM, uuid);
const getAccountOperationById = (uuid) => getById(API_PATHS.ACCOUNT_OPERATION.CRUD_ACCOUNT_OPERATION_WHIT_PARAM, uuid);
const getAccountOperationAll = (params) => getAll(API_PATHS.ACCOUNT_OPERATION.CRUD_ACCOUNT_OPERATION, params);


export {
  saveAccountOperation,
  getAccountOperationById,
  getAccountOperationAll,
  updateAccountOperation,
  deleteAccountOperationById
};