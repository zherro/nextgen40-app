import { API_PATHS } from '../config/api.environment';
import { deleteById, getAll, getById, save, update } from "./crudData.action";

const saveContractModel = (values) => save(API_PATHS.CONTRACT_MODEL.CRUD_CONTRACT_MODEL, values);
const updateContractModel = (uuid, values) => update(API_PATHS.CONTRACT_MODEL.CRUD_CONTRACT_MODEL_WHIT_PARAM, uuid, values);
const deleteContractModelById = (uuid) => deleteById(API_PATHS.CONTRACT_MODEL.CRUD_CONTRACT_MODEL_WHIT_PARAM, uuid);
const getContractModelById = (uuid) => getById(API_PATHS.CONTRACT_MODEL.CRUD_CONTRACT_MODEL_WHIT_PARAM, uuid);
const getContractModelAll = (params) => getAll(API_PATHS.CONTRACT_MODEL.CRUD_CONTRACT_MODEL, params);


export {
  saveContractModel,
  getContractModelById,
  getContractModelAll,
  updateContractModel,
  deleteContractModelById
};