import { useAuthState } from "react-firebase-hooks/auth";
import { PieChart, Pie, Tooltip } from "recharts";
import { auth } from "../firebase";

const OverviewPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, loading] = useAuthState(auth);

  return (
    <div>
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
        <Tooltip contentStyle={{padding: "4px", fontSize: "14px"}} />
      </PieChart>
      <p className="font-bold">Overview page</p>
    </div>
  );
};

export default OverviewPage;
