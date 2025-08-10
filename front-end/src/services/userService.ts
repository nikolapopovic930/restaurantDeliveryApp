const API_URL = process.env.REACT_APP_API_URL;

export interface SignupData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  birthDate: string;
  address: string;
  city: string;
  country: string;
  email: string;
  phoneNumber: string;
}

export const signup = async (data: SignupData) => {
  const res = await fetch(`${API_URL}/users/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Registration failed');
  return res;
};

export interface LoginData {
  username: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
};

export const getUser = async (userId: string, token: string) => {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Fetching user failed');
  return res.json();
};