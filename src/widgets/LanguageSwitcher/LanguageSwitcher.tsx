

import {type FC} from 'react';
import {classNames} from 'shared/lib/classNames';
import cls from './LanguageSwitcher.module.scss';
import {useTranslation} from 'react-i18next';
import Button, {ThemeButton} from 'shared/ui/Button/Button';

type LanguageSwitcherProps = {
	className?: string;
};
const LanguageSwitcher: FC<LanguageSwitcherProps> = ({className}: LanguageSwitcherProps) => {

    const {t, i18n} = useTranslation();

    const togle = () =>{
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <div>

            <Button 
                className={classNames(cls.LanguageSwitcher, {}, [className])}
                onClick={togle}
                theme={ThemeButton.CLEAR}
            >
                {t('Язык')}
            
            </Button>
            
        </div>
    );
};

export default LanguageSwitcher;