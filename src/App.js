import { useState, useEffect } from 'react';

function App() {
  const [meals, setMeals] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [view, setView] = useState("home");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    setMeals([
      {
        id: 1,
        name: "Grilled Chicken & Veggies",
        image: "/meals/chicken_veggies.jpg",
        price: "$5",
        time: "Pickup by 6:00 PM",
        available: true
      },
      {
        id: 2,
        name: "Roasted Veggie Pasta",
        image: "/meals/veggie_pasta.jpg",
        price: "$4",
        time: "Pickup by 6:30 PM",
        available: true
      }
    ]);

    setSchedule([
      { date: "2025-05-10", items: ["Teriyaki Chicken Bowl", "Lentil Soup"] },
      { date: "2025-05-14", items: ["BBQ Pulled Pork", "Mac & Cheese"] },
      { date: "2025-05-17", items: ["Grilled Chicken & Veggies", "Roasted Veggie Pasta"] },
      { date: "2025-06-03", items: ["Taco Salad", "Black Bean Enchiladas"] },
    ]);
  }, []);

  const reserveMeal = (id) => {
    setMeals(prev => prev.map(m => m.id === id ? { ...m, available: false } : m));
    alert("✅ Reserved! Please head to Crown Point Catering for pickup.");
  };

  const buttonStyle = {
    backgroundColor: '#5e6b4f',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    margin: '0.25rem 0',
    width: '100%',
    borderTop: 'none',
    borderBottom: 'none'
  };

  const renderHome = () => (
    <>
      <header style={{ textAlign: 'center', padding: '1rem 0' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.75rem', fontWeight: '700', color: '#3E3B47' }}>Crown Point Catering Extra's</h1>
        <p style={{ fontFamily: "'Lato', sans-serif", color: '#999966', fontSize: '1rem' }}>Discounted fresh meals from today’s events — first come, first served</p>
      </header>
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3E3B47', textAlign: 'center', marginBottom: '1rem' }}>Available Today</h2>
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', maxWidth: '1000px', margin: '0 auto' }}>
          {meals.map(meal => (
            <div key={meal.id} style={{ border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', backgroundColor: '#fff' }}>
              <img src={meal.image} alt={meal.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '1rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#3E3B47' }}>{meal.name}</h2>
                <p>{meal.time}</p>
                <p style={{ fontWeight: 'bold' }}>{meal.price}</p>
                <button onClick={() => reserveMeal(meal.id)} disabled={!meal.available} style={{ marginTop: '1rem', width: '100%', ...buttonStyle, backgroundColor: meal.available ? '#5e6b4f' : '#bbb' }}>{meal.available ? "Reserve Now" : "Sold Out"}</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {renderCalendarBoxes()}
    </>
  );

  const renderCalendarBoxes = () => (
    <section style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#3E3B47', margin: '1.5rem 0' }}>Upcoming Meals</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {schedule.map(entry => (
          <div key={entry.date} style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid #5e6b4f` }}>
            <strong>{new Date(entry.date).toDateString()}</strong>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem' }}>
              {entry.items.map((item, index) => (
                <li key={index} style={{ listStyle: 'disc' }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const calendarCells = [];
    for (let i = 0; i < firstDay; i++) calendarCells.push(null);
    for (let d = 1; d <= daysInMonth; d++) calendarCells.push(new Date(year, month, d));

    const filteredSchedule = schedule.filter(entry => new Date(entry.date).getMonth() === month);

    return (
      <section style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <button onClick={() => setCurrentMonth(new Date(year, month - 1))}>←</button>
          <h2 style={{ textAlign: 'center', color: '#3E3B47' }}>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={() => setCurrentMonth(new Date(year, month + 1))}>→</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => <div key={day}><strong>{day}</strong></div>)}
          {calendarCells.map((date, index) => {
            const mealEntry = filteredSchedule.find(e => date && new Date(e.date).toDateString() === date.toDateString());
            return (
              <div key={index} style={{ border: '1px solid #ccc', borderRadius: '4px', minHeight: '80px', padding: '0.25rem', backgroundColor: date ? '#fff' : 'transparent' }}>
                {date && <div>{date.getDate()}</div>}
                {mealEntry && mealEntry.items.map((item, i) => <div key={i} style={{ fontSize: '0.75rem' }}>{item}</div>)}
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  const renderWeightInfo = () => (
    <section style={{ maxWidth: '700px', margin: '2rem auto', padding: '1rem', backgroundColor: '#fff', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', color: '#3E3B47' }}>Box Weight Info</h2>
      <p style={{ marginTop: '1rem', lineHeight: '1.6', color: '#333' }}>Each leftover box typically contains between <strong>16–24 ounces</strong> of food, depending on the dish. Hot entrées like pasta or rice dishes are on the higher end, while lighter items like salads may be slightly less.</p>
    </section>
  );

  const renderHowItWorks = () => (
    <section style={{ maxWidth: '700px', margin: '2rem auto', padding: '1rem', backgroundColor: '#fff', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', color: '#3E3B47' }}>How It Works</h2>
      <p style={{ marginTop: '1rem', lineHeight: '1.6', color: '#333' }}>CrownPoint Leftovers lets you reserve fresh meals left over from events — helping reduce food waste while giving you delicious, affordable food. Check in daily or view the calendar to plan ahead!</p>
    </section>
  );

  return (
    <div style={{ fontFamily: "'Lato', sans-serif", backgroundColor: '#f8f8f5', minHeight: '100vh', paddingBottom: '60px' }}>
      <div style={{ padding: '1rem' }}>
        {view === "home" && renderHome()}
        {view === "calendar" && renderCalendar()}
        {view === "weight" && renderWeightInfo()}
        {view === "how" && renderHowItWorks()}
      </div>

      <div style={bottomNavStyle}>
        <button style={navButtonStyle} onClick={() => setView("home")}>Home</button>
        <button style={navButtonStyle} onClick={() => setView("calendar")}>Calendar</button>
        <button style={navButtonStyle} onClick={() => setView("weight")}>Box Weight</button>
        <button style={navButtonStyle} onClick={() => setView("how")}>How It Works</button>
      </div>

      <footer style={{ textAlign: 'center', padding: '2rem 1rem', color: '#888', fontSize: '0.875rem' }}>
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
  borderTop: "1px solid #ccc",
  display: "flex",
  justifyContent: "space-around",
  padding: "0.5rem 0",
  zIndex: 1000,
};

const navButtonStyle = {
  background: "none",
  border: "none",
  fontSize: "0.9rem",
  fontWeight: "bold",
  color: "#333",
  cursor: "pointer",
};

export default App;