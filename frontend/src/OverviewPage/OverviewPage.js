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
  return (
    <div className="bg-[#F7F8FC]">
      <PieChart width={730} height={250}>
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
          outerRadius={50}
          fill="#274161"
          label={(entry) => entry.name}
          style={{ fontSize: "12px" }}
        />
        <Tooltip contentStyle={{ padding: "4px" }} />
      </PieChart>
      <div className="relative fixed py-5 px-4 flex justify-between items-center bg-white w-full">
        <h2 className="font-semibold text-lg">Portfolio</h2>
        <div>
          <p className="font-roboto text-black">{user.email}</p>
        </div>
      </div>
      <div className="items-center">
        <div className="flex justify-between text-justify overflow-scroll">
          <div className="relative flex justify-between w-[334px] h-[95px] bg-darkBlue ml-60">
            <p className="text-white font-semibold text-[20px] px-[25px] pt-[20px]">
              Amount <br /> Invested
            </p>
            <p className="text-white font-bold pr-[15px] pt-[20px] text-[40px]">
              $12,192
            </p>
          </div>
          <div className="relative flex justify-between w-[334px] h-[95px] bg-white mx-20">
            <p className="text-darkBlue font-semibold text-[20px] px-[25px] pt-[20px]">
              Companies <br /> Invested
            </p>
            <p className="text-darkBlue font-bold pr-[15px] pt-[20px] text-[40px]">
              88
            </p>
          </div>
          <div className="relative flex justify-between w-[334px] h-[95px] bg-white mr-60">
            <p className="text-darkBlue font-semibold text-[20px] px-[25px] pt-[20px]">
              Sectors <br /> Invested
            </p>
            <p className="text-darkBlue font-bold pr-[15px] pt-[20px] text-[40px]">
              5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
