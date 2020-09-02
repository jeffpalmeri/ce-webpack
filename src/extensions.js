export const extension =
  process.platform === 'win32' && process.env.WEBPACK_DEV_SERVER
    ? 'html'
    : process.env.WEBPACK_DEV_SERVER
    ? ''
    : '.htl';
