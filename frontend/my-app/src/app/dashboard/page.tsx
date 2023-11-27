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
  const [data, setData] = useState();
  const [data2, setData2] = useState();

  const fetchUserData = async () => {
    axios
      .get("http://localhost:3000/api/userDetails", { withCredentials: true })
      .then((res) => {
        setUserEmail(res.data.data.email);
        setUserName(res.data.data.name);
      })
      .catch((err) => {
        console.log(err);
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
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:3000/api/mostLikedCategory", {
        withCredentials: true,
      })
      .then((res) => {
        setData2(res.data.data);
      })
      .catch((err) => {
        console.log(err);
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
      {data && data2 ? <AnalysisDetail data1={data} newData={data2} /> : null}
    </div>
  );
};

export default Dashboard;
