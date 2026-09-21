import { useState } from "react";
import "./App.css";

const initialHabits = [
  {
    id: 1,
    name: "English",
    description: "Practice English for 30 minutes",
    icon: "🇬🇧",
    completed: true,
  },
  {
    id: 2,
    name: "Coding",
    description: "Code for 2 hours",
    icon: "💻",
    completed: false,
  },
  {
    id: 3,
    name: "Reading",
    description: "Read for 20 minutes",
    icon: "📚",
    completed: false,
  },
  {
    id: 4,
    name: "Exercise",
    description: "Exercise for 30 minutes",
    icon: "🏃",
    completed: false,
  },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [habits, setHabits] = useState(initialHabits);

  const [showModal, setShowModal] = useState(false);

  const [newHabit, setNewHabit] = useState({
    name: "",
    description: "",
    icon: "⭐",
  });

  const toggleHabit = (id) => {
    setHabits((current) =>
      current.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  };

  const addHabit = (e) => {
    e.preventDefault();

    if (!newHabit.name.trim()) {
      return;
    }

    const habit = {
      id: Date.now(),
      name: newHabit.name,
      description:
        newHabit.description || "Complete this habit today",
      icon: newHabit.icon,
      completed: false,
    };

    setHabits((current) => [...current, habit]);

    setNewHabit({
      name: "",
      description: "",
      icon: "⭐",
    });

    setShowModal(false);
  };

  const completedCount = habits.filter(
    (habit) => habit.completed
  ).length;

  const progress =
    habits.length === 0
      ? 0
      : Math.round((completedCount / habits.length) * 100);

  const menuItems = [
    { name: "Dashboard", icon: "⌂" },
    { name: "My Habits", icon: "✓" },
    { name: "Calendar", icon: "▣" },
    { name: "Statistics", icon: "◒" },
    { name: "Goals", icon: "🎯" },
  ];

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">✓</div>
          <span>HabitFlow</span>
        </div>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={
                activePage === item.name ? "nav-button active" : "nav-button"
              }
              onClick={() => setActivePage(item.name)}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className="nav-button"
            onClick={() => setActivePage("Settings")}
          >
            <span>⚙</span>
            Settings
          </button>
        </div>

      </aside>

      {/* MAIN */}
      <main className="main">

        {/* HEADER */}
        <header className="header">

          <div>
            <p className="date">
              Monday, September 21, 2026
            </p>

            <h1>
              Good afternoon, Og'abek 👋
            </h1>

            <p className="subtitle">
              Build better habits, one day at a time.
            </p>
          </div>

          <div className="header-actions">

            <button className="notification">
              🔔
            </button>

            <div className="profile">

              <div className="avatar">
                O
              </div>

              <div>
                <strong>Og'abek</strong>
                <small>Member</small>
              </div>

            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}

        {activePage === "Dashboard" && (
          <Dashboard
            habits={habits}
            progress={progress}
            completedCount={completedCount}
            toggleHabit={toggleHabit}
            setShowModal={setShowModal}
          />
        )}

        {activePage === "My Habits" && (
          <MyHabits
            habits={habits}
            toggleHabit={toggleHabit}
            setShowModal={setShowModal}
          />
        )}

        {activePage === "Calendar" && (
          <Calendar habits={habits} />
        )}

        {activePage === "Statistics" && (
          <Statistics
            habits={habits}
            progress={progress}
          />
        )}

        {activePage === "Goals" && (
          <Goals />
        )}

        {activePage === "Settings" && (
          <Settings />
        )}

      </main>

      {/* ADD HABIT MODAL */}

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>
                <h2>Add New Habit</h2>
                <p>Create a habit and start building your routine.</p>
              </div>

              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={addHabit}>

              <label>
                Habit name
              </label>

              <input
                type="text"
                placeholder="e.g. Reading"
                value={newHabit.name}
                onChange={(e) =>
                  setNewHabit({
                    ...newHabit,
                    name: e.target.value,
                  })
                }
              />

              <label>
                Description
              </label>

              <input
                type="text"
                placeholder="e.g. Read for 20 minutes"
                value={newHabit.description}
                onChange={(e) =>
                  setNewHabit({
                    ...newHabit,
                    description: e.target.value,
                  })
                }
              />

              <label>
                Choose icon
              </label>

              <div className="icon-options">

                {["⭐", "📚", "💻", "🏃", "💧", "🎯", "🧘", "🎸"].map(
                  (icon) => (
                    <button
                      type="button"
                      key={icon}
                      className={
                        newHabit.icon === icon
                          ? "icon-option selected"
                          : "icon-option"
                      }
                      onClick={() =>
                        setNewHabit({
                          ...newHabit,
                          icon,
                        })
                      }
                    >
                      {icon}
                    </button>
                  )
                )}

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                >
                  Add Habit
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}


/* =========================
   DASHBOARD
========================= */

