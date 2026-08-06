import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import BatchForm from "../../components/batches/BatchForm";

import { createBatch } from "../../api/batchApi";

export default function AddBatch() {
  const navigate = useNavigate();

  const saveBatch = async (batch) => {
    try {
      await createBatch(batch);

      alert("Batch Added Successfully");

      navigate("/batches");
    } catch (error) {
      console.log(error);
      alert("Unable to save batch.");
    }
  };

  return (
    <MainLayout>
      <h2>Add Batch</h2>

      <BatchForm onSubmit={saveBatch} />
    </MainLayout>
  );
}