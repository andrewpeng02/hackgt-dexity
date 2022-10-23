/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";
import { auth } from "../firebase";
// eslint-disable-next-line import/no-cycle
import PlaidLink from "../PlaidLink/PlaidLink";
import SectorTable from "./SectorTable";
import BreakdownTable from "./BreakdownTable";
import {
  getSectorBreakdowns,
  getSectorDetails,
  getSectorInvestments,
} from "./OverviewHelper";

// eslint-disable-next-line no-unused-vars
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

const Header = ({ user, text }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative fixed py-5 px-4 flex justify-between items-center bg-white">
      <h2 className="font-semibold text-lg">{text}</h2>
      <div>
        <div className="relative inline-block">
          <button
            type="button"
            className="border-none font-roboto text-black hover:text-zinc-600"
            onClick={() => {
              setShowDropdown((prev) => !prev);
            }}
          >
            {user.email}
          </button>
          {showDropdown && (
            <div
              className="absolute bg-[#f1f1f1] min-w-[120px] z-10 hover:block
                              px-3 py-3 right-0"
            >
              <button
                type="button"
                onClick={() => {
                  setShowDropdown(false);
                  auth.signOut();
                }}
                className="font-roboto text-md text-center w-full"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OverviewPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, loading] = useAuthState(auth);
  const [loading2, setLoading2] = useState(false);
  const [plaidVerified, setPlaidVerified] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading2(true);

      const res = await isPlaidVerified();
      setPlaidVerified(res);

      setLoading2(false);
      setRefresh(false);
    };
    fetchData();
  }, [refresh]);

  useEffect(() => {
    async function inner() {
      const idToken = await auth.currentUser.getIdToken(true);

      const r = await fetch("/test", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${idToken}`,
        },
      });
      const j = await r.json();
      setData(j);
    }
    inner();
  }, []);

  if (loading || loading2 || !data) return <p>Loading</p>;
  console.log(data);
  const sectorBreakdowns = getSectorBreakdowns(data);
  console.log(sectorBreakdowns);
  const sectorDetails = getSectorDetails(data);
  console.log(sectorDetails);
  const sectorInvestments = getSectorInvestments(data);
  console.log(sectorInvestments);

  if (!plaidVerified)
    return (
      <div className="flex justify-center items-center w-full">
        <div className="flex-row items-center justify-center border-2 border-gray rounded-md p-5">
          <h1 className="text-center font-semibold mb-2">Link your bank account to Plaid</h1>
          <PlaidLink setRefresh={setRefresh} setLoading2={setLoading2} />
        </div>
      </div>
    );
  return (
    <div className="bg-[#F7F8FC] w-[100%] overflow-y-scroll">
      <Header user={user} text="Portfolio" />
      <div className="items-center mt-[4%] overflow-visible">
        <div className="flex justify-between text-justify mx-[8%]">
          <div className="relative flex justify-between w-[334px] h-[95px] bg-darkBlue">
            <p className="text-white font-semibold text-[20px] px-[25px] pt-[20px]">
              Amount <br /> Invested
            </p>
            <p className="text-white font-bold pr-[15px] pt-[20px] text-[40px]">
              $12,192
            </p>
          </div>
          <div className="relative flex justify-between w-[334px] h-[95px] bg-white  mx-[4%]">
            <p className="text-darkBlue font-semibold text-[20px] pl-[25px] pr-[100px] pt-[20px]">
              Companies <br /> Invested
            </p>
            <p className="text-darkBlue font-bold pr-[15px] pt-[20px] text-[40px]">
              88
            </p>
          </div>
          <div className="relative flex justify-between w-[334px] h-[95px] bg-white">
            <p className="text-darkBlue font-semibold text-[20px] pl-[25px] pr-[100px] pt-[20px]">
              Sectors <br /> Invested
            </p>
            <p className="text-darkBlue font-bold pr-[15px] pt-[20px] text-[40px]">
              5
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mx-[8%]">
        <div className="relative bg-white mt-[15px] text-[20px] pt-[10px] w-[49%]">
          <p className="text-black font-semibold ml-[5%] pb-[25px]">
            Sector Breakdown
          </p>
          <ResponsiveContainer aspect={1.5}>
            <PieChart width={300} height={300}>
              <Pie
                data={sectorBreakdowns}
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
        <div className="bg-white mt-[15px] text-[20px] px-[4%] pt-[10px] w-[49%]">
          <p className="text-black font-semibold ml-[0%] pb-[5px]">
            Sector Details
          </p>
          <div className="pb-[5%]">
            <SectorTable />
          </div>
        </div>
      </div>
      <div className="mt-[15px] text-[28px] pt-[10px] mx-[8%]">
        <p className="text-black font-semibold ml-[0%] pb-[5px]">
          Sector Details
        </p>
      </div>
      <div className="flex font-semibold justify-between text-[23px] pt-[2px] mx-[8%] mb-[3%]">
        <div className="bg-white pb-[3%] pt-[10px] px-[2%]">
          <p>Consumer Staples</p>
          <BreakdownTable />
        </div>
        <div className="bg-white pb-[3%] pt-[10px] px-[2%]">
          <p>Financials</p>
          <BreakdownTable />
        </div>
        <div className="bg-white pb-[3%] pt-[10px] px-[2%]">
          <p>Energy</p>
          <BreakdownTable />
        </div>
      </div>
      <div className="flex font-semibold justify-between text-[23px] pt-[2px] mx-[8%] mb-[3%]">
        <div className="bg-white pb-[3%] pt-[10px] px-[2%]">
          <p>Utilities</p>
          <BreakdownTable />
        </div>
        <div className="bg-white pb-[3%] pt-[10px] px-[2%] mr-[34%]">
          <p>Technology</p>
          <BreakdownTable />
        </div>
      </div>
    </div>
  );
};

export { Header };
export default OverviewPage;
