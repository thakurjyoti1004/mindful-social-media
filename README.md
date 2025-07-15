# Social Media Wellness Dashboard

A mindful social media experience that promotes healthy digital habits through intelligent monitoring, break reminders, and wellness features.

## API Used
- https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API
- https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API

## 🌟 Features

### Wellness & Mindfulness
- *Break Reminders*: Automatic prompts to take breaks every 15 minutes
- *Time Limits*: Set daily usage limits with visual progress tracking
- *Screen Time Alerts*: Real-time notifications when approaching time limits
- *Mindless Scrolling Detection*: Tracks rapid scrolling patterns and suggests breaks

### Smart Performance
- *Network-Aware Loading*: Adjusts content loading based on connection speed
  - Fast connection: 10 posts per batch
  - Slow connection: 5 posts per batch
- *Infinite Scroll*: Smooth, performance-optimized content loading
- *Scroll Speed Tracking*: Monitors scrolling behavior for wellness insights

### Dashboard Analytics
- *Real-time Metrics*: Live tracking of time spent, posts viewed, and scrolling speed
- *Visual Indicators*: Color-coded alerts and progress bars
- *Session Management*: Track and manage your daily social media sessions

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. *Clone the repository*
   bash
   git clone https://github.com/your-username/social-media-wellness-dashboard.git
   cd social-media-wellness-dashboard
   

2. *Install dependencies*
   bash
   npm install
   

3. *Start the development server*
   bash
   npm run dev
   

4. *Open your browser*
   Navigate to http://localhost:8080

### Building for Production

bash
npm run build


## 🛠️ Technologies Used

- *Frontend Framework*: React 18 with TypeScript
- *Build Tool*: Vite
- *Styling*: Tailwind CSS with custom design system
- *UI Components*: Radix UI primitives
- *Routing*: React Router DOM
- *Development*: Hot reload with fast refresh

## 📱 Usage

### Setting Time Limits
1. The dashboard displays your daily time limit progress
2. Visual indicators show when you're approaching your limit
3. Alerts appear at 80% and 100% of your daily limit

### Break Reminders
- Automatic reminders appear every 15 minutes
- Click "Take a Break" to pause your session
- Break suggestions help maintain healthy usage patterns

### Monitoring Your Habits
- *Time Spent*: Track total session time
- *Posts Viewed*: Monitor content consumption
- *Scroll Speed*: Awareness of browsing intensity
- *Mindless Scrolling*: Alerts when scrolling too rapidly
