import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer-simple">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">ALFAL</div>
            <p className="footer-desc">
              The ultimate music experience for Android. Simple, pure, and refined.
            </p>
          </div>

          <div className="footer-col">
            <h4>Application</h4>
            <ul>
              <li><a href="/alfal-latest.apk">Download APK</a></li>
              <li><a href="#about">About Alfal</a></li>
              <li><a href="/">Installation Guide</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="/">Terms of Service</a></li>
              <li><a href="/">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="/">Instagram</a></li>
              <li><a href="/">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 ALFAL Music Engine. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
