import React, { useState, useContext, useEffect } from "react";
import styles from "./LikeButton.module.css";
import { stateContext } from "../../App";

function LikeButton({ ticker }) {
  const [like, setLike] = useState(true);
  const [check, setCheck] = useState(null);
  // const [likedList, setLikedList] = useContext(likedListContext);
  const [state, setState] = useContext(stateContext);

  useEffect(() => {
    if (state.likedList.includes(ticker)) {
      setCheck(true);
      setLike(false);
    } else {
      setCheck(false);
    }
  }, []);

  const handleClick = (e) => {
    if (like) {
      e.target.style.color = "red";
      e.target.style.fontSize = "18px";
      e.target.innerHTML = "&#x2764;";
      setState({ ...state, likedList: [...state.likedList, e.target.id] });
    } else {
      e.target.style.color = "black";
      e.target.style.fontSize = "24px";
      e.target.innerHTML = "&#9825;";
      setState({
        ...state,
        likedList: state.likedList.filter((companies) => companies !== ticker),
      });
    }
    setLike(!like);
  };

  return (
    <div className={styles.container}>
      <div className={styles.shape}>
        {check ? (
          <div
            id={ticker}
            style={{ color: "red" }}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            &#x2764;
          </div>
        ) : (
          <div
            id={ticker}
            style={{ color: "black" }}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            &#9825;
          </div>
        )}
      </div>
    </div>
  );
}

export default LikeButton;
