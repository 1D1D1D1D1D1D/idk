
import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
type NavBarProps = {
	className?: string;

};
const Navbar = ({className}: NavBarProps) => {
    return (
        <div className={classNames(cls.navbar, {}, [className])}>

            <div className={cls.links}>
              
            </div>

        </div>
    );
};

export default Navbar;
