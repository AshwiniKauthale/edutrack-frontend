import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import BatchTable from "../../components/batches/BatchTable";

import {
  getBatches,
  deleteBatch,
} from "../../api/batchApi";

export default function BatchList() {
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBatches();
  }, []);

  const loadBatches = async () => {
    try {
      setLoading(true);

      const response = await getBatches();
      setBatches(response.data);
    } catch (error) {
      console.error("Error loading batches:", error);
      alert("Unable to load batches.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (batch) => {
    navigate(`/batches/edit/${batch.id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this batch?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBatch(id);

      alert("Batch Deleted Successfully");

      loadBatches();
    } catch (error) {
      console.error(error);
      alert("Unable to delete batch.");
    }
  };

  const filteredBatches = batches.filter((batch) =>
    batch.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Batch Management</h2>

        <button
          onClick={() => navigate("/batches/add")}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + Add Batch
        </button>
      </div>

      <input
        type="text"
        placeholder="Search Batch..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "320px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      />

      {loading ? (
        <h3>Loading Batches...</h3>
      ) : filteredBatches.length === 0 ? (
        <h3>No Batch Found</h3>
      ) : (
        <BatchTable
          batches={filteredBatches}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </MainLayout>
  );
}