import DashboardCard from "./DashboardCard";

export default function StatsGrid({ stats }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "20px",
      }}
    >
      <DashboardCard
        title="Students"
        value={stats.students}
        color="#2563eb"
      />

      <DashboardCard
        title="Teachers"
        value={stats.teachers}
        color="#16a34a"
      />

      <DashboardCard
        title="Batches"
        value={stats.batches}
        color="#ea580c"
      />

      <DashboardCard
        title="Classrooms"
        value={stats.classrooms}
        color="#7c3aed"
      />

      <DashboardCard
        title="Attendance"
        value={stats.attendance}
        color="#dc2626"
      />

      <DashboardCard
        title="Assignments"
        value={stats.assignments}
        color="#0891b2"
      />
    </div>
  );
}