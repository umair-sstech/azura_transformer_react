import React, { useState } from 'react'
import Select from "react-select";


function PreferenceValue(props) {
    const { csvOption,selectedRadioPreference,selectedPreference } = props;
   const [productRadio, setProductRadio] = useState([
        {
          value: "single_row",
          label: "Single Row ( Parent Child In Same Row) ",
        },
        {
          value: "multiple_row",
          label: "Different Rows ( Parent Child In Different Row) ",
        },
      ]);
   
    const handleProductRadioChange = (value) => {
        selectedRadioPreference(value);
      };

  return (
  <>
  <div className="row mt-3 mt-lg-0">
  <div className="col-12">
    <label>
      In what format does this supplier provide the product data?
    </label>
  </div>
  <div className="col-12 mt-2">
    {productRadio.map((radio) => (
      <label key={radio.value} className="radio-label mr-3">
        <input
          type="radio"
          name="Preference"
          value={radio.value ? radio.value : ""}
          checked={selectedRadioPreference === radio.value}
          onChange={() => handleProductRadioChange(radio.value)}
        />
        {radio.label}
      </label>
    ))}
  </div>
</div>
<div className="row mt-2">
  <div className="col-6">
    {selectedRadioPreference === "multiple_row"  ? (
      <div>
        <Select
          options={csvOption}
          value={selectedPreference}
          onChange={(selectedOption) => setSelectedPreference(selectedOption)}

        />
      </div>
    ) : null}
  </div>
</div>
  </>
  )
}

export default PreferenceValue
