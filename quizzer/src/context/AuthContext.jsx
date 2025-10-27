import React, { createContext, useContext, useEffect, useState } from 'react';

const USERS_KEY = 'quizzer_users';
const CURRENT_USER_KEY = 'quizzer_current_user';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function readUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [user]);

  const signup = async (email, password) => {
    const users = readUsers();
    if (users.find(u => u.email === email)) {
      throw new Error('User already exists');
    }
    const newUser = { id: Date.now().toString(), email, password };
    users.push(newUser);
    writeUsers(users);
    setUser({ id: newUser.id, email: newUser.email });
    return newUser;
  };

  const login = async (email, password) => {
    const users = readUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid credentials');
    setUser({ id: found.id, email: found.email });
    return found;
  };

  const logout = async () => {
    setUser(null);
  };

  const value = { user, signup, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
