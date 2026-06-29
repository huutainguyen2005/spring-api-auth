import {createContext, useContext, useState} from "react";

// Tạo một context mới phục vụ cho Theme của người dùng
const ThemeContext = createContext(null);

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState("dark");

    const toggle = () => setTheme(t => (t === "light" ? "dark" : "light"));

    const value = { theme, toggle };

    // Can phai wrap lai cac component con phia trong
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// Thử khai báo 1 custom hook
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be inside ThemeProvider")
    }
    return context;
}