import { useEffect, useState } from "react";
import TableRow from "./TableRow";
import { IoMdOptions } from "react-icons/io";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import axios from "axios";

function Table() {
  const [projects, setProjects] = useState([]); // fetching data from APi and set to useState.
  const [checkboxValues, setCheckboxValues] = useState(['Project Name', 'Project Id', 'Project Link', 'Bid Value']); // counting checkbox in array
  const [greenBadge, setGreenBadge] = useState(0); //counting green badge value

  useEffect(() => {
    //fetching data
    axios.get("https://seopage1erp.website/api/leads").then((res) => {
      setProjects(res.data?.data);
    });
  }, [projects]);
 console.log(projects);

  //counting green badge and red will be 100-greenBadge
  const greenCounterFunction = () => {
    
    setGreenBadge(greenBadge + 1);
    return true;
  }

  // handling checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckboxValues((prevValues) => [...prevValues, value]);
    } else {
      setCheckboxValues((prevValues) =>
        prevValues.filter((item) => item !== value)
      );
    }
  };
  //console.log(checkboxValues);

  //area chart
  const data = [
    {
      name: "converted deal",
      uv: greenBadge,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Not converted deal",
      uv: 100 - greenBadge,
      pv: 1398,
      amt: 2210,
    },
  ];

  return (
    <div className="m-10 bg-white">
      {/* reset column  */}
      <div className="dropdown dropdown-bottom flex w-full text-right">
        <label tabIndex={0} className="btn m-1">
          <IoMdOptions></IoMdOptions>
          <p>Reset Column</p>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <label className="">
              <input
                type="checkbox"
                value="Select All"
                checked={checkboxValues.includes("Select All")}
                onChange={handleCheckboxChange}
              />
              Select All
            </label>
          </li>
          <li>
            <label className="">
              <input
                type="checkbox"
                value="Project Name"
                checked={checkboxValues.includes("Project Name")}
                onChange={handleCheckboxChange}
              />
              Project Name
            </label>
          </li>
          <li>
            <label className="">
              <input
                type="checkbox"
                value="Project Link"
                checked={checkboxValues.includes("Project Link")}
                onChange={handleCheckboxChange}
              />
              Project Link
            </label>
          </li>
          <li>
            <label className="">
              <input
                type="checkbox"
                value="Project Id"
                checked={checkboxValues.includes("Project Id")}
                onChange={handleCheckboxChange}
              />
              Project Id
            </label>
          </li>
          <li>
            <label className="">
              <input
                type="checkbox"
                value="Bid Value"
                checked={checkboxValues.includes("Bid Value")}
                onChange={handleCheckboxChange}
              />
              Bid Value
            </label>
          </li>
        </ul>
      </div>

      {/* Table  */}
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>#</th>
              {checkboxValues.map((value, index) => (
                <th key={index}>{value}</th>
              ))}
              
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {projects &&
              projects
                .slice(projects.length - 101, projects.length-1)
                .map((project) => (
                  // calling table row component
                  <TableRow
                    key={project?.id}
                    project={project}
                    greenCounterFunction={greenCounterFunction}
                    checkboxValues={checkboxValues}
                  ></TableRow>
                ))}
          </tbody>
        </table>
      </div>
      <div className="mt-16">
        {/* area chart  */}
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </div>
    </div>
  );
}

export default Table;
