import React, { useState } from "react";
import {
  Calendar,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Trash2,
  Edit,
} from "lucide-react";
import Person from "../assets/Person.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setSelectedUser, User } from "../redux/userSlice";
import { toggleMenu, toggleModal, toggleModalItem } from "../redux/actionSlice";
import { RootState } from "../redux/store";
import DetailsModal from "./DetailsModal";
import axios from "axios";
import { BaseURL } from "../utils";
import { Item, setSelectedItem } from "../redux/itemSlice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = ({ tableType, data, joinDate, selectRole }: any) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(data.currentPage);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(
    tableType == "user" ? data?.users.length : data?.items.length / rowsPerPage
  );
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentList = (tableType == "user" ? data.users : data.items).slice(
    startIndex,
    endIndex
  );

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

  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
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
  const { activeUserId, showModalItem, showModalUser} = useSelector(
    (state: RootState) => state.actions
  );

  const handlePageIncrement = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    dispatch(
      fetchUsers({
        limit: rowsPerPage,
        page: currentPage + 1,
        joined: joinDate,
        role: selectRole,
      })
    );
  };

  const handleEditUser = (user: User) => {
    dispatch(toggleMenu(null));
    dispatch(setSelectedUser(user));
    dispatch(toggleModal(true));
  };

  const handleEditItem = (item: Item) => {
    dispatch(toggleMenu(null));
    dispatch(setSelectedItem(item));
    dispatch(toggleModalItem(true));
  };

  const handleDeleteUser = async (user: User) => {
    try {
      const response = await axios.delete(`${BaseURL}/users/${user.id}`);
      if (response.statusText == "OK") window.location.reload();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleDeleteItem = async (item: Item) => {
    try {
      const response = await axios.delete(`${BaseURL}/items/${item.id}`);
      if (response.statusText == "OK") window.location.reload();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div className="relative flex w-full flex-col border border-[#494949] bg-[#5e5e5e] shadow-sm">
      <div className="w-full overflow-x-auto min-h-[75vh]">
        <table className="w-full min-w-full table-fixed">
          <thead className="bg-[#3D3D3D] w-full">
            <tr>
              <th scope="col" className="w-[5%] px-6 py-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 border bg-[#494949]"
                  checked={
                    tableType == "user"
                      ? selectedUsers.length === data.users.length
                      : selectedItems.length === data.items.length
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th
                scope="col"
                className="w-[15%] px-6 py-3 text-left text-sm font-semibold text-gray-300"
              >
                <div className="flex items-center">
                  <span>{tableType == "user" ? "Full Name" : "Item Name"}</span>
                  <ChevronsUpDown className="ml-1" />
                </div>
              </th>
              {tableType == "user" ? (
                <th
                  scope="col"
                  className="w-[20%] px-6 py-3 text-left text-sm font-semibold text-gray-300"
                >
                  <div className="flex items-center">
                    <span>Email Address</span>
                    <ChevronsUpDown className="ml-1" />
                  </div>
                </th>
              ) : (
                <th
                  scope="col"
                  className="w-[30%] px-6 py-3 text-left text-sm font-semibold text-gray-300"
                >
                  <div className="flex items-center">
                    <span>Description</span>
                    <ChevronsUpDown className="ml-1" />
                  </div>
                </th>
              )}
              <th
                scope="col"
                className="w-[15%] px-6 py-3 text-left text-sm font-semibold text-gray-300"
              >
                <div className="flex items-center">
                  <span>{tableType == "user" ? "Location" : "Created At"}</span>
                  <ChevronsUpDown className="ml-1" />
                </div>
              </th>
              <th
                scope="col"
                className="w-[15%] px-6 py-3 text-left text-sm font-semibold text-gray-300"
              >
                <div className="flex items-center">
                  <span>{tableType == "user" ? "Joined" : "Price"}</span>
                  <ChevronsUpDown className="ml-1" />
                </div>
              </th>
              <th
                scope="col"
                className="w-[15%] px-6 py-3 text-left text-sm font-semibold"
                style={{ color: "rgba(255, 139, 55, 1)" }}
              >
                <div className="flex items-center">
                  <span>{tableType == "user" ? "Permissions" : ""}</span>

                  {tableType == "user" && <ChevronsUpDown className="ml-1" />}
                </div>
              </th>
              <th scope="col" className="w-[5%] px-6 py-3 text-right">
                <Calendar className="h-5 w-5 text-gray-300" />
              </th>
            </tr>
          </thead>
          <tbody>
            {currentList.map((value: any) => (
              <tr
                key={value.id}
                className="hover:bg-[#3D3D3D] mx-5 transition-colors relative"
              >
                <td className="pr-3 pl-8 py-4">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={
                      tableType == "user"
                        ? selectedUsers.includes(value.id)
                        : selectedItems.includes(value.id)
                    }
                    onChange={
                      tableType == "user"
                        ? () => handleSelectUser(value.id)
                        : () => handleSelectItem(value.id)
                    }
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={Person}
                      alt=""
                      className="w-9 h-9 rounded-full flex-shrink-0"
                    />
                    <p className="font-medium text-gray-300 truncate">
                      {value.name}
                    </p>
                  </div>
                </td>
                {tableType == "user" ? (
                  <td className="px-6 py-4 text-gray-300 truncate">
                    {value.email}
                  </td>
                ) : (
                  <td className="px-6 py-4 text-gray-300">
                    <div className="break-words whitespace-normal max-w-prose">
                      {value.description}
                    </div>
                  </td>
                )}
                <td className="px-6 py-4 text-gray-300 truncate">
                  {tableType == "user"
                    ? value.location
                    : formatDate(value.createdAt)}
                </td>
                <td className="px-6 py-4 text-gray-300 truncate">
                  {tableType == "user"
                    ? formatDate(value.createdAt)
                    : value.price}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      value.role === "Admin"
                        ? "bg-purple-100 text-purple-800"
                        : value.role === "User"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {value.role}
                  </span>
                </td>
                <td className="relative pl-3 pr-9 py-4 text-right">
                  <button
                    onClick={() => dispatch(toggleMenu(value.id))}
                    className="text-gray-300 hover:text-white"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                  {activeUserId == value.id && (
                    <div className="absolute z-10 right-10 flex flex-col bg-[#FB6B03] shadow-md">
                      <button
                        onClick={() =>
                          tableType == "user"
                            ? handleEditUser(value)
                            : handleEditItem(value)
                        }
                        type="button"
                        className="flex text-[#3D3D3D] items-center gap-1 cursor-pointer py-2 px-3 bg-white hover:transition hover:bg-[#3D3D3D] hover:text-white"
                      >
                        <Edit className="text-[10px]" />
                        <span className="text-base font-bold">Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          tableType == "user"
                            ? handleDeleteUser(value)
                            : handleDeleteItem(value)
                        }
                        className="flex text-[#3D3D3D] gap-1 cursor-pointer items-center py-2 px-3 bg-white hover:transition hover:bg-[#3D3D3D] hover:text-white"
                      >
                        <Trash2 className="text-[10px]" />
                        <span className="text-base font-bold">Delete</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev:number) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 text-gray-300 hover:text-white disabled:text-gray-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {renderPageNumbers()}
          <button
            onClick={handlePageIncrement}
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
      {((showModalItem && selectedItems)|| (showModalUser&& selectedUsers))  && <DetailsModal  isType={tableType} usedFor="edit" />}
    </div>
  );
};

export default Table;
