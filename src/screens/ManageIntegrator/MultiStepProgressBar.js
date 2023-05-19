import React, { useEffect, useState } from "react";
import "./MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const stepNames = [
  "Integrator Info",
  // "Category Mapping",
  "Product Sync Settings",
  "Order Sync Settings",
  "Tracking Settings",
  "Extra Settings",
];

const styles = {
  Active: {
    color: "black",
  },
  Inactive: {
    color: "grey",
  },
};

const MultiStepProgressBar = ({ page, onPageNumberClick, setPage }) => {
  var stepPercentage = 0;
  // if (page == "1") {
  //   stepPercentage = 10;
  // } else if (page == "2") {
  //   stepPercentage = 25;
  // } else if (page == "3") {
  //   stepPercentage = 48;
  // } else if (page == "4") {
  //   stepPercentage = 65;
  // } else if (page == "5") {
  //   stepPercentage = 82;
  // } else if (page == "6") {
  //   stepPercentage = 100;
  // } else {
  //   stepPercentage = 0;
  // }

  if (page == "1") {
    stepPercentage = 20;
  } else if (page == "2") {
    stepPercentage = 40;
  } else if (page == "3") {
    stepPercentage = 60;
  } else if (page == "4") {
    stepPercentage = 80;
  } else if (page == "5") {
    stepPercentage = 100;
  
  } else {
    stepPercentage = 0;
  }

  const [scrollBar, setScrollBar] = useState(false)

  useEffect(() => {

    const handleScroll = () => {

      const scrollPosition = window.scrollY || document.documentElement.scrollTop

      setScrollBar(scrollPosition > 50)
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  return (
    <div className={scrollBar ? 'fixed__integrator card' : 'card'} style={scrollBar ? {height: "210px"} : {}}>
      <div className="px-3">
    <p className="market-onboarding">Integrator On Boarding</p>
      <p className="stepNamesContainer ">
        {stepNames.map((name, index) => (
          <div
            className="stepName"
            style={page == index + 1 ? styles.Active : styles.Inactive}
            key={index}
            onClick={() => (page > index + 1 ? setPage(index + 1) : "")}
          >
            {name}
          </div>
        ))}
      </p>

      <div>
        <ProgressBar percent={stepPercentage} disabled>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
                onClick={() => onPageNumberClick("1")}
              ></div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
                onClick={() => onPageNumberClick("2")}
              ></div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
                onClick={() => onPageNumberClick("3")}
              ></div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
                onClick={() => onPageNumberClick("4")}
              ></div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
                onClick={() => onPageNumberClick("5")}
              ></div>
            )}
          </Step>
      { /*   <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
                onClick={() => onPageNumberClick("6")}
              ></div>
            )}
              </Step>*/}
        </ProgressBar>
      </div>
      </div>
      <hr className="hr" />
    </div>
  );
};

export default MultiStepProgressBar;
