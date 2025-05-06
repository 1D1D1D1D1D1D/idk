import { StateSchema } from "app/providers/StoreProvider";
import { JsonSettings } from "../types/jsonSetting";
const defaultJsonSettings: JsonSettings = {};
export const getJsonSettings = (state: StateSchema) => state.user.authData?.jsonSettings ?? defaultJsonSettings