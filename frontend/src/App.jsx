import { useEffect, useState } from "react";
import axios from "axios";
import BarChartCount from "./components/BarChartCount.jsx";
import BarChartACV from "./components/BarChartACV.jsx";
import DataTableCount from "./components/DataTableCount.jsx";
import DataTableACV from "./components/DataTableACV.jsx";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => { // using useEffect to fetch data when the component mounts
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/data"); // fetching data from the backend using axios
        setData(res.data);
        console.log("Fetched data:", res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="p-4">
        <h6 className="text-red-500 text-lg">{error}</h6>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4">
        <h6 className="text-lg">Loading...</h6>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

    
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 min-w-[300px] bg-white shadow-md rounded-lg p-4">
          <h6 className="text-lg font-semibold mb-2">Bar Chart - Count</h6>
          <BarChartCount data={data.stages} /> 
        </div>
        <div className="flex-1 min-w-[300px] bg-white shadow-md rounded-lg p-4">
          <h6 className="text-lg font-semibold mb-2">Bar Chart - ACV</h6>
          <BarChartACV stages={data.stages} />
        </div>
      </div>

   
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px] bg-white shadow-md rounded-lg p-4">
          <h6 className="text-lg font-semibold mb-2">Data Table - Count</h6>
          <DataTableCount data={data.stages} />
        </div>
        <div className="flex-1 min-w-[300px] bg-white shadow-md rounded-lg p-4">
          <h6 className="text-lg font-semibold mb-2">Data Table - ACV</h6>
          <DataTableACV stages={data.stages} />
        </div>
      </div>
    </div>
  );
}

export default App;