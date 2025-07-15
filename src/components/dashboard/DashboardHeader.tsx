import React from "react";
import type { ConnectionSpeed, ScrollMetrics, WellnessState } from "../types";

interface DashboardHeaderProps {
  connectionSpeed: ConnectionSpeed;
  scrollMetrics: ScrollMetrics;
  wellnessState: WellnessState;
  onOpenSettings: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  connectionSpeed,
  scrollMetrics,
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
    <header className="dashboard-header">
      <h1>Social Media Wellness Dashboard</h1>
      <div className="metrics-bar">
        <div className="metric">
          <span className="metric-label">Connection:</span>
          <span className={`metric-value ${connectionSpeed}`}>
            {connectionSpeed === "fast" ? "🚀 Fast" : "🐌 Slow"}
          </span>
        </div>
        <div className="metric">
          <span className="metric-label">Scroll Speed:</span>
          <span className="metric-value">
            {scrollMetrics.scrollSpeed.toFixed(2)}px/ms
          </span>
        </div>
        <div className="metric">
          <span className="metric-label">Session:</span>
          <span className="metric-value">
            {formatTime(wellnessState.sessionTime)}
          </span>
        </div>
        <div className="metric">
          <span className="metric-label">Today:</span>
          <span className="metric-value">
            {formatTime(wellnessState.totalTimeToday)}
          </span>
        </div>
        <button className="settings-btn" onClick={onOpenSettings}>
          ⚙️ Settings
        </button>
      </div>
      {scrollMetrics.isMindlessScrolling && (
        <div className="mindless-warning">⚠️ Mindless scrolling detected</div>
      )}
    </header>
  );
};

export default DashboardHeader;
