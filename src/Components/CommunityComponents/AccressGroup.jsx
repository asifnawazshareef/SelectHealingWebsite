import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import utils from "../../utils/utils";
import axios from "axios";

function AccressGroup({ communityListings }) {
  const confirmAndDelete = (message, deleteHandler) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full mx-auto">
            <h2 className="text-xl font-semibold text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                onClick={() => {
                  deleteHandler();
                  onClose();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        );
      },
      overlayClassName:
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center",
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${utils.BASE_URL}buys/${id}`, {
        headers: {
          Authorization: `Bearer ${utils.token}`,
        },
      });
      console.log("Deleted successfully");
      communityListings();
    } catch (error) {
      console.error("Error deleting the record:", error);
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <section className="container mx-auto p-6 font-mono">
          <div className="mb-5 flex gap-3 items-center border-gray-200">
            <h2 className="text-2xl font-medium">Group Members</h2>
            <h2 className="px-2 py-1 font-semibold leading-tight text-gray-700 border rounded-sm">
              {communityListings?.flatMap(
                (community) =>
                  community?.attributes?.course?.data?.attributes?.buys?.data
              )?.length || 0}
              <span>Group Members</span>
            </h2>
          </div>
          <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 border-b border-gray-600">
                    <th className="px-4 py-3 flex gap-3 items-center">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="checkbox-all" className="sr-only">
                          checkbox
                        </label>
                      </div>
                      Name
                    </th>
                    <th className="px-4 py-3">Email Address</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Enrolled at</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {communityListings?.flatMap((community) =>
                    community?.attributes?.course?.data?.attributes?.buys?.data.map(
                      (buy, index) => {
                        const user =
                          buy?.attributes?.user?.data?.attributes || {};
                        return (
                          <tr className="text-gray-700" key={index}>
                            <td className="px-4 py-3 border">
                              <div className="flex items-center gap-3 text-sm">
                                <div className="w-4">
                                  <div className="flex items-center">
                                    <input
                                      id={`checkbox-table-${index}`}
                                      type="checkbox"
                                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                      htmlFor={`checkbox-table-${index}`}
                                      className="sr-only"
                                    >
                                      checkbox
                                    </label>
                                  </div>
                                </div>
                                <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                  <img
                                    className="object-cover w-full h-full rounded-full"
                                    src={user.picture}
                                    alt={`${user.fname} ${user.lname}`}
                                    loading="lazy"
                                  />
                                  <div
                                    className="absolute inset-0 rounded-full shadow-inner"
                                    aria-hidden="true"
                                  ></div>
                                </div>
                                <div>
                                  <p className="font-semibold text-black">
                                    {`${user.fname} ${user.lname}` ||
                                      "User Name"}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-ms font-semibold border">
                              {user.email || "User Email"}
                            </td>
                            <td className="px-4 py-3 text-xs border">
                              <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                                Team member
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm border">
                              {new Date(
                                buy?.attributes?.createdAt
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }) || ""}
                            </td>

                            <td
                              onClick={() =>
                                confirmAndDelete(
                                  "Are you sure you want to delete this member?",
                                  () => handleDelete(buy.id)
                                )
                              }
                              className="px-4 py-3 text-ms font-semibold border"
                            >
                              <RiDeleteBinLine />
                            </td>
                          </tr>
                        );
                      }
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AccressGroup;
