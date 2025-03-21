import { FcNumericalSorting12, FcNumericalSorting21 } from "react-icons/fc";
import { useContext, useEffect, useState } from "react";
import Dropdown from "../component/Dropdown";
import InputField from "../component/InputField";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllUserData = () => {
  const [platform, setPlatform] = useState("LeetCode");
  const [department, setDepartment] = useState(null);
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState("");
  const [item, setItem] = useState("Roll No");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const { theme } = useContext(ThemeContext);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const entriesPerPage = 15;

  const platformOptions = [
    "Select Platform",
    "LeetCode",
    "CodeChef",
    "Codeforces"
  ];

  const departmentOptions = [
    "Select your Department",
    "COMPUTER ENGINEERING",
    "ELECTRONICS AND TELECOMMUNICATION",
    "INFORMATION TECHNOLOGY",
    "ARTIFICIAL INTELLIGENCE AND DATA SCIENCE",
    "ELECTRONICS AND COMPUTER",
    "None",
  ];
  const searchOptions = ["Roll No", "Name", "UserName", "ID"];

  const tableHead = theme === "dark" ? "px-2 py-2 border border-gray-800 h-12 text-sm" : "px-2 py-2 border h-12 text-sm";

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const site =
          platform === "Codeforces"
            ? "codeforcesUser"
            : platform === "CodeChef"
              ? "codechefUser"
              : "leetcodeUser";

        const departmentParam = department && department !== "None" && department !== "Select your Department"
          ? `&department=${department}`
          : "";

        const url = `${backendUrl}/api/user?platform=${site}${departmentParam}`;
        const response = await axios.get(url);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoader(false);
      }
    };


    fetchData();
  }, [platform, department, backendUrl]);

  const handleSort = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const getSortingIcon = (column) => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? (
        <FcNumericalSorting12 className="animate-sortUp text-3xl font-bold" />
      ) : (
        <FcNumericalSorting21 className="animate-sortDown text-3xl font-bold" />
      );
    }
    return <FcNumericalSorting21 className="animate-default text-3xl font-bold" />;
  };

  const sortedUsers = users ? [...users] : [];

  if (sortColumn) {
    sortedUsers.sort((a, b) => {
      let aValue = a[sortColumn.toLowerCase()];
      let bValue = b[sortColumn.toLowerCase()];

      if (sortColumn === "Rank") {
        aValue = Number(a.ranks?.globalRank) || Infinity;
        bValue = Number(b.ranks?.globalRank) || Infinity;
      }

      if (sortColumn === "Roll No") {
        aValue = a.roll;
        bValue = b.roll;
      }

      if (typeof aValue === "string") {
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });
  }

  // Apply search filtering to all users before pagination
  const filteredUsers = users ? sortedUsers.filter((user) => {
    if (item === "Roll No") {
      return user.roll.toLowerCase().includes(search.toLowerCase());
    } else if (item === "Name") {
      return user.name.toLowerCase().includes(search.toLowerCase());
    } else if (item === "UserName") {
      return user.username?.toLowerCase().includes(search.toLowerCase());
    } else if (item === "ID") {
      return user.usernames?.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  }) : [];

  // Pagination logic
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="manrope-regular p-3 w-full xl:w-[90%] lg:w-[90%] m-auto">
      <div>
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
          <Dropdown
            options={platformOptions}
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            label="Select Platform"
          />
        </div>
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
          <Dropdown
            options={departmentOptions}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            label="Select Department"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-2">
          <InputField
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search by ${item}`}
          />
          <div className="-translate-y-1 w-full">
            <Dropdown
              options={searchOptions}
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loader ? (
        <div className="flex justify-center mt-10">
          <div className="loader"></div>
        </div>
      ) : platform && platform !== "Select Platform" ? (
        users ? (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className={`${theme === "dark" ? "bg-zinc-800" : "bg-gray-300"}`}>
                <tr>
                  <th className={`${tableHead}`}>Sr No.</th>
                  <th className={`${tableHead}`}>UserName</th>
                  <th
                    className={`${tableHead} cursor-pointer flex items-center gap-2 justify-between text lg:block lg:hidden`}
                    onClick={() => handleSort("Roll No")}
                  >
                    Roll {getSortingIcon("Roll No")}
                  </th>
                  <th
                    className={`${tableHead} cursor-pointer hidden lg:flex lg:items-center lg:gap-2 lg:justify-between whitespace-nowrap`}
                    onClick={() => handleSort("Roll No")}
                  >
                    <div className="flex items-center gap-2 justify-between">
                      Roll No {getSortingIcon("Roll No")}
                    </div>
                  </th>
                  <th className={`${tableHead} hidden md:table-cell`}>Registered ID</th>
                  <th className={`${tableHead}`}>{`${platform} ID`}</th>
                  <th className={`${tableHead} hidden md:table-cell`}>Name</th>
                  <th className={`${tableHead} hidden md:table-cell`}>Department</th>
                  <th className={`${tableHead} hidden md:table-cell`}>Year</th>
                  <th className={`${tableHead}`}>Solved</th>
                  <th
                    className={`${tableHead} cursor-pointer flex items-center gap-2 justify-between`}
                    onClick={() => handleSort("Rank")}
                  >
                    Rank {getSortingIcon("Rank")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((user, index) => (
                    <tr
                      key={user._id}
                      className={`text-center ${index % 2 === 0 ? "" : "bg-gray-100"} ${theme === "dark" && index % 2 !== 0 ? "bg-zinc-900" : ""}`}
                    >
                      <td className={`${tableHead}`}>{indexOfFirstEntry + index + 1}</td>
                      <td
                        className={`${tableHead} cursor-pointer hover:text-blue-500 hover:font-semibold dark:hover:text-blue-500 dark:transition-colors duration-300`}
                        onClick={() => navigate(`/user/${user.username}`)}
                      >
                        {user.username}
                      </td>
                      <td className={`${tableHead}`}>{user.roll}</td>
                      <td className={`${tableHead} hidden md:table-cell`}>{user.registeredID}</td>
                      <td className={`${tableHead}`}>{user.usernames}</td>
                      <td className={`${tableHead} hidden md:table-cell`}>{user.name}</td>
                      <td className={`${tableHead} hidden md:table-cell`}>{user.department}</td>
                      <td className={`${tableHead} hidden md:table-cell`}>{user.year}</td>
                      <td className={`${tableHead}`}>
                        {user?.platformSpecificData?.leetcode
                          ? `${user.platformSpecificData.leetcode.toLowerCase()}`
                          : user?.platformSpecificData?.codechef
                            ? `${user.platformSpecificData.codechef.toLowerCase()}`
                            : user?.platformSpecificData?.codeforces
                              ? `${user.platformSpecificData.codeforces.toLowerCase()}`
                              : 'No platform data available'}
                      </td>


                      <td className={`${tableHead}`}>{user.ranks?.globalRank || "Not Available"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-gray-500">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-400 disabled:bg-gray-300 transition-all duration-300 ease-in-out shadow-lg disabled:cursor-not-allowed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 transform transition-transform duration-300 ease-in-out"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span className="ml-2 text-sm font-medium">Prev</span>
                </button>

                <span className="text-zinc-500 dark:text-zinc-400">{currentPage} of  {totalPages}</span>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-400 disabled:bg-gray-300 transition-all duration-300 ease-in-out shadow-lg disabled:cursor-not-allowed"
                >
                  <span className="mr-2 text-sm font-medium">Next</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 transform transition-transform duration-300 ease-in-out"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>No data available</div>
        )
      ) : (
        <div className="flex justify-center mt-20">Select Platform First</div>
      )}
    </div>
  );
};

export default AllUserData;
