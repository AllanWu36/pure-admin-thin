const API_PREFIX = import.meta.env.VITE_API_PREFIX || "/api/v1";

export const baseUrlApi = (path: string) => {
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  return `${API_PREFIX}${cleaned}`;
};