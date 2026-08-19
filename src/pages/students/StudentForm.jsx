<div className="form-group">
  <label>Batch</label>

  <select
    name="batch"
    value={formData.batch}
    onChange={handleChange}
    required
  >
    <option value="">Select Batch</option>
    <option value="AIML">AIML</option>
    <option value="Java Full Stack">Java Full Stack</option>
    <option value="DevOps">DevOps</option>
    <option value="Data Science">Data Science</option>
    <option value="Angular">Angular</option>
    <option value="React">React</option>
    <option value="Python Full Stack">
      Python Full Stack
    </option>
    <option value=".NET Full Stack">
      .NET Full Stack
    </option>
    <option value="Cloud Computing">
      Cloud Computing
    </option>
    <option value="Cyber Security">
      Cyber Security
    </option>
  </select>
</div>