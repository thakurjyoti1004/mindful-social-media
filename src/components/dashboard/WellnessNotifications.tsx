import React from "react";
import { WellnessState, WellnessSettings } from "../types";

interface WellnessNotificationsProps {
  wellnessState: WellnessState;
  wellnessSettings: WellnessSettings;
  onTakeBreak: () => void;
  onDismissBreak: () => void;
  onDismissAlert: () => void;
}

const WellnessNotifications: React.FC<WellnessNotificationsProps> = ({
  wellnessState,
  wellnessSettings,
  onTakeBreak,
  onDismissBreak,
  onDismissAlert,
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
    <>
      {wellnessState.showBreakReminder && (
        <div className="wellness-notification break-reminder">
          <div className="notification-content">
            <h3>🧘‍♀️ Time for a Break!</h3>
            <p>
              You've been scrolling for {wellnessSettings.breakReminderInterval}{" "}
              minutes. Take a moment to rest your eyes and stretch.
            </p>
            <div className="notification-actions">
              <button onClick={onTakeBreak} className="primary-btn">
                Take Break
              </button>
              <button onClick={onDismissBreak}>Dismiss</button>
            </div>
          </div>
        </div>
      )}

      {wellnessState.showScreenTimeAlert && (
        <div className="wellness-notification screen-time-alert">
          <div className="notification-content">
            <h3>📱 Screen Time Alert</h3>
            <p>
              You've spent {formatTime(wellnessState.totalTimeToday)} on social
              media today. Consider taking a longer break.
            </p>
            <div className="notification-actions">
              <button onClick={onDismissAlert} className="primary-btn">
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WellnessNotifications;
