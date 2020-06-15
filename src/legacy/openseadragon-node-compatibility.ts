// @ts-ignore
if (typeof global.document === 'undefined' || !global.document.createElement) {
  // @ts-ignore
  global.document = global.document ? global.document : {};

  // @ts-ignore
  global.document.createElement = () => {
    return { getContext: false };
  };

  // @ts-ignore
  global.document.currentStyle = false;

  // @ts-ignore
  document.documentElement = {
    currentStyle: false,
  };
}

if (typeof navigator === 'undefined') {
  // @ts-ignore
  global.navigator = { appVersion: 0, userAgent: '' };
}

if (typeof window === 'undefined') {
  // @ts-ignore
  global.window = {};

  // @ts-ignore
  global.window.location = { search: '' };

  // @ts-ignore
  global.window.addEventListener = () => {};

  // @ts-ignore
  global.window.removeEventListener = () => {};

  // @ts-ignore
  global.window.navigator = {
    userAgent: '',
  };
}
