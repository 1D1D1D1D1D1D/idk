import { StateSchema } from "app/providers/StoreProvider";
import { JsonSettings } from "../types/jsonSetting";
import { Theme } from "app/providers/ThemeProvider";
const defaultJsonSettings: JsonSettings = {};
const defaultJsonTheme = 'app_gray_theme' as Theme
export const getJsonSettings = (state: StateSchema) => state.user.authData?.jsonSettings ?? defaultJsonSettings
export const getJsonSettingsTheme = (state: StateSchema) => state.user.authData?.jsonSettings?.theme ?? defaultJsonTheme