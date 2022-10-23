import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  Tooltip,
} from "recharts";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

import { Header } from "../OverviewPage/OverviewPage";
import CompaniesTable from "./CompaniesTable";

const dataex = [
  { name: "Q3 2021", price: 30 },
  { name: "Q4 2021", price: 70 },
  { name: "Q1 2022", price: 65 },
  { name: "Q2 2022", price: 80 },
  { name: "Q3 2022", price: 100 },
];

const biggestCompanies = [
  { name: "Apple", price: "$1811" },
  { name: "Walmart", price: "$614" },
  { name: "PG&E", price: "$288" },
];

const BiggestCompaniesTile = ({ name, price }) => (
  <div
    className="bg-white flex justify-between px-[17px] items-center 
                    w-[100%] h-[80px] rounded-[8px] mb-[10px]"
  >
    <p className="font-semibold text-[24px] text-[#242424]">{name}</p>
    <p className="font-semibold text-[24px] text-[#565656]">{price}</p>
  </div>
);

const CompaniesPage = () => {
  const [user, loading] = useAuthState(auth);
  const [data, setData] = useState(null);

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

  if (loading || !data) return <p>Loading</p>;

  return (
    <div className="bg-[#F7F8FC] w-[100%] overflow-y-scroll">
      <Header user={user} text="Companies" />
      <div className="grid grid-cols-2 mx-[8%] mt-[15px]">
        <div className="bg-white px-[5px] py-[8px] mr-4">
          <h2 className="font-semibold text-[24px] m-4">Total Stock Growth</h2>
          <ResponsiveContainer aspect={1.5} maxHeight={300}>
            <AreaChart
              data={dataex}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={14} />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#04D49C"
                fill="rgba(4, 212, 156, 0.4)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="font-semibold text-[18px] mb-2">Biggest Companies</p>
          {biggestCompanies.map((c) => (
            <BiggestCompaniesTile name={c.name} price={c.price} key={c.name} />
          ))}
        </div>
      </div>
      <div className="mt-[15px] text-[28px] pt-[10px] mx-[8%]">
          <p className="text-black font-semibold ml-[0%] pb-[15px]">Companies by Investment Volume</p>
      </div>
      <div className="bg-white px-[20px] mx-[8%] py-[1%] mb-[5%]">
        <CompaniesTable />
      </div>
    </div>
  );
};

export default CompaniesPage;
