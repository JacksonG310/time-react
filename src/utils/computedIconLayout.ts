const computedIconLayout = (Cwidth: number, CHeight: number, IWidth: number, IHeght: number, count: number) => {
    const cols = Math.floor(Cwidth / IWidth);
    const rows = Math.floor(CHeight / IHeght);
    const pages = Math.ceil(count / (rows * cols));
    return [rows, cols, pages];
}

export { computedIconLayout };