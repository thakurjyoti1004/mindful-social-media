import React, { useState, useEffect, useRef, useCallback } from "react";
import "./SocialMediaDashboard.css";
import DashboardHeader from "./dashboard/DashboardHeader";
import PostsFeed from "./dashboard/PostsFeed";
import WellnessNotifications from "./dashboard/WellnessNotifications";
import SettingsModal from "./dashboard/SettingsModal";
import TimeLimitScreen from "./dashboard/TimeLimitScreen";
import type {
  Post,
  ScrollMetrics,
  WellnessSettings,
  WellnessState,
  ConnectionSpeed,
} from "./types";

const SocialMediaDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [connectionSpeed, setConnectionSpeed] =
    useState<ConnectionSpeed>("fast");
  const [scrollMetrics, setScrollMetrics] = useState<ScrollMetrics>({
    scrollSpeed: 0,
    timeOnPost: 0,
    isMindlessScrolling: false,
  });

  const [wellnessSettings, setWellnessSettings] = useState<WellnessSettings>({
    dailyTimeLimit: 120, // 2 hours
    sessionTimeLimit: 30, // 30 minutes
    breakReminderInterval: 20, // 20 minutes
    screenTimeAlertThreshold: 60, // 1 hour
  });

  const [wellnessState, setWellnessState] = useState<WellnessState>({
    totalTimeToday: 0,
    sessionTime: 0,
    lastBreakTime: Date.now(),
    timeLimitReached: false,
    showBreakReminder: false,
    showScreenTimeAlert: false,
  });

  const [showSettings, setShowSettings] = useState(false);
  const [sessionStartTime] = useState(Date.now());

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);
  const scrollSpeedRef = useRef<number[]>([]);
  const lastScrollTime = useRef<number>(Date.now());
  const lastScrollY = useRef<number>(0);

  // Generate dummy posts
  const generateDummyPosts = useCallback(
    (startIndex: number, count: number): Post[] => {
      const authors = [
        "Alice Johnson",
        "Bob Smith",
        "Carol Davis",
        "David Wilson",
        "Emma Brown",
        "Frank Miller",
        "Grace Lee",
        "Henry Taylor",
      ];
      const contents = [
        "Just had an amazing coffee at the new café downtown! ☕️",
        "Beautiful sunset today, nature never fails to amaze me 🌅",
        "Finished reading a fantastic book, highly recommend it! 📚",
        "Working on a new project, excited to share the results soon 💻",
        "Weekend hiking trip was incredible, fresh air does wonders 🥾",
        "Cooking experiment turned out better than expected 👨‍🍳",
        "Music festival was absolutely mind-blowing! 🎵",
        "Learning something new every day keeps life interesting 🧠",
      ];

      return Array.from({ length: count }, (_, i) => ({
        id: `post-${startIndex + i}`,
        author: authors[(startIndex + i) % authors.length],
        content: contents[(startIndex + i) % contents.length],
        timestamp: new Date(
          Date.now() - (startIndex + i) * 3600000
        ).toLocaleString(),
        likes: Math.floor(Math.random() * 500) + 10,
        image:
          Math.random() > 0.6
            ? `https://picsum.photos/400/300?random=${startIndex + i}`
            : undefined,
      }));
    },
    []
  );

  // Detect network speed
  useEffect(() => {
    const checkConnectionSpeed = () => {
      if ("connection" in navigator && navigator.connection) {
        const effectiveType = navigator.connection.effectiveType;

        if (effectiveType === "4g" || effectiveType === "3g") {
          setConnectionSpeed("fast");
        } else {
          setConnectionSpeed("slow");
        }
      }
    };

    checkConnectionSpeed();

    // Listen for connection changes
    if ("connection" in navigator && navigator.connection) {
      navigator.connection.addEventListener("change", checkConnectionSpeed);

      return () => {
        navigator.connection?.removeEventListener(
          "change",
          checkConnectionSpeed
        );
      };
    }
  }, []);

  // Load initial posts
  useEffect(() => {
    const initialBatchSize = connectionSpeed === "fast" ? 10 : 5;
    const initialPosts = generateDummyPosts(0, initialBatchSize);
    setPosts(initialPosts);
    setCurrentPage(1);
  }, [connectionSpeed, generateDummyPosts]);

  // Time tracking and wellness checks
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const sessionMinutes = (now - sessionStartTime) / (1000 * 60);
      const totalTodayKey = `totalToday_${new Date().toDateString()}`;
      const storedTotalToday = parseFloat(
        localStorage.getItem(totalTodayKey) || "0"
      );
      const newTotalToday = storedTotalToday + 1 / 60; // Add 1 minute

      setWellnessState((prev) => {
        const newState = {
          ...prev,
          sessionTime: sessionMinutes,
          totalTimeToday: newTotalToday,
        };

        // Check break reminder
        const timeSinceLastBreak = (now - prev.lastBreakTime) / (1000 * 60);
        if (timeSinceLastBreak >= wellnessSettings.breakReminderInterval) {
          newState.showBreakReminder = true;
        }

        // Check screen time alert
        if (
          newTotalToday >= wellnessSettings.screenTimeAlertThreshold &&
          !prev.showScreenTimeAlert
        ) {
          newState.showScreenTimeAlert = true;
        }

        // Check time limits
        const sessionLimitReached =
          sessionMinutes >= wellnessSettings.sessionTimeLimit;
        const dailyLimitReached =
          newTotalToday >= wellnessSettings.dailyTimeLimit;
        newState.timeLimitReached = sessionLimitReached || dailyLimitReached;

        return newState;
      });

      // Store total time for today
      localStorage.setItem(totalTodayKey, newTotalToday.toString());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [sessionStartTime, wellnessSettings]);

  // Load today's usage from localStorage
  useEffect(() => {
    const totalTodayKey = `totalToday_${new Date().toDateString()}`;
    const storedTotalToday = parseFloat(
      localStorage.getItem(totalTodayKey) || "0"
    );
    setWellnessState((prev) => ({ ...prev, totalTimeToday: storedTotalToday }));
  }, []);

  // Load more posts
  const loadMorePosts = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate network delay
    setTimeout(
      () => {
        const batchSize = connectionSpeed === "fast" ? 10 : 5;
        const startIndex = currentPage * batchSize;

        if (startIndex >= 100) {
          // Total of 100 dummy posts
          setHasMore(false);
          setLoading(false);
          return;
        }

        const newPosts = generateDummyPosts(
          startIndex,
          Math.min(batchSize, 100 - startIndex)
        );
        setPosts((prev) => [...prev, ...newPosts]);
        setCurrentPage((prev) => prev + 1);
        setLoading(false);
      },
      connectionSpeed === "fast" ? 500 : 1000
    );
  }, [loading, hasMore, currentPage, connectionSpeed, generateDummyPosts]);

  // Track scroll speed and detect mindless scrolling
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const currentY = window.scrollY;
      const timeDiff = now - lastScrollTime.current;
      const distanceDiff = Math.abs(currentY - lastScrollY.current);

      if (timeDiff > 0) {
        const speed = distanceDiff / timeDiff;
        scrollSpeedRef.current.push(speed);

        // Keep only last 10 measurements
        if (scrollSpeedRef.current.length > 10) {
          scrollSpeedRef.current.shift();
        }

        // Calculate average speed
        const avgSpeed =
          scrollSpeedRef.current.reduce((a, b) => a + b, 0) /
          scrollSpeedRef.current.length;

        // Detect mindless scrolling (fast, consistent scrolling)
        const isMindless = avgSpeed > 2 && scrollSpeedRef.current.length >= 5;

        setScrollMetrics((prev) => ({
          ...prev,
          scrollSpeed: avgSpeed,
          isMindlessScrolling: isMindless,
        }));
      }

      lastScrollTime.current = now;
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for infinite scroll and time tracking
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === lastPostRef.current && entry.isIntersecting) {
            loadMorePosts();
          }

          // Track time spent on posts
          if (entry.isIntersecting) {
            const postId = entry.target.getAttribute("data-post-id");
            if (postId) {
              // Start timing when post comes into view
              entry.target.setAttribute(
                "data-view-start",
                Date.now().toString()
              );
            }
          } else {
            // Calculate time spent when post leaves view
            const postId = entry.target.getAttribute("data-post-id");
            const viewStart = entry.target.getAttribute("data-view-start");

            if (postId && viewStart) {
              const timeSpent = Date.now() - parseInt(viewStart);
              setScrollMetrics((prev) => ({
                ...prev,
                timeOnPost: timeSpent,
              }));
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: "200px" }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loadMorePosts]);

  // Observe posts for intersection
  useEffect(() => {
    const postElements = document.querySelectorAll(".post-item");
    postElements.forEach((element) => {
      observerRef.current?.observe(element);
    });

    if (lastPostRef.current) {
      observerRef.current?.observe(lastPostRef.current);
    }
  }, [posts]);

  // Wellness action handlers
  const handleTakeBreak = () => {
    setWellnessState((prev) => ({
      ...prev,
      showBreakReminder: false,
      lastBreakTime: Date.now(),
    }));
  };

  const handleDismissBreak = () => {
    setWellnessState((prev) => ({
      ...prev,
      showBreakReminder: false,
    }));
  };

  const handleDismissAlert = () => {
    setWellnessState((prev) => ({
      ...prev,
      showScreenTimeAlert: false,
    }));
  };

  const handleUpdateSettings = (newSettings: Partial<WellnessSettings>) => {
    setWellnessSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleSaveSettings = () => {
    setWellnessState((prev) => ({
      ...prev,
      timeLimitReached: false,
    }));
    setShowSettings(false);
  };

  // Block content if time limit reached
  if (wellnessState.timeLimitReached) {
    return (
      <TimeLimitScreen
        wellnessState={wellnessState}
        onOpenSettings={() => setShowSettings(true)}
      />
    );
  }

  return (
    <div className="dashboard-container">
      <DashboardHeader
        connectionSpeed={connectionSpeed}
        scrollMetrics={scrollMetrics}
        wellnessState={wellnessState}
        onOpenSettings={() => setShowSettings(true)}
      />

      <PostsFeed
        posts={posts}
        loading={loading}
        hasMore={hasMore}
        connectionSpeed={connectionSpeed}
        lastPostRef={(node) => {
          lastPostRef.current = node;
        }}
      />

      <WellnessNotifications
        wellnessState={wellnessState}
        wellnessSettings={wellnessSettings}
        onTakeBreak={handleTakeBreak}
        onDismissBreak={handleDismissBreak}
        onDismissAlert={handleDismissAlert}
      />

      <SettingsModal
        show={showSettings}
        wellnessSettings={wellnessSettings}
        wellnessState={wellnessState}
        onUpdateSettings={handleUpdateSettings}
        onSave={handleSaveSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
};

export default SocialMediaDashboard;
