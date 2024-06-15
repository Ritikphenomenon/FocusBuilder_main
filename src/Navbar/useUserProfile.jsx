// useUserProfile.js
import { useState, useEffect } from "react";
import axios from "axios";

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust as necessary for your auth setup
            },
          }
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return userProfile;
};

export default useUserProfile;
