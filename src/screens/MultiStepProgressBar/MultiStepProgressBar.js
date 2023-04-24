// import React from "react";
// import "../MultiStepProgressBar/MultiStepProgressBar.css";
// import { ProgressBar, Step } from "react-step-progress-bar";
// import { useEffect } from "react";

// const stepNames = [
//   "Suppiler  Info",
//   "Data file Upload",
//   "Data file Mapping",
//   "Image Resize",
//   "Data Import Settings",
//   "Barcodelookup.com",
//   "Product Tier Setup",
// ];

// const styles = {
//   Active: {
//     color: "black",
//   },
//   Inactive: {
//     color: "grey",
//   },
//   Completed: {
//     color: "black",
//     fontWeight: "bold",
//   },
// };

// const MultiStepProgressBar = ({ page, onPageNumberClick, setPage }) => {

//   const totalSteps = stepNames.length;
//   const stepPercentage = ((page - 1) / (totalSteps - 1)) * 100;

//   return (
//     <div>
//       <p className="supplier-onboarding">Supplier onBoarding</p>
//       <p className="stepNamesContainer ">
//         {stepNames.map((name, index) => (
//           <div
//             className="stepName"
//             style={
//               page >= index + 1
//                 ? styles.Active
//                 : page > index + 1
//                 ? styles.Completed
//                 : styles.Inactive
//             }
//             key={index}
//             onClick={() => {
//               if (page > index + 1) {
//                 setPage(index + 1);
//               }
//             }}
//           >
//             {name}
//           </div>
//         ))}
//       </p>

//       <div>
//         <ProgressBar percent={stepPercentage} disabled>
//           {stepNames.map((name, index) => (
//             <Step key={index}>
//               {({ accomplished, index }) => (
//                 <div
//                   className={`indexedStep ${
//                     accomplished ? "accomplished" : null
//                   }`}
//                   onClick={() => {
//                     if (page > index + 1) {
//                       setPage(index + 1);
//                     }
//                   }}
//                 ></div>
//               )}
//             </Step>
//           ))}
//         </ProgressBar>
//       </div>
//       <hr className="hr" />

//       <div>
//         {page < totalSteps ? (
//           <p
//             className="next-button"
//             onClick={() => onPageNumberClick(page + 1, totalSteps)}
//           >

//           </p>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default MultiStepProgressBar;

import React from "react";
import "./MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const stepNames = [
  "Suppiler  Info",
  "Data file Upload",
  "Data file Mapping",
  "Image Resize",
  "Data Import Settings",
  "Barcodelookup.com",
  "Product Tier Setup",
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
  if (page == "1") {
    stepPercentage = 10;
  } else if (page == "2") {
    stepPercentage = 25;
  } else if (page == "3") {
    stepPercentage = 40;
  } else if (page == "4") {
    stepPercentage = 56;
  } else if (page == "5") {
    stepPercentage = 70;
  } else if (page == "6") {
    stepPercentage = 88;
  } else if (page == "7") {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <div>
    <p className="supplier-onboarding">Supplier onBoarding</p>
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
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
                onClick={() => onPageNumberClick("6")}
              ></div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                }`}
                onClick={() => onPageNumberClick("7")}
              ></div>
            )}
          </Step>
        </ProgressBar>
      </div>
      <hr className="hr" />
    </div>
  );
};

export default MultiStepProgressBar;
