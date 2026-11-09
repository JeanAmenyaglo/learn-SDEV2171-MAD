// todo: set the backend base address for the android emulator and other local platforms
export const API_URL = "http://localhost:4000";
// todo: write a fetch helper and a response parser that reads json and throws a plain error on failure
// todo: use the backend error message or fall back to the response status
export async function request(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

   if (!response.ok) {
    const message = data?.message ?? `Request failed with status ${response.status}`;
    const apiError = new Error(message);
    (apiError as any).status = response.status;
    throw apiError;
  }

  return data;
}
// todo: add a protected get helper that sends the bearer token and returns the response
export function authGet(path: string, token: string) {
  return request(path, {
    headers: { Authorization: `Bearer ${token}` },
  });
}