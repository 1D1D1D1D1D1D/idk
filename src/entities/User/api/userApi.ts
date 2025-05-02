import { rtkApi } from "shared/api/rtkApi";
import { JsonSettings } from "../model/types/jsonSetting";
import type { User } from "../model/types/User";
interface SetJsonSettings {
    userId?: string
    jsonSettings?: JsonSettings
}
const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        setJsonSettings: build.mutation<User, SetJsonSettings>({
            query: ({ userId, jsonSettings }) => ({
                url: '/users/' + userId,
                method: 'PATCH',
                body: {
                    jsonSettings
                }
            })
        })
    })
})
export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate