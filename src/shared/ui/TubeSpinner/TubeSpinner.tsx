import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TubeSpinner.module.scss';

interface TubeSpinnerProps {
    className?: string
}
export const TubeSpinner = (props: TubeSpinnerProps) => {
    const { className } = props;
    const { t } = useTranslation();
    return (

        <div className={classNames(cls.loader, {}, [className])} />

    );
};
