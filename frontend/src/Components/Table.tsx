import React, { useState } from "react";
import {
  Calendar,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
} from "lucide-react";
import Person from "../assets/Person.jpeg";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../redux/userSlice";

const Table = ({tableType, data}) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(data.currentPage);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(data?.users.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentUsers = data?.users.slice(startIndex, endIndex);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-3 py-1 rounded-md ${
              currentPage === i
                ? "bg-orange-500 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <span key={i} className="px-2 text-gray-300">
            ...
          </span>
        );
      }
    }
    return pages;
  };
  const dispatch = useDispatch();
  const handlePageIncrement=()=>{
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    dispatch(fetchUsers({limit:rowsPerPage, page:currentPage+1}));
  }

  return (
    <div className="flex flex-col border border-[#494949] bg-[#5e5e5e] shadow-sm">
      <div className="w-full overflow-x-auto min-h-[75vh] ">
        <table className="w-full min-w-full">
          <thead className="bg-[#3D3D3D]">
            <tr>
              <th scope="col" className="px-6 py-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 border bg-[#494949] "
                  checked={selectedUsers.length === data.users.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-300"
              >
                <div className="flex items-center">
                  <span className="">Full Name</span>
                  <span className="">
                    <ChevronsUpDown className="" />
                  </span>
                </div>
                
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-300"
              >
                <div className="flex items-center">
                  <span className="">Email Address</span>
                  <span className="">
                    <ChevronsUpDown className="" />
                  </span>
                </div>
                
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-300"
              >
                <div className="flex items-center">
                  <span className="">Location</span>
                  <span className="">
                    <ChevronsUpDown className="" />
                  </span>
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left flex items-center text-sm font-semibold text-gray-300"
              >
                <div className="flex items-center">
                  <span className="">Joined</span>
                  <span className="">
                    <ChevronsUpDown className="" />
                  </span>
                </div>
              </th>
              <th
                scope="col"
                style={{
                  color: "rgba(255, 139, 55, 1)",
                }}
                className="px-6 py-3 text-left  text-sm font-semibold text-gray-300"
              >
                <div className="flex items-center">
                  <span className="">Permissions</span>
                  <span className="">
                    <ChevronsUpDown className="text-sm" />
                  </span>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                <Calendar className="h-5 w-5 text-gray-300" />
              </th>
            </tr>
          </thead>
          <tbody className="">
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-[#3D3D3D] mx-5 transition-colors"
              >
                <td className="pr-3 pl-8 pl- py-4">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <img src={Person} alt="" className="w-9 h-9 rounded-full" />
                  <p className="font-medium text-gray-300">{user.name}</p>
                </td>
                <td className="px-6 py-4 text-gray-300">{user.email}</td>
                <td className="px-6 py-4 text-gray-300">{user.location}</td>
                <td className="px-6 py-4 text-gray-300">
                  {formatDate(user.updatedAt)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      user.role === "Admin"
                        ? "bg-purple-100 text-purple-800"
                        : user.role === "User"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className=" pl-3 pr-9 py-4 text-right">
                  <button className="text-gray-300 hover:text-white">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between px-4 py-3 ">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 text-gray-300 hover:text-white disabled:text-gray-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {renderPageNumbers()}

          <button
            onClick={() =>
              handlePageIncrement
            }
            disabled={currentPage === totalPages}
            className="p-1 text-gray-300 hover:text-white disabled:text-gray-600"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-gray-300">
          <span>Show:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-[#494949] border border-[#606060] rounded px-2 py-1"
          >
            <option value={5}>5 rows</option>
            <option value={10}>10 rows</option>
            <option value={20}>20 rows</option>
            <option value={50}>50 rows</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Table;
