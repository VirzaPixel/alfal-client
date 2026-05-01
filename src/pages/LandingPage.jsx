import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, 
  Home as HomeIcon, 
  Info, 
  X, 
  ArrowRight,
  Music,
  ShieldCheck,
  Zap,
  Pause,
  Play,
  Monitor,
  Smartphone as SmartphoneIcon
} from 'lucide-react'
import { TRACKS } from '../constants'

const BackgroundBubbles = () => {
  return (
    <div className="background-bubbles-wrap" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="bubble"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 50 + 20}px`,
            height: `${Math.random() * 50 + 20}px`,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
            willChange: 'transform, opacity'
          }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ y: '-20vh', opacity: [0, 0.2, 0] }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

export default function LandingPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeModal, setActiveModal] = useState(null)
  const [showSplash, setShowSplash] = useState(true)
  const audioRef = useRef(null)

  const snoozeTrack = TRACKS.find(t => t.title === 'Snooze') || TRACKS[0]

  const startExperience = () => {
    setShowSplash(false)
    if (audioRef.current) {
      audioRef.current.volume = 1.0
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Playback failed:", err))
    }
  }

  // Fungsi toggle play manual untuk tombol
  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (activeModal) return;

    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false))
      } else {
        audioRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  useEffect(() => {
    // Try auto-play immediately (might be blocked)
    if (audioRef.current) {
      audioRef.current.volume = 1.0;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowSplash(false); // If autoplay works, hide splash
        })
        .catch(() => {
          console.log("Autoplay blocked, waiting for interaction");
        });
    }

    // Global listener for first interaction as fallback
    const handleFirstInteraction = () => {
      if (showSplash) {
        startExperience();
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);


  const NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: <HomeIcon size={20} /> },
    { id: 'about', label: 'About', icon: <Info size={20} /> },
    { id: 'download', label: 'Install', icon: <Download size={20} /> },
  ]

  return (
    <div 
      className="zen-experience" 
      style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      <div className="starfield" />
      
      <BackgroundBubbles />

      <AnimatePresence>
        {showSplash && (
          <motion.div 
            className="zen-splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              className="splash-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="splash-logo">
                <Music size={48} color="var(--core-glow)" />
              </div>
              <h1>ALFAL</h1>
              <p>Experience the music.</p>
              <motion.button 
                className="btn-start"
                whileHover={{ scale: 1.05, letterSpacing: '0.2em' }}
                whileTap={{ scale: 0.95 }}
                onClick={startExperience}
              >
                ENTER EXPERIENCE
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio 
        ref={audioRef} 
        src={snoozeTrack.audio} 
        loop
        preload="auto"
      />

      <main className="experience-wrap" style={{ position: 'relative', zIndex: 10 }}>
        
        <motion.div 
          className="track-info-wrap"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2>{snoozeTrack.title}</h2>
          <p>{snoozeTrack.artist}</p>
        </motion.div>

        <motion.div 
          className="alfal-core-v2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          onClick={togglePlay}
        >
          <div className="digital-rings" />
          <img 
            src={snoozeTrack.cover} 
            alt="SZA Snooze"
            className="core-art-full"
            style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
          />
          <div className={`core-overlay ${!isPlaying ? 'is-visible' : ''}`}>
            <motion.div 
              className={`play-pause-btn ${isPlaying ? 'is-playing' : ''}`}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="pp-icon" />
              ) : (
                <Play className="pp-icon play" />
              )}
            </motion.div>
          </div>
        </motion.div>

        <motion.nav 
          className="nav-dock"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Nav Pill removed for a cleaner look */}


          {NAV_ITEMS.map((item) => (
            <div 
              key={item.id}
              className={`nav-item ${activeModal === item.id ? 'active' : ''}`} 
              onClick={() => setActiveModal(item.id)}
            >
              <div className="nav-icon">{item.icon}</div>
              <span className="nav-label">{item.label}</span>
            </div>
          ))}
        </motion.nav>
      </main>

      <AnimatePresence>
        {activeModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={() => setActiveModal(null)}
            style={{ zIndex: 100, willChange: 'opacity' }}
          >
            <motion.div 
              className="modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              style={{ willChange: 'transform, opacity' }}
            >
              <button className="close-modal" onClick={(e) => { e.stopPropagation(); setActiveModal(null); }}>
                <X size={20} />
              </button>

              {activeModal === 'home' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="modal-title">Alfal</h2>
                  <p className="modal-desc" style={{ marginBottom: '2rem' }}>
                    Dengan ada nya <strong>Alfal</strong>, Kita berharap untuk dapat lebih menikmati, menghargai dan memaknai segalanya dengan Musik.
                  </p>
                  <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', opacity: 0.8 }}>
                    <p style={{ fontWeight: 800, letterSpacing: '0.05em' }}>
                      Virza Rizky & Abby Dahlan
                    </p>
                  </div>
                </motion.div>
              )}

              {activeModal === 'about' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="modal-title">About Alfal.</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {[
                      { icon: <Music color="#6366f1" size={24} />, title: "Music Listening", desc: "Experience studio-grade lossless audio that brings you closer to the original sound." },
                      { icon: <ShieldCheck color="#10b981" size={24} />, title: "Zero Ads", desc: "Pure focus on the rhythm with zero interruptions. Your music, your time." },
                      { icon: <Zap color="#f59e0b" size={24} />, title: "Easy Access", desc: "Instantly find and play your favorite tracks with our lightning-fast interface." }
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '15px' }}>{item.icon}</div>
                        <div>
                          <p style={{ fontWeight: 800 }}>{item.title}</p>
                          <p style={{ fontSize: '0.85rem', opacity: 0.5 }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeModal === 'download' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
                  <h2 className="modal-title" style={{ marginBottom: '2.5rem' }}>Get Alfal Now.</h2>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <motion.a 
                      href="https://github.com/VirzaPixel/Alfal-Streaming-Music-Application/releases/latest/download/Alfal-Application.apk" 
                      className="btn-download-hero" 
                      onClick={(e) => e.stopPropagation()}
                      style={{ 
                        textDecoration: 'none', 
                        background: '#ffffff', 
                        color: '#000000',
                        padding: '1.2rem 2rem',
                        borderRadius: '20px',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        justifyContent: 'center',
                        boxShadow: '0 10px 30px rgba(255,255,255,0.1)'
                      }}
                      whileHover={{ scale: 1.02, backgroundColor: '#f0f0f0' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <SmartphoneIcon size={22} /> Download for Mobile
                    </motion.a>

                    <motion.a 
                      href="/alfal-desktop-installer.exe" 
                      className="btn-download-hero" 
                      onClick={(e) => e.stopPropagation()}
                      style={{ 
                        textDecoration: 'none', 
                        background: 'rgba(255,255,255,0.05)', 
                        color: '#ffffff',
                        padding: '1.2rem 2rem',
                        borderRadius: '20px',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        justifyContent: 'center',
                        border: '1px solid var(--glass-border)'
                      }}
                      whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.1)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Monitor size={22} /> Download for Desktop
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
