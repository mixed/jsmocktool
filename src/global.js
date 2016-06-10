// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
/* eslint-disable */
module.exports = typeof window !== 'undefined' && window.Math === Math ? window : typeof self !== 'undefined' && self.Math === Math ? self : Function('return this')();
/* eslint-enable */
