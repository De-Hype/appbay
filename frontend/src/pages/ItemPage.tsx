import { useEffect, useState } from "react";
import GradientBackground from "../Components/GradientBackground";
import GroupIcon from "../assets/GroupIcon.svg";
import { EllipsisVertical } from "lucide-react";
import Table from "../Components/Table";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Loader from "../Components/Loader";
import DetailsModal from "../Components/DetailsModal";
import { toggleModalItem } from "../redux/actionSlice";
import { fetchItems } from "../redux/itemSlice";

const ItemPage = () => {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state: RootState) => state.items
  );
  useEffect(() => {
    dispatch(
      fetchItems({
        limit: 10,
        page: 1,
      })
    );
  }, [dispatch]);
  const { showModalItem } = useSelector((state: RootState) => state.actions);
  const { selectedItem } = useSelector((state: RootState) => state.items);
  
  const handleNewItemClick = () => {
    
    dispatch(toggleModalItem(true))
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
                Item Management
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
                  onClick={handleNewItemClick}
                  type="button"
                  className="border bg-[#FB6B03] cursor-pointer px-4 py-3 font-bold border-[#6B6B6B] text-[#FFFFFF]  text-sm flex gap-2 items-center"
                >
                  <span className="">+</span>
                  <span className="">New Item</span>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-[#494949]">
            {!error && items?.items?.length >= 1 && (
              <Table tableType="item" data={items} />
            )}
            {error && (
              <div className="min-h-[75vh] flex items-center justify-center">
                <p className="text-white">{error?.message}</p>
              </div>
            )}
          </div>
          {((showModalItem && !selectedItem))  && <DetailsModal isType="item" usedFor="create" />}
        </div>
      )}
    </GradientBackground>
  );
};

export default ItemPage;
