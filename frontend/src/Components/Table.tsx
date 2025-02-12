// import React, { useState } from 'react';
// import { Calendar, MoreVertical } from 'lucide-react';

// const Table = () => {
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

//   const users = [
//     {
//       id: '1',
//       fullName: 'John Smith',
//       email: 'john.smith@example.com',
//       location: 'New York, USA',
//       joined: '2024-01-15',
//       permissions: 'Admin'
//     },
//     {
//       id: '2',
//       fullName: 'Sarah Johnson',
//       email: 'sarah.j@example.com',
//       location: 'London, UK',
//       joined: '2024-02-01',
//       permissions: 'Editor'
//     },
//     {
//       id: '3',
//       fullName: 'Michael Chen',
//       email: 'michael.c@example.com',
//       location: 'Singapore',
//       joined: '2024-01-28',
//       permissions: 'Viewer'
//     },
//     {
//       id: '4',
//       fullName: 'Emma Wilson',
//       email: 'emma.w@example.com',
//       location: 'Sydney, AU',
//       joined: '2024-02-10',
//       permissions: 'Editor'
//     }
//   ];

//   const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.checked) {
//       setSelectedUsers(users.map(user => user.id));
//     } else {
//       setSelectedUsers([]);
//     }
//   };

//   const handleSelectUser = (userId: string) => {
//     setSelectedUsers(prev =>
//       prev.includes(userId)
//         ? prev.filter(id => id !== userId)
//         : [...prev, userId]
//     );
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   return (
//     <div className="w-full overflow-x-auto border border-[#494949] bg-[#494949] shadow-sm">
//       <table className="w-full min-w-full  ">
//         <thead className="bg-[#3D3D3D]">
//           <tr>
//             <th scope="col" className="px-6 py-3">
//               <input
//                 type="checkbox"
//                 className="h-4 w-4 rounded border-gray-300"
//                 checked={selectedUsers.length === users.length}
//                 onChange={handleSelectAll}
//               />
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
//               Full Name
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
//               Email Address
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
//               Location
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
//               Joined
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
//               Permissions
//             </th>
//             <th scope="col" className="px-6 py-3 text-right">
//               <Calendar className="h-5 w-5 text-gray-500" />
//             </th>
//           </tr>
//         </thead>
//         <tbody className=" bg-[#494949]">
//           {users.map((user) => (
//             <tr
//               key={user.id}
//               className="hover:bg-gray-50"
//             >
//               <td className="px-6 py-4">
//                 <input
//                   type="checkbox"
//                   className="h-4 w-4 rounded border-gray-300"
//                   checked={selectedUsers.includes(user.id)}
//                   onChange={() => handleSelectUser(user.id)}
//                 />
//               </td>
//               <td className="px-6 py-4">
//                 <div className="font-medium text-gray-900">{user.fullName}</div>
//               </td>
//               <td className="px-6 py-4 text-gray-500">
//                 {user.email}
//               </td>
//               <td className="px-6 py-4 text-gray-500">
//                 {user.location}
//               </td>
//               <td className="px-6 py-4 text-gray-500">
//                 {formatDate(user.joined)}
//               </td>
//               <td className="px-6 py-4">
//                 <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
//                   user.permissions === 'Admin'
//                     ? 'bg-purple-100 text-purple-800'
//                     : user.permissions === 'Editor'
//                     ? 'bg-blue-100 text-blue-800'
//                     : 'bg-gray-100 text-gray-800'
//                 }`}>
//                   {user.permissions}
//                 </span>
//               </td>
//               <td className="px-6 py-4 text-right">
//                 <button className="text-gray-500 hover:text-gray-700">
//                   <MoreVertical className="h-5 w-5" />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

import React, { useState } from "react";
import {
  Calendar,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Person from "../assets/Person.jpeg";

const Table = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const users = [
    {
      id: "1",
      fullName: "John Smith",
      email: "john.smith@example.com",
      location: "New York, USA",
      joined: "2024-01-15",
      permissions: "Admin",
    },
    {
      id: "2",
      fullName: "Sarah Johnson",
      email: "sarah.j@example.com",
      location: "London, UK",
      joined: "2024-02-01",
      permissions: "Editor",
    },
    {
      id: "3",
      fullName: "Michael Chen",
      email: "michael.c@example.com",
      location: "Singapore",
      joined: "2024-01-28",
      permissions: "Viewer",
    },
    {
      id: "4",
      fullName: "Emma Wilson",
      email: "emma.w@example.com",
      location: "Sydney, AU",
      joined: "2024-02-10",
      permissions: "Editor",
    },
    {
      id: "5",
      fullName: "Sarah Johnson",
      email: "sarah.j@example.com",
      location: "London, UK",
      joined: "2024-02-01",
      permissions: "Editor",
    },
    {
      id: "6",
      fullName: "Sarah Johnson",
      email: "sarah.j@example.com",
      location: "London, UK",
      joined: "2024-02-01",
      permissions: "Editor",
    },
    {
      id: "7",
      fullName: "Sarah Johnson",
      email: "sarah.j@example.com",
      location: "London, UK",
      joined: "2024-02-01",
      permissions: "Editor",
    },
    {
      id: "8",
      fullName: "Sarah Johnson",
      email: "sarah.j@example.com",
      location: "London, UK",
      joined: "2024-02-01",
      permissions: "Editor",
    },
    {
      id: "9",
      fullName: "Sarah Johnson",
      email: "sarah.j@example.com",
      location: "London, UK",
      joined: "2024-02-01",
      permissions: "Editor",
    },
    {
      id: "10",
      fullName: "Sarah Johnson",
      email: "sarah.j@example.com",
      location: "London, UK",
      joined: "2024-02-01",
      permissions: "Editor",
    },
    {
      id: "11",
      fullName: "Sarah Johnson",
      email: "sarah.j@example.com",
      location: "London, UK",
      joined: "2024-02-01",
      permissions: "Editor",
    },
  ];

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

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

  return (
    <div className="flex flex-col border border-[#494949] bg-[#5e5e5e] shadow-sm">
      <div className="w-full overflow-x-auto ">
        <table className="w-full min-w-full">
          <thead className="bg-[#3D3D3D]">
            <tr>
              <th scope="col" className="px-6 py-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 border bg-[#494949] "
                  checked={selectedUsers.length === users.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-300"
              >
                Full Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-300"
              >
                Email Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-300"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-300"
              >
                Joined
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold text-gray-300"
              >
                Permissions
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
                  <p className="font-medium text-gray-300">{user.fullName}</p>
                </td>
                <td className="px-6 py-4 text-gray-300">{user.email}</td>
                <td className="px-6 py-4 text-gray-300">{user.location}</td>
                <td className="px-6 py-4 text-gray-300">
                  {formatDate(user.joined)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      user.permissions === "Admin"
                        ? "bg-purple-100 text-purple-800"
                        : user.permissions === "Editor"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.permissions}
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
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
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
