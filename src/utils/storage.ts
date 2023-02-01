export interface AppLocalInfo {
    token: string;
    userId: number;
    email: string;
    phone: string;
}
export const storageUtil = {
    keyOfApp: "timerInfo",
    setAppInfoToStorage(appInfo: AppLocalInfo) {
        localStorage.setItem(this.keyOfApp, JSON.stringify(appInfo));
    },
    getAppInfoFromStorage(): AppLocalInfo | undefined {
        const appInfo = localStorage.getItem(this.keyOfApp);
        return appInfo && JSON.parse(appInfo);
    },
    clearAppInfoFormStorage() {
        localStorage.removeItem(this.keyOfApp);
    }
}