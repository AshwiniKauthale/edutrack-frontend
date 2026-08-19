import BatchRow from "./BatchRow";

export default function BatchTable({
  batches,
  onEdit,
  onDelete,
}) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        background: "#fff",
      }}
    >
      <thead>
        <tr
          style={{
            background: "#2563eb",
            color: "white",
          }}
        >
          <th style={{ padding: "12px" }}>Batch Name</th>
          <th style={{ padding: "12px" }}>Fees</th>
          <th style={{ padding: "12px" }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {batches.length > 0 ? (
          batches.map((batch) => (
            <BatchRow
              key={batch.id}
              batch={batch}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <tr>
            <td
              colSpan="3"
              style={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              No batches found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}