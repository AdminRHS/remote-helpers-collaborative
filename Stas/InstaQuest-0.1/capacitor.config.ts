import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.instaquest.app',
  appName: 'InstaQuest',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      keystorePath: 'android.keystore',
      keystoreAlias: 'androiddebugkey',
      keystorePassword: 'android',
      keystoreKeyPassword: 'android',
    },
  },
};

export default config; 