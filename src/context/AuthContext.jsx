import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isDark, setIsDark] = useState(false);

    // Check system preference
    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDark(true);
        }
    }, []);

    // Apply dark mode class
    useEffect(() => {
        if (isDark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [isDark]);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'test@test.com' && password === '123456') {
                    setUser({ name: 'Site Manager', email, role: 'admin' });
                    resolve();
                } else {
                    reject('Invalid credentials');
                }
            }, 800);
        });
    };

    const logout = () => setUser(null);
    const toggleTheme = () => setIsDark(!isDark);

    return (
        <AuthContext.Provider value={{ user, login, logout, isDark, toggleTheme }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);