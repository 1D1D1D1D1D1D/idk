import { useTranslation } from 'react-i18next';
import { Flex, FlexProps } from '../Flex/Flex';

type HorizontalFlex = Omit<FlexProps, 'direction'>

export const HFlex = (props: HorizontalFlex) => {
    const {
        align = 'start',
        justify,
        children,
        className,
        gap,
    } = props;
    const { t } = useTranslation();
    return (
        <Flex className={className} gap={gap} direction="row" align={align} justify={justify}>
            {children}
        </Flex>
    );
};
