export type ConnectionSpeed = "fast" | "slow";

export interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  image?: string;
  timeSpent?: number;
}

export interface ScrollMetrics {
  scrollSpeed: number;
  timeOnPost: number;
  isMindlessScrolling: boolean;
}

export interface WellnessSettings {
  dailyTimeLimit: number; // minutes
  sessionTimeLimit: number; // minutes
  breakReminderInterval: number; // minutes
  screenTimeAlertThreshold: number; // minutes
}

export interface WellnessState {
  totalTimeToday: number; // minutes
  sessionTime: number; // minutes
  lastBreakTime: number; // timestamp
  timeLimitReached: boolean;
  showBreakReminder: boolean;
  showScreenTimeAlert: boolean;
}

export interface NetworkInformation {
  effectiveType: "slow-2g" | "2g" | "3g" | "4g";
  addEventListener: (type: string, listener: () => void) => void;
  removeEventListener: (type: string, listener: () => void) => void;
}

declare global {
  interface Navigator {
    connection?: NetworkInformation;
  }
}
