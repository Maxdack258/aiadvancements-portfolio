import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ExternalLink, BrainCircuit } from 'lucide-react';

// Lazy load complex components to optimize initial bundle size
const Timeline = lazy(() => import('./Timeline'));
const HeroVisual = lazy(() => import('./HeroVisual'));

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Throttled scroll listener
    let scrollTimeout;
    const handleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        setScrolled(window.scrollY > 50);
        scrollTimeout = null;
      }, 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Memoize chart logic so it doesn't recalculate on every react cycle
  const { chartData, chartOptions } = useMemo(() => {
    // Using simple rgba arrays directly to avoid canvas dependence on render context memory when not needed
    const data = {
      labels: ['Gemini 3.1 Pro', 'Claude Opus 4.6', 'Claude Sonnet 4.6', 'GPT-5.2 (xhigh)'],
      datasets: [
        {
          label: 'Intelligence Index Score (2026)',
          data: [57, 53, 51, 52],
          backgroundColor: [
            'rgba(59, 130, 246, 0.6)',
            'rgba(139, 92, 246, 0.6)',
            'rgba(167, 139, 250, 0.6)',
            'rgba(255, 255, 255, 0.2)'
          ],
          borderColor: ['#3b82f6', '#8b5cf6', '#a78bfa', '#ffffff'],
          borderWidth: 1,
          borderRadius: 8,
        }
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#94a3b8', font: { family: "'Inter', sans-serif" } } },
        tooltip: {
          backgroundColor: 'rgba(5, 5, 16, 0.9)',
          titleFont: { family: "'Outfit', sans-serif", size: 16 },
          bodyFont: { family: "'Inter', sans-serif", size: 14 },
          padding: 12,
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1
        }
      },
      scales: {
        y: { max: 65, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
        x: { grid: { display: false }, ticks: { color: '#e2e8f0', font: { family: "'Outfit', sans-serif", weight: 600 } } }
      },
      animation: { duration: 2000, easing: 'easeOutQuart' }
    };

    return { chartData: data, chartOptions: options };
  }, []);

  return (
    <>
      <div className="glow-bg glow-1"></div>
      <div className="glow-bg glow-2"></div>

      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Replacing text with custom robot logo */}
          <img src="/robot-logo.svg" alt="Robot Logo" style={{ width: '30px', height: '30px', transform: 'translateY(-2px)' }} />
          AI Story
        </div>
        <div className="nav-links">
          <button onClick={() => scrollTo('hero')}>Home</button>
          <button onClick={() => scrollTo('timeline')}>Story</button>
          <button onClick={() => scrollTo('stats')}>Advancements</button>
          <button onClick={() => scrollTo('vision')}>Vision</button>
        </div>
      </nav>

      <section id="hero" className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="badge">The Frontier of 2026</div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Intelligence Redefined
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Welcome to my portfolio. Exploring state-of-the-art AI models, their capabilities, and the visionaries shaping our future.
          </motion.p>
          <motion.div
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button onClick={() => scrollTo('timeline')} className="btn primary-btn">
              <BrainCircuit size={18} /> AI Story
            </button>
            <a href="https://github.com/Maxdack258" target="_blank" rel="noreferrer" className="btn secondary-btn">
              GitHub <ExternalLink size={18} />
            </a>
          </motion.div>
        </motion.div>

        <div className="hero-visual">
          <Suspense fallback={<div style={{ color: '#fff', opacity: 0.5 }}>Loading Visual...</div>}>
            <HeroVisual />
          </Suspense>
        </div>
      </section>

      <Suspense fallback={<div style={{ padding: '5rem', textAlign: 'center' }}>Loading Timeline...</div>}>
        <Timeline />
      </Suspense>

      <section id="stats" className="stats-section">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Model Capabilities</h2>
          <p className="section-subtitle">Real benchmark data from ArtificialAnalysis 2026</p>

          <div className="glass-card chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>

          <div className="stats-grid mt-4">
            {[
              { title: "Gemini 3.1 Pro", value: "57", tag: "Google", highlight: true },
              { title: "Claude Opus 4.6", value: "53", tag: "Anthropic", highlight: false },
              { title: "Claude Sonnet 4.6", value: "51", tag: "Anthropic", highlight: false }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="glass-card stat-card"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.5, duration: 0.5 }}
              >
                <h3>{stat.title}</h3>
                <div className={`stat-value ${stat.highlight ? 'highlight' : ''}`}>{stat.value}</div>
                <p>Intelligence Index Score</p>
                <div className="tag">{stat.tag}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="vision" className="quotes-section">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Visionaries</h2>
          <p className="section-subtitle">Perspectives on the AI revolution</p>

          <div className="quotes-grid">
            {[
              {
                text: "AI is probably the most important thing humanity has ever worked on. I think of it as something more profound than electricity or fire.",
                name: "Sundar Pichai",
                title: "CEO, Google",
                i: "SP"
              },
              {
                text: "The pace of progress in artificial intelligence is incredibly fast. Unless you have direct exposure to groups like Deepmind, you have no idea how fast.",
                name: "Elon Musk",
                title: "CEO, Tesla & SpaceX",
                i: "EM"
              },
              {
                text: "What all of us have to do is to make sure we are using AI in a way that is for the benefit of humanity, not to the detriment of humanity.",
                name: "Tim Cook",
                title: "CEO, Apple",
                i: "TC"
              }
            ].map((quote, idx) => (
              <motion.div
                key={idx}
                className="glass-card quote-card"
                whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0,0,0,0.5)", borderColor: "rgba(255,255,255,0.15)" }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
              >
                <div className="quote-icon" aria-hidden="true">"</div>
                <p className="quote-text">{quote.text}</p>
                <div className="quote-author">
                  <div className="quote-avatar" aria-hidden="true">{quote.i}</div>
                  <div>
                    <span className="name">{quote.name}</span>
                    <span className="title">{quote.title}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <footer>
        <div className="footer-content glass-card">
          <p>&copy; 2026 AI Portfolio. Built with React & Framer Motion.</p>
        </div>
      </footer>
    </>
  );
}
