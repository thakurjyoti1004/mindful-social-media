import React from "react";
import { WellnessState } from "../types";

interface TimeLimitScreenProps {
  wellnessState: WellnessState;
  onOpenSettings: () => void;
}

const TimeLimitScreen: React.FC<TimeLimitScreenProps> = ({
  wellnessState,
  onOpenSettings,
}) => {
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="time-limit-screen">
      <div className="time-limit-content">
        <h1>⏰ Time Limit Reached</h1>
        <p>You've reached your daily or session limit for social media.</p>
        <div className="time-stats">
          <div>Session Time: {formatTime(wellnessState.sessionTime)}</div>
          <div>Today's Total: {formatTime(wellnessState.totalTimeToday)}</div>
        </div>
        <p>Take a break and come back later! 🌱</p>
        <button className="settings-btn" onClick={onOpenSettings}>
          Adjust Limits
        </button>
      </div>
    </div>
  );
};

export default TimeLimitScreen;
