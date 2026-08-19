export default function ProfileForm({
  profile,
  handleChange,
  handleSubmit,
  buttonText,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "500px",
        margin: "30px auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <input
        name="name"
        value={profile.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        name="email"
        value={profile.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        name="mobile"
        value={profile.mobile}
        onChange={handleChange}
        placeholder="Mobile"
      />

      <input
        name="designation"
        value={profile.designation}
        onChange={handleChange}
        placeholder="Designation"
      />

      <input
        name="address"
        value={profile.address}
        onChange={handleChange}
        placeholder="Address"
      />

      <input
        name="profileImage"
        value={profile.profileImage}
        onChange={handleChange}
        placeholder="Profile Image URL"
      />

      <button
        type="submit"
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "10px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {buttonText}
      </button>
    </form>
  );
}