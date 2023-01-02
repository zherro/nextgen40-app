
export const STORAGE_KEYS = {
  USER: "nextgen4.user",
  LOGOUT: "nextgen4.logout",
}

export const APP_HOST =  "http://localhost:3001";

export const API_PATHS = {
  LOGIN: {
    BASIC_PATH_LOGIN: "/api/auth/authenticate",
    BASIC_PATH_LOGOUT: "/api/auth/logout",
    BASIC_PATH_RECOVER: "/api/auth/passwordrecover",
  },
  ROUTES: {
    GET_MY_ROUTES: "/api/rota/rotas",
    CRUD_ROUTES: "/api/rota",
    CRUD_ROUTES_AUTHORIZE_USER: "/api/rota/authorize",
    CRUD_ROUTES_UPDATE: "/api/rota/",
    CRUD_ROUTES_DELETE: "/api/rota/",
    CRUD_ROUTES_GET_BY_ID: "/api/rota/",
    CRUD_ROUTES_ACTIVE: "/api/rota/actives",
  },
  USERS: {
    GET_MY_USERS: "/api/user/users",
    CRUD_USERS: "/api/user",
    CRUD_USERS_UPDATE: "/api/user/",
    CRUD_USERS_DELETE: "/api/user/",
    CRUD_USERS_GET_BY_ID: "/api/user/",
  }
}