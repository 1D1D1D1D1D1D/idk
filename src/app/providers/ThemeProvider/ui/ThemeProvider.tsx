import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { Theme, ThemeContext, LOCAL_STORAGE_THEME_KEY } from '../lib/ThemeContext';
import { useSelector } from 'react-redux';
import { getJsonSettings, getJsonSettingsTheme } from 'entities/User';
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

    const { theme: jsonTheme = Theme.GRAY } = useSelector(getJsonSettings)

    console.log(jsonTheme);


    const [theme, setTheme] = useState<Theme>(Theme.GRAY);

    useEffect(() => {
        if (jsonTheme) {
            setTheme(jsonTheme)
        }
    }, [jsonTheme])
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
