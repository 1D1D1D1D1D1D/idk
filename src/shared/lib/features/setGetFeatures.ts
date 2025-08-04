import { FeatureFlag } from "shared/types/featureFlag";

let featureFlags: FeatureFlag

export function setFeatureFlags(newFeatureFlags?: FeatureFlag) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlag) {
    return featureFlags[flag];
}
