import React, { useState, useEffect } from "react";
import defaultProfilePicture from "../../assets/test-images/default-profile-picture.webp";
import LoggedNavbar from "../ProfileNavbar";
import axios from "axios";
import fire from "../../assets/test-images/bonfire.webp";
import leaf from "../../assets/test-images/leaf.webp";
import wave from "../../assets/test-images/waves.webp";

const ProfileSummary = () => {
  const [name, setName] = useState("Username");
  const [email, setEmail] = useState("Email");
  const [bio, setBio] = useState(
    "Hello World! (You can update your bio by clicking on the Edit Profile button.)",
  );
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      if (!userData) {
        try {
          const token = localStorage.getItem("jwtToken");
          if (!token) {
            setError("No JWT token found");
            return;
          }
          const response = await axios.get("http://localhost:3000/userData", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data.user);
          setUserData(response.data.user);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Error fetching data");
        }
      }
    };

    getData();
  }, [userData]);

  // Handle profile picture upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Toggle editing mode
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <LoggedNavbar />
      <div className="flex h-screen items-center justify-center bg-lighter-base-color">
        <div className="rounded-md p-6 shadow-md">
          <div className="mb-6 flex items-center gap-6">
            {/* Profile picture */}
            <div className="relative h-32 w-32">
              <img
                src={profileImage || defaultProfilePicture}
                alt="Profile picture"
                className="h-full w-full rounded-full"
              />
              <input
                type="file"
                className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                onChange={handleImageChange}
              />
            </div>

            {/* User infos */}
            <div className="flex flex-col gap-2">
              {isEditing ? (
                <input
                  className="rounded-md border p-2 text-3xl"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <h1 className="text-3xl">
                  Hello, {userData ? userData.username : "loading..."}!
                </h1>
              )}

              {isEditing ? (
                <input
                  className="rounded-md border p-2 text-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <div className="text-lg">
                  <span>
                    Email: {userData ? userData.email : "loading..."}{" "}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="mb-6 flex flex-col gap-4">
            <div className="text-lg">
              <span>Bio: </span>{" "}
              {isEditing ? (
                <textarea
                  className="rounded-md border p-2"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              ) : (
                bio
              )}
            </div>
          </div>

          {/* Edit button */}
          <button
            className="mt-6 rounded-md bg-darker-base-color px-4 py-2 text-white transition-all duration-300 hover:scale-105"
            onClick={toggleEditing}
          >
            {isEditing ? "Save" : "Edit Profile"}
          </button>

          {/* Achievements */}
          <div className="mt-10 py-4">
            <h2 className="mb-4 text-2xl font-semibold">Achievements</h2>
            <div className="grid grid-cols-3 gap-4">
              {/* Placeholder examples */}
              <div className="h-32 w-32 rounded-md bg-gray-100 p-4 text-center">
                <img src={fire} alt="Badge" className="mb-4" />
                <p>Camping</p>
              </div>
              <div className="h-32 w-32 rounded-md bg-gray-100 p-4 text-center">
                <img src={leaf} alt="Badge" className="mb-4" />
                <p>Nature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSummary;
