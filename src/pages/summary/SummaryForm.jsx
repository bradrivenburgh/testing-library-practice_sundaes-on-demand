import { useState } from "react";

function SummaryForm() {
  const [enable, setEnable] = useState(false);
  return (
    <div>
      <button type="submit" aria-disabled={!enable} disabled={!enable}>
        Submit
      </button>
      <input
        type="checkbox"
        id="agree"
        checked={enable}
        onChange={() => setEnable(!enable)}
      />
      <label htmlFor="agree">Agree</label>
    </div>
  );
}

export default SummaryForm;
