import { getIsMountedData } from './model/selectors/getIsMountedData/getIsMountedData';
import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
import { userActions, userReducer } from './model/slice/userSlice';
import { User, UserSchema } from './model/types/User';

export {
    getUserAuthData, getIsMountedData,
};

export {
    userReducer,
    userActions,
};
export {
    UserSchema,
    User,
};
