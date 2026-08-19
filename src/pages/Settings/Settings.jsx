import { useNavigate } from "react-router-dom";
import "./Settings.css";

function Settings() {
    const navigate = useNavigate();

    const settingsItems = [
        {
            title: "Notification Settings",
            description:
                "Manage your email and in-app notifications",
            icon: "🔔",
            path: "/settings/notifications",
        },
        {
            title: "Appearance",
            description:
                "Customize the appearance of EduTrack",
            icon: "🎨",
            path: "/settings/appearance",
        },
        {
            title: "Security",
            description:
                "Manage password and account security",
            icon: "🔐",
            path: "/settings/security",
        },
        {
            title: "Activity History",
            description:
                "View your recent account activity",
            icon: "🕘",
            path: "/settings/activity",
        },
        {
            title: "Organization",
            description:
                "Manage institute information and contact details",
            icon: "🏫",
            path: "/settings/organization",
        },
        {
            title: "Academic",
            description:
                "Configure academic year, semester and attendance rules",
            icon: "🎓",
            path: "/settings/academic",
        },
    ];

    return (
        <div className="settings-page">

            {/* HEADER */}

            <div className="settings-header">

                <div>
                    <h1>Settings</h1>

                    <p>
                        Manage your EduTrack account,
                        organization and preferences
                    </p>
                </div>

            </div>

            {/* SETTINGS CARDS */}

            <div className="settings-grid">

                {settingsItems.map((item) => (
                    <div
                        key={item.title}
                        className="settings-card"
                        onClick={() =>
                            navigate(item.path)
                        }
                    >

                        <div className="settings-card-icon">
                            {item.icon}
                        </div>

                        <div className="settings-card-content">

                            <h2>
                                {item.title}
                            </h2>

                            <p>
                                {item.description}
                            </p>

                        </div>

                        <div className="settings-card-arrow">
                            →
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default Settings;