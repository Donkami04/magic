const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || "local";

let base_url = ""
if (ENVIRONMENT === "production") {
  base_url = "https://magic-log.onrender.com"
}

export const BASE_API_URL = `http://${base_url}:3000/api/v1/marketplace`;