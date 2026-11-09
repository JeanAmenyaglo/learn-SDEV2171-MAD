import { createContext, useContext, useState, type ReactNode } from "react";
import { login as loginRequest, register as registerRequest } from "../lib/authApi";
import type { User } from "../lib/authApi";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// todo: store the current user and access token in state inside the shared provider
// todo: keep the session in memory and start without a session
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function login(email: string, password: string) {
    const session = await loginRequest(email, password);
    setUser(session.user);
    setToken(session.token);
  }

  async function register(name: string, email: string, password: string) {
    const session = await registerRequest(name, email, password);
    setUser(session.user);
    setToken(session.token);
  }

  function logout() {
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
// todo: store the returned session only after login or registration succeeds
// todo: clear the session on logout and expose a hook for reading auth state and actions
export function useAuth() {
  const value = useContext(AuthContext);
  if (value === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return value;
}
