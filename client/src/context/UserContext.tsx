"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { users as initialUsers, User } from "@/data/data";


interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (fullName: string, email: string, password: string) => boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const login = (email: string, password: string) => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const signup = (fullName: string, email: string, password: string) => {
    const alreadyExists = users.some((u) => u.email === email);
    if (alreadyExists) return false;

    const newUser: User = {
      id: (users.length + 1).toString(),
      fullName,
      email,
      password,
      role: "user",
      completedRuns: [],
      upcomingRuns: [],
    };

    setUsers([...users, newUser]);
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser must be used within a UserProvider");
  return context;
}
