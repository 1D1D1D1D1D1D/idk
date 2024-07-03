import React, {type FC, type ReactNode, useMemo, useState} from 'react';
import {Theme, ThemeContext, LOCAL_STORAGE_THEME_KEY} from '../lib/ThemeContext';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;
type ThemeProviderProps = {
	children: ReactNode;
    initialTheme?: Theme

};


const ThemeProvider: FC<ThemeProviderProps> = (props) => {
    const {
        children,
        initialTheme
    } = props
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    const defaultProps = useMemo(() => ({
        theme: theme,
        setTheme: setTheme,
    }), [theme]);

   
    return (
        <ThemeContext.Provider
            value={defaultProps}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
