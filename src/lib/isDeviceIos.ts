function isDeviceIos() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

export default isDeviceIos