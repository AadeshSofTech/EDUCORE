import { useEffect, useState, useRef } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Moon,
  Search,
  Sun,
  LogOut,
  Menu,
  Clock,
  Globe,
  Maximize2,
  X,
  ChevronDown,
} from "lucide-react";

export const Header = ({ collapsed, setCollapsed }) => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", profilePhoto: "" });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const drawerRef = useRef(null);

  // -------------------------
  // Fetch User
  // -------------------------
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setUser({
            name: data.name || "",
            profilePhoto: data.profilePhoto || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };
    fetchUserData();
  }, []);

  // -------------------------
  // Logout
  // -------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  // -------------------------
  // Fullscreen Toggle
  // -------------------------
  const toggleFullScreen = async () => {
    try {
      const doc = window.document;
      const isFull = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );

      if (!isFull) {
        const el = document.documentElement;
        if (el.requestFullscreen) await el.requestFullscreen();
        else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
        else if (el.mozRequestFullScreen) await el.mozRequestFullScreen();
        else if (el.msRequestFullscreen) await el.msRequestFullscreen();
      } else {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) await document.mozCancelFullScreen();
        else if (document.msExitFullscreen) await document.msExitFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen toggle failed:", err);
    }
  };

  // -------------------------
  // Notifications Drawer
  // -------------------------
  const openNotifications = async () => {
    setNotificationsOpen(true);
    if (notifications.length > 0) return;

    setLoadingNotifications(true);
    try {
      // Dummy notifications (replace with API)
      const dummy = [
        {
          id: 1,
          title: "New Assignment Uploaded",
          body: "A new assignment on JavaScript is available in your course.",
          createdAt: new Date(),
          read: false,
        },
        {
          id: 2,
          title: "Meeting Reminder",
          body: "Team meeting scheduled at 3:00 PM today.",
          createdAt: new Date(),
          read: true,
        },
        {
          id: 3,
          title: "New Message from Admin",
          body: "Please check your inbox for the latest announcement.",
          createdAt: new Date(),
          read: false,
        },
      ];
      setNotifications(dummy);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setNotifications([]);
    } finally {
      setLoadingNotifications(false);
    }
  };

  const closeNotifications = () => {
    setNotificationsOpen(false);
    setSelectedNotification(null);
  };

  const openNotificationDetails = (notification) => {
    setSelectedNotification(notification);
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === notification.id ? { ...item, read: true } : item
      )
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 flex h-[70px] items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-x-3">
          <button
            className="text-gray-600 hover:text-blue-600 lg:hidden"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>

          {/* Mobile Logo */}
          <div className="block sm:hidden">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              <span className="text-blue-600">Frontier</span>
              <span className="text-orange-500">LMS</span>
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-x-2 sm:gap-x-4">
          <button
            className="text-gray-600 dark:text-gray-300 sm:hidden"
            onClick={() => {
              const q = window.prompt("Search...");
              if (q) console.log("Search query:", q);
            }}
          >
            <Search size={20} />
          </button>

          <div className="hidden items-center gap-x-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1 dark:bg-blue-900/30 sm:flex">
            <Clock size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
              2024-25
            </span>
          </div>

          <button
            className="hidden text-gray-600 hover:text-blue-600 dark:text-gray-300 sm:inline-flex"
            onClick={toggleFullScreen}
            title="Toggle fullscreen"
          >
            <Maximize2 size={20} />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300"
              onClick={openNotifications}
            >
              <Bell size={20} />
            </button>
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {unreadCount}
              </span>
            )}
          </div>

          <div className="hidden items-center gap-x-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 dark:bg-gray-800 sm:flex">
            <Globe size={16} className="text-gray-600 dark:text-gray-300" />
            <span className="text-sm text-gray-700 dark:text-gray-300">EN</span>
          </div>

          <button
            className="text-gray-600 hover:text-blue-600 dark:text-gray-300"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 rounded-full focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={user.name}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-orange-500 text-sm font-bold text-white">
                  {user.name ? user.name[0]?.toUpperCase() : "D"}
                </div>
              )}
              <ChevronDown
                size={16}
                className="hidden text-gray-500 dark:text-gray-300 sm:block"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-md border bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="border-b p-3 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user.name || "Demo User"}
                  </p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ---------------------- */}
      {/* Notifications Drawer */}
      {/* ---------------------- */}
      <div
        ref={drawerRef}
        className={`fixed inset-y-0 right-0 z-40 mt-[5%] w-full max-w-md transform bg-white shadow-lg transition-transform duration-300 dark:bg-gray-900 ${
          notificationsOpen ? "translate-x-0" : "translate-x-full"
        } sm:rounded-l-lg`}
      >
        <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {selectedNotification ? "Notification Detail" : "Notifications"}
          </h3>
          <div className="flex items-center gap-2">
            {selectedNotification && (
              <button
                onClick={() => setSelectedNotification(null)}
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300"
              >
                ← Back
              </button>
            )}
            <button
              onClick={closeNotifications}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300"
            >
              <X />
            </button>
          </div>
        </div>

        {/* Notification List View */}
        {!selectedNotification && (
          <div className="h-[calc(100%-64px)] overflow-auto p-4 transition-all duration-300">
            {loadingNotifications ? (
              <div className="text-center text-sm text-gray-500">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="text-center text-sm text-gray-500">
                No notifications
              </div>
            ) : (
              <ul className="space-y-3">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    onClick={() => openNotificationDetails(n)}
                    className={`cursor-pointer flex flex-col gap-1 rounded-lg border p-3 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 ${
                      n.read ? "opacity-70" : "bg-blue-50 dark:bg-blue-900/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {n.title}
                      </h4>
                      <span className="text-xs text-gray-400">
                        {new Date(n.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
                      {n.body}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Notification Detail View */}
        {selectedNotification && (
          <div className="h-[calc(100%-64px)] overflow-auto p-4 animate-fade-in">
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {selectedNotification.title[0].toUpperCase()}
                </div>
                <div>
                  <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">
                    {selectedNotification.title}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {new Date(selectedNotification.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="mt-2 rounded-lg bg-gray-100 p-3 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300 w-full">
                {selectedNotification.body}
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Back to Notifications
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
