import { rtkApi } from 'shared/api/rtkApi';
import { Rating } from 'entities/Rating';

interface GetProfileRatingArg {
    userId: string;
    profileId: string
}

interface RateProfileArg {
    userId?: string;
    profileId: string
    rate: number
}
const profileRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<Rating[], GetProfileRatingArg>({
            query: ({
                userId,
                profileId,

            }) => ({
                url: '/profile-ratings',
                params: {
                    userId,
                    profileId,
                },
            }),
        }),
        rateProfile: build.mutation<void, RateProfileArg>({
            query: (args) => ({
                url: '/profile-ratings',
                method: 'POST',
                body: args,

            }),
        }),
    }),
});

export const useGetProfileRating = profileRatingApi.useGetArticleRatingQuery;
export const useRateProfile = profileRatingApi.useRateProfileMutation;
