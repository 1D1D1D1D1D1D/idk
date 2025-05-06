import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { Theme, ThemeContext, LOCAL_STORAGE_THEME_KEY } from '../lib/ThemeContext';
import { useSelector } from 'react-redux';
import { getJsonSettings } from 'entities/User';
import { JsonSettings } from 'entities/User/model/types/jsonSetting';

type ThemeProviderProps = {
    children: ReactNode;
    initialTheme?: Theme

};

const ThemeProvider = (props: ThemeProviderProps) => {
    const {
        children,
        initialTheme,
    } = props;

    const { theme: defaultTheme } = useSelector(getJsonSettings)
    const [isThemeInited, setThemeInited] = useState(false)


    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme || Theme.LIGHT);

    useEffect(() => {
        if (!isThemeInited && defaultTheme) {
            setTheme(defaultTheme)
            setThemeInited(true)
        }
    }, [defaultTheme])
    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
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
