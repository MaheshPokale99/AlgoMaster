import PropTypes from "prop-types";
import { assets } from "../assets/assets";
import useUserData from "../component/hook/useUserData";
import useCollegeRank from "../component/hook/useCollegeRank";
import Title from "../component/PageTitle";
import CodeForcesRatingGraph from "../component/CodeForcesRatingGraph";

const CodeForcesDesign = ({ data }) => {
  const { userData, loading } = useUserData();
  const { rankData, totalUsers, error } = useCollegeRank({
    username: userData?.usernames?.codeforcesUser,
    department: userData?.department
  });

  if (error) {
    return <div>{error}</div>;
  }
  const User = data?.result?.[0];

  return (
    <div className="manrope-regular ">
      {/* Title */}
      <Title text1="Code" text2="Forces" />
      <div className="w-full flex flex-col xl:flex-row gap-10 items-center justify-center">
        {/* Info */}
        <div className="card flex flex-col items-center rounded-3xl border border-zinc-300 dark:border-zinc-800 p-5 w-full sm:w-3/5 xl:w-[30%] h-80">
          <div>
            <h1 className="manrope-bold mt-3 text-2xl">{userData ? userData.name : loading}</h1>
            <div className="flex flex-col items-center font font-semibold ml-3 mb-auto text-zinc-500 dark:text-gray-500 text-sm">
              <span>
                #{userData ? userData.usernames.codeforcesUser : loading}
              </span>
              <span>
                  Rank : {userData ? User.rank : loading}
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-6 mt-6">
            <div className="flex gap-x-2 items-center">
              <div className="dark:bg-dark bg-[#c1c1c1] p-2 rounded-lg">
                <img src={assets.Gmail} alt="Email" className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-start min-w-0">
                <span className="text-sm font-medium text-zinc-600">Email</span>
                <span className="text-md font-semibold truncate block">
                  {userData ? userData.email : loading}
                </span>
              </div>
            </div>

            <div className="flex gap-x-2 items-center">
              <div className="dark:bg-dark bg-[#c1c1c1] p-2 rounded-lg">
                <img src={assets.college} alt="College" className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-start min-w-0">
                <span className="text-sm font-medium text-zinc-600">Department</span>
                <span className="text-md font-semibold truncate block">
                  {userData ? userData.department : loading}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* codeforce Data */}
        <div className="card flex flex-col items-center justify-center rounded-3xl border border-zinc-300 dark:border-zinc-800 p-5 w-full sm:w-3/5 xl:w-[30%] h-80 gap-4">
          <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
              <span className="font-bold text-md text-[#22C55E]">College Rank</span>
              <div>
                  <span className="font-bold text-base">{rankData?.overall?.codeforces || "Not Available"}</span>
                  <span className="text-zinc-500 text-base">/{totalUsers?.overall}</span>
              </div>
          </div>

          <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
              <span className="font-bold text-md text-[#22C55E]">Department Rank</span>
              <div>
                  <span className="font-bold text-base">{rankData?.department?.codeforces || "Not Available"}</span>
                  <span className="text-zinc-500 text-base">/{totalUsers?.departmentUsers?.codeforces}</span>
              </div>
          </div> 

          <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
            <span className="font-bold text-md text-[#22C55E]">Current Rating</span>
            <span className="font-bold text-base">{User.rating}</span>
          </div>

          <div className="flex justify-between items-center rounded-lg border border-zinc-300 dark:border-zinc-800 p-3 w-full">
            <span className="font-bold text-md text-[#EAB308]">Highest Rating</span>
            <span className="font-bold text-base">{User.maxRating}</span>
          </div>
        </div>
      </div>
      <div className="p-5 m-5">
        <CodeForcesRatingGraph handle={userData?.usernames?.codeforcesUser} />
      </div>

    </div>
  );
};

CodeForcesDesign.propTypes = {
    data: PropTypes.array.isRequired,
  };

export default CodeForcesDesign;
