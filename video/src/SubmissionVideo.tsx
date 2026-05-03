import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

const COLORS = {
  bg: '#0b1020',
  panel: '#141b34',
  text: '#f8fafc',
  muted: '#93a4bf',
  accent: '#60a5fa',
  accent2: '#34d399',
};

const Slide: React.FC<{title: string; subtitle?: string; bullets?: string[]; footer?: string}> = ({title, subtitle, bullets = [], footer}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const opacity = interpolate(frame, [0, fps * 0.5], [0, 1], {extrapolateRight: 'clamp'});
  const y = interpolate(frame, [0, fps * 0.6], [30, 0], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 20% 10%, #1f2a52 0%, ${COLORS.bg} 45%)`,
        color: COLORS.text,
        padding: '100px 120px',
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system',
      }}
    >
      <div style={{opacity, transform: `translateY(${y}px)`, display: 'flex', flexDirection: 'column', height: '100%'}}>
        <div style={{fontSize: 24, color: COLORS.accent2, fontWeight: 600, letterSpacing: 1.2}}>AidAtlas AI</div>
        <h1 style={{fontSize: 68, margin: '14px 0 16px', lineHeight: 1.05}}>{title}</h1>
        {subtitle ? <p style={{fontSize: 34, lineHeight: 1.25, color: COLORS.muted, margin: 0}}>{subtitle}</p> : null}
        {bullets.length > 0 ? (
          <ul style={{marginTop: 34, fontSize: 32, lineHeight: 1.4, paddingLeft: 36}}>
            {bullets.map((bullet) => (
              <li key={bullet} style={{marginBottom: 16}}>{bullet}</li>
            ))}
          </ul>
        ) : null}
        <div style={{marginTop: 'auto', fontSize: 22, color: COLORS.accent}}>{footer ?? 'Quantum Sprint Submission · Social Good'}</div>
      </div>
    </AbsoluteFill>
  );
};

export const SubmissionVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={180}>
        <Slide
          title="AidAtlas AI"
          subtitle="Your personalized social-support navigator"
          bullets={[
            'Guides people to urgent services faster',
            'Turns complex needs into a clear action plan',
          ]}
        />
      </Sequence>

      <Sequence from={180} durationInFrames={210}>
        <Slide
          title="The Problem"
          bullets={[
            'People in crisis struggle to find the right resources',
            'Information is fragmented and hard to prioritize',
            'Delays can make vulnerable situations worse',
          ]}
        />
      </Sequence>

      <Sequence from={390} durationInFrames={210}>
        <Slide
          title="Our Solution"
          bullets={[
            'Simple intake captures goals and constraints',
            'AI creates tailored recommendations and next steps',
            'Dashboard tracks progress and required documents',
          ]}
        />
      </Sequence>

      <Sequence from={600} durationInFrames={210}>
        <Slide
          title="How It Works"
          bullets={[
            'Next.js app with structured analyze API route',
            'NVIDIA NIM integration for intelligent planning',
            'Reliable deterministic fallback when offline/no key',
          ]}
        />
      </Sequence>

      <Sequence from={810} durationInFrames={210}>
        <Slide
          title="Why It Matters"
          bullets={[
            'Reduces decision fatigue under stress',
            'Improves access to social-good services',
            'Designed for practical, immediate action',
          ]}
        />
      </Sequence>

      <Sequence from={1020} durationInFrames={180}>
        <Slide
          title="Submission Demo Ready"
          subtitle="Video prepared without audio track. Send your voiceover file next, and I’ll merge it."
          footer="AidAtlas AI · Ready for final export"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
