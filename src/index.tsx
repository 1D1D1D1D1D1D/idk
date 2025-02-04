// eslint-disable-next-line react/no-deprecated
import 'app/styles/index.scss';
import './shared/config/i18n/i18n';
import { BrowserRouter } from 'react-router-dom';
import App from 'app/App';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { StoreProvider } from 'app/providers/StoreProvider';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './app/providers/ThemeProvider';

const container = document.getElementById('root') as HTMLElement;

if (container) {
    const root = createRoot(container);
    root.render(
        <BrowserRouter>
            <StoreProvider>
                <ErrorBoundary>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ErrorBoundary>
            </StoreProvider>
        </BrowserRouter>,
    );
} else {
    console.error('No DOM element with id "root" found.');
}
