import { useState, useEffect } from "react";

export default function FontSize() {
  const [fontSize, setFontSize] = useState(
    parseInt(localStorage.getItem("FontSize")) || 16
  );

  useEffect(() => {
    localStorage.setItem("FontSize", fontSize.toString());
  }, [fontSize]);

  function aumentarfont() {
    if (fontSize <= 98) {
      setFontSize((prevFont) => prevFont + 2);
    }
  }
  function diminuirfont() {
    if (fontSize >= 14) {
      setFontSize((prevFont) => prevFont - 2);
    }
  }

  return (
    <div>
      <button onClick={diminuirfont}>-</button>
      <span style={{ fontSize: `${fontSize}px` }}>{fontSize}</span>
      <button onClick={aumentarfont}>+</button>
    </div>
  );
}
