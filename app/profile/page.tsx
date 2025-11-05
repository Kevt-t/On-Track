'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function ProfilePage() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className={styles.profilePage}>
      <header className={styles.header}>
        <h1>Profile</h1>
        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navLink}>
            Dashboard
          </Link>
          <Link href="/" className={styles.navLink}>
            Logout
          </Link>
        </nav>
      </header>

      <div className={styles.container}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>
              {name.charAt(0).toUpperCase()}
            </div>
            <div className={styles.profileInfo}>
              <h2>{name}</h2>
              <p>{email}</p>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="goal">Health Goal:</label>
              <select
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              >
                <option value="">Select a goal</option>
                <option value="physical">Improve Physical Health</option>
                <option value="mental">Enhance Mental Wellness</option>
                <option value="emotional">Emotional Balance</option>
                <option value="spiritual">Spiritual Growth</option>
                <option value="social">Better Social Connections</option>
                <option value="balanced">Overall Balance</option>
              </select>
            </div>

            <button type="submit" className={styles.button}>
              Update Profile
            </button>
          </form>
        </div>

        <div className={styles.balanceMeter}>
          <h3>Your Health Journey</h3>
          <p>Track your progress across all five health dimensions and maintain a balanced lifestyle.</p>
          <p>Visit your <Link href="/dashboard" style={{ color: 'var(--blue)' }}>Dashboard</Link> to view detailed insights and recommendations.</p>
        </div>
      </div>
    </div>
  );
}
