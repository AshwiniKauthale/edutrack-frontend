import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import StatsGrid from "../../components/dashboard/StatsGrid";
import RecentActivity from "../../components/dashboard/RecentActivity";
import DashboardCharts from "../../components/dashboard/DashboardCharts";

import { getDashboardStats } from "../../api/dashboardApi";

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    batches: 0,
    classrooms: 0,
    attendance: 0,
    assignments: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <h1
        style={{
          marginBottom: "25px",
        }}
      >
        Dashboard
      </h1>

      {loading ? (
        <h2>Loading Dashboard...</h2>
      ) : (
        <>
          <StatsGrid stats={stats} />

          <div style={{ marginTop: "40px" }}>
            <RecentActivity />
            <DashboardCharts />
          </div>
        </>
      )}
    </MainLayout>
  );
}