import {
    createContext,
    useContext,
    useState,
    type ReactNode
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {

    theme: Theme;
    toggleTheme: () => void;
};


const ThemeContext = createContext<ThemeContextType | undefined>( undefined );


export function ThemeProvider({ children }: { children: ReactNode}) 
{
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        setTheme((previousTheme) => {
            if (previousTheme === "light") {
                return "dark";
            }
            return "light";
        });
    };

    return (
        <ThemeContext.Provider value={{ theme,toggleTheme}}>

            <div className={`app ${theme}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}


export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider");

    }

    return context;
}