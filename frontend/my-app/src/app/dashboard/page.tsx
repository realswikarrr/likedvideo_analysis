"use client";

import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import axios from "axios";
import AnalysisDetail from "@/components/AnalysisDetail";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  // const [analysisData, setAnalysisData] = useState();
  // const [newAnalysisData, setNewAnalysisData] = useState();
  const [channelAnalysisData, setChannelAnalysisData] = useState();
  const [categoryAnalysisData, setCategoryAnalysisData] = useState();

  const fetchUserData = async () => {
    axios
      .get("http://localhost:3000/api/userDetails", { withCredentials: true })
      .then((res) => {
        setUserEmail(res.data.data.email);
        setUserName(res.data.data.name);
      })
      .catch((err) => {
        console.log("Error while fetching user data: ", err);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    axios.get("http://localhost:3000/api/auth/logout", {
      withCredentials: true,
    });
    router.push("/");
  };

  const handleAnalysis = () => {
    axios
      .get("http://localhost:3000/api/mostWatchedChannel", {
        withCredentials: true,
      })
      .then((res) => {
        setChannelAnalysisData(res.data.data);
      })
      .catch((err) => {
        console.log("Error while handling Channel analysis data: ", err);
      });

    axios
      .get("http://localhost:3000/api/mostLikedCategory", {
        withCredentials: true,
      })
      .then((res) => {
        setCategoryAnalysisData(res.data.data);
      })
      .catch((err) => {
        console.log("Error while handling Category analysis data: ", err);
      });
  };

  return (
    <div className="flex  flex-col items-center justify-between p-24 gap-4">
      <div className="flex justify-center flex-col">
        <h4 className="text-white text-lg font-medium leading-none">
          You are logged in as :
        </h4>
        <p className="text-sm text-muted-foreground">
          {userName || "username"} , {userEmail || "email"}
        </p>
      </div>
      <div className="flex flex-row gap-5">
        <Button className="bg-slate-200 text-black" variant="ghost">
          Delete User
        </Button>
        <Button
          onClick={handleAnalysis}
          className="bg-slate-200 text-black"
          variant="ghost"
        >
          Start Analaysis
        </Button>
        <Button
          onClick={handleLogout}
          className="bg-slate-200 text-black"
          variant="ghost"
        >
          LogOut
        </Button>
      </div>
      {channelAnalysisData && categoryAnalysisData ? (
        <AnalysisDetail
          channelAnalysisData={channelAnalysisData}
          categoryAnalysisData={categoryAnalysisData}
        />
      ) : null}
    </div>
  );
};

export default Dashboard;
