import { useTranslation } from 'react-i18next';
import { RatingCard } from 'entities/Rating';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useCallback } from 'react';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { getProfileForm } from 'features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';
import { useGetProfileRating, useRateProfile } from '../api/profileRatingApi';

interface ProfileRatingProps {
    className?: string;
    profileId: string

}

export const ProfileRating = ({ className, profileId }: ProfileRatingProps) => {
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);
    const formData = useSelector(getProfileForm);

    const { data, isLoading } = useGetProfileRating({ profileId, userId: userData?.id ?? '' });
    const rating = data?.[0];

    const [rateArticleMutation] = useRateProfile();

    const onAccept = useCallback((rate: number) => {
        rateArticleMutation({ userId: userData?.id, profileId, rate });
    }, [profileId, rateArticleMutation, userData?.id]);

    if (isLoading && profileId !== userData?.id) {
        return (
            <Skeleton width="100%" height={120} />
        );
    }
    if (profileId === userData?.id || !formData) {
        return null;
    }

    return (
        <RatingCard
            onAccept={onAccept}
            className={className}
            title={t('Rate article')}
            feedbackTitile={t('Leave your comment')}
            rate={rating?.rate}
            hasFeedback={false}
        />

    );
};
