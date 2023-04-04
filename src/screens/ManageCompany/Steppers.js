import React, { useContext, useEffect } from 'react';
import { FormContext } from './ManageCompany';
import "./Steppers.css"

const Steppers = () => {
    const { activeStepIndex } = useContext(FormContext);
    useEffect(() => {
        const stepperItems = document.querySelectorAll(".stepper-item");
        stepperItems.forEach((step, i) => {
            if (i <= activeStepIndex) {
                step.classList.add("active");
            } else {
                step.classList.remove("active");
            }
        });
    }, [activeStepIndex]);
    return (
        <div className="stepper-list mb-5">
            <div className="stepper-item">
                Company Information
            </div>
            <div className="stepper-item">
                Media / Social
            </div>
            <div className="stepper-item">
                General
            </div>
            <div className="stepper-item">
                Integration
            </div>
            <div className="stepper-item">
                Change Log
            </div>

        </div>
    );
}

export default Steppers;
