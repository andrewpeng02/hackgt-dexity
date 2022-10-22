<<<<<<< HEAD
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth"
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts"
import { auth } from "../firebase";
import PlaidLink from "../PlaidLink/PlaidLink";


const OverviewPage = () => {
  // useEffect(() => {
  //   auth.signOut();
  // }, []);
  const isPlaidNeeded = false;
  if (isPlaidNeeded) {
    return <PlaidLink />;
  }
  // eslint-disable-next-line no-unused-vars
  const [user, loading] = useAuthState(auth)
=======
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { PieChart, Pie, Tooltip } from "recharts";
import { auth } from "../firebase";
import PlaidLink from "../PlaidLink/PlaidLink";

const isPlaidVerified = async () => {
  const idToken = await auth.currentUser.getIdToken(true);
  const res = await fetch("/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${idToken}`,
    },
  });
  const j = await res.json();
  
  return j.success;
};

const OverviewPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, loading] = useAuthState(auth);
  const [loading2, setLoading2] = useState(false);
  const [plaidVerified, setPlaidVerified] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading2(true);

      const res = await isPlaidVerified();
      setPlaidVerified(res);

      setLoading2(false);
    };
    fetchData();
  }, []);

  if (loading || loading2) return <p>Loading</p>;

  if (!plaidVerified) return <PlaidLink />;
>>>>>>> 5fd18ba94968241a37014a9afe2d1457d05a46ce
  return (
    <div className="bg-[#F7F8FC] w-[100%] overflow-y-scroll">
      <div className="relative fixed py-5 px-4 flex justify-between items-center bg-white">
        <h2 className="font-semibold text-lg">Portfolio</h2>
          <div>
          <p
            className="font-roboto text-black"
          >
            {user.email}
          </p>
        </div>
      </div>
      <div className="items-center mt-[15px] overflow-visible">
        <div className="flex justify-between text-justify mx-[8%]">
          <div className="relative flex justify-between w-[334px] h-[95px] bg-darkBlue">
              <p className="text-white font-semibold text-[20px] px-[25px] pt-[20px]">Amount <br /> Invested</p>
              <p className="text-white font-bold pr-[15px] pt-[20px] text-[40px]">$12,192</p>
          </div>
          <div className="relative flex justify-between w-[334px] h-[95px] bg-white  mx-[4%]">
              <p className="text-darkBlue font-semibold text-[20px] pl-[25px] pr-[100px] pt-[20px]">Companies <br /> Invested</p>
              <p className="text-darkBlue font-bold pr-[15px] pt-[20px] text-[40px]">88</p>
          </div>
          <div className="relative flex justify-between w-[334px] h-[95px] bg-white">
              <p className="text-darkBlue font-semibold text-[20px] pl-[25px] pr-[100px] pt-[20px]">Sectors <br /> Invested</p>
              <p className="text-darkBlue font-bold pr-[15px] pt-[20px] text-[40px]">5</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mx-[8%]">
        <div className="relative bg-white mt-[15px] text-[20px] pt-[10px] w-[49%]">
          <p className="text-black font-semibold ml-[5%] pb-[25px]">Sector Breakdown</p>
          <ResponsiveContainer aspect={2}>
            <PieChart width={300} height={300}>
              <Pie
                data={[
                  { name: "Utilities", value: 30 },
                  { name: "Financials", value: 70 },
                  { name: "Energy", value: 70 },
                  { name: "Consumer Staples", value: 70 },
                  { name: "Technology", value: 70 },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                // outerRadius={50}
                fill="#274161"
                label={(entry) => entry.name}
                style={{ fontSize: "12px" }}
              />
              <Tooltip contentStyle={{ padding: "4px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white mt-[15px] text-[20px] pt-[10px] w-[49%]">
          <p className="text-black font-semibold ml-[5%] pb-[25px]">Sector Details</p>
          <ResponsiveContainer aspect={2}>
            <PieChart width={300} height={300}>
              <Pie
                data={[
                  { name: "Utilities", value: 30 },
                  { name: "Financials", value: 70 },
                  { name: "Energy", value: 70 },
                  { name: "Consumer Staples", value: 70 },
                  { name: "Technology", value: 70 },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                // outerRadius={50}
                fill="#274161"
                label={(entry) => entry.name}
                style={{ fontSize: "12px" }}
              />
              <Tooltip contentStyle={{ padding: "4px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
};

export default OverviewPage;
