import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import ListIcon from 'shared/assets/icons/list-24-24.svg';
import GridIcon from 'shared/assets/icons/tiled-24-24.svg';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { ArticleView } from 'entities/Article';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView,
    onViewClick?: (view: ArticleView) => void
}

export const ArticleViewSelector = ({ className, view, onViewClick }: ArticleViewSelectorProps) => {
    const viewTypes = [
        {
            view: ArticleView.GRID,
            icon: GridIcon,
        },
        {
            view: ArticleView.LIST,
            icon: ListIcon,
        },
    ];

    const { t } = useTranslation();
    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };
    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            <div className={cls.viewSelectorItem}>

                {viewTypes.map((viewType, index) => (
                    <Button theme={ThemeButton.CLEAR} onClick={onClick(viewType.view)} key={index}>
                        <Icon Svg={viewType.icon} className={classNames('', { [cls.selected]: viewType.view === view })} />
                    </Button>
                ))}
            </div>

        </div>
    );
};
