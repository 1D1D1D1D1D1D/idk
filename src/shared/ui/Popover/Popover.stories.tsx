// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Popover } from './Popover';
import Button, { ThemeButton } from '../Button/Button';
import { Text } from '../Text/Text';
import { HFlex } from '../Stack/HFlex/HFlex';
import { VFlex } from '../Stack/VFlex/VFlex';

const meta: Meta<typeof Popover> = {
    title: 'shared/Popover',
    component: Popover,
};
export default meta;

type Story = StoryObj<typeof Popover>;
const data = [
    'item1', 'item2', 'item3',
];

export const Normal: Story = {};
Normal.args = {
    trigger: (
        <Button theme={ThemeButton.OUTLINE}>
            <Text text="Trigger button" />
        </Button>
    ),
    children: (
        <VFlex>
            {data.map((element) => (
                <div>

                    {element}
                </div>
            ))}
        </VFlex>
    ),
    direction: 'bottom right',
};

export const Dark: Story = {};
Dark.args = {

};
Dark.decorators = [StoreDecorator({})];
