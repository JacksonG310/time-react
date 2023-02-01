export const buildPath = (keyPath: string[]) => {
    if (keyPath.length <= 0) return "/";
    return keyPath.reduce((path, key) => {
        return `/${key}${path}`;
    }, "")
}