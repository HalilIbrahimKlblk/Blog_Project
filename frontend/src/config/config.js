const BASE_URL = "http://localhost:8080/blog-api/v1";

const ADMIN_URL = "/admin";
const SKILL_URL = "/skill";
const EDUCATION_URL = "/education";
const BLOG_URL = "/blog";
const PROJECT_URL = "/project";

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

  PROJECT: {
    SAVE: `${BASE_URL}${PROJECT_URL}/save`,
    UPDATE: (id) => `${BASE_URL}${PROJECT_URL}/update/${id}`,
    DELETE: (id) => `${BASE_URL}${PROJECT_URL}/delete/${id}`,
    GET_ALL: `${BASE_URL}${PROJECT_URL}/list`,
    GET_BY_ID: (id) => `${BASE_URL}${PROJECT_URL}/list/${id}`,
  },

  BLOG: {
    SAVE: `${BASE_URL}${BLOG_URL}/save`,
    UPDATE: (id) => `${BASE_URL}${BLOG_URL}/update/${id}`,
    DELETE: (id) => `${BASE_URL}${BLOG_URL}/delete/${id}`,
    GET_ALL: `${BASE_URL}${BLOG_URL}/list`,
    GET_BY_ID: (id) => `${BASE_URL}${BLOG_URL}/list/${id}`,
  },

  EDUCATION: {
    SAVE: `${BASE_URL}${EDUCATION_URL}/save`,
    UPDATE: (id) => `${BASE_URL}${EDUCATION_URL}/update/${id}`,
    DELETE: (id) => `${BASE_URL}${EDUCATION_URL}/delete/${id}`,
    GET_ALL: `${BASE_URL}${EDUCATION_URL}/list`,
    GET_BY_ID: (id) => `${BASE_URL}${EDUCATION_URL}/list/${id}`,
  },

  SKILL: {
    SAVE: `${BASE_URL}${SKILL_URL}/save`,
    UPDATE: (id) => `${BASE_URL}${SKILL_URL}/update/${id}`,
    DELETE: (id) => `${BASE_URL}${SKILL_URL}/delete/${id}`,
    GET_ALL: `${BASE_URL}${SKILL_URL}/list`,
    GET_BY_ID: (id) => `${BASE_URL}${SKILL_URL}/list/${id}`,
  },

};

export default API_URL;