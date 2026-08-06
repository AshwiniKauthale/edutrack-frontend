import { useState } from "react";

export default function BatchForm({
  initialData,
  onSubmit,
}) {
  const [batch, setBatch] = useState(
    initialData || {
      name: "",
      fees: "",
      trainer: "",
      duration: "",
      description: "",
    }
  );

  const handleChange = (e) => {
    setBatch({
      ...batch,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(batch);
  };

  return (
    <form onSubmit={submit}>
      <div style={{ marginBottom: 15 }}>
        <label>Batch Name</label>

        <input
          type="text"
          name="name"
          value={batch.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 10 }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label>Fees</label>

        <input
          type="number"
          name="fees"
          value={batch.fees}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 10 }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label>Trainer</label>

        <input
          type="text"
          name="trainer"
          value={batch.trainer}
          onChange={handleChange}
          style={{ width: "100%", padding: 10 }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label>Duration</label>

        <input
          type="number"
          name="duration"
          value={batch.duration}
          onChange={handleChange}
          style={{ width: "100%", padding: 10 }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label>Description</label>

        <textarea
          name="description"
          value={batch.description}
          onChange={handleChange}
          rows="4"
          style={{ width: "100%", padding: 10 }}
        />
      </div>

      <button
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
        }}
      >
        Save Batch
      </button>
    </form>
  );
}