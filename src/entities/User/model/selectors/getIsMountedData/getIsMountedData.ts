import { StateSchema } from 'app/providers/StoreProvider';

export const getIsMountedData = (state: StateSchema) => state.user.isMounted;
