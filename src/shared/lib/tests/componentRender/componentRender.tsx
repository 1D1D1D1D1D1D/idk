import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTest';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from '../../DeepPartialObject/DeepPartialObject';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';
import 'app/styles/index.scss'
interface componentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
    children?: ReactNode
    theme?: Theme

}
interface TestProviderProps {
    children?: ReactNode
    options?: componentRenderOptions

}

export function TestProvider(props: TestProviderProps) {
    const { children, options = {} } = props;
    const {
        route = '/',
        initialState,
        theme = Theme.GRAY,
    } = options;
    console.log(theme);

    return (
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider initialState={initialState}>
                <I18nextProvider i18n={i18nForTests}>
                    <ThemeProvider initialTheme={theme}>
                        <div className={`app ${theme}`}>
                            {children}
                        </div>
                    </ThemeProvider>
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>
    )
}
export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
    return render(
        <TestProvider options={options}>{component}</TestProvider>
    );
}
