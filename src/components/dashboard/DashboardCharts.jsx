import { useEffect, useState } from "react";

import {
  Bar,
  Pie,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { getDashboardCharts } from "../../api/dashboardApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function DashboardCharts() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    loadCharts();
  }, []);

  const loadCharts = async () => {
    try {
      const res = await getDashboardCharts();
      setChartData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!chartData) return <h3>Loading Charts...</h3>;

  const barData = {
    labels: [
      "Students",
      "Teachers",
      "Batches",
      "Classrooms",
    ],
    datasets: [
      {
        label: "Total Records",
        data: [
          chartData.students,
          chartData.teachers,
          chartData.batches,
          chartData.classrooms,
        ],
        backgroundColor: [
          "#3b82f6",
          "#22c55e",
          "#f97316",
          "#8b5cf6",
        ],
      },
    ],
  };

  const pieData = {
    labels: [
      "Attendance",
      "Assignments",
    ],
    datasets: [
      {
        data: [
          chartData.attendance,
          chartData.assignments,
        ],
        backgroundColor: [
          "#ef4444",
          "#06b6d4",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "25px",
        marginTop: "35px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3>Institution Overview</h3>

        <Bar data={barData} />
      </div>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3>Attendance vs Assignments</h3>

        <Pie data={pieData} />
      </div>
    </div>
  );
}