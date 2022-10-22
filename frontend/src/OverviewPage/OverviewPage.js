import React from "react";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase";

const OverviewPage = () => {
  // useEffect(() => {
  //   auth.signOut();
  // }, []);

  // eslint-disable-next-line no-unused-vars
  const [user, loading] = useAuthState(auth)
  return (
    <div className="bg-[#F7F8FC]">
      <div className="relative fixed py-5 px-4 flex justify-between items-center bg-white w-full">
        <h2 className="font-semibold text-lg">Portfolio</h2>
          <div>
          <p
            className="font-roboto text-black"
          >
            {user.email}
          </p>
        </div>
      </div>
      <div className="items-center">
        <div className="flex justify-between text-justify overflow-scroll">
          <div className="relative flex justify-between w-[334px] h-[95px] bg-darkBlue ml-60">
              <p className="text-white font-semibold text-[20px] px-[25px] pt-[20px]">Amount <br /> Invested</p>
              <p className="text-white font-bold pr-[15px] pt-[20px] text-[40px]">$12,192</p>
          </div>
          <div className="relative flex justify-between w-[334px] h-[95px] bg-white mx-20">
              <p className="text-darkBlue font-semibold text-[20px] px-[25px] pt-[20px]">Companies <br /> Invested</p>
              <p className="text-darkBlue font-bold pr-[15px] pt-[20px] text-[40px]">88</p>
          </div>
          <div className="relative flex justify-between w-[334px] h-[95px] bg-white mr-60">
              <p className="text-darkBlue font-semibold text-[20px] px-[25px] pt-[20px]">Sectors <br /> Invested</p>
              <p className="text-darkBlue font-bold pr-[15px] pt-[20px] text-[40px]">5</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default OverviewPage;
