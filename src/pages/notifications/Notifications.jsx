import React, { useEffect, useState } from "react";
import "./Notifications.css";

const API_BASE_URL = "http://localhost:8080";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const getToken = () => {
        return (
            localStorage.getItem("token") ||
            localStorage.getItem("jwtToken") ||
            localStorage.getItem("accessToken")
        );
    };

    const getHeaders = () => {
        const token = getToken();

        return {
            "Content-Type": "application/json",
            ...(token
                ? {
                      Authorization: token.startsWith("Bearer ")
                          ? token
                          : `Bearer ${token}`,
                  }
                : {}),
        };
    };

    // =====================================================
    // LOAD NOTIFICATIONS
    // =====================================================

    const loadNotifications = async () => {
        try {
            setLoading(true);

            const username =
                localStorage.getItem("username") ||
                localStorage.getItem("userName");

            let url = `${API_BASE_URL}/api/notifications`;

            if (username) {
                url += `?username=${encodeURIComponent(username)}`;
            }

            const response = await fetch(url, {
                method: "GET",
                headers: getHeaders(),
            });

            if (!response.ok) {
                throw new Error("Failed to load notifications");
            }

            const data = await response.json();

            setNotifications(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error loading notifications:", error);
            setNotifications([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotifications();
    }, []);

    // =====================================================
    // MARK AS READ
    // =====================================================

    const markAsRead = async (id) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/notifications/${id}/read`,
                {
                    method: "PUT",
                    headers: getHeaders(),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to mark notification as read");
            }

            setNotifications((previous) =>
                previous.map((notification) =>
                    notification.id === id
                        ? { ...notification, read: true }
                        : notification
                )
            );
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    // =====================================================
    // DELETE NOTIFICATION
    // =====================================================

    const deleteNotification = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this notification?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(id);

            const response = await fetch(
                `${API_BASE_URL}/api/notifications/${id}`,
                {
                    method: "DELETE",
                    headers: getHeaders(),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete notification");
            }

            setNotifications((previous) =>
                previous.filter((notification) => notification.id !== id)
            );
        } catch (error) {
            console.error("Error deleting notification:", error);
            alert("Unable to delete notification.");
        } finally {
            setDeletingId(null);
        }
    };

    // =====================================================
    // DELETE ALL
    // =====================================================

    const deleteAllNotifications = async () => {
        if (notifications.length === 0) {
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete all notifications?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const username =
                localStorage.getItem("username") ||
                localStorage.getItem("userName");

            let url = `${API_BASE_URL}/api/notifications`;

            if (username) {
                url += `?username=${encodeURIComponent(username)}`;
            }

            const response = await fetch(url, {
                method: "DELETE",
                headers: getHeaders(),
            });

            if (!response.ok) {
                throw new Error("Failed to delete notifications");
            }

            setNotifications([]);
        } catch (error) {
            console.error("Error deleting all notifications:", error);
            alert("Unable to delete notifications.");
        }
    };

    // =====================================================
    // MARK ALL AS READ
    // =====================================================

    const markAllAsRead = async () => {
        const unreadNotifications = notifications.filter(
            (notification) => !notification.read
        );

        try {
            await Promise.all(
                unreadNotifications.map((notification) =>
                    fetch(
                        `${API_BASE_URL}/api/notifications/${notification.id}/read`,
                        {
                            method: "PUT",
                            headers: getHeaders(),
                        }
                    )
                )
            );

            setNotifications((previous) =>
                previous.map((notification) => ({
                    ...notification,
                    read: true,
                }))
            );
        } catch (error) {
            console.error("Error marking all as read:", error);
        }
    };

    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (dateValue) => {
        if (!dateValue) {
            return "";
        }

        try {
            return new Date(dateValue).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return "";
        }
    };

    // =====================================================
    // ICON
    // =====================================================

    const getNotificationIcon = (type) => {
        switch ((type || "").toLowerCase()) {
            case "success":
                return "✓";

            case "warning":
                return "!";

            case "error":
                return "×";

            case "assignment":
                return "📝";

            case "attendance":
                return "✓";

            case "student":
                return "👨‍🎓";

            case "teacher":
                return "👨‍🏫";

            case "batch":
                return "▣";

            default:
                return "🔔";
        }
    };

    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="notification-page">
                <div className="notification-loading">
                    <div className="notification-spinner"></div>
                    <p>Loading notifications...</p>
                </div>
            </div>
        );
    }

    // =====================================================
    // PAGE
    // =====================================================

    return (
        <div className="notification-page">

            {/* HEADER */}

            <div className="notification-header">

                <div>
                    <h1>Notifications</h1>

                    <p>
                        Stay updated with the latest activities
                        and important information.
                    </p>
                </div>

                <button
                    type="button"
                    className="notification-refresh-button"
                    onClick={loadNotifications}
                >
                    ↻ Refresh
                </button>

            </div>


            {/* SUMMARY */}

            <div className="notification-summary">

                <div className="notification-summary-card">
                    <div className="summary-icon">🔔</div>

                    <div>
                        <span>Total Notifications</span>
                        <strong>{notifications.length}</strong>
                    </div>
                </div>


                <div className="notification-summary-card unread">
                    <div className="summary-icon">●</div>

                    <div>
                        <span>Unread</span>
                        <strong>{unreadCount}</strong>
                    </div>
                </div>


                <div className="notification-actions">

                    <button
                        type="button"
                        onClick={markAllAsRead}
                        disabled={unreadCount === 0}
                        className="mark-all-button"
                    >
                        ✓ Mark All as Read
                    </button>

                    <button
                        type="button"
                        onClick={deleteAllNotifications}
                        disabled={notifications.length === 0}
                        className="delete-all-button"
                    >
                        🗑 Delete All
                    </button>

                </div>

            </div>


            {/* NOTIFICATION LIST */}

            <div className="notification-list">

                {notifications.length === 0 ? (

                    <div className="notification-empty">

                        <div className="empty-notification-icon">
                            🔔
                        </div>

                        <h2>No notifications</h2>

                        <p>
                            You are all caught up.
                            New notifications will appear here.
                        </p>

                    </div>

                ) : (

                    notifications.map((notification) => (

                        <div
                            key={notification.id}
                            className={`notification-item ${
                                notification.read ? "read" : "unread"
                            }`}
                        >

                            {/* ICON */}

                            <div
                                className={`notification-type-icon ${
                                    notification.type || "default"
                                }`}
                            >
                                {getNotificationIcon(notification.type)}
                            </div>


                            {/* CONTENT */}

                            <div className="notification-content">

                                <div className="notification-title-row">

                                    <h3>
                                        {notification.title ||
                                            "Notification"}
                                    </h3>

                                    {!notification.read && (
                                        <span className="unread-badge">
                                            New
                                        </span>
                                    )}

                                </div>


                                <p>
                                    {notification.message}
                                </p>


                                <div className="notification-meta">

                                    <span>
                                        🕘{" "}
                                        {formatDate(
                                            notification.createdAt
                                        )}
                                    </span>

                                    {notification.type && (
                                        <span className="notification-type">
                                            {notification.type}
                                        </span>
                                    )}

                                </div>

                            </div>


                            {/* ACTIONS */}

                            <div className="notification-item-actions">

                                {!notification.read && (
                                    <button
                                        type="button"
                                        className="read-button"
                                        onClick={() =>
                                            markAsRead(
                                                notification.id
                                            )
                                        }
                                        title="Mark as read"
                                    >
                                        ✓
                                    </button>
                                )}

                                <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() =>
                                        deleteNotification(
                                            notification.id
                                        )
                                    }
                                    disabled={
                                        deletingId ===
                                        notification.id
                                    }
                                    title="Delete notification"
                                >
                                    {deletingId ===
                                    notification.id
                                        ? "..."
                                        : "🗑"}
                                </button>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
};

export default Notification;