'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSignIn = () => {
    setIsSignUp(false);
  };

  const handleSignUp = () => {
    setIsSignUp(true);
  };

  return (
    <div className={styles.authPage}>
      <div className={`${styles.container} ${isSignUp ? styles.rightPanelActive : ''}`}>
        {/* Sign Up */}
        <div
          className={`${styles.containerForm} ${styles.containerSignup} ${
            isSignUp ? styles.containerSignupActive : ''
          }`}
        >
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <Image
              src="/Designing/On Track Logo.png"
              alt="On Track Logo"
              width={150}
              height={150}
              className={styles.logo}
            />
            <h2 className={styles.formTitle}>Sign Up</h2>
            <input type="text" placeholder="User" className={styles.input} />
            <input type="email" placeholder="Email" className={styles.input} />
            <input type="password" placeholder="Password" className={styles.input} />
            <Link href="/dashboard" className={styles.btn}>
              Sign Up
            </Link>
          </form>
        </div>

        {/* Sign In */}
        <div
          className={`${styles.containerForm} ${styles.containerSignin} ${
            isSignUp ? styles.containerSigninActive : ''
          }`}
        >
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <Image
              src="/Designing/On Track Logo.png"
              alt="On Track Logo"
              width={150}
              height={150}
              className={styles.logo}
            />
            <h2 className={styles.formTitle}>Sign In</h2>
            <input type="email" placeholder="Email" className={styles.input} />
            <input type="password" placeholder="Password" className={styles.input} />
            <a href="#" className={styles.link}>
              Forgot your password?
            </a>
            <Link href="/dashboard" className={styles.btn}>
              Sign In
            </Link>
          </form>
        </div>

        {/* Overlay */}
        <div
          className={`${styles.containerOverlay} ${
            isSignUp ? styles.containerOverlayActive : ''
          }`}
        >
          <div className={`${styles.overlay} ${isSignUp ? styles.overlayActive : ''}`}>
            <div
              className={`${styles.overlayPanel} ${styles.overlayLeft} ${
                isSignUp ? styles.overlayLeftActive : ''
              }`}
            >
              <button className={styles.btn} onClick={handleSignIn}>
                Sign In
              </button>
            </div>
            <div
              className={`${styles.overlayPanel} ${styles.overlayRight} ${
                isSignUp ? styles.overlayRightActive : ''
              }`}
            >
              <button className={styles.btn} onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
