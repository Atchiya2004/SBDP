
import React from "react";

const Awareness = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(to bottom, #fff5f5, #ffffff)",
        color: "#333",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#b30000" }}>🩸 Blood Donation Awareness</h1>
      <p style={{ textAlign: "center", fontSize: "18px", margin: "10px auto", maxWidth: "800px" }}>
        Every 2 seconds, someone in the world needs blood. One donation can save up to 3 lives.
      </p>

      <div style={{ margin: "40px auto", maxWidth: "900px", lineHeight: "1.8" }}>
        <h2>💉 Why Donate Blood?</h2>
        <ul>
          <li>Helps save lives during accidents, surgeries, and cancer treatments.</li>
          <li>Improves your own cardiovascular health.</li>
          <li>Provides free health screening during donation.</li>
        </ul><hr></hr>

        <h2>🧬 Who Can Donate?</h2>
        <ul>
          <li>Age 18–65 years, weight above 50 kg.</li>
          <li>Hemoglobin at least 12.5 g/dl.</li>
          <li>Should be healthy, with no infection in the last 3 months.</li>
        </ul><hr></hr>

        <h2>🚫 Avoid Donation If:</h2>
        <ul>
          <li>Had recent surgery or serious illness.</li>
          <li>Consumed alcohol within 24 hours.</li>
          <li>Pregnant or breastfeeding.</li>
        </ul><hr></hr>

        <h2>🌟 Fun Facts</h2>
        <ul>
          <li>1 blood donation = saves up to 3 lives.</li>
          <li>Type O- is the universal donor.</li>
          <li>It takes only 15 minutes to donate, but impacts a lifetime!</li>
        </ul>
      </div>
    </div>
  );
};

export default Awareness;
