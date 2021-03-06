import React, { useState, useContext, useEffect } from "react";
import style from "./DetailsParent.module.css";
import { FaCaretRight } from "react-icons/fa";
import DetailsChild from "./DetailsChild";
import $ from "jquery";
import { stateContext } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";

function Details({ ticker }) {
  const [state, setState] = useContext(stateContext);
  const goTo = useNavigate();
  const location = useLocation();
  const APIKEY = process.env.REACT_APP_APIKEY;
  const APIKEY2 = process.env.REACT_APP_APIKEY2;
  const URLOverview = `https://www.alphavantage.co/query?apikey=${APIKEY}&function=OVERVIEW&symbol=${ticker}`;
  const URLDaily = `https://www.alphavantage.co/query?apikey=${APIKEY2}&function=TIME_SERIES_DAILY&symbol=${ticker}`;

  async function fetchData() {
    const res = await fetch(URLOverview);
    const data = await res.json();

    const secondRes = await fetch(URLDaily);
    const secondData = await secondRes.json();

    console.log("Fetching overview and daily");
    if (Object.keys(data).length === 1 || Object.keys(secondData).length === 1) {
      alert("API calls exceeded, please wait a while before continue usage.");
    }

    setState({ ...state, companyData: data, dailyShares: secondData });
  }

  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
    $("#cards").slideToggle(500);
    $("#companyOverview").css({
      "justify-self": "end",
      "flex-basis": "100%",
    });
    fetchData();
    goTo("Summary");
  };

  if (show) {
    $("#DetailsComponents").show();
  } else {
    $("#DetailsComponents").hide();
  }

  return (
    <div>
      <div className={style.details__container} onClick={handleClick}>
        <h3>Details</h3>
        <FaCaretRight className={show ? style.details__btn__rotate : style.details__btn} />
      </div>
      <div id="DetailsComponents">
        <DetailsChild />
      </div>
    </div>
  );
}

export default Details;
