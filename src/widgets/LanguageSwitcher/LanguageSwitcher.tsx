
import { FC } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import { useTranslation } from "react-i18next";
import Button, { ThemeButton } from "shared/ui/Button/Button";

interface LanguageSwitcherProps {
    className?: string;
    short?: boolean;
}
const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ className, short }: LanguageSwitcherProps) => {

    const { t, i18n} = useTranslation()

    const togle = () =>{
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    return (
        <div>

            <Button 
                className={classNames('', {}, [className])}
                onClick={togle}
                theme={ThemeButton.CLEAR}
            >
                {t(short ? 'Короткое название' : 'Язык' )}
            
            </Button>
            
        </div>
    )
}

export default LanguageSwitcher