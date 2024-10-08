import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById/fetchArticleById';
import { memo, useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from 'entities/Article/model/selectors/articleDetails';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import ViewsIcon from 'shared/assets/icons/eye-20-20.svg';
import CreatedAtIcon from 'shared/assets/icons/date-range-svgrepo-com.svg';

import { Avatar } from 'shared/ui/Avatar/Avatar';
import { ArticleBlock, ArticleBlockType } from 'entities/Article/model/types/article';
import cls from './ArticleDetails.module.scss';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleDetailsProps {
    className?: string;
    id: string
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const {
        className,
        id,
    } = props;
    const dispatch = useAppDispatch();
    // const isLoading = true;
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);
    const reducers: ReducerList = {
        articleDetails: articleDetailsReducer,
    };
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
    useEffect(() => {
        console.log('useEffect triggered', id);
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;
    if (isLoading) {
        content = (
            <>
                <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </>
        );
    } else if (error) {
        content = (
            <Text text="Error. No content" theme={TextTheme.ERROR} align={TextAlign.CENTER} />
        );
    } else {
        content = (
            <>
                <div className={cls.avatarWrapper}>
                    <Avatar height={200} width={200} round src={article?.img} className={cls.avatar} />
                </div>
                <Text className={cls.title} title={article?.title} text={article?.subtitle} align={TextAlign.CENTER} size={TextSize.L} />
                <div className={cls.articleInfo}>
                    <ViewsIcon className={cls.icon} />
                    <Text text={String(article?.views)} />

                </div>
                <div className={cls.articleInfo}>
                    <CreatedAtIcon className={cls.icon} />
                    <Text text={article?.createdAt} />

                </div>
                {article?.blocks.map(renderBlock)}
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            {content}
        </DynamicModuleLoader>
    );
});
