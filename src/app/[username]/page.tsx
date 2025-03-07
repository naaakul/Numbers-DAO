"use client";

import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import { usePrivy } from "@privy-io/react-auth";
import axios from "axios";
import { useParams } from "next/navigation";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const { user } = usePrivy();
  const [userData, setUserdata] = useState({});
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/username?query=${username}`); // Relative URL
        console.log("Response:", response.data); // Log actual data
        setUserdata(response.data); // Update state with data
        setLoading(false); // Update loading state on success
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Still update loading on error (optional)
      }
    };

    if (username) {
      getData(); // Call the async function only if username exists
    } else {
      console.warn("No username provided");
      setLoading(false); // Exit loading if no username
    }
  }, [username]); // Re-run if username changes

  if (loading) {
    return (
      <div className="h-screen items-center justify-center flex text-black">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Dashboard {...userData} />
    </div>
  );
};

export default Page;
