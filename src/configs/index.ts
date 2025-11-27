export const isProduction = true;

export const stgPath = 'https://staging.lyfeplum.com';
export const prodPath = 'https://app.lyfeplum.com';

const baseUrl = isProduction ? prodPath : stgPath;
const appVersion = isProduction ? '1.9' : '1.9';
const bundleId = 'com.lyfeplum';

export default {
  baseUrl,
  isProduction,
  appVersion,
  bundleId,
};
