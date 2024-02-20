import { createContext } from "react";

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}
export interface ThemeContextProps {
    theme?: Theme;
    setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({})
export const LOCAL_STORAGE_THEME_KEY = 'theme '
// const toggleTheme = () => {
//     setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)
// }
