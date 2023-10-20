import { React, useEffect, useRef } from "react";
import { useState } from "react";

function addZero(num) {
  if (num < 10) {
    return "0" + num;
  }
  return num;
}

const TimerPage = () => {
  let [TotalSecond, setTotalSecond] = useState(0);
  let [sec, setSec] = useState(0);
  let [min, setMin] = useState(0);
  let [hour, setHour] = useState(0);
  let [relex, setRelex] = useState(0);
  let [tomatoSec, setTomatoSec] = useState(0);
  let [tomatoMin, setTomatoMin] = useState(0);
  let [tomato, setTomato] = useState(0);
  let totalTimer = 0;
  let [runningState, setRunnungState] = useState(true);
  let [loopRestSec, setloopRestSec] = useState(addZero(0));
  let [loopRestMin, setloopRestMin] = useState(addZero(0));
  let [loopRest, setloopRest] = useState(0);
  const PauseHandler = () => {
    setRunnungState(!runningState);
    return () => clearInterval(totalTimer);
  };
  const resetHandler = () => {
    setRunnungState(!runningState);
    setTotalSecond(addZero(0));
    setSec(addZero(0));
    setMin(addZero(0));
    setHour(addZero(0));
    setTomatoSec(addZero(0));
    setTomatoMin(addZero(0));
    setTomato(addZero(0));
    setloopRestSec(addZero(0));
    setloopRestMin(addZero(0));
    setloopRest(addZero(0));
    return () => clearInterval(totalTimer);
  };

  function startTimer() {
    if (runningState) {
      totalTimer = setInterval(() => {
        // 在這裡使用的秒數要統一使用useState否則會導致時間差的問題裡面快外面一次更新
        setTotalSecond(TotalSecond++);
        setHour(addZero(Math.floor(TotalSecond / 3600) % 24));
        setMin(addZero(Math.floor(TotalSecond / 60) % 60));
        setSec(addZero(Math.floor(TotalSecond % 60)));
        //一輪
        if (TotalSecond % 8700 > 7200 && TotalSecond % 8700 <= 8700 > 0) {
          setloopRestMin(
            addZero(Math.floor((1500 - ((TotalSecond % 8700) - 7200)) / 60))
          );
          setloopRestSec(
            addZero(Math.floor(1500 - ((TotalSecond % 8700) - 7200)) % 60)
          );
          setloopRest(Math.floor(TotalSecond / 7200));
        } else {
          if (
            (TotalSecond % 8700) % 1800 >= 1500 &&
            TotalSecond % 8700 <= 7200
          ) {
            // 小休息
            // 以30分鐘為單位處理番茄鐘
            // 未來可以在休息時間變換背景提示?

            setTomatoMin(addZero(0));
            setTomatoSec(addZero(0));

            setRelex(1800 - ((TotalSecond % 8700) % 1800));
          } else if (
            // 一節
            (TotalSecond % 8700) % 1800 <= 1500 &&
            TotalSecond % 8700 <= 7200
          ) {
            // console.log(TotalSecond);
            setTomatoMin(
              addZero(Math.floor((1500 - ((TotalSecond % 8700) % 1800)) / 60))
            );
            setTomatoSec(
              addZero(Math.floor((1800 - ((TotalSecond % 8700) % 1800)) % 60))
            );
            setTomato(
              Math.floor(
                (TotalSecond - 1500 * Math.floor(TotalSecond / 8700)) / 1800
              )
            );
            setloopRestSec(addZero(0));
            setloopRestMin(addZero(0));
            setRelex(addZero(0));
          }
        }
      }, 1000);
    }
  }

  //開啟時啟動
  useEffect(() => {
    startTimer();

    return () => clearInterval(totalTimer);
  }, [runningState]);

  return (
    <div className="timer">
      <div className="timerbox">
        <h1>番茄鐘計時器</h1>
        <div className="timerRow">
          <p>總時長:</p>

          <button className="btn41-43 btn-41">{hour} </button>
          <button className="btn41-43 btn-41"> {min}</button>
          <button className="btn41-43 btn-41">{sec}</button>
        </div>
        <div className="timerRow">
          <p>讀書時間:</p>
          <button className="btn41-43 btn-41">{tomatoMin}</button>
          <button className="btn41-43 btn-41">{tomatoSec}</button>
          <button className="">{tomato}</button>
        </div>
        <div className="timerRow">
          <p>一節休息:</p>
          <button className="btn41-43 btn-41">{relex}</button>
        </div>
        <div className="timerRow">
          <p>一輪結束:</p>
          <button className="btn41-43 btn-41">{loopRestMin}</button>{" "}
          <button className="btn41-43 btn-41">{loopRestSec}</button>
          <button className="">{loopRest}</button>
        </div>
        <button onClick={PauseHandler} className="bn632-hover bn26">
          {runningState ? "pause" : "start"}
        </button>
        <button onClick={resetHandler} className="bn632-hover bn26">
          reset
        </button>
      </div>
    </div>
  );
};

export default TimerPage;
