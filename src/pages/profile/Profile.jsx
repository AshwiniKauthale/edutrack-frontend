import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import ProfileCard from "../../components/profile/ProfileCard";

import { getProfiles } from "../../api/profileApi";

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfiles();

      if (res.data.length > 0) {
        setProfile(res.data[0]);
      }
    } catch (err) {
      console.log(err);
      alert("Unable to load profile");
    }
  };

  if (!profile) {
    return (
      <MainLayout>
        <h2>No Profile Found</h2>

        <button
          onClick={() => navigate("/profile/edit/new")}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Create Profile
        </button>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ProfileCard
        profile={profile}
        onEdit={() => navigate(`/profile/edit/${profile.id}`)}
      />
    </MainLayout>
  );
}