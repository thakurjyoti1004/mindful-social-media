import React from "react";
import { WellnessSettings, WellnessState } from "../types";

interface SettingsModalProps {
  show: boolean;
  wellnessSettings: WellnessSettings;
  wellnessState: WellnessState;
  onUpdateSettings: (settings: Partial<WellnessSettings>) => void;
  onSave: () => void;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  show,
  wellnessSettings,
  wellnessState,
  onUpdateSettings,
  onSave,
  onClose,
}) => {
  if (!show) return null;

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="settings-modal">
      <div className="settings-content">
        <h2>Wellness Settings</h2>

        <div className="setting-group">
          <label>Daily Time Limit (minutes)</label>
          <input
            type="number"
            value={wellnessSettings.dailyTimeLimit}
            onChange={(e) =>
              onUpdateSettings({
                dailyTimeLimit: parseInt(e.target.value),
              })
            }
            min="1"
            max="1440"
          />
        </div>

        <div className="setting-group">
          <label>Session Time Limit (minutes)</label>
          <input
            type="number"
            value={wellnessSettings.sessionTimeLimit}
            onChange={(e) =>
              onUpdateSettings({
                sessionTimeLimit: parseInt(e.target.value),
              })
            }
            min="1"
            max="240"
          />
        </div>

        <div className="setting-group">
          <label>Break Reminder Interval (minutes)</label>
          <input
            type="number"
            value={wellnessSettings.breakReminderInterval}
            onChange={(e) =>
              onUpdateSettings({
                breakReminderInterval: parseInt(e.target.value),
              })
            }
            min="5"
            max="120"
          />
        </div>

        <div className="setting-group">
          <label>Screen Time Alert Threshold (minutes)</label>
          <input
            type="number"
            value={wellnessSettings.screenTimeAlertThreshold}
            onChange={(e) =>
              onUpdateSettings({
                screenTimeAlertThreshold: parseInt(e.target.value),
              })
            }
            min="15"
            max="480"
          />
        </div>

        <div className="current-usage">
          <h3>Current Usage</h3>
          <p>Session: {formatTime(wellnessState.sessionTime)}</p>
          <p>Today: {formatTime(wellnessState.totalTimeToday)}</p>
        </div>

        <div className="settings-actions">
          <button onClick={onSave} className="primary-btn">
            Save & Continue
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
