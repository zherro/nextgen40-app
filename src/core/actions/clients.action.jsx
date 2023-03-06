import { API_PATHS } from '../config/api.environment';
import { deleteById, getAll, getById, save, update } from "./crudData.action";

const saveClient = (values) => save(API_PATHS.CLIENT.CRUD_CLIENT, values);
const updateClient = (uuid, values) => update(API_PATHS.CLIENT.CRUD_CLIENT_WHIT_PARAM, uuid, values);
const deleteClientById = (uuid) => deleteById(API_PATHS.CLIENT.CRUD_CLIENT_WHIT_PARAM, uuid);
const getClientById = (uuid) => getById(API_PATHS.CLIENT.CRUD_CLIENT_WHIT_PARAM, uuid);
const getClientAll = (params) => getAll(API_PATHS.CLIENT.CRUD_CLIENT, params);


export {
  saveClient,
  getClientById,
  getClientAll,
  updateClient,
  deleteClientById
};