import React, { createContext, useContext, useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CollectionsPage from "./pages/Collectionspage";
import NewInPage from "./pages/Newipage";
import SalePage from "./pages/Salepage";
import AboutPage from "./pages/Aboutpage";
import CartPage from "./pages/CartPage";

import "./App.css";

// ─── Database Keys ────────────────────────────────────────────────────────────
const DB_KEY = "nexus_users";
const SESSION_KEY = "nexus_session";

// ─── Theme Context ────────────────────────────────────────────────────────────
export const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("nexus_theme") || "dark"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("nexus_theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ─── Auth Context ─────────────────────────────────────────────────────────────
export const AuthContext = createContext(null);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// ─── Cart Context ─────────────────────────────────────────────────────────────
export const CartContext = createContext(null);
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nexus_cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("nexus_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, size) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, size, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === id && item.size === size ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ─── Auth Helper Functions ────────────────────────────────────────────────────
const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(DB_KEY)) || [];
  } catch {
    return [];
  }
};

const saveUsers = (u) => localStorage.setItem(DB_KEY, JSON.stringify(u));

const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
};

const saveSession = (u) => localStorage.setItem(SESSION_KEY, JSON.stringify(u));

const clearSession = () => localStorage.removeItem(SESSION_KEY);

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Auth Provider ────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => getSession());
  const [loading, setLoading] = useState(false);

  const register = async ({ name, email, password }) => {
    setLoading(true);
    await delay(600);
    const users = getUsers();
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      setLoading(false);
      throw new Error("An account with this email already exists.");
    }
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email: email.toLowerCase(),
      password,
      createdAt: new Date().toISOString(),
      stats: {
        projects: Math.floor(Math.random() * 8) + 1,
        tasks: Math.floor(Math.random() * 40) + 5,
        streak: Math.floor(Math.random() * 14) + 1,
        score: Math.floor(Math.random() * 900) + 100,
      },
    };
    saveUsers([...users, newUser]);
    const s = { ...newUser };
    delete s.password;
    saveSession(s);
    setCurrentUser(s);
    setLoading(false);
    return s;
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    await delay(600);
    const users = getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      setLoading(false);
      throw new Error("Invalid email or password. Please try again.");
    }
    const s = { ...user };
    delete s.password;
    saveSession(s);
    setCurrentUser(s);
    setLoading(false);
    return s;
  };

  const logout = () => {
    clearSession();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ─── Guest Route ──────────────────────────────────────────────────────────────
const GuestRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/" replace /> : children;
};

// ─── Main App Component ────────────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/new-in" element={<NewInPage />} />
              <Route path="/sale" element={<SalePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/login"
                element={
                  <GuestRoute>
                    <LoginPage />
                  </GuestRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <GuestRoute>
                    <SignupPage />
                  </GuestRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}