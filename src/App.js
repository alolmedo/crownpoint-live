
import React, { useState } from "react";
import "./App.css";

function App() {
  const [view, setView] = useState("home");

  const renderHome = () => (
    <div>
      <h1>Welcome to Crown Point Catering</h1>
      <p>This is the home view.</p>
      <section>
        <h2>Featured Dishes</h2>
        <ul>
          <li>Grilled Salmon</li>
          <li>Chicken Alfredo</li>
          <li>Garden Fresh Salad</li>
        </ul>
      </section>
      <section>
        <h2>Weekly Specials</h2>
        <p>Check back every Monday for new specials!</p>
      </section>
    </div>
  );

  const renderCalendar = () => (
    <div>
      <h1>Meal Calendar</h1>
      <p>Here’s where your calendar will go.</p>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Menu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monday</td>
            <td>Grilled Chicken Wraps</td>
          </tr>
          <tr>
            <td>Tuesday</td>
            <td>Veggie Stir Fry</td>
          </tr>
          <tr>
            <td>Wednesday</td>
            <td>Spaghetti & Meatballs</td>
          </tr>
          <tr>
            <td>Thursday</td>
            <td>BBQ Pulled Pork Sandwiches</td>
          </tr>
          <tr>
            <td>Friday</td>
            <td>Chef’s Surprise</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderWeightInfo = () => (
    <div>
      <h1>Box Weight Info</h1>
      <p>Information about box weights goes here.</p>
      <ul>
        <li>Small Box: ~2.5 lbs</li>
        <li>Medium Box: ~4.2 lbs</li>
        <li>Large Box: ~6.8 lbs</li>
      </ul>
    </div>
  );

  const renderHowItWorks = () => (
    <div>
      <h1>How It Works</h1>
      <p>We deliver fresh meals daily to your chosen location.</p>
      <ol>
        <li>Choose your meals</li>
        <li>Set your delivery date</li>
        <li>Enjoy hassle-free catering!</li>
      </ol>
    </div>
  );

  return (
    <div>
      {view === "home" && renderHome()}
      {view === "calendar" && renderCalendar()}
      {view === "weight" && renderWeightInfo()}
      {view === "how" && renderHowItWorks()}

      <div style={bottomNavStyle}>
        <button style={navButtonStyle} onClick={() => setView("home")}>Home</button>
        <button style={navButtonStyle} onClick={() => setView("calendar")}>Calendar</button>
        <button style={navButtonStyle} onClick={() => setView("weight")}>Box Weight</button>
        <button style={navButtonStyle} onClick={() => setView("how")}>How It Works</button>
      </div>

      <footer style={{
        textAlign: "center",
        padding: "2rem 1rem",
        color: "#888",
        fontSize: "0.875rem",
        fontFamily: "'Playfair Display', serif"
      }}>
        &copy; {new Date().getFullYear()} Crown Point Catering. All rights reserved.
      </footer>
    </div>
  );
}

const bottomNavStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#ffffff",
  borderTop: "2px solid #ccc",
  display: "flex",
  justifyContent: "space-around",
  padding: "1rem 0",
  zIndex: 1000,
};

const navButtonStyle = {
  background: "none",
  border: "none",
  fontSize: "1rem",
  fontFamily: "'Playfair Display', serif",
  fontWeight: "600",
  color: "#3f3f4f",
  letterSpacing: "0.05em",
  cursor: "pointer",
};

export default App;