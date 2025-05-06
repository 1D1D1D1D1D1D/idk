import { Preview } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { RouteDecorator } from '../../src/shared/config/storybook/RouteDecorator/RouteDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        themes: {
            default: Theme.GRAY,
            list: [
                { name: 'light', class: Theme.LIGHT, color: '#00aced' },
                { name: 'dark', class: Theme.DARK, color: '#3b5998' },
                { name: 'gray', class: Theme.GRAY, color: '#3b5998' },

            ],
        },

    },
    decorators: [
        (Story) => (
            <div>
                {Story(StyleDecorator)}
            </div>
        ),
        (Story) => (
            <div>
                {ThemeDecorator(Theme.LIGHT)(Story)}
            </div>
        ),
        (Story) => (
            <div>
                {RouteDecorator(Story)}
            </div>
        ),
        (Story) => (
            <div>
                {StoreDecorator({})(Story)}
            </div>
        ),

    ],
};

export default preview;
