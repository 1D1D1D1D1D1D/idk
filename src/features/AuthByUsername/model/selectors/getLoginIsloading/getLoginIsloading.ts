import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginIsloading = (state: StateSchema) => state?.loginForm?.isLoading || false;
