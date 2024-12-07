import React, { useEffect } from "react";
import ProjectCards from "./ProjectCards";
import { useProjectContext } from "../hooks/UseProjectContext";
import { useAuthContext } from "../hooks/UseAuthContext";

const Dashboard = () => {
  const { Project, dispatch } = useProjectContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("/project/dashboard", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response) {
          throw new Error("Failed to fetch Project");
        }
        const json = await response.json();
        dispatch({ type: "SET_PROJECT", payload: json });
      } catch (error) {
        console.error("Error fetching Project", error);
      }
    };
    if (user) {
      fetchdata();
    }
  }, [dispatch, user]);
  return (
    <div className="w-screen h-screen bg-bgc overflow-auto ">
      <header className="bg-black h-[8vh] font-bold text-white p-2 text-xl sticky top-0">
        DashBoard
      </header>
      <section>
        <h2 className="p-3 text-2xl font-bold ">Projects</h2>
        <hr className="h-px bg-gray-300 border-0" />
        <div className="grid gap-3 px-5 my-4 ">
          {Project && Project.length > 0 ? (
            Project.map((data) => (
              <ProjectCards key={data._id} Project={data} />
            ))
          ) : (
            // <span className="bg-accent w-40 text-center mx-auto my-40 p-3 font-bold border border-black rounded-md">
            //   No Project Available
            // </span>
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
              <tr>
                <th className="px-4 py-2 border">Project Id</th>
                <th className="px-4 py-2 border">Project Name</th>
                <th className="px-4 py-2 border">Project Head</th>
                <th className="px-4 py-2 border">Start Date</th>
                <th className="px-4 py-2 border">End Date</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
              <tr>
                <td className="px-4 py-2 border">001</td>
                <td className="px-4 py-2 border">Collaborative Task Management Tool</td>
                <td className="px-4 py-2 border">Aditya Kumar</td>
                <td className="px-4 py-2 border">20/08/2024</td>
                <td className="px-4 py-2 border">20/12/2024</td>
                <td className="px-4 py-2 border">The primary objective of this project is to design and implement a collaborative task management tool that addresses the common challenges faced in modern task management. </td>
                <td className="px-4 py-2 border">Working</td>
              </tr>
            </table>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
