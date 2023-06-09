import React from "react";
import "../ManageMarketPlace/MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const stepNames = [
  "Integrator Info",
  // "Category Mapping",
  "Product Sync Settings",
  "Order Sync Settings",
  "Tracking Settings",
  // "Extra Settings",
];

const styles = {
  Active: {
    color: "black",
  },
  Inactive: {
    color: "grey",
  },
  Completed: {
    color: "black",
    fontWeight: "bold",
  },
};

const MultiStepProgressBar = ({ page, onPageNumberClick, setPage }) => {
  const totalSteps = stepNames.length;
  const stepPercentage = ((page - 1) / (totalSteps - 1)) * 110;



  return (
    <div>
    <p className="market-onboarding">Integrator On Boarding</p>
      <p className="stepNamesContainer ">
        {stepNames.map((name, index) => (
          <div
            className="stepName"
            style={
              page >= index + 1
                ? styles.Active
                : page > index + 1
                ? styles.Completed
                : styles.Inactive
            }
            key={index}
            onClick={() => {
              if (page > index + 1) {
                setPage(index + 1);
              }
            }}
          >
            {name}
          </div>
        ))}
      </p>

      <div>
        <ProgressBar percent={stepPercentage} disabled>
        {stepNames.map((name, index) => (
            <Step key={index}>
              {({ accomplished, index }) => (
                <div
                  className={`indexedStep ${
                    accomplished ? "accomplished" : null
                  }`}
                  onClick={() => {
                    // if (page > index + 1) {
                      setPage(index + 1);
                    // }
                  }}
                ></div>
              )}
            </Step>
          ))}
          
        </ProgressBar>
      </div>
      <hr className="hr" />

      <div>
        {page < totalSteps ? (
          <p
            className="next-button"
            onClick={() => onPageNumberClick(page + 1, totalSteps)}
          >

          </p>
        ) : null}
      </div>            

    </div>
  );
};

export default MultiStepProgressBar;
