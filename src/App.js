import React, { useState, useEffect } from "react";
import gematriya from "gematriya";
import styles from "./styles/App.css";

import Gen from "./json/Gen.json";
function Hello() {
  const [data, setData] = useState([]);
  const getData = () => {
    fetch(
      { Gen },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        // console.log(myJson);
        setData(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  // console.log(data);
  console.log(Gen);

  const [gemText, setGemText] = useState(" ");
  const [getSum, setGetSum] = useState(" ");

  // // const firstPasuk = Gen.text.map((x) => x.pasuk4);
  const handleChange = (e) => {
    setGemText(e.target.value);
    gemCalc();
  };

  function gemCalc() {
    const alephBeis = {
      א: 1,
      ב: 2,
      ג: 3,
      ד: 4,
      ה: 5,
      ו: 6,
      ז: 7,
      ח: 8,
      ט: 9,
      י: 10,
      כ: 20,
      ך: 20,
      ל: 30,
      מ: 40,
      ם: 40,
      נ: 50,
      ן: 50,
      ס: 60,
      ע: 70,
      פ: 80,
      ף: 80,
      צ: 90,
      ץ: 90,
      ק: 100,
      ר: 200,
      ש: 300,
      ת: 400,
    };

    const gemString = gemText;

    let gemSums = 0;
    for (let i = 0; i < gemString.length; i++) {
      let c = gemString[i];
      let patt = new RegExp("[\u0590-\u05FF]");
      let res = patt.test(gemString[i]);
      if (res) {
        gemSums = gemSums + alephBeis[c];
      }
    }
    setGetSum(gemSums);
  }

  // const gematraOfFirst = gematriya(
  //   Gen.text.map((x) => x.pasuk1).toLocaleString(),
  //   { order: false }
  // );
  console.log(getSum + "this is get sum");
  const gem = gematriya("ד");
  const number = 203;

  return (
    <div className="app">
      <header className="hello">
        <p>hello</p>
        {gem}
      </header>

      {/* <input type="number" id="mynum" placeholder="הקלד מספר בין 1- 999:" /> */}
      <textarea
        type="text"
        name="gematria"
        onChange={handleChange}
        // onChange={(evt) => {
        //   console.log(evt.target.value);
        // }}
        rows="6"
        cols="45"
        placeholder="הקלד בעברית"
      >
        {Gen.text.map((x) => x.pasuk1).toLocaleString()}
      </textarea>
      <div>{getSum}</div>
    </div>
  );
}

export default Hello;
