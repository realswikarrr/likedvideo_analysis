"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

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
    redirect("/");
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
        <Button className="bg-slate-200 text-black" variant="ghost">
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
    </div>
  );
};

export default Dashboard;
