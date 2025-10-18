"use client";

import { useState, useMemo } from "react";
import countryList from "react-select-country-list";

type props={
    classe:string;
}

export default function CountrySelect({classe}:props) {
  const [country, setCountry] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };

  return (
    <div className="relative">
      <select
        value={country}
        onChange={handleChange}
        className={classe}
      >
        <option value="">-- Sélectionnez votre pays --</option>
        {options.map((c) => (
          <option key={c.value} value={c.label}>
            {c.label}
          </option>
        ))}
      </select>
    </div>
  );
}
