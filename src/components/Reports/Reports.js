import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Alert, Col } from "react-bootstrap";

const Reports = () => {
  const [report, setReport] = useState([]);
  const [dates, setDates] = useState([]);
  const [downloaded, setDownloaded] = useState([]);
  useEffect(() => {
    fetch("http://192.168.10.11:5065/reports")
      .then((res) => res.json())
      .then((data) => {
        setReport(data);
      });
  }, []);
  useEffect(() => {
    fetch("http://192.168.10.11:5065/reportDates")
      .then((res) => res.json())
      .then((data) => setDates(data));
  }, []);

  function handlePrepare(pdate) {
    console.log(pdate);
    fetch("http://192.168.10.11:5065/prepareByDate?date=" + pdate)
      .then((res) => res.json())
      .then((data) => setDownloaded(data));
  }

  function setShow() {
    setDownloaded([]);
  }

  let headers = [
    { label: "id", key: "id" },
    { label: "diid", key: "diid" },
    { label: "Mail", key: "Mail" },
    { label: "Data_Status", key: "Data_Status" },
    { label: "data_date", key: "data_date" },
    { label: "agencyName", key: "agencyName" },
    { label: "allocated_target", key: "allocated_target" },
    { label: "ba_id", key: "ba_id" },
    { label: "r_name", key: "r_name" },
    { label: "Consumer_No", key: "Consumer_No" },
    { label: "age", key: "age" },
    { label: "profession", key: "profession" },
    { label: "date_recorded", key: "date_recorded" },
    { label: "outlet_id", key: "outlet_id" },
    { label: "outlet_name", key: "outlet_name" },
    { label: "reason", key: "reason" },
    { label: "signature", key: "signature" },
    { label: "Which brand do you smoke?", key: "Which brand do you smoke?" },
    { label: "sales_status", key: "sales_status" },
    { label: "Have you watched the AV?", key: "Have you watched the AV?" },
    { label: "Region", key: "Region" },
    { label: "Area", key: "Area" },
    { label: "Territory", key: "Territory" },
    { label: "Sales Point", key: "Sales Point" },
    { label: "for_d", key: "for_d" },
    { label: "agentID", key: "agentID" },
    { label: "qcBy", key: "qcChecked" },
    { label: "qcDate", key: "qcDate" },
    { label: "qcTime", key: "qcTime" },
    { label: "rating", key: "rating" },
    { label: "callDate", key: "callDate" },
    { label: "callTime", key: "callTime" },
    { label: "q1", key: "answer1" },
    { label: "q2", key: "answer2" },
    { label: "q3", key: "answer3" },
    { label: "q4", key: "answer4" },
    { label: "q5", key: "answer5" },
    { label: "q6", key: "answer6" },
    { label: "q7", key: "answer7" },
    { label: "q8", key: "answer8" },
    { label: "q9", key: "answer9" },
    { label: "q10", key: "answer10" },
    { label: "q11dot1", key: "answer11dot1" },
    { label: "q11dot2", key: "answer11dot2" },
    { label: "q12", key: "answer12" },
  ];
  return (
    <div className="mt-5">
      {downloaded.length > 0 && (
        <Alert onClose={() => setShow()} dismissible variant="success">
          Leads Prepared for Download
        </Alert>
      )}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Prepare</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {dates.map((date, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{date?.date}</td>
                <td>
                  <button
                    onClick={() => handlePrepare(date?.date)}
                    className="btn btn-danger"
                  >
                    Prepare
                  </button>
                </td>
                <td>
                  <button className="btn btn-info">
                    <CSVLink
                      headers={headers}
                      title="Export data to CSV"
                      filename={`Navy_One_To_One_${date?.date}.csv`}
                      data={downloaded}
                    >
                      `Download_${date?.date}`
                    </CSVLink>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5">
        <h4 className="text-secondary">Download Full Report Report</h4>
      </div>
      <div style={{ display: report.length > 0 ? "block" : "none" }}>
        <button className="btn btn-danger mt-3">
          <CSVLink
            headers={headers}
            title="Export data to CSV"
            filename={"Navy_One_To_One.csv"}
            data={report}
          >
            Download
          </CSVLink>
        </button>
      </div>
    </div>
  );
};

export default Reports;
