import React, { useState } from "react";
import { rulesPPVCH } from "./rulesPPVCH";

function PPVCHPage({ onBack }) {
  const [search, setSearch] = useState("");

  const filteredRules = rulesPPVCH.filter(
    (rule) =>
      rule.text.toLowerCase().includes(search.toLowerCase()) ||
      rule.punishment.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <button onClick={onBack}>← Повернутись</button>
      <h2>Пошук по правилах ППВЧ</h2>
      <input
        type="text"
        placeholder="Введіть текст для пошуку..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", marginBottom: 16 }}
      />
      <ul>
        {filteredRules.map((rule) => (
          <li key={rule.num} style={{ marginBottom: 10 }}>
            <b>{rule.num}.</b> {rule.text}
            {rule.punishment && (
              <span style={{ color: "darkred", marginLeft: 8 }}>
                | {rule.punishment}
              </span>
            )}
            {rule.note && (
              <div style={{ fontSize: "0.9em", color: "#555", marginLeft: 16 }}>
                <i>{rule.note}</i>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PPVCHPage;
