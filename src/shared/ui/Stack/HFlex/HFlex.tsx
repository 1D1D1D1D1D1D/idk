import { useTranslation } from 'react-i18next';
import { Flex, FlexProps } from '../Flex/Flex';

type HorizontalFlex = Omit<FlexProps, 'direction'>

export const HFlex = (props: HorizontalFlex) => {
    const {
        align = 'start',
        justify,
        children,
        className,
    } = props;
    const { t } = useTranslation();
    return (
        <Flex className={className} direction="row" align={align} justify={justify}>
            {children}
        </Flex>
    );
};
