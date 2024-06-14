import React from 'react';

import { Preview } from '@storybook/react';
import { StyleDecorator } from "shared/config/storybook/StyleDecorator/StyleDecorator";
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { RouteDecorator } from 'shared/config/storybook/RouteDecorator/RouteDecorator';


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
