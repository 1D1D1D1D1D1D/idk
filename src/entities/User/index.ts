import { getIsMountedData } from './model/selectors/getIsMountedData/getIsMountedData';
import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
import { getUserRoles, isUserAdmin, isUserManager } from './model/selectors/roleSelectors';
import { userActions, userReducer } from './model/slice/userSlice';
import { User, UserSchema } from './model/types/User';
import { UserRole } from './model/consts/userConsts';

export {
    getUserAuthData, getIsMountedData,
};

export {
    userReducer,
    userActions,
};
export {
    type UserSchema,
    type User,
};
export {
    UserRole,
    isUserAdmin,
    isUserManager,
    getUserRoles,

};
