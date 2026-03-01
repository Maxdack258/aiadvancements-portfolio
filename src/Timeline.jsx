import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, MessageSquare, Image as ImageIcon, Video, BrainCircuit, Terminal } from 'lucide-react';

export default function Timeline() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

    const milestones = [
        {
            year: "1950 - 2017",
            title: "The Foundations",
            desc: "From Turing to Deep Learning and 'Attention Is All You Need', forming the roots of Transformers.",
            icon: <Cpu size={32} color="#3b82f6" />
        },
        {
            year: "2021 - 2022",
            title: "Text & Mass Adoption",
            desc: "LLMs become conversational. ChatGPT launches, achieving 100M users rapidly. Text generation hits mainstream.",
            icon: <MessageSquare size={32} color="#8b5cf6" />
        },
        {
            year: "2023",
            title: "Multimodal & Vision",
            desc: "Models start understanding and generating images. Midjourney, DALL-E, and Vision APIs alter the creative landscape.",
            icon: <ImageIcon size={32} color="#a78bfa" />
        },
        {
            year: "2024",
            title: "Action Models",
            desc: "Real-time voice, autonomous tool use, web browsing capabilities, and coding agents executing entire workflows.",
            icon: <Terminal size={32} color="#3b82f6" />
        },
        {
            year: "2025",
            title: "Video Generation",
            desc: "AI masters temporal coherence. Complex physics simulation, dynamic framing, and photorealistic motion generation.",
            icon: <Video size={32} color="#8b5cf6" />
        },
        {
            year: "2026",
            title: "Reasoning & Omnibus",
            desc: "System 2 reasoning chains, agentic swarms collaborating seamlessly, and massive multi-million context windows.",
            icon: <BrainCircuit size={32} color="#a78bfa" />
        }
    ];

    return (
        <section id="timeline" ref={targetRef} className="timeline-section">
            <div className="sticky-timeline">
                <h2 className="section-title">The Story of Intelligence</h2>
                <p className="section-subtitle">A creative mapping of the AI explosion from 2022 to 2026</p>
                <div className="timeline-container">
                    <motion.div style={{ x }} className="timeline-items">
                        {milestones.map((m, idx) => (
                            <div key={idx} className="timeline-card glass-card hover-lift">
                                <div className="timeline-year">{m.year}</div>
                                <div className="timeline-icon" aria-hidden="true">{m.icon}</div>
                                <h3 className="timeline-title">{m.title}</h3>
                                <p className="timeline-desc">{m.desc}</p>
                                {/* Connecting line between cards */}
                                {idx !== milestones.length - 1 && <div className="timeline-connector"></div>}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
