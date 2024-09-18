import { StateSchema } from 'app/providers/StoreProvider';

export const getProfileIsloading = (state: StateSchema) => state?.profile?.isLoading;
