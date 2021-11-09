import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Alert, Col } from "react-bootstrap";

const Reports = () => {
  const [report, setReport] = useState([]);
  const [dates, setDates] = useState([]);
  const [downloaded, setDownloaded] = useState([]);
  useEffect(() => {
    fetch("http://192.168.10.12:5065/reports")
      .then((res) => res.json())
      .then((data) => {
        setReport(data);
      });
  }, []);
  useEffect(() => {
    fetch("http://192.168.10.12:5065/reportDates")
      .then((res) => res.json())
      .then((data) => setDates(data));
  }, []);

  function handlePrepare(pdate) {
    console.log(pdate);
    fetch("http://192.168.10.12:5065/prepareByDate?date=" + pdate)
      .then((res) => res.json())
      .then((data) => setDownloaded(data));
  }

  function setShow() {
    setDownloaded([]);
  }

  let headers = [
    { label: "id", key: "id" },
    { label: "diid", key: "diid" },
    { label: "data_date", key: "data_date" },
    { label: "WINGNAME", key: "WINGNAME" },
    { label: "DIVISIONNAME", key: "DIVISIONNAME" },
    { label: "TERRITORYNAME", key: "TERRITORYNAME" },
    { label: "ZONENAME", key: "ZONENAME" },
    { label: "ROUTENAME", key: "ROUTENAME" },
    { label: "RETAILER", key: "RETAILER" },
    { label: "RETAILERNAME", key: "RETAILERNAME" },
    { label: "OUTLETMOBILENO", key: "OUTLETMOBILENO" },
    { label: "CONTACTEDBYTEAMID", key: "CONTACTEDBYTEAMID" },
    { label: "CONTACTEDBYTEAMNAME", key: "CONTACTEDBYTEAMNAME" },
    { label: "CONTACTEDBYUSERNAME", key: "CONTACTEDBYUSERNAME" },
    { label: "CONTACTEDBYNAME", key: "CONTACTEDBYNAME" },
    { label: "CONTACTEDBYDESIGNATION", key: "CONTACTEDBYDESIGNATION" },
    { label: "CONTACTEDBYMOBILE", key: "CONTACTEDBYMOBILE" },
    { label: "CONTACTDATE", key: "CONTACTDATE" },
    { label: "r_name", key: "r_name" },
    { label: "CONSUMERAGE", key: "CONSUMERAGE" },
    { label: "Consumer_No", key: "Consumer_No" },
    { label: "CONSUMERDISTRICT", key: "CONSUMERDISTRICT" },
    { label: "CONSUMERTHANA", key: "CONSUMERTHANA" },
    { label: "CONSUMERADDRESS", key: "CONSUMERADDRESS" },
    { label: "CONTACTTYPE", key: "CONTACTTYPE" },
    { label: "CURRENTBRAND", key: "CURRENTBRAND" },
    { label: "OFFEREDBRAND", key: "OFFEREDBRAND" },
    { label: "SAMPLINGSTICK_visit_1", key: "SAMPLINGSTICK_visit_1" },
    { label: "SWAPPINGSTICK_visit_1", key: "SWAPPINGSTICK_visit_1" },
    { label: "PACKETSALES10S_visit_1", key: "PACKETSALES10S_visit_1" },
    { label: "PACKETSALES20S_visit_1", key: "PACKETSALES20S_visit_1" },
    { label: "VAOSALES10S_visit_1", key: "VAOSALES10S_visit_1" },
    { label: "VAOSALES20S_visit_1", key: "VAOSALES20S_visit_1" },
    { label: "CLUBMEMBER_visit_1", key: "CLUBMEMBER_visit_1" },
    {
      label: "ENTERTAINMENTAMOUNT_visit_1",
      key: "ENTERTAINMENTAMOUNT_visit_1",
    },
    {
      label: "TRIALAFTERFIRSTCONTACT_visit_1",
      key: "TRIALAFTERFIRSTCONTACT_visit_1",
    },
    { label: "SAMPLINGSTICK_visit_2", key: "SAMPLINGSTICK_visit_2" },
    { label: "SWAPPINGSTICK_visit_2", key: "SWAPPINGSTICK_visit_2" },
    { label: "PACKETSALES10S_visit_2", key: "PACKETSALES10S_visit_2" },
    { label: "PACKETSALES20S_visit_2", key: "PACKETSALES20S_visit_2" },
    { label: "VAOSALES10S_visit_2", key: "VAOSALES10S_visit_2" },
    { label: "VAOSALES20S_visit_2", key: "VAOSALES20S_visit_2" },
    {
      label: "ENTERTAINMENTAMOUNT_visit_2",
      key: "ENTERTAINMENTAMOUNT_visit_2",
    },
    { label: "CLUBMEMBER_visit_2", key: "CLUBMEMBER_visit_2" },
    {
      label: "TRIALAFTERFIRSTCONTACT_visit_2",
      key: "TRIALAFTERFIRSTCONTACT_visit_2",
    },
    { label: "TRIEDDAYS_visit_2", key: "TRIEDDAYS_visit_2" },
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
                      filename={`Aktcl_Regular_${date?.date}.csv`}
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
            filename={"Aktcl_Regular.csv"}
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
