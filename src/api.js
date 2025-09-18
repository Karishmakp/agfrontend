const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const message = isJson ? data?.error || data?.message || res.statusText : res.statusText;
    throw new Error(message);
  }
  return data;
}

export const api = {
  // Auth routes
  signup: (payload) => request("/auth/signup", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  me: (token) => request("/auth/me", { headers: { Authorization: `Bearer ${token}` } }),
  refresh: (refreshToken) => request("/auth/token/refresh", { method: "POST", body: { refreshToken } }),
  forgotPassword: (payload) => request("/auth/forgot-password", { method: "POST", body: payload }),
  resetPassword: (payload) => request("/auth/reset-password", { method: "POST", body: payload }),

  // ✅ Profile routes
  getProfile: (token) => request("/auth/me", { headers: { Authorization: `Bearer ${token}` } }),
  updateProfile: (token, payload) =>
    request("/auth/me", { method: "PUT", body: payload, headers: { Authorization: `Bearer ${token}` } }),
};

export default api;