function Dashboard({
  habits,
  progress,
  completedCount,
  toggleHabit,
  setShowModal,
}) {
  return (
    <>

      <section className="stats">

        <div className="stat-card">
          <div className="stat-icon fire">🔥</div>

          <div>
            <span>Current streak</span>
            <strong>12 days</strong>
            <small>Keep it going!</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon check">✓</div>

          <div>
            <span>Today's progress</span>
            <strong>{progress}%</strong>

            <small>
              {completedCount} of {habits.length} completed
            </small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon target">🎯</div>

          <div>
            <span>This week</span>
            <strong>84%</strong>
            <small>+8% from last week</small>
          </div>
        </div>

      </section>

      <div className="content-grid">

        <section className="habits-section">

          <div className="section-header">

            <div>
              <h2>Today's Habits</h2>

              <p>
                Complete your habits to build your streak.
              </p>
            </div>

            <button
              className="add-button"
              onClick={() => setShowModal(true)}
            >
              + Add Habit
            </button>

          </div>

          <div className="progress-box">

            <div className="progress-top">
              <span>Daily progress</span>
              <strong>{progress}%</strong>
            </div>

            <div className="progress-bar">

              <div
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

          <div className="habit-list">

            {habits.map((habit) => (

              <div
                className={
                  habit.completed
                    ? "habit-card completed"
                    : "habit-card"
                }
                key={habit.id}
              >

                <button
                  className="check-button"
                  onClick={() => toggleHabit(habit.id)}
                >
                  {habit.completed ? "✓" : ""}
                </button>

                <div className="habit-icon">
                  {habit.icon}
                </div>

                <div className="habit-info">

                  <h3>{habit.name}</h3>

                  <p>
                    {habit.description}
                  </p>

                </div>

                <div className="habit-status">
                  {habit.completed
                    ? "Completed"
                    : "Pending"}
                </div>

              </div>

            ))}

          </div>

        </section>

        <aside className="right-column">

          <div className="streak-card">

            <div className="streak-title">
              <span>🔥</span>
              <h2>Your Streak</h2>
            </div>

            <div className="streak-number">
              12
            </div>

            <p>days in a row</p>

            <div className="week">
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
            </div>

          </div>

          <div className="goal-card">

            <div className="goal-header">
              <span>🎯</span>
              <h2>Monthly Goal</h2>
            </div>

            <h3>
              Build a better routine
            </h3>

            <div className="goal-progress">
              <div></div>
            </div>

            <p>
              23 / 30 days completed
            </p>

            <button>
              View Goal →
            </button>

          </div>

        </aside>

      </div>

    </>
  );
}


/* =========================
   MY HABITS
========================= */

function MyHabits({
  habits,
  toggleHabit,
  setShowModal,
}) {
  return (
    <section className="page-section">

      <div className="page-title-row">

        <div>
          <h2>My Habits</h2>
          <p>Manage all your daily habits.</p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowModal(true)}
        >
          + Add Habit
        </button>

      </div>

      <div className="all-habits">

        {habits.map((habit) => (

          <div className="habit-card" key={habit.id}>

            <button
              className="check-button"
              onClick={() => toggleHabit(habit.id)}
            >
              {habit.completed ? "✓" : ""}
            </button>

            <div className="habit-icon">
              {habit.icon}
            </div>

            <div className="habit-info">
              <h3>{habit.name}</h3>
              <p>{habit.description}</p>
            </div>

            <div className="habit-status">
              {habit.completed
                ? "Completed"
                : "Pending"}
            </div>

          </div>

        ))}

      </div>

    </section>
  );
}


/* =========================
   CALENDAR
========================= */

function Calendar() {
  return (
    <section className="page-section">

      <h2>Calendar 📅</h2>

      <p className="page-description">
        Track your habit activity throughout the month.
      </p>

      <div className="calendar-card">

        <h3>September 2026</h3>

        <div className="calendar-grid">

          {[
            "M",
            "T",
            "W",
            "T",
            "F",
            "S",
            "S",
          ].map((day, index) => (
            <strong key={index}>
              {day}
            </strong>
          ))}

          {Array.from({ length: 30 }, (_, index) => (
            <div
              className={
                index + 1 <= 21
                  ? "calendar-day done"
                  : "calendar-day"
              }
              key={index}
            >
              {index + 1}
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}


/* =========================
   STATISTICS
========================= */

function Statistics({ habits, progress }) {
  return (
    <section className="page-section">

      <h2>Statistics 📊</h2>

      <p className="page-description">
        See how consistently you are building your habits.
      </p>

      <div className="statistics-grid">

        <div className="big-stat">
          <span>Today's completion</span>
          <strong>{progress}%</strong>

          <div className="big-progress">
            <div
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <div className="big-stat">
          <span>Total habits</span>
          <strong>{habits.length}</strong>
          <p>Active habits</p>
        </div>

        <div className="big-stat">
          <span>Current streak</span>
          <strong>12 🔥</strong>
          <p>Days in a row</p>
        </div>

      </div>

    </section>
  );
}


/* =========================
   GOALS
========================= */

function Goals() {
  return (
    <section className="page-section">

      <div className="page-title-row">

        <div>
          <h2>Goals 🎯</h2>

          <p>
            Set goals and keep moving forward.
          </p>
        </div>

        <button className="add-button">
          + Add Goal
        </button>

      </div>

      <div className="goal-large-card">

        <div className="goal-icon">
          🎯
        </div>

        <div>
          <h3>
            Build a better routine
          </h3>

          <p>
            Complete your habits for 30 days.
          </p>

          <div className="goal-progress">
            <div></div>
          </div>

          <small>
            23 / 30 days
          </small>
        </div>

      </div>

    </section>
  );
}


/* =========================
   SETTINGS
========================= */

function Settings() {
  return (
    <section className="page-section">

      <h2>Settings ⚙</h2>

      <p className="page-description">
        Manage your HabitFlow preferences.
      </p>

      <div className="settings-card">

        <div>
          <h3>Notifications</h3>
          <p>Receive reminders for your habits.</p>
        </div>

        <input
          type="checkbox"
          defaultChecked
        />

      </div>

      <div className="settings-card">

        <div>
          <h3>Dark Mode</h3>
          <p>Dark mode will be available soon.</p>
        </div>

        <input type="checkbox" />

      </div>

    </section>
  );
}

export default App;