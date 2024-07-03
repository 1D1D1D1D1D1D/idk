
import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { Modal } from 'shared/ui/Modal/Modal';
import { useCallback, useState,  } from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
type NavBarProps = {
	className?: string;

};
const Navbar = ({className}: NavBarProps) => {

  
    const [isOpen, setIsOpen] = useState(false)
    const {t} = useTranslation()

    const toggle = useCallback(() => {
        setIsOpen(true)
    }, [isOpen])

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <Button onClick={toggle} className={cls.links} theme={ThemeButton.CLEAR_INVERTED}>
            {t('Войти')}
            </Button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                Lorem ipsum dolor sit am    et consectetur adipisicing elit. Quam, fugit doloremque error 
                consectetur ullam sint repudiandae! Nemo recusandae quaerat maxime, omnis quo aspernatur 
                iste temporibus! Dolore alias similique quas dolorem!
            </Modal>
        </div>
    );
};

export default Navbar;
