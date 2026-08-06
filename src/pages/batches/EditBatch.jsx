import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import {
  getBatchById,
  updateBatch,
} from "../../api/batchApi";

export default function EditBatch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [batch, setBatch] = useState({
    name: "",
    fees: "",
    trainer: "",
    duration: "",
    description: "",
  });

  useEffect(() => {
    loadBatch();
  }, []);

  const loadBatch = async () => {
    try {
      const response = await getBatchById(id);

      setBatch({
        name: response.data.name || "",
        fees: response.data.fees || "",
        trainer: response.data.trainer || "",
        duration: response.data.duration || "",
        description: response.data.description || "",
      });
    } catch (error) {
      console.error(error);
      alert("Unable to load batch.");
      navigate("/batches");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setBatch({
      ...batch,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateBatch(id, batch);

      alert("Batch Updated Successfully");

      navigate("/batches");
    } catch (error) {
      console.error(error);
      alert("Unable to update batch.");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <h2>Loading...</h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h2>Edit Batch</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Batch Name"
          value={batch.name}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="number"
          name="fees"
          placeholder="Fees"
          value={batch.fees}
          onChange={handleChange}
          required
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="text"
          name="trainer"
          placeholder="Trainer"
          value={batch.trainer}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="number"
          name="duration"
          placeholder="Duration"
          value={batch.duration}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={batch.description}
          onChange={handleChange}
          rows="4"
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Update Batch
        </button>
      </form>
    </MainLayout>
  );
}