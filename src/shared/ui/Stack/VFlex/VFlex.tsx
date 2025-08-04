import { useTranslation } from 'react-i18next';
import { Flex, FlexProps } from '../Flex/Flex';

type VerticalFlex = Omit<FlexProps, 'direction'>

export const VFlex = (props: VerticalFlex) => {
    const {
        align = 'start',
        gap,
        children,
        className,
    } = props;
    const { t } = useTranslation();
    return (
        <Flex className={className} direction="column" align={align} gap={gap}>
            {children}
        </Flex>
    );
};
