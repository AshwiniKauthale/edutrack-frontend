import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// =====================================================
// FORMAT DATE
// =====================================================

const formatDate = (date) => {

    if (!date) {
        return "-";
    }

    try {

        const d = new Date(date);

        if (isNaN(d.getTime())) {
            return date;
        }

        return d.toLocaleDateString("en-IN");

    } catch (error) {

        return date;
    }
};

// =====================================================
// NORMALIZE ATTENDANCE DATA
// =====================================================

const normalizeAttendance = (attendance = []) => {

    return attendance.map((item, index) => {

        return {
            srNo: index + 1,

            studentName:
                item.studentName ||
                "-",

            batchName:
                item.batchName ||
                "-",

            date:
                formatDate(item.date),

            status:
                item.status ||
                "-",

            remarks:
                item.remarks ||
                "-"
        };
    });
};

// =====================================================
// DOWNLOAD EXCEL
// =====================================================

export const downloadAttendanceExcel = (
    attendance = []
) => {

    if (!attendance || attendance.length === 0) {

        alert("No attendance records available to export.");

        return;
    }

    const data =
        normalizeAttendance(attendance);

    // =================================================
    // EXCEL DATA
    // =================================================

    const worksheetData = data.map((item) => ({

        "Sr. No.": item.srNo,

        "Student Name":
            item.studentName,

        "Batch":
            item.batchName,

        "Date":
            item.date,

        "Status":
            item.status,

        "Remarks":
            item.remarks
    }));

    // =================================================
    // CREATE WORKSHEET
    // =================================================

    const worksheet =
        XLSX.utils.json_to_sheet(
            worksheetData
        );

    // =================================================
    // COLUMN WIDTHS
    // =================================================

    worksheet["!cols"] = [

        {
            wch: 10
        },

        {
            wch: 25
        },

        {
            wch: 25
        },

        {
            wch: 18
        },

        {
            wch: 15
        },

        {
            wch: 35
        }
    ];

    // =================================================
    // CREATE WORKBOOK
    // =================================================

    const workbook =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Attendance"
    );

    // =================================================
    // DOWNLOAD
    // =================================================

    XLSX.writeFile(
        workbook,
        "Attendance_Report.xlsx"
    );
};

// =====================================================
// DOWNLOAD PDF
// =====================================================

export const downloadAttendancePDF = (
    attendance = []
) => {

    if (!attendance || attendance.length === 0) {

        alert("No attendance records available to export.");

        return;
    }

    const data =
        normalizeAttendance(attendance);

    // =================================================
    // CREATE PDF
    // =================================================

    const doc =
        new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4"
        });

    // =================================================
    // TITLE
    // =================================================

    doc.setFontSize(20);

    doc.text(
        "EduTrack",
        14,
        15
    );

    // =================================================
    // SUBTITLE
    // =================================================

    doc.setFontSize(13);

    doc.text(
        "Attendance Report",
        14,
        24
    );

    // =================================================
    // GENERATED DATE
    // =================================================

    doc.setFontSize(9);

    doc.text(
        `Generated on: ${new Date().toLocaleDateString("en-IN")}`,
        14,
        31
    );

    // =================================================
    // TABLE DATA
    // =================================================

    const tableData =
        data.map((item) => [

            item.srNo,

            item.studentName,

            item.batchName,

            item.date,

            item.status,

            item.remarks
        ]);

    // =================================================
    // TABLE
    // =================================================

    autoTable(doc, {

        startY: 38,

        head: [[

            "Sr. No.",

            "Student Name",

            "Batch",

            "Date",

            "Status",

            "Remarks"
        ]],

        body: tableData,

        theme: "grid",

        styles: {

            fontSize: 9,

            cellPadding: 3,

            valign: "middle"
        },

        headStyles: {

            fontSize: 9,

            halign: "center"
        },

        columnStyles: {

            0: {
                cellWidth: 18,
                halign: "center"
            },

            1: {
                cellWidth: 55
            },

            2: {
                cellWidth: 45
            },

            3: {
                cellWidth: 30,
                halign: "center"
            },

            4: {
                cellWidth: 30,
                halign: "center"
            },

            5: {
                cellWidth: 75
            }
        }
    });

    // =================================================
    // FOOTER
    // =================================================

    const pageCount =
        doc.internal.getNumberOfPages();

    for (
        let i = 1;
        i <= pageCount;
        i++
    ) {

        doc.setPage(i);

        doc.setFontSize(8);

        doc.text(
            `EduTrack - Attendance Report | Page ${i} of ${pageCount}`,
            14,
            202
        );
    }

    // =================================================
    // DOWNLOAD
    // =================================================

    doc.save(
        "Attendance_Report.pdf"
    );
};