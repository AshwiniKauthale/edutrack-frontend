import { useEffect, useState } from "react";

const defaultBatch = {
    name: "",
    fees: "",
    trainer: "",
    duration: "",
    startDate: "",
    endDate: "",
    status: "ACTIVE",
    description: "",
};

export default function BatchForm({
    initialData,
    onSubmit,
    submitText = "Save Batch",
}) {

    const [batch, setBatch] =
        useState(defaultBatch);

    const [saving, setSaving] =
        useState(false);


    useEffect(() => {

        if (initialData) {

            setBatch({
                ...defaultBatch,
                ...initialData,

                fees:
                    initialData.fees ??
                    "",

                duration:
                    initialData.duration ??
                    "",

                startDate:
                    initialData.startDate ??
                    "",

                endDate:
                    initialData.endDate ??
                    "",

                status:
                    initialData.status ||
                    "ACTIVE",

                description:
                    initialData.description ||
                    "",
            });
        }

    }, [initialData]);


    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setBatch((previous) => ({
            ...previous,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            await onSubmit({
                ...batch,
                fees:
                    Number(batch.fees),

                duration:
                    Number(batch.duration),
            });

        } finally {

            setSaving(false);
        }
    };


    return (
        <div className="batch-form-card">

            <form
                onSubmit={handleSubmit}
                className="row g-4"
            >

                {/* BATCH NAME */}

                <div className="col-md-6">

                    <label className="form-label">
                        Batch Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={batch.name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter batch name"
                        required
                    />

                </div>


                {/* FEES */}

                <div className="col-md-6">

                    <label className="form-label">
                        Fees
                    </label>

                    <div className="input-group">

                        <span className="input-group-text">
                            ₹
                        </span>

                        <input
                            type="number"
                            name="fees"
                            value={batch.fees}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter fees"
                            min="0"
                            required
                        />

                    </div>

                </div>


                {/* TRAINER */}

                <div className="col-md-6">

                    <label className="form-label">
                        Trainer
                    </label>

                    <input
                        type="text"
                        name="trainer"
                        value={batch.trainer}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter trainer name"
                    />

                </div>


                {/* DURATION */}

                <div className="col-md-6">

                    <label className="form-label">
                        Duration
                    </label>

                    <div className="input-group">

                        <input
                            type="number"
                            name="duration"
                            value={batch.duration}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Duration"
                            min="0"
                        />

                        <span className="input-group-text">
                            Days
                        </span>

                    </div>

                </div>


                {/* START DATE */}

                <div className="col-md-6">

                    <label className="form-label">
                        Start Date
                    </label>

                    <input
                        type="date"
                        name="startDate"
                        value={batch.startDate}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />

                </div>


                {/* END DATE */}

                <div className="col-md-6">

                    <label className="form-label">
                        End Date
                    </label>

                    <input
                        type="date"
                        name="endDate"
                        value={batch.endDate}
                        min={batch.startDate || undefined}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />

                </div>


                {/* STATUS */}

                <div className="col-md-6">

                    <label className="form-label">
                        Status
                    </label>

                    <select
                        name="status"
                        value={batch.status}
                        onChange={handleChange}
                        className="form-select"
                    >

                        <option value="ACTIVE">
                            Active
                        </option>

                        <option value="UPCOMING">
                            Upcoming
                        </option>

                        <option value="COMPLETED">
                            Completed
                        </option>

                        <option value="CANCELLED">
                            Cancelled
                        </option>

                    </select>

                </div>


                {/* DESCRIPTION */}

                <div className="col-12">

                    <label className="form-label">
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={batch.description}
                        onChange={handleChange}
                        className="form-control"
                        rows="4"
                        placeholder="Enter batch description"
                    />

                </div>


                {/* BUTTON */}

                <div className="col-12">

                    <button
                        type="submit"
                        className="btn btn-primary px-4"
                        disabled={saving}
                    >

                        {saving
                            ? "Saving..."
                            : submitText}

                    </button>

                </div>

            </form>

        </div>
    );
}