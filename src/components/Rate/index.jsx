import { useEffect, useState } from "react";
import "./style.css";

const currencies = {
  USD: { CZK: 23.823 },
  EUR: { CZK: 24.74 },
  GBP: { CZK: 29.067 },
};

export const Rate = ({ from }) => {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    const fetchRate = async () => {
      const resp = await fetch(
        `https://api.frankfurter.app/latest?from=${from}&to=CZK`
      );
      const data = await resp.json();
      setRate(data.rates.CZK)
    };
    fetchRate();
  }, [from]);

  return (
    <div className="rate">
      <div className="rate__currency">1 {from}</div>
      <div>=</div>
      {/*
      Řešení kurzovního lístku bez API:
      <div className="rate__value">{currencies[from].CZK} CZK</div>
      */}
      {rate === null ? (
        "načítám…"
      ) : (
        <div className="rate__value">{rate} CZK</div>
      )}
    </div>
  );
};
