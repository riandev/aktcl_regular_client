import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "antd/dist/antd.css";
import { consumerContext } from "../App";

const SurveyBody = () => {
  const [searchNumber, setSearchNumber] = useState(null);
  const [dList, setDlist] = useState([]);
  // const [consumer, setConsumer] = useState(null);
  const [consumer, setConsumer] = useContext(consumerContext);
  // console.log(consumer);
  const [notFound, setNotFound] = useState(false);
  const [q1, setQ1] = useState(null);
  const [q2, setQ2] = useState(null);
  const [q3, setQ3] = useState(null);
  const [q4, setQ4] = useState(null);
  const [q5, setQ5] = useState(null);
  const [q6, setQ6] = useState(null);
  const [q7, setQ7] = useState(null);
  const [q8, setQ8] = useState(null);
  const [q9, setQ9] = useState(null);
  const [q10, setQ10] = useState(null);

  const handleText = (e) => {
    setSearchNumber(e.target.value);
  };
  const handleSearch = () => {
    fetch(`http://192.168.10.12:5065/dMatched/${searchNumber}`)
      .then((res) => res.json())
      .then((data) => setConsumer(data));
    setNotFound(true);
  };
  const q1value = (e) => {
    setQ1(e.target.value);
  };
  const q2value = (e) => {
    setQ2(e.target.value);
  };
  const q3value = (e) => {
    console.log(e.target.value);
    setQ3(e.target.value);
  };
  const q4value = (e) => {
    setQ4(e.target.value);
  };
  const q5value = (e) => {
    setQ5(e.target.value);
  };
  const q6value = (e) => {
    setQ6(e.target.value);
  };
  const q7value = (e) => {
    setQ7(e.target.value);
  };
  const q8value = (e) => {
    setQ8(e.target.value);
  };
  const q9value = (e) => {
    setQ9(e.target.value);
  };
  const q10value = (e) => {
    setQ10(e.target.value);
  };

  const agent = sessionStorage.getItem("agent");
  const handleSubmit = (e) => {
    const answer = {
      ans1: q1,
      ans2: q2,
      ans3: q3,
      ans4: q4,
      ans5: q5,
      ans6: q6,
      ans7: q7,
      ans8: q8,
      ans9: q9,
      ans10: q10,
      agentID: agent,
      callDate: new Date().toLocaleDateString(),
      callTime: new Date().toLocaleTimeString(),
    };
    fetch(`http://192.168.10.12:5065/answers/${consumer?._id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(answer),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    console.log(answer);
    window.location.reload(false);
  };

  return (
    <div>
      <div style={{ display: consumer === null ? "block" : "none" }}>
        <input
          onChange={handleText}
          className="form-control w-50"
          type="text"
          name="serachNumber"
        />
        <br />
        <button onClick={handleSearch} className="btn btn-danger">
          Search
        </button>
      </div>
      <div
        style={{
          display: consumer === null ? "none" : "block",
        }}
      >
        <h6>
          ১. আসসালামুআলাইকুম, আমি <b>{agent}</b> বলছি একটি সিগারেট জরীপ কোম্পানি
          থেকে।আপনি কি <b>{consumer?.r_name}</b> স্যার বলছেন? আপনার কি কিছুক্ষন
          কথা বলার সময় হবে
        </h6>
        <p className="text-secondary">
          (উত্তর হ্যাঁ হলে পরবর্তী প্রশ্নে চলে যান, না/ ব্যাস্ত হলে ধন্যবাধ দিয়ে
          সংযোগটি বিছিন্ন করুন)
        </p>
        <Form.Group onChange={q1value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="yes">হ্যাঁ</option>
            <option value="no">না</option>
            <option value="busy">ব্যাস্ত</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div
        style={{
          display: q1 === "yes" ? "block" : "none",
        }}
        className="mt-2"
      >
        <h6>২. স্যার, আপনি কি ধুমপান করেন?</h6>
        <p className="text-secondary">
          (উত্তর হ্যাঁ হলে পরবর্তী প্রশ্নে চলে যান, না হলে ধন্যবাধ দিয়ে সংযোগটি
          বিছিন্ন করুন)
        </p>
        <Form.Group onChange={q2value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="yes">হ্যাঁ</option>
            <option value="no">না</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div
        style={{ display: q2 === "yes" ? "block" : "none" }}
        className="mt-2"
      >
        <h6>
          ৩. স্যার গত ২/১ দিনের মধ্যে কি কোন সিগারেট কোম্পানির প্রতিনিধি আপনার
          কাছে এসেছিল?
        </h6>
        <p className="text-secondary">
          (উত্তর হ্যাঁ হলে পরবর্তী প্রশ্নে চলে যান, না হলে ধন্যবাধ দিয়ে সংযোগটি
          বিছিন্ন করুন)
        </p>
        <p className="text-secondary">
          (উত্তর গ্রহণের ক্ষেত্রে আমরা সর্বোচ্চ ৩দিন বিবেচনা করবো)
        </p>
        <Form.Group onChange={q3value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="yes">হ্যাঁ</option>
            <option value="no">না</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div
        style={{
          display: q3 === "yes" ? "block" : "none",
        }}
        className="mt-2"
      >
        <h6>৪. কোন কোম্পানি থেকে এসেছিল?</h6>
        <p className="text-secondary">
          (উত্তর মেরিস হলে পরবর্তী প্রশ্নে চলে যান, অন্যান্য হলে ধন্যবাধ দিয়ে
          সংযোগটি বিছিন্ন করুন)
        </p>
        <Form.Group onChange={q4value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="marise">মেরিস</option>
            <option value="others">অন্যান্য</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div
        style={{
          display: q4 === "marise" ? "block" : "none",
        }}
        className="mt-2"
      >
        <h6>৫. আপনি বর্তমানে কোন ব্র্যান্ডের সিগারেট ধূমপান করেন?</h6>
        <p className="text-secondary">
          (উত্তর যেটাই হোক না কেন, পরবর্তী প্রশ্নে চলে যাবেন)
        </p>
        <Form.Group onChange={q5value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="marise">মেরিস</option>
            <option value="derby">ডার্বি</option>
            <option value="pilot">পাইলট</option>
            <option value="hollywood">হলিউড</option>
            <option value="sheikh">শেখ</option>
            <option value="royals">রয়েলস</option>
            <option value="real">রিয়েল</option>
            <option value="k2">K2</option>
            <option value="others">অন্যান্য</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div
        style={{
          display:
            q5 === "marise" ||
            q5 === "derby" ||
            q5 === "pilot" ||
            q5 === "hollywood" ||
            q5 === "sheikh" ||
            q5 === "royals" ||
            q5 === "real" ||
            q5 === "k2" ||
            q5 === "others"
              ? "block"
              : "none",
        }}
        className="mt-2"
      >
        <h6>
          ৬. সিগারেট কোম্পানির সাথে যখন দেখা হয়েছিল তখন আপনি কোন সিগারেট খেতেন?
        </h6>
        <Form.Group onChange={q6value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="marise">মেরিস</option>
            <option value="derby">ডার্বি</option>
            <option value="pilot">পাইলট</option>
            <option value="hollywood">হলিউড</option>
            <option value="sheikh">শেখ</option>
            <option value="royals">রয়েলস</option>
            <option value="real">রিয়েল</option>
            <option value="k2">K2</option>
            <option value="others">অন্যান্য</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div
        style={{
          display:
            q6 === "derby" ||
            q6 === "pilot" ||
            q6 === "hollywood" ||
            q6 === "sheikh" ||
            q6 === "royals" ||
            q6 === "real" ||
            q6 === "k2" ||
            q6 === "others"
              ? "block"
              : "none",
        }}
        className="mt-2"
      >
        <h6>৭. উনি কি টেস্ট কড়ার জন্য আপনাকে কোনো সিগারেট দিয়ে ছিল ?</h6>
        <Form.Group onChange={q7value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="yes">হ্যাঁ</option>
            <option value="no">না</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div
        style={{
          display: q7 === "yes" ? "block" : "none",
        }}
        className="mt-2"
      >
        <h6>৮. কত শলাকা সিগারেট দিয়েছিলো একটু বলবেন স্যার ?</h6>
        <Form.Group onChange={q8value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="0stick">০ শলাকা</option>
            <option value="1stick">১ শলাকা</option>
            <option value="2stick">২ শলাকা</option>
            <option value="3stick">৩ শলাকা</option>
            <option value="4stick">৪ শলাকা</option>
            <option value="5stick">৫ শলাকা</option>
            <option value="cannotRemember">মনে নেই</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div
        style={{
          display:
            q7 === "no" ||
            q8 === "0stick" ||
            q8 === "1stick" ||
            q8 === "2stick" ||
            q8 === "3stick" ||
            q8 === "4stick" ||
            q8 === "5stick" ||
            q8 === "cannotRemember"
              ? "block"
              : "none",
        }}
        className="mt-2"
      >
        <h6>
          ৯. আপনি কি উনার কাছ থেকে মেরিস সিগারেট এর কোনো প্যাকেট কিনেছিলেন ?
        </h6>
        <Form.Group onChange={q9value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="yes">হ্যাঁ</option>
            <option value="no">না</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div
        style={{
          display: q9 === "yes" ? "block" : "none",
        }}
        className="mt-2"
      >
        <h6>১০. প্যাকেট এর সঙ্গে কি উপহার হিসাবে কিছু দেয়া ছিল?</h6>
        <Form.Group onChange={q10value} as={Row}>
          <Form.Control as="select" className="w-50 ml-3">
            <option>...</option>
            <option value="1stick">লাইটার</option>
            <option value="2stick">ম্যাচ বাক্স</option>
            <option value="no">না</option>
            <option value="others">অন্যান্য</option>
          </Form.Control>
        </Form.Group>
      </div>
      {/* Final Question */}
      <div
        style={{
          display:
            q1 === "no" || q1 === "busy" || q2 === "no" ? "block" : "none",
        }}
        className="mt-3"
      >
        <h5>ধন্যবাদ স্যার, আপনার মূল্যবান সময় দেয়ার জন্য।</h5>
        <br />
        <button onClick={handleSubmit} className="btn btn-danger">
          Submit Survey
        </button>
      </div>
      <div
        style={{
          display:
            q3 === "no" || q4 === "others" || q6 === "marise"
              ? "block"
              : "none",
        }}
        className="mt-3"
      >
        <h5>
          বাংলাদেশের সর্বাদিক জনপ্রিয় ব্র্যান্ড মেরিস এখন ৪ টাকা শলাকা একি উন্নত
          সাধে। আপনার মূল্যবান সময় দেয়ার জন্য ধন্যবাদ
        </h5>
        <br />
        <button onClick={handleSubmit} className="btn btn-danger">
          Submit Survey
        </button>
      </div>
      <div
        style={{
          display:
            (q10 === "1stick" ||
              q10 === "2stick" ||
              q10 === "no" ||
              q10 === "others") &&
            consumer?.CLUBMEMBER_visit_1 === 1
              ? "block"
              : "none",
        }}
        className="mt-3"
      >
        <h5>
          মেরিস ক্লাব এ আপনাকে স্বাগতম , নিত্য নতুন প্রতিযোগিতা এবং ফাটা ফ্যাটি
          সব অফার নিয়ে মেরিস আছে আপনার সাথে
        </h5>
        <br />
        <button onClick={handleSubmit} className="btn btn-danger">
          Submit Survey
        </button>
      </div>
      <div
        style={{
          display:
            ((q10 === "1stick" ||
              q10 === "2stick" ||
              q10 === "no" ||
              q10 === "others") &&
              (consumer?.CLUBMEMBER_visit_1 === 0 ||
                consumer?.CLUBMEMBER_visit_1 === null)) ||
            q9 === "no"
              ? "block"
              : "none",
        }}
        className="mt-3"
      >
        <h5>
          বাংলাদেশের সর্বাদিক জনপ্রিয় ব্র্যান্ড মারিসা এখন ৪ টাকা শলাকা একি
          উন্নত সাধে। মারিস এর সাথে থাকার জন্য আপনাকে ধন্যবাদ
        </h5>
        <br />
        <button onClick={handleSubmit} className="btn btn-danger">
          Submit Survey
        </button>
      </div>
    </div>
  );
};

export default SurveyBody;
