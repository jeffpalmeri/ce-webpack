const extension =
  process.platform === 'win32' && process.argv.indexOf('serve') !== -1
    ? '.html'
    : process.argv.indexOf('serve') !== -1
    ? ''
    : '.htl';

module.exports = extension;
