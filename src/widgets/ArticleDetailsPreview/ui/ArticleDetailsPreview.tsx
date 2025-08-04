import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPreview.module.scss';
import { Article, ArticleBlockType } from 'entities/Article';
import ViewsIcon from 'shared/assets/icons/eye-20-20.svg';
import CreatedAtIcon from 'shared/assets/icons/date-range-svgrepo-com.svg';
import { useCallback } from 'react';
import { ArticleImageBlockComponent } from 'entities/Article/ui/ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from 'entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleBlock } from 'entities/Article/model/types/article';
import { ArticleCodeBlockComponent } from 'entities/Article/ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { TextAlign, TextTheme, Text, TextSize } from 'shared/ui/Text/Text';
import { Avatar } from 'shared/ui/Avatar/Avatar';


interface ArticleDetailsPreviewProps {
    className?: string;
    data?: Article
}


export const ArticleDetailsPreview = (props: ArticleDetailsPreviewProps) => {
    const {
        className,
        data,
    } = props;

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
            case ArticleBlockType.CODE:
                return <ArticleCodeBlockComponent key={block.id} className={cls.block} block={block} />;
            case ArticleBlockType.IMAGE:
                return <ArticleImageBlockComponent key={block.id} className={classNames(cls.block, {}, [])} block={block} />;
            case ArticleBlockType.TEXT:
                return <ArticleTextBlockComponent key={block.id} block={block} className={cls.block} />;
            default:
                break;
        }
    }, []);



    let content
    if (!data) {
        return (
            <Text text={'Error'} theme={TextTheme.ERROR} />

        )
    }
    return (
        <div className={cls.ArticleDetails} data-testid="ArticleDetails">
            <div className={cls.avatarWrapper}>
                <Avatar size={200} round src={data?.img} className={cls.avatar} />
            </div>
            <Text className={cls.title} title={data?.title} text={data?.subtitle} align={TextAlign.CENTER} size={TextSize.L} />
            <div className={cls.articleInfo} data-testid="ArticleDetailsInfo">
                <ViewsIcon className={cls.icon} />
                <Text text={String(data?.views)} />

            </div>
            <div className={cls.articleInfo}>
                <CreatedAtIcon className={cls.icon} />
                <Text text={data?.createdAt} />

            </div>
            {data?.blocks?.map(renderBlock)}
        </div>
    );
};