interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
    prompt(): Promise<void>;
  }
  
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }

declare module '*.glsl' {
    const value: string;
    export default value;
}