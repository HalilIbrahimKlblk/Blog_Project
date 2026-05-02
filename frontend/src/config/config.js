const BASE_URL = "http://localhost:8080/blog-api/v1";

const ADMIN_URL = "/admin";

const API_URL = {
  ADMIN: {
    SAVE: `${BASE_URL}${ADMIN_URL}/save`,
    INFO: `${BASE_URL}${ADMIN_URL}/info`,
    PROFILE: `${BASE_URL}${ADMIN_URL}/profile`,
    UPDATE: (id) => `${BASE_URL}${ADMIN_URL}/update/${id}`,
    LOGIN: `${BASE_URL}${ADMIN_URL}/login`,
    FORGOT: `${BASE_URL}${ADMIN_URL}/forgot-password`,
    RESET: `${BASE_URL}${ADMIN_URL}/reset-password`,
  },
};

export default API_URL;