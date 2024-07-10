
import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { Modal } from 'shared/ui/Modal/Modal';
import { useCallback, useState,  } from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features';
type NavBarProps = {
	className?: string;
   

};
const Navbar = ({className}: NavBarProps) => {

  
    const [isAuthModal, setIsAuthModal] = useState(false)
    const {t} = useTranslation()

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [])
    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <Button onClick={onShowModal} className={cls.links} theme={ThemeButton.CLEAR_INVERTED}>
                {t('Войти')}
            </Button>
      <LoginModal isOpen={isAuthModal} onClose={onCloseModal}/>

        </div>
    );
};

export default Navbar;
