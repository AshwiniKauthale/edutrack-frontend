import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    getBatchById,
} from "../../api/batchApi";


const formatDate = (date) => {

    if (!date) {
        return "—";
    }

    return new Date(
        `${date}T00:00:00`
    ).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
};


export default function ViewBatch() {

    const {
        id,
    } = useParams();

    const navigate =
        useNavigate();


    const [batch, setBatch] =
        useState(null);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        const load = async () => {

            try {

                const response =
                    await getBatchById(id);

                setBatch(response.data);

            } catch (error) {

                console.error(error);

                alert(
                    "Unable to load batch."
                );

                navigate("/batches");

            } finally {

                setLoading(false);
            }
        };

        load();

    }, [id, navigate]);


    if (loading) {

        return (

            <div className="batch-page">

                <div className="text-center py-5">

                    <div
                        className="spinner-border text-primary"
                    />

                    <p className="mt-3">
                        Loading batch...
                    </p>

                </div>

            </div>
        );
    }


    if (!batch) {
        return null;
    }


    return (

        <div className="batch-page">

            <div className="batch-form-header">

                <div>

                    <h1>
                        Batch Details
                    </h1>

                    <p>
                        View complete batch information
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


            <div className="batch-details-card">

                <div className="batch-details-title">

                    <div className="batch-large-avatar">

                        {(
                            batch.name ||
                            "B"
                        )
                            .charAt(0)
                            .toUpperCase()}

                    </div>

                    <div>

                        <h2>
                            {
                                batch.name ||
                                "Unnamed Batch"
                            }
                        </h2>

                        <span
                            className={`batch-status ${
                                (
                                    batch.status ||
                                    "ACTIVE"
                                ).toLowerCase()
                            }`}
                        >
                            {
                                batch.status ||
                                "ACTIVE"
                            }
                        </span>

                    </div>

                </div>


                <div className="row g-4 mt-2">

                    <div className="col-md-6">

                        <div className="detail-item">

                            <span>
                                Fees
                            </span>

                            <strong>
                                ₹ {batch.fees ?? 0}
                            </strong>

                        </div>

                    </div>


                    <div className="col-md-6">

                        <div className="detail-item">

                            <span>
                                Trainer
                            </span>

                            <strong>
                                {batch.trainer || "—"}
                            </strong>

                        </div>

                    </div>


                    <div className="col-md-6">

                        <div className="detail-item">

                            <span>
                                Duration
                            </span>

                            <strong>
                                {
                                    batch.duration ??
                                    "—"
                                } Days
                            </strong>

                        </div>

                    </div>


                    <div className="col-md-6">

                        <div className="detail-item">

                            <span>
                                Start Date
                            </span>

                            <strong>
                                {formatDate(
                                    batch.startDate
                                )}
                            </strong>

                        </div>

                    </div>


                    <div className="col-md-6">

                        <div className="detail-item">

                            <span>
                                End Date
                            </span>

                            <strong>
                                {formatDate(
                                    batch.endDate
                                )}
                            </strong>

                        </div>

                    </div>


                    <div className="col-12">

                        <div className="detail-item">

                            <span>
                                Description
                            </span>

                            <strong>
                                {
                                    batch.description ||
                                    "No description provided."
                                }
                            </strong>

                        </div>

                    </div>

                </div>


                <div className="mt-4">

                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            navigate(
                                `/batches/edit/${batch.id}`
                            )
                        }
                    >
                        ✏ Edit Batch
                    </button>

                </div>

            </div>

        </div>
    );
}