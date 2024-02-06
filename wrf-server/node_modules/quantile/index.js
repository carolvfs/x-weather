module.exports = (a, p) => {
    const _h = (a.length + 1) * p;
    const h = Math.floor(_h);
    return h < 1 ? a[0] : h >= a.length ? a[a.length - 1] : a[h - 1] + (_h - h) * (a[h] - a[h - 1]);
};
