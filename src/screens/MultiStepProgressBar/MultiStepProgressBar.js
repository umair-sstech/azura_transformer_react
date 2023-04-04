import React from "react";
import "./MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const stepNames = [
  "Suppiler  Info",
  "Data file Upload",
  "Data file Mapping",
  "Image Resize",
  "Data Import Settings",
];

const MultiStepProgressBar = ({ page, onPageNumberClick }) => {
  var stepPercentage = 0;
  if (page === "pageone") {
    stepPercentage = 20;
  } else if (page === "pagetwo") {
    stepPercentage = 40;
  } else if (page === "pagethree") {
    
    stepPercentage = 60;
  } else if (page === "pagefour") {
    stepPercentage = 80;
  } else if (page === "pagefive") {
    stepPercentage = 100;
  }else {
    stepPercentage = 0;
  }

  return (
    <div>
      <p className="stepNamesContainer">
        {stepNames.map((name, index) => (
          <div
            className={`stepName ${
              page === `page${index + 1}` ? "active" : ""
            }`}
            key={index}
            onClick={() => onPageNumberClick(`page${index + 1}`)}
          >
            {name}
          </div>
        ))}
      </p>

      <div>
        <ProgressBar percent={stepPercentage}>
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
 
        </ProgressBar>
      </div>
    </div>
  );
};

export default MultiStepProgressBar;
