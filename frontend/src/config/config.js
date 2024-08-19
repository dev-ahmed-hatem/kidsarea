const api_base_url = import.meta.env.VITE_API_BASE_URL;

const endpoints = {
    // authentication
    token_obtain: `${api_base_url}token/`,
    token_refresh: `${api_base_url}token/refresh/`,
    token_verify: `${api_base_url}token/verify/`,
    models_permissions: `${api_base_url}api/users/get_models_permissions/`,
    authenticated_user: `${api_base_url}api/get_authenticated_user/`,

    // users routing
    manager_list: `${api_base_url}api/users/users/?is_superuser=true`,
    moderator_list: `${api_base_url}api/users/moderator/?`,

    // games routing
    game_list: `${api_base_url}api/games/game/?`,

    // ticket routing
    ticket_list: `${api_base_url}api/tickets/ticket/?`,
    tickets_within_duration: `${api_base_url}api/tickets/tickets-within-duration/?`,
};

export default endpoints;
