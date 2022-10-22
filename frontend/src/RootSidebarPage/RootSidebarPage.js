import PieChartIcon from "@mui/icons-material/PieChart";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";

const RootSidebarPage = ({ selectedIndex }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#042534] w-[255px] h-full">
      <h2 className="font-bold text-white text-[24px] p-[22px]">Dexity</h2>
      <div>
        <button
          type="button"
          className="grid grid-cols-4 w-[255px] py-[20px] px-[24px]"
          style={
            selectedIndex === 0
              ? {
                  backgroundColor: "rgb(159, 162, 180, 0.1)",
                  borderLeft: "3px solid white",
                }
              : undefined
          }
          onClick={() => navigate("/")}
        >
          <PieChartIcon
            className="w-full"
            style={{ color: selectedIndex === 0 ? "#FFFFFF" : "#9FA2B4" }}
          />
          <span
            className="text-left font-size-[16px] col-span-3 bg-opacity-10"
            style={{ color: selectedIndex === 0 ? "#DDE2FF" : "#A4A6B3" }}
          >
            Portfolio
          </span>
        </button>

        <button
          type="button"
          className="grid grid-cols-4 w-[255px] py-[20px] px-[24px]"
          style={
            selectedIndex === 1
              ? {
                  backgroundColor: "rgb(159, 162, 180, 0.1)",
                  borderLeft: "3px solid white",
                }
              : undefined
          }
          onClick={() => navigate("/companies")}
        >
          <PeopleIcon
            className="w-full"
            style={{ color: selectedIndex === 1 ? "#FFFFFF" : "#9FA2B4" }}
          />
          <span
            className="text-left font-size-[16px] col-span-3 bg-opacity-10"
            style={{ color: selectedIndex === 1 ? "#DDE2FF" : "#A4A6B3" }}
          >
            Companies
          </span>
        </button>
      </div>
    </div>
  );
};

export default RootSidebarPage;
