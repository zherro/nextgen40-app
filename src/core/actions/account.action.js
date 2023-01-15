import { API_PATHS } from '../config/api.environment';
import { deleteById, getAll, getById, save, update } from "./crudData.action";

const saveAccount = (values) => save(API_PATHS.ACCOUNT.CRUD_ACCOUNT, values);
const updateAccount = (uuid, values) => update(API_PATHS.ACCOUNT.CRUD_ACCOUNT_WHIT_PARAM, uuid, values);
const deleteAccountById = (uuid) => deleteById(API_PATHS.ACCOUNT.CRUD_ACCOUNT_WHIT_PARAM, uuid);
const getAccountById = (uuid) => getById(API_PATHS.ACCOUNT.CRUD_ACCOUNT_WHIT_PARAM, uuid);
const getAccountAll = (params) => getAll(API_PATHS.ACCOUNT.CRUD_ACCOUNT, params);


export {
  saveAccount,
  getAccountById,
  getAccountAll,
  updateAccount,
  deleteAccountById
};