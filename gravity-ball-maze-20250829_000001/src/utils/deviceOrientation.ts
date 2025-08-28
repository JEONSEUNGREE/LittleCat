export const requestOrientationPermission = async (): Promise<boolean> => {
  // Check if DeviceOrientationEvent exists and has requestPermission
  if (
    typeof DeviceOrientationEvent !== 'undefined' &&
    'requestPermission' in DeviceOrientationEvent &&
    typeof (DeviceOrientationEvent as any).requestPermission === 'function'
  ) {
    try {
      const permission = await (DeviceOrientationEvent as any).requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting device orientation permission:', error);
      return false;
    }
  }

  // For devices that don't require permission (Android, desktop)
  return new Promise((resolve) => {
    const testHandler = (event: DeviceOrientationEvent) => {
      window.removeEventListener('deviceorientation', testHandler);
      resolve(event.alpha !== null || event.beta !== null || event.gamma !== null);
    };

    window.addEventListener('deviceorientation', testHandler);

    // Timeout after 1 second if no orientation data
    setTimeout(() => {
      window.removeEventListener('deviceorientation', testHandler);
      resolve(false);
    }, 1000);
  });
};