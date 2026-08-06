import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import ProfileForm from "../../components/profile/ProfileForm";

import {
  addProfile,
  getProfileById,
  updateProfile,
} from "../../api/profileApi";

export default function EditProfile() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    address: "",
    profileImage: "",
  });

  useEffect(() => {
    if (id !== "new") {
      loadProfile();
    }
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfileById(id);

      setProfile(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id === "new") {
        await addProfile(profile);
        alert("Profile Created Successfully");
      } else {
        await updateProfile(id, profile);
        alert("Profile Updated Successfully");
      }

      navigate("/profile");
    } catch (err) {
      console.log(err);
      alert("Operation Failed");
    }
  };

  return (
    <MainLayout>
      <h2>{id === "new" ? "Create Profile" : "Edit Profile"}</h2>

      <ProfileForm
        profile={profile}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText={
          id === "new"
            ? "Create Profile"
            : "Update Profile"
        }
      />
    </MainLayout>
  );
}