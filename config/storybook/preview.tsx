import React from 'react';

import { Preview } from '@storybook/react';
import { StyleDecorator } from 'shared/config/storybook/StyleDecorator/StyleDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { RouteDecorator } from 'shared/config/storybook/RouteDecorator/RouteDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { I18nDecorator } from 'shared/config/storybook/I18nDecorator/I18nDecorator';

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
        // (Story) => (
        //     <div>
        //         {I18nDecorator(Story)}
        //     </div>
        // ),

    ],

};

export default preview;
