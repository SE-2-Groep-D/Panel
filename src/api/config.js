const data = import.meta.env;

const apiConfig = {
    inDevelopment: data.DEV,
    development: data.VITE_API_DEVELOPMENT_URL,
    production: data.VITE_API_PRODUCTION_URL,
}

export {apiConfig};