import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// =====================================================
// HELPER
// =====================================================

const formatDate = (date) => {

    if (!date) {
        return "-";
    }

    try {

        const d = new Date(date);

        if (Number.isNaN(d.getTime())) {
            return date;
        }

        return d.toLocaleDateString("en-IN");

    } catch (error) {

        return date;
    }
};


// =====================================================
// PREPARE ASSIGNMENT DATA
// =====================================================

const prepareAssignmentData = (assignments = []) => {

    return assignments.map((assignment, index) => {

        return {
            "Sr. No.": index + 1,

            "Assignment Title":
                assignment.title || "-",

            "Subject":
                assignment.subject || "-",

            "Teacher":
                assignment.teacher || "-",

            "Batch":
                assignment.batch || "-",

            "Classroom":
                assignment.classroom || "-",

            "Description":
                assignment.description || "-",

            "Assigned Date":
                formatDate(
                    assignment.assignedDate
                ),

            "Due Date":
                formatDate(
                    assignment.dueDate
                ),

            "Maximum Marks":
                assignment.maxMarks ?? 0,

            "Status":
                assignment.status || "ACTIVE"
        };
    });
};


// =====================================================
// EXPORT TO EXCEL
// =====================================================

export const exportAssignmentsToExcel = (
    assignments = []
) => {

    if (!assignments || assignments.length === 0) {

        alert(
            "No assignments available to export."
        );

        return;
    }

    try {

        const data =
            prepareAssignmentData(
                assignments
            );


        // =============================================
        // CREATE WORKSHEET
        // =============================================

        const worksheet =
            XLSX.utils.json_to_sheet(data);


        // =============================================
        // COLUMN WIDTHS
        // =============================================

        worksheet["!cols"] = [

            { wch: 8 },   // Sr No

            { wch: 30 },  // Title

            { wch: 20 },  // Subject

            { wch: 25 },  // Teacher

            { wch: 25 },  // Batch

            { wch: 20 },  // Classroom

            { wch: 45 },  // Description

            { wch: 16 },  // Assigned Date

            { wch: 16 },  // Due Date

            { wch: 16 },  // Marks

            { wch: 16 }   // Status
        ];


        // =============================================
        // CREATE WORKBOOK
        // =============================================

        const workbook =
            XLSX.utils.book_new();


        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Assignments"
        );


        // =============================================
        // DOWNLOAD
        // =============================================

        XLSX.writeFile(
            workbook,
            "Assignment_Report.xlsx"
        );

    } catch (error) {

        console.error(
            "Excel export error:",
            error
        );

        alert(
            "Failed to export assignments to Excel."
        );
    }
};


// =====================================================
// EXPORT TO PDF
// =====================================================

export const exportAssignmentsToPDF = (
    assignments = []
) => {

    if (!assignments || assignments.length === 0) {

        alert(
            "No assignments available to export."
        );

        return;
    }

    try {

        const doc =
            new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a4"
            });


        // =============================================
        // TITLE
        // =============================================

        doc.setFontSize(18);

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.text(
            "EduTrack",
            14,
            15
        );


        // =============================================
        // SUBTITLE
        // =============================================

        doc.setFontSize(13);

        doc.setFont(
            "helvetica",
            "normal"
        );

        doc.text(
            "Assignment Report",
            14,
            23
        );


        // =============================================
        // GENERATED DATE
        // =============================================

        doc.setFontSize(9);

        doc.text(
            `Generated on: ${new Date().toLocaleDateString("en-IN")}`,
            14,
            30
        );


        // =============================================
        // TABLE DATA
        // =============================================

        const tableData =
            assignments.map(
                (assignment, index) => [

                    index + 1,

                    assignment.title || "-",

                    assignment.subject || "-",

                    assignment.teacher || "-",

                    assignment.batch || "-",

                    assignment.classroom || "-",

                    formatDate(
                        assignment.assignedDate
                    ),

                    formatDate(
                        assignment.dueDate
                    ),

                    assignment.maxMarks ?? 0,

                    assignment.status || "ACTIVE"
                ]
            );


        // =============================================
        // PDF TABLE
        // =============================================

        autoTable(doc, {

            startY: 36,

            head: [[
                "Sr.",
                "Assignment",
                "Subject",
                "Teacher",
                "Batch",
                "Classroom",
                "Assigned Date",
                "Due Date",
                "Marks",
                "Status"
            ]],

            body: tableData,

            theme: "grid",

            styles: {

                fontSize: 8,

                cellPadding: 2,

                overflow: "linebreak",

                valign: "middle"
            },

            headStyles: {

                fontSize: 8,

                fontStyle: "bold"
            },

            columnStyles: {

                0: {
                    cellWidth: 10
                },

                1: {
                    cellWidth: 35
                },

                2: {
                    cellWidth: 25
                },

                3: {
                    cellWidth: 30
                },

                4: {
                    cellWidth: 30
                },

                5: {
                    cellWidth: 28
                },

                6: {
                    cellWidth: 25
                },

                7: {
                    cellWidth: 25
                },

                8: {
                    cellWidth: 18
                },

                9: {
                    cellWidth: 22
                }
            },

            margin: {

                left: 10,

                right: 10
            }
        });


        // =============================================
        // FOOTER
        // =============================================

        const pageCount =
            doc.internal.getNumberOfPages();


        for (
            let page = 1;
            page <= pageCount;
            page++
        ) {

            doc.setPage(page);

            doc.setFontSize(8);

            doc.text(
                `EduTrack - Assignment Report | Page ${page} of ${pageCount}`,
                14,
                200
            );
        }


        // =============================================
        // DOWNLOAD
        // =============================================

        doc.save(
            "Assignment_Report.pdf"
        );

    } catch (error) {

        console.error(
            "PDF export error:",
            error
        );

        alert(
            "Failed to export assignments to PDF."
        );
    }
};