import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { UserRole } from 'entities/User';
import AppRouter from './AppRouter';

const getAboutRoute = () => '/about';
const getRouteProfile = (id: string) => `/profile/${id}`;
describe('AppRouter', () => {
    test('Page is rendered', async () => {
        componentRender(<AppRouter />, {
            route: '/about',
        });

        const page = await screen.findByTestId('AboutPage');
        expect(page).toBeInTheDocument();
    });
    test('With unknown page', async () => {
        componentRender(<AppRouter />, {
            route: '/daskoasdkalsdklsd',
        });

        const page = await screen.findByTestId('NotFoundPage');
        expect(page).toBeInTheDocument();
    });
    test('Redirect if user is not logined', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
        });

        const page = await screen.findByTestId('MainPage');
        expect(page).toBeInTheDocument();
    });
    test('Доступ к закрытой страницы для авторизованного пользователя', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
            initialState: {
                user: { isMounted: true, authData: {} },
            },
        });
        const page = await screen.findByTestId('Profile-Page');
        expect(page).toBeInTheDocument();
    });
});
