import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArticleView } from 'entities/Article';
import ListIcon from 'shared/assets/icons/list-24-24.svg';
import GridIcon from 'shared/assets/icons/tiled-24-24.svg';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView,
    onViewClick?: (view: ArticleView) => void
}

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

export const ArticleViewSelector = ({ className, view, onViewClick }: ArticleViewSelectorProps) => {
    const { t } = useTranslation();
    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };
    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => (
                <Button theme={ThemeButton.CLEAR} onClick={onClick(viewType.view)}>
                    <Icon Svg={viewType.icon} className={classNames('', { [cls.selected]: viewType.view === view })} />
                </Button>
            ))}
        </div>
    );
};
