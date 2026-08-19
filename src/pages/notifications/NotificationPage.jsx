import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    deleteAllNotifications,
} from "../../api/notificationApi";

import "./NotificationPage.css";


// =====================================================
// NOTIFICATION ICON
// =====================================================

const getNotificationIcon = (type) => {

    switch (
        String(type || "").toLowerCase()
    ) {

        case "success":
            return "✓";

        case "warning":
            return "!";

        case "error":
            return "×";

        case "assignment":
            return "A";

        case "attendance":
            return "✓";

        case "student":
            return "S";

        case "teacher":
            return "T";

        case "batch":
            return "B";

        case "system":
            return "⚙";

        default:
            return "●";
    }
};


// =====================================================
// NOTIFICATION TYPE CLASS
// =====================================================

const getNotificationTypeClass = (type) => {

    const normalized =
        String(type || "system")
            .toLowerCase();

    const allowedTypes = [
        "success",
        "warning",
        "error",
        "assignment",
        "attendance",
        "student",
        "teacher",
        "batch",
        "system",
    ];

    return allowedTypes.includes(
        normalized
    )
        ? normalized
        : "system";
};


// =====================================================
// TIME FORMATTER
// =====================================================

const formatTime = (createdAt) => {

    if (!createdAt) {
        return "Recently";
    }

    const date =
        new Date(createdAt);

    if (Number.isNaN(date.getTime())) {
        return "Recently";
    }

    const now = new Date();

    const difference =
        now.getTime() -
        date.getTime();

    const minutes =
        Math.floor(
            difference / 60000
        );

    if (minutes < 1) {
        return "Just now";
    }

    if (minutes < 60) {
        return `${minutes} min ago`;
    }

    const hours =
        Math.floor(
            minutes / 60
        );

    if (hours < 24) {
        return `${hours} hr ago`;
    }

    const days =
        Math.floor(
            hours / 24
        );

    if (days < 7) {
        return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
};


// =====================================================
// MAIN COMPONENT
// =====================================================

const NotificationPage = () => {

    const [notifications, setNotifications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const [actionLoading, setActionLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [activeFilter, setActiveFilter] =
        useState("all");


    // =================================================
    // LOAD NOTIFICATIONS
    // =================================================

    const loadNotifications =
        useCallback(async (
            showRefresh = false
        ) => {

            try {

                setError("");

                if (showRefresh) {
                    setRefreshing(true);
                } else {
                    setLoading(true);
                }

                const data =
                    await getNotifications();

                setNotifications(
                    Array.isArray(data)
                        ? data
                        : []
                );

            } catch (err) {

                console.error(
                    "Error loading notifications:",
                    err
                );

                setError(
                    "Unable to load notifications. Please try again."
                );

            } finally {

                setLoading(false);
                setRefreshing(false);
            }

        }, []);


    // =================================================
    // INITIAL LOAD
    // =================================================

    useEffect(() => {

        loadNotifications();

    }, [loadNotifications]);


    // =================================================
    // UNREAD COUNT
    // =================================================

    const unreadCount =
        useMemo(
            () =>
                notifications.filter(
                    (notification) =>
                        !notification.read
                ).length,
            [notifications]
        );


    // =================================================
    // FILTER
    // =================================================

    const filteredNotifications =
        useMemo(() => {

            if (activeFilter === "unread") {

                return notifications.filter(
                    (notification) =>
                        !notification.read
                );
            }

            return notifications;

        }, [
            notifications,
            activeFilter,
        ]);


    // =================================================
    // MARK SINGLE READ
    // =================================================

    const handleMarkAsRead =
        async (notification) => {

            if (
                notification.read ||
                actionLoading
            ) {
                return;
            }

            try {

                setActionLoading(true);

                await markNotificationAsRead(
                    notification.id
                );

                setNotifications(
                    (previous) =>
                        previous.map(
                            (item) =>
                                item.id ===
                                notification.id
                                    ? {
                                          ...item,
                                          read: true,
                                      }
                                    : item
                        )
                );

            } catch (err) {

                console.error(
                    "Error marking notification as read:",
                    err
                );

            } finally {

                setActionLoading(false);
            }
        };


    // =================================================
    // MARK ALL READ
    // =================================================

    const handleMarkAllAsRead =
        async () => {

            if (
                unreadCount === 0 ||
                actionLoading
            ) {
                return;
            }

            try {

                setActionLoading(true);

                await markAllNotificationsAsRead();

                setNotifications(
                    (previous) =>
                        previous.map(
                            (notification) => ({
                                ...notification,
                                read: true,
                            })
                        )
                );

            } catch (err) {

                console.error(
                    "Error marking all notifications as read:",
                    err
                );

            } finally {

                setActionLoading(false);
            }
        };


    // =================================================
    // DELETE SINGLE
    // =================================================

    const handleDelete =
        async (notificationId) => {

            if (actionLoading) {
                return;
            }

            try {

                setActionLoading(true);

                await deleteNotification(
                    notificationId
                );

                setNotifications(
                    (previous) =>
                        previous.filter(
                            (notification) =>
                                notification.id !==
                                notificationId
                        )
                );

            } catch (err) {

                console.error(
                    "Error deleting notification:",
                    err
                );

            } finally {

                setActionLoading(false);
            }
        };


    // =================================================
    // DELETE ALL
    // =================================================

    const handleDeleteAll =
        async () => {

            if (
                notifications.length === 0 ||
                actionLoading
            ) {
                return;
            }

            const confirmed =
                window.confirm(
                    "Are you sure you want to delete all notifications?"
                );

            if (!confirmed) {
                return;
            }

            try {

                setActionLoading(true);

                await deleteAllNotifications();

                setNotifications([]);

            } catch (err) {

                console.error(
                    "Error deleting all notifications:",
                    err
                );

            } finally {

                setActionLoading(false);
            }
        };


    // =================================================
    // REFRESH
    // =================================================

    const handleRefresh =
        () => {

            loadNotifications(true);

        };


    // =================================================
    // LOADING
    // =================================================

    if (loading) {

        return (
            <div className="notification-page">

                <div className="notification-loading">

                    <div className="notification-spinner">
                    </div>

                    <p>
                        Loading notifications...
                    </p>

                </div>

            </div>
        );
    }


    // =================================================
    // PAGE
    // =================================================

    return (

        <div className="notification-page">

            {/* =========================================
                PAGE HEADER
            ========================================= */}

            <div className="notification-page-header">

                <div>

                    <div className="notification-title-row">

                        <h1>
                            Notifications
                        </h1>

                        {unreadCount > 0 && (
                            <span className="notification-count-badge">
                                {unreadCount}
                            </span>
                        )}

                    </div>

                    <p>
                        Stay updated with your latest
                        EduTrack activities
                    </p>

                </div>


                <div className="notification-header-actions">

                    <button
                        type="button"
                        className={
                            `notification-refresh-button ${
                                refreshing
                                    ? "refreshing"
                                    : ""
                            }`
                        }
                        onClick={handleRefresh}
                        disabled={refreshing}
                    >

                        <span className="notification-refresh-icon">
                            ↻
                        </span>

                        <span>
                            {refreshing
                                ? "Refreshing..."
                                : "Refresh"}
                        </span>

                    </button>

                </div>

            </div>


            {/* =========================================
                ERROR
            ========================================= */}

            {error && (

                <div className="notification-error">

                    <span>!</span>

                    <p>
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            loadNotifications()
                        }
                    >
                        Retry
                    </button>

                </div>

            )}


            {/* =========================================
                SUMMARY BAR
            ========================================= */}

            <div className="notification-summary">

                <div className="notification-summary-left">

                    <div className="notification-summary-item">

                        <span className="summary-icon">
                            ●
                        </span>

                        <div>
                            <strong>
                                {notifications.length}
                            </strong>

                            <span>
                                Total
                            </span>
                        </div>

                    </div>


                    <div className="notification-summary-divider">
                    </div>


                    <div className="notification-summary-item unread-summary">

                        <span className="summary-icon">
                            ●
                        </span>

                        <div>
                            <strong>
                                {unreadCount}
                            </strong>

                            <span>
                                Unread
                            </span>
                        </div>

                    </div>

                </div>


                <div className="notification-summary-actions">

                    <button
                        type="button"
                        className={
                            activeFilter === "all"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveFilter("all")
                        }
                    >
                        All
                    </button>

                    <button
                        type="button"
                        className={
                            activeFilter === "unread"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setActiveFilter("unread")
                        }
                    >
                        Unread
                    </button>

                </div>

            </div>


            {/* =========================================
                ACTION BAR
            ========================================= */}

            {notifications.length > 0 && (

                <div className="notification-action-bar">

                    <span>
                        {activeFilter === "unread"
                            ? `${unreadCount} unread notification${
                                  unreadCount !== 1
                                      ? "s"
                                      : ""
                              }`
                            : `${notifications.length} notification${
                                  notifications.length !== 1
                                      ? "s"
                                      : ""
                              }`}
                    </span>


                    <div>

                        {unreadCount > 0 && (

                            <button
                                type="button"
                                onClick={
                                    handleMarkAllAsRead
                                }
                                disabled={actionLoading}
                            >
                                ✓ Mark all as read
                            </button>

                        )}

                        <button
                            type="button"
                            className="delete-all-button"
                            onClick={
                                handleDeleteAll
                            }
                            disabled={
                                actionLoading ||
                                notifications.length === 0
                            }
                        >
                            Delete all
                        </button>

                    </div>

                </div>

            )}


            {/* =========================================
                NOTIFICATION LIST
            ========================================= */}

            <div className="notification-list">

                {filteredNotifications.length === 0 ? (

                    <div className="notification-empty">

                        <div className="notification-empty-icon">
                            ✓
                        </div>

                        <h2>
                            {activeFilter === "unread"
                                ? "You're all caught up!"
                                : "No notifications yet"}
                        </h2>

                        <p>
                            {activeFilter === "unread"
                                ? "There are no unread notifications at the moment."
                                : "Your latest system notifications will appear here."}
                        </p>

                    </div>

                ) : (

                    filteredNotifications.map(
                        (notification) => {

                            const typeClass =
                                getNotificationTypeClass(
                                    notification.type
                                );

                            return (

                                <article
                                    key={
                                        notification.id
                                    }
                                    className={
                                        `notification-item ${
                                            notification.read
                                                ? "read"
                                                : "unread"
                                        }`
                                    }
                                    onClick={() =>
                                        handleMarkAsRead(
                                            notification
                                        )
                                    }
                                >

                                    {/* ICON */}

                                    <div
                                        className={
                                            `notification-item-icon ${typeClass}`
                                        }
                                    >
                                        {getNotificationIcon(
                                            notification.type
                                        )}
                                    </div>


                                    {/* CONTENT */}

                                    <div className="notification-item-content">

                                        <div className="notification-item-top">

                                            <h3>
                                                {
                                                    notification.title
                                                }
                                            </h3>

                                            {!notification.read && (
                                                <span className="unread-dot">
                                                </span>
                                            )}

                                        </div>


                                        <p>
                                            {
                                                notification.message
                                            }
                                        </p>


                                        <div className="notification-item-meta">

                                            <span>
                                                {formatTime(
                                                    notification.createdAt
                                                )}
                                            </span>

                                            {notification.type && (
                                                <>
                                                    <span className="meta-separator">
                                                        •
                                                    </span>

                                                    <span className="notification-type">
                                                        {
                                                            notification.type
                                                        }
                                                    </span>
                                                </>
                                            )}

                                        </div>

                                    </div>


                                    {/* ACTIONS */}

                                    <div
                                        className="notification-item-actions"
                                        onClick={(event) =>
                                            event.stopPropagation()
                                        }
                                    >

                                        {!notification.read && (

                                            <button
                                                type="button"
                                                className="notification-read-button"
                                                title="Mark as read"
                                                onClick={() =>
                                                    handleMarkAsRead(
                                                        notification
                                                    )
                                                }
                                            >
                                                ✓
                                            </button>

                                        )}


                                        <button
                                            type="button"
                                            className="notification-delete-button"
                                            title="Delete notification"
                                            onClick={() =>
                                                handleDelete(
                                                    notification.id
                                                )
                                            }
                                        >
                                            ×
                                        </button>

                                    </div>

                                </article>

                            );
                        }
                    )

                )}

            </div>

        </div>
    );
};


export default NotificationPage;