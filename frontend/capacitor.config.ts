import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.abenterprises.app',
  appName: 'ABEnterprises',
  webDir: 'dist',
  server: {
    // Keep the bundled web build — never proxy to a dev server in production.
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
