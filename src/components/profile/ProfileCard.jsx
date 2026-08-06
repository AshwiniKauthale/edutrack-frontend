export default function ProfileCard({
  profile,
  onEdit,
}) {
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "30px auto",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,.1)",
        padding: "30px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        {profile.profileImage ? (
          <img
            src={profile.profileImage}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: "#2563eb",
              color: "white",
              fontSize: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 20px",
              fontWeight: "bold",
            }}
          >
            {profile.name?.charAt(0).toUpperCase()}
          </div>
        )}

        <h2>{profile.name}</h2>

        <p>{profile.designation}</p>
      </div>

      <table
        style={{
          width: "100%",
        }}
      >
        <tbody>
          <tr>
            <td><b>Email</b></td>
            <td>{profile.email}</td>
          </tr>

          <tr>
            <td><b>Mobile</b></td>
            <td>{profile.mobile}</td>
          </tr>

          <tr>
            <td><b>Designation</b></td>
            <td>{profile.designation}</td>
          </tr>

          <tr>
            <td><b>Address</b></td>
            <td>{profile.address}</td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          marginTop: "25px",
          textAlign: "center",
        }}
      >
        <button
          onClick={() => onEdit(profile)}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}