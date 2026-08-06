import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Sidebar />

      <div
        style={{
          marginLeft: "250px",
          minHeight: "100vh",
          backgroundColor: "#f3f4f6",
        }}
      >
        <Navbar />

        <main
          style={{
            padding: "30px",
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
}