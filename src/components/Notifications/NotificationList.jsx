import { useEffect, useState } from "react";

import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    clearAllNotifications,
} from "../../api/notificationApi";

import "./NotificationList.css";

function NotificationList() {

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState("ALL");

    const loadNotifications = async () => {

        try {

            setLoading(true);

            const data = await getNotifications();

            setNotifications(
                Array.isArray(data) ? data : []
            );

        } catch (error) {

            console.error(
                "Notification loading error:",
                error
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotifications();
    }, []);

    const handleMarkRead = async (id) => {

        try {

            await markNotificationAsRead(id);

            setNotifications((previous) =>
                previous.map((notification) =>
                    notification.id === id
                        ? {
                            ...notification,
                            read: true,
                        }
                        : notification
                )
            );

        } catch (error) {

            console.error(error);
        }
    };

    const handleMarkAllRead = async () => {

        try {

            await markAllNotificationsAsRead();

            setNotifications((previous) =>
                previous.map((notification) => ({
                    ...notification,
                    read: true,
                }))
            );

        } catch (error) {

            console.error(error);
        }
    };

    const handleDelete = async (id) => {

        try {

            await deleteNotification(id);

            setNotifications((previous) =>
                previous.filter(
                    (notification) =>
                        notification.id !== id
                )
            );

        } catch (error) {

            console.error(error);
        }
    };

    const handleClearAll = async () => {

        const confirmed =
            window.confirm(
                "Are you sure you want to clear all notifications?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await clearAllNotifications();

            setNotifications([]);

        } catch (error) {

            console.error(error);
        }
    };

    const filteredNotifications =
        notifications.filter((notification) => {

            if (filter === "UNREAD") {
                return !notification.read;
            }

            if (filter === "READ") {
                return notification.read;
            }

            return true;
        });

    const getIcon = (type) => {

        switch (type) {

            case "STUDENT":
                return "👨‍🎓";

            case "TEACHER":
                return "👨‍🏫";

            case "BATCH":
                return "📚";

            case "CLASSROOM":
                return "🏫";

            case "ATTENDANCE":
                return "☑️";

            case "ASSIGNMENT":
                return "📝";

            case "SYSTEM":
                return "⚙️";

            default:
                return "🔔";
        }
    };

    const formatDate = (date) => {

        if (!date) {
            return "";
        }

        const notificationDate =
            new Date(date);

        if (Number.isNaN(
            notificationDate.getTime()
        )) {
            return "";
        }

        return notificationDate.toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };

    return (
        <div className="notification-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="notification-page-header">

                <div>

                    <h1>
                        Notifications
                    </h1>

                    <p>
                        Stay updated with your EduTrack activities
                    </p>

                </div>

                <div className="notification-actions">

                    <button
                        type="button"
                        className="secondary-button"
                        onClick={handleMarkAllRead}
                    >
                        ✓ Mark all read
                    </button>

                    <button
                        type="button"
                        className="danger-button"
                        onClick={handleClearAll}
                    >
                        Clear all
                    </button>

                </div>

            </div>

            {/* =================================================
                FILTERS
            ================================================= */}

            <div className="notification-filter-card">

                <button
                    type="button"
                    className={
                        filter === "ALL"
                            ? "filter-button active"
                            : "filter-button"
                    }
                    onClick={() => setFilter("ALL")}
                >
                    All
                </button>

                <button
                    type="button"
                    className={
                        filter === "UNREAD"
                            ? "filter-button active"
                            : "filter-button"
                    }
                    onClick={() => setFilter("UNREAD")}
                >
                    Unread
                </button>

                <button
                    type="button"
                    className={
                        filter === "READ"
                            ? "filter-button active"
                            : "filter-button"
                    }
                    onClick={() => setFilter("READ")}
                >
                    Read
                </button>

            </div>

            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

            <div className="notification-list-card">

                {loading ? (

                    <div className="notification-empty">
                        Loading notifications...
                    </div>

                ) : filteredNotifications.length === 0 ? (

                    <div className="notification-empty">

                        <div className="empty-icon">
                            🔔
                        </div>

                        <h3>
                            No notifications
                        </h3>

                        <p>
                            You're all caught up!
                        </p>

                    </div>

                ) : (

                    filteredNotifications.map(
                        (notification) => (

                            <div
                                key={notification.id}
                                className={
                                    notification.read
                                        ? "notification-item read"
                                        : "notification-item unread"
                                }
                            >

                                <div className="notification-type-icon">
                                    {getIcon(
                                        notification.type
                                    )}
                                </div>

                                <div className="notification-content">

                                    <div className="notification-title-row">

                                        <h3>
                                            {notification.title}
                                        </h3>

                                        {!notification.read && (
                                            <span className="unread-dot">
                                            </span>
                                        )}

                                    </div>

                                    <p>
                                        {notification.message}
                                    </p>

                                    <span className="notification-date">
                                        {formatDate(
                                            notification.createdAt
                                        )}
                                    </span>

                                </div>

                                <div className="notification-item-actions">

                                    {!notification.read && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleMarkRead(
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
                                        onClick={() =>
                                            handleDelete(
                                                notification.id
                                            )
                                        }
                                        title="Delete"
                                    >
                                        ×
                                    </button>

                                </div>

                            </div>
                        )
                    )
                )}

            </div>

        </div>
    );
}

export default NotificationList;