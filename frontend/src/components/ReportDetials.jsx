import React, { useEffect } from "react";
import ReportCard from "./ReportCard";
import { useReportContext } from "../hooks/UseReportContext";
import { useAuthContext } from "../hooks/UseAuthContext";

export default function ReportDetials() {
  const { Report, dispatch } = useReportContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("/report/reportdetail", {
          headers: {
            "Authorization": `Bearer ${user.token}`,
          },
        });
        if (!response) {
          throw new Error("Failed to Fetch Report");
        }
        const json = await response.json();
        dispatch({ type: "SET_REPORT", payload: json });
      } catch (error) {
        console.error("Error Fetching Report", error);
      }
    };
    if (user) {
      fetchdata();
    }
  }, [dispatch, user]);

  return (
    <div className="w-screen h-screen bg-bgc  overflow-y-auto overflow-x-hidden ">
      <header className="bg-black h-[8vh] font-bold text-white p-2 text-xl sticky top-0 ">
        Report
      </header>
      <section>
        <h2 className="p-3 text-2xl font-bold ">Report</h2>
        <hr className="h-px bg-gray-300 border-0" />
        <div className="grid gap-3 px-5 my-4 ">
          {Report && Report.length > 0 ? (
            Report.map((data) => <ReportCard key={data._id} Report={data} />)
          ) : (
            // <span className="bg-accent w-40 text-center mx-auto my-40 p-3 font-bold border border-black rounded-md">
            //   No Report Available
            // </span>
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
              <tr>
                <th className="px-4 py-2 border">Report Type</th>
                <th className="px-4 py-2 border">Project Name</th>
                <th className="px-4 py-2 border">Start Date</th>
                <th className="px-4 py-2 border">End Date</th>
                <th className="px-4 py-2 border">Project Head</th>
                <th className="px-4 py-2 border">Team Id</th>
                <th className="px-4 py-2 border">Description</th>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Task Summary</td>
                <td className="px-4 py-2 border">Collaborative Task Management Tool</td>
                <td className="px-4 py-2 border">20/08/2024</td>
                <td className="px-4 py-2 border">20/12/2024</td>
                <td className="px-4 py-2 border">Aditya Kumar</td>
                <td className="px-4 py-2 border">T001</td>
                <td className="px-4 py-2 border">Working on Frontend Basic UI is completed.</td>
              </tr>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
