import { API_URL, request } from "./api";
// todo: define the user and session types for the backend response
export type User = {
  id: string;
  name: string;
  email: string;
};

export type Session = {
  token: string;
  user: User;
};
// todo: send the login credentials to /auth/login and return the session
export function login(email: string, password: string): Promise<Session> {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
// todo: send registration details to /auth/register and return the session
export function register(name: string, email: string, password: string): Promise<Session> {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}
// todo: send the token to /auth/me and return the response so the caller can check the status
export function getMe(token: string) {
  return fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
