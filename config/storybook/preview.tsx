import { Preview } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { RouteDecorator } from '../../src/shared/config/storybook/RouteDecorator/RouteDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
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

    ],

};

export default preview;
