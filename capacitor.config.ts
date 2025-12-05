import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.mahavir.helpdesk",
  appName: "IT Helpdesk",
  webDir: "dist",
  server: {
    url: "https://helpdesk.mahavirgroup.co",
    cleartext: false,
  },
};

export default config;
