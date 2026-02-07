export const BASE_URL = import.meta.env.VITE_API_URL;

// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",//signup
    LOGIN: "/api/auth/login",//authenticate user and jwt token
    GET_PROFILE: "/api/auth/profile",//get logged-in user details
  },

  RESUME: {
    CREATE: "/api/resume", //post - create a new resume
    GET_ALL: "/api/resume",//get- get all resumes of logged in user
    GET_BY_ID: (id) => `/api/resume/${id}`,
    UPDATE: (id) => `/api/resume/${id}`,
    DELETE: (id) => `/api/resume/${id}`,
    UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`,
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },
};
