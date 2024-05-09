import React from "react";
import countries from "i18n-iso-countries";
import englishCountries from "i18n-iso-countries/langs/en.json";
import emojiFlag from "emoji-flag";
import { useField } from "formik";
import CustomSelect from "./CustomSelect";

function CountrySelector(props, values) {
  const [field, meta] = useField(props.name);
  countries.registerLocale(englishCountries);

  const countryOptions = Object.entries(
    countries.getNames("en", { select: "official" })
  ).map(([code, name]) => ({
    value: code,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: 10 }}>{emojiFlag(code)}</span>
        {name}
      </div>
    ),
  }));

  return (
    <>
      <CustomSelect
        {...field}
        {...props}
        options={countryOptions}
        value={countryOptions.find((option) => option.value === values.country)}
      />
    </>
  );
}

export default CountrySelector;
