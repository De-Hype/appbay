import { useEffect, useState } from "react";
import GradientBackground from "../Components/GradientBackground";
import GroupIcon from "../assets/GroupIcon.svg";
import { EllipsisVertical } from "lucide-react";
import Table from "../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import { RootState } from "../redux/store";
import Loader from "../Components/Loader";
import DetailsModal from "../Components/DetailsModal";
import { toggleModal } from "../redux/actionSlice";

const roles = [
  { text: "all", title: "All" },
  { text: "admin", title: "Admin" },
  { text: "user", title: "User" },
];
const joinPeriod = [
  { text: "anyTime", title: "Anytime" },
  { text: "yesterday", title: "Yesterday" },
  { text: "lastWeek", title: "Last Week" },
];

const UserPage = () => {
  const [selectedRole, setSelectedRole] = useState(roles[2].title);
  const [selectedJoinDate, setselectedJoinDate] = useState("Anytime");
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  useEffect(() => {
    dispatch(
      fetchUsers({
        limit: 10,
        page: 1,
        joined: selectedJoinDate,
        role: selectedRole,
      })
    );
  }, [dispatch, selectedJoinDate, selectedRole]);
  const { showModalUser } = useSelector((state: RootState) => state.actions);
  const { selectedUser } = useSelector((state: RootState) => state.users);

  const handleNewUserClick = () => {
    dispatch(toggleModal(true));
  };

  return (
    <GradientBackground>
      {loading && (
        <div className="max-h-screen max-w-screen h-screen w-screen flex items-center justify-center">
          <Loader />
        </div>
      )}

      {!loading && (
        <div className="px-5 w-[90%] py-6 relative">
          <div className="flex flex-col gap-3.5 mb-8">
            <div className="">
              <h2 className="text-[#fff] font-normal text-2xl">
                User Management
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  className="text-[#fff] px-3 py-3 border border-[#6B6B6B] outline-none font-normal text-sm"
                  type="text"
                  name=""
                  placeholder="Search Items"
                  id=""
                />
                <div className="text-sm flex items-center  text-white justify-center border border-[#6B6B6B] px-2 py-1">
                  <p className="">Permissions</p>
                  <div className="">
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      style={{
                        color: "rgba(255, 139, 55, 1)",
                      }}
                      className="w-full rounded-md p-2  "
                    >
                      {roles.map((role) => (
                        <option key={role.text} value={role.text}>
                          {role.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center  text-sm border border-[#6B6B6B] px-2 py-1 justify-center">
                  <p className="text-[#fff]">Joined</p>
                  <div className="">
                    <select
                      value={selectedJoinDate}
                      onChange={(e) => setselectedJoinDate(e.target.value)}
                      style={{
                        color: "rgba(255, 139, 55, 1)",
                      }}
                      className="w-full rounded-md p-2  "
                    >
                      {joinPeriod.map((role) => (
                        <option key={role.text} value={role.text}>
                          {role.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <img
                  style={{
                    border: "1px solid rgba(107, 107, 107, 1)",
                  }}
                  src={GroupIcon}
                  className="px-2 pt-2 pb-1 flex items-center justify-center rounded-[8px] "
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="border rounded-[8px] border-[#6B6B6B]">
                  <EllipsisVertical className="mx-1 my-1 text-xs text-[#F5F5F5]" />
                </div>
                <button
                  type="button"
                  className="border  border-[#6B6B6B]  px-4 py-3  text-[#FFFFFF] font-normal text-sm"
                >
                  Export
                </button>
                <button
                  onClick={handleNewUserClick}
                  type="button"
                  className="border bg-[#FB6B03] cursor-pointer px-4 py-3 font-bold border-[#6B6B6B] text-[#FFFFFF]  text-sm flex gap-2 items-center"
                >
                  <span className="">+</span>
                  <span className="">New User</span>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-[#494949]">
            {!error && users?.users?.length >= 1 && (
              <Table
                joinDate={selectedJoinDate}
                selectRole={selectedRole}
                tableType="user"
                data={users}
              />
            )}
            {error && (
              <div className="min-h-[75vh] flex items-center justify-center">
                <p className="text-white">{error.message}</p>
              </div>
            )}
          </div>

          {showModalUser && !selectedUser && (
            <DetailsModal isType="user" usedFor="create" />
          )}
        </div>
      )}
    </GradientBackground>
  );
};

export default UserPage;
