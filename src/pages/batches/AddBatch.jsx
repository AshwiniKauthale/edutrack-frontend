import { useNavigate } from "react-router-dom";

import BatchForm from "../../components/batches/BatchForm";

import { createBatch } from "../../api/batchApi";

export default function AddBatch() {

    const navigate = useNavigate();


    const saveBatch = async (batch) => {

        try {

            await createBatch(batch);

            alert(
                "Batch added successfully."
            );

            navigate("/batches");

        } catch (error) {

            console.error(
                "Create batch error:",
                error
            );

            alert(
                error.response?.data ||
                "Unable to save batch."
            );

            throw error;
        }
    };


    return (

        <div className="batch-page">

            <div className="batch-form-header">

                <div>

                    <h1>
                        Add Batch
                    </h1>

                    <p>
                        Create a new training batch
                    </p>

                </div>

                <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                        navigate("/batches")
                    }
                >
                    ← Back
                </button>

            </div>


            <BatchForm
                onSubmit={saveBatch}
                submitText="Create Batch"
            />

        </div>
    );
}