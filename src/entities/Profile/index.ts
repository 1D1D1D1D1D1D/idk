import { getProfileForm } from './model/selectors/getProfileForm/getProfileForm';
import { getProfileReadonly } from './model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateError } from './model/selectors/getProfileValidateError/getProfileValidateError';
import { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';
import { updateProfileData } from './model/services/updateProfileData/updateProfileData';
import { profileActions, profileReducer } from './model/slice/profileSlice';
import { Profile, ProfileSchema } from './model/types/profile';
import { ProfileCard } from './ui/ProfileCard/ProfileCard';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileIsloading } from 'entities/Profile/model/selectors/getProfileIsloading/getProfileIsloading';
updateProfileData
export {
    Profile, ProfileSchema, profileActions, profileReducer, fetchProfileData, updateProfileData, ProfileCard,
    getProfileData,
    getProfileError,
    getProfileIsloading,
    getProfileReadonly,
    getProfileForm,
    getProfileValidateError


};
