import React, { useState } from 'react';

type CheckboxProps = {
    complete : boolean
}

const RoundCheckbox = (props: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(props.complete);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="h-6 w-6 rounded-full border border-gray-300 checked:bg-yellow focus:outline-none"
      />
    </label>
  );
};

export default RoundCheckbox;
