const getMobileDetect = (userAgent: any) => {
   const isAndroid = () => !!userAgent.match(/Android/i);
   const isIOS = () => !!userAgent.match(/iPhone|iPad|iPod/i);
   const isMac = () => !!userAgent.match(/Mac/i);
   const isOpera = () => !!userAgent.match(/Opera Mini/i);
   const isWindows = () => !!userAgent.match(/IEMobile/i);
   const isSSR = () => !!userAgent.match(/SSR/i);
   const isSafari = () => !!userAgent.match(/Safari/i) && userAgent.indexOf('Chrome') <= -1;
   const isMobile = () => !!(isAndroid() || isIOS() || isOpera() || isWindows());
   const isDesktop = () => !!(!isMobile() && !isSSR());
   return {
      isMobile: isMobile(),
      isDesktop: isDesktop(),
      isAndroid: isAndroid(),
      isIOS: isIOS(),
      isSSR: isSSR(),
      isMac: isMac(),
      isSafari: isSafari(),
   };
};
const useDeviceDetect = () => {
   const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

   return getMobileDetect(userAgent);
};

export default useDeviceDetect;
