import useUserData from '../component/hook/useUserData';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { userData, loading } = useUserData();
  const navigate = useNavigate();

  // Helper function to render user details
  const renderUserData = (label, value, icon) => (
    <div className="flex gap-2 items-center">
      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
        <img className="h-5" src={icon} alt={label} />
      </div>
      <div className="flex items-center gap-2">
        <p className="text-gray-600 dark:text-gray-300 font-semibold">{label}:</p>
        <span className="text-gray-900 dark:text-white">{value || loading}</span>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="manrope-regular mx-auto p-5 rounded-lg shadow-lg max-w-6xl w-full">
        {/* Title */}
        <div className="rajdhani-bold text-center text-3xl sm:text-4xl mb-12 pb-5">
          <span className="text-indigo-500">User</span> <span className="text-orange-500">Profile</span>
        </div>

        {/* Profile Info */}
        <div className="backdrop-blur-lg bg-white/60 dark:bg-zinc-900 p-6 rounded-lg shadow-sm border border-gray-200/50 dark:border-zinc-600 flex flex-col md:flex-row gap-10 items-center justify-center">
          
          {/* Left Section */}
          <div className="flex-1 space-y-5">
            <div className="w-max p-2 m-auto rounded-lg bg-gray-200 dark:bg-gray-700">
              <h2 className="rajdhani-bold text-2xl font-semibold text-zinc-800 dark:text-gray-300">User Data</h2>
            </div>

            {renderUserData('Name', userData?.name, assets.Profile_icon)}
            {renderUserData('Email', userData?.email, assets.Gmail)}
            {renderUserData('College', userData?.college, assets.college)}
            {renderUserData('Year', userData?.year, assets.Year)}
            {renderUserData('Roll', userData?.roll, assets.Roll)}
          </div>

          {/* Right Section */}
          <div className="flex-1 space-y-5">
            <div className="w-max p-2 m-auto rounded-lg bg-gray-200 dark:bg-gray-700">
              <h2 className="rajdhani-bold text-2xl font-semibold text-gray-800 dark:text-gray-300">Usernames</h2>
            </div>

            {renderUserData('LeetCode', userData?.usernames?.leetcodeUser, assets.leetcode)}
            {renderUserData('CodeChef', userData?.usernames?.codechefUser, assets.codechef)}
            {renderUserData('CodeForces', userData?.usernames?.codeforcesUser, assets.codeforce)}
            {renderUserData('Amcat ID', userData?.amcat?.amcatID, assets.Amcat)}
          </div>
        </div>

        {/* Update Button */}
        <div className="w-full flex justify-center my-10">
          <button
            type="button"
            className="text-white bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 
              font-medium text-sm md:text-lg px-3 md:px-5 py-1.5 md:py-3 text-center w-20 md:w-28 h-10 md:h-12 
              rounded-2xl transition-all duration-300 ease-in-out"
            onClick={() => navigate("/update")}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
