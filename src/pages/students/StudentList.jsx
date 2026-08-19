import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { getStudents, deleteStudent } from "../../api/studentApi";
import "./StudentList.css";

const idOf = s => s.id || s._id || s.studentId;
const nameOf = s => s.name || s.fullName || s.studentName || "Unnamed Student";
const emailOf = s => s.email || s.emailId || "—";
const mobileOf = s => s.mobile || s.phone || s.mobileNumber || "—";
const courseOf = s => s.course || "—";
const batchOf = s => s.batchName || s.batch || "—";
const addressOf = s => s.address || "—";
const today = () => new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });

export default function StudentList() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [batch, setBatch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => { loadStudents(); }, []);

  const loadStudents = async () => {
    try {
      setLoading(true); setError("");
      const response = await getStudents();
      setStudents(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Unable to load students. Please check your Spring Boot server.");
    } finally { setLoading(false); }
  };

  const courses = useMemo(() => [...new Set(students.map(courseOf).filter(x => x !== "—"))].sort(), [students]);
  const batches = useMemo(() => [...new Set(students.map(batchOf).filter(x => x !== "—"))].sort(), [students]);

  const filteredStudents = useMemo(() => {
    const q = search.trim().toLowerCase();
    return students.filter(s => {
      const text = [nameOf(s), emailOf(s), mobileOf(s), courseOf(s), batchOf(s), addressOf(s)].join(" ").toLowerCase();
      return (!q || text.includes(q)) && (!course || courseOf(s) === course) && (!batch || batchOf(s) === batch);
    });
  }, [students, search, course, batch]);

  const clearFilters = () => { setSearch(""); setCourse(""); setBatch(""); };

  const handleDelete = async student => {
    const id = idOf(student);
    if (!id) return alert("Student ID not found.");
    if (!window.confirm(`Are you sure you want to delete "${nameOf(student)}"?`)) return;
    try {
      await deleteStudent(id);
      setStudents(prev => prev.filter(s => String(idOf(s)) !== String(id)));
      alert("Student deleted successfully.");
    } catch (err) {
      console.error(err); alert(err.response?.data?.message || "Unable to delete student.");
    }
  };

  const reportInfo = () => ({ search: search.trim() || "All", course: course || "All Courses", batch: batch || "All Batches", date: today() });

  const exportExcel = () => {
    if (!filteredStudents.length) return alert("There are no students matching the selected search/filter.");
    try {
      setExporting(true); const r = reportInfo();
      const rows = filteredStudents.map((s, i) => ({ "Sr. No.": i + 1, "Student Name": nameOf(s), "Email Address": emailOf(s), "Mobile Number": mobileOf(s), Course: courseOf(s), Batch: batchOf(s), Address: addressOf(s) }));
      const ws = XLSX.utils.json_to_sheet([]);
      XLSX.utils.sheet_add_aoa(ws, [["EduTrack - Student Report"], ["Generated On", r.date], ["Search", r.search], ["Course", r.course], ["Batch", r.batch], []]);
      XLSX.utils.sheet_add_json(ws, rows, { origin: "A7" });
      ws["!cols"] = [{wch:9},{wch:25},{wch:32},{wch:18},{wch:24},{wch:24},{wch:40}];
      const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "Students");
      XLSX.writeFile(wb, `EduTrack_Student_Report_${r.date.replaceAll("/", "-")}.xlsx`);
    } catch (err) { console.error(err); alert("Unable to generate Excel report."); }
    finally { setExporting(false); }
  };

  const exportPDF = () => {
    if (!filteredStudents.length) return alert("There are no students matching the selected search/filter.");
    try {
      setExporting(true); const r = reportInfo();
      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      doc.setFontSize(20); doc.setFont("helvetica", "bold"); doc.text("EduTrack - Student Report", 14, 16);
      doc.setFontSize(10); doc.setFont("helvetica", "normal");
      doc.text(`Generated On: ${r.date}`, 14, 23); doc.text(`Search: ${r.search}`, 14, 29); doc.text(`Course: ${r.course}`, 14, 35); doc.text(`Batch: ${r.batch}`, 14, 41); doc.text(`Total Students: ${filteredStudents.length}`, 14, 47);
      autoTable(doc, {
        startY: 53,
        head: [["Sr. No.", "Student Name", "Email", "Mobile", "Course", "Batch", "Address"]],
        body: filteredStudents.map((s,i) => [i+1,nameOf(s),emailOf(s),mobileOf(s),courseOf(s),batchOf(s),addressOf(s)]),
        theme: "grid", styles: { fontSize: 8, cellPadding: 2.5, valign: "middle" }, headStyles: { fontStyle: "bold" },
        didDrawPage: data => { doc.setFontSize(8); doc.text(`EduTrack | Page ${data.pageNumber} of ${doc.getNumberOfPages()}`, 14, doc.internal.pageSize.height - 8); }
      });
      doc.save(`EduTrack_Student_Report_${r.date.replaceAll("/", "-")}.pdf`);
    } catch (err) { console.error(err); alert("Unable to generate PDF report."); }
    finally { setExporting(false); }
  };

  return <div className="students-page">
    <div className="students-header"><div><h1>Students</h1><p>Manage student records by course and batch</p></div><button className="add-student-btn" onClick={() => navigate("/students/add")}><span>+</span>Add Student</button></div>
    <div className="students-toolbar">
      <div className="search-box"><span className="search-icon">⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, mobile, course or batch..." />{search && <button className="clear-search" onClick={() => setSearch("")}>×</button>}</div>
      <select className="student-filter" value={course} onChange={e => setCourse(e.target.value)}><option value="">All Courses</option>{courses.map(x => <option key={x}>{x}</option>)}</select>
      <select className="student-filter" value={batch} onChange={e => setBatch(e.target.value)}><option value="">All Batches</option>{batches.map(x => <option key={x}>{x}</option>)}</select>
      <button className="clear-filter-btn" onClick={clearFilters}>Clear</button>
    </div>
    <div className="student-report-toolbar"><div className="student-count">Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> students</div><div className="export-buttons"><button className="export-excel-btn" onClick={exportExcel} disabled={exporting || loading}>📊 {exporting ? "Generating..." : "Export Excel"}</button><button className="export-pdf-btn" onClick={exportPDF} disabled={exporting || loading}>📄 {exporting ? "Generating..." : "Export PDF"}</button></div></div>
    {error && <div className="student-error">⚠ {error}<button onClick={loadStudents}>Retry</button></div>}
    <div className="students-card">{loading ? <div className="students-loading"><div className="loading-spinner"/><p>Loading students...</p></div> : !filteredStudents.length ? <div className="empty-students"><div className="empty-icon">🎓</div><h2>{students.length ? "No students found" : "No students yet"}</h2><p>{students.length ? "Try changing your search or filters." : "Start by adding your first student."}</p><button className="empty-add-btn" onClick={() => students.length ? clearFilters() : navigate("/students/add")}>{students.length ? "Clear Filters" : "+ Add Student"}</button></div> : <div className="table-wrapper"><table className="students-table"><thead><tr><th>#</th><th>Student</th><th>Email</th><th>Mobile</th><th>Course</th><th>Batch</th><th>Address</th><th>Actions</th></tr></thead><tbody>{filteredStudents.map((s,i) => { const id=idOf(s), name=nameOf(s); return <tr key={id || i}><td>{i+1}</td><td><div className="student-info"><div className="student-avatar">{name.charAt(0).toUpperCase()}</div><strong>{name}</strong></div></td><td>{emailOf(s)}</td><td>{mobileOf(s)}</td><td><span className="course-badge">{courseOf(s)}</span></td><td><span className="batch-badge">{batchOf(s)}</span></td><td className="address-cell">{addressOf(s)}</td><td><div className="student-actions"><button className="edit-btn" onClick={() => navigate(`/students/edit/${id}`)}>✏</button><button className="delete-btn" onClick={() => handleDelete(s)}>🗑</button></div></td></tr>})}</tbody></table></div>}</div>
  </div>;
}
