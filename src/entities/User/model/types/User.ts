import { FeatureFlag } from 'shared/types/featureFlag';
import { UserRole } from '../consts/userConsts';
import { JsonSettings } from './jsonSetting';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole;
    features?: FeatureFlag
    jsonSettings?: JsonSettings
}

export interface UserSchema {
    authData?: User;
    isMounted?: boolean;
}
