export const API_HOST =  "http://localhost:8080";

export const HOST_PATH = {
    LOGIN: {
        BASIC_PATH_LOGIN: "/api/auth/signin",
        BASIC_PATH_RECOVER: "/api/auth/passwordrecover",
    },
    ROUTES: {
        GET_MY_ROUTES: "/api/rotas/my-routes",
        POST_ROUTES: "/api/rotas",
        POST_AUTHORIZE_ROUTES: "/api/rotas/authorize",
        GET_ROUTE: "/api/rotas/",
        GET_ROUTES: "/api/rotas",
        GET_ACTIVE_ROUTES: "/api/rotas/actives",
    },
    ACCOUNT: {
        PATH: "/api/accounts",
        PATH_WITH_PARAM: "/api/accounts/",
    },
    USERS: {
        POST_USERS: "/api/users",
        GET_USER: "/api/users/",
        GET_USERS: "/api/users",
    },
    ROLES: {
        POST_ROLES: "/api/roles",
        GET_ROLE: "/api/roles/",
        GET_ROLES: "/api/roles",
    }
}