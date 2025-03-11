import { useTranslation } from 'react-i18next';
import { RatingCard } from 'entities/Rating';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { useCallback } from 'react';
import { useGetArticleRating, useRateArticle } from '../api/articleRatingApi';

interface ArticleRatingProps {
    className?: string;
    articleId: string
}

export const ArticleRating = ({ className, articleId }: ArticleRatingProps) => {
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);
    const { data, isLoading } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? '',
    });

    const [rateArticleMutation, { error }] = useRateArticle();
    const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: userData?.id ?? '',
                articleId,
                rate: starsCount,
                feedback,
            });
        } catch (error) {
            console.log(error);
        }
    }, [articleId, rateArticleMutation, userData?.id]);
    const onAccept = useCallback((starsCount: number, feedbackTitile?: string) => {
        handleRateArticle(starsCount, feedbackTitile);
    }, [handleRateArticle]);
    const onCancel = useCallback((starsCount: number) => {
        handleRateArticle(starsCount);
    }, [handleRateArticle]);
    if (isLoading) {
        return (
            <Skeleton width="100%" height={120} />
        );
    }

    const rating = data?.[0];
    console.log(rating);

    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            className={className}
            title={t('Rate article')}
            feedbackTitile={t('Leave your comment')}
            rate={rating?.rate}
            hasFeedback

        />

    );
};
