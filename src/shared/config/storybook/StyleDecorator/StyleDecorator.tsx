import { StoryFn } from '@storybook/react';
import 'app/styles/index.scss'

export const StyleDecorator = (Story: StoryFn) => (

    <div>
        <Story/>
    </div>
)