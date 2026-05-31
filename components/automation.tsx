'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Database, MessageSquare, CreditCard, Cloud, Users, BarChart3, Zap, ArrowRight, type LucideIcon } from 'lucide-react';
import {
  MarketingSection,
  SectionContainer,
  SectionGridBg,
  SectionBlurOrbs,
  PrimaryLink,
} from '@/components/marketing';
import { ACCENT_HEX, accentFromIndex, fadeInLeft, fadeInRight, getAccentStyles, marketing } from '@/lib/theme';

interface WorkflowNode {
  id: string;
  label: string;
  icon: LucideIcon;
  x: number;
  y: number;
  accent: 'healthcare' | 'agriculture';
  isCenter?: boolean;
}

interface Feature { title: string; desc: string; }

const NODES: WorkflowNode[] = [
  { id: 'slack',     label: 'Slack',     icon: MessageSquare, x: 10, y: 15, accent: 'healthcare' },
  { id: 'crm',       label: 'CRM',       icon: Database,      x: 10, y: 50, accent: 'agriculture' },
  { id: 'erp',       label: 'ERP',       icon: Cloud,         x: 10, y: 82, accent: 'healthcare' },
  { id: 'nexus',     label: 'Nexus AI',  icon: Zap,           x: 42, y: 50, accent: 'healthcare', isCenter: true },
  { id: 'payroll',   label: 'Payroll',   icon: CreditCard,    x: 74, y: 15, accent: 'agriculture' },
  { id: 'hr',        label: 'HR Suite',  icon: Users,         x: 74, y: 50, accent: 'healthcare' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3,     x: 74, y: 82, accent: 'agriculture' },
];

const CONNECTIONS: [string, string][] = [
  ['slack','nexus'], ['crm','nexus'], ['erp','nexus'],
  ['nexus','payroll'], ['nexus','hr'], ['nexus','analytics'],
];

const FEATURES: Feature[] = [
  { title: 'Zero-Touch Automation',    desc: 'Fully automated workflows with AI decision-making and exception handling.' },
  { title: 'Real-Time Orchestration',  desc: 'Millisecond-level coordination across all integrated enterprise systems.' },
  { title: 'Intelligent Routing',      desc: 'AI routes tasks to the optimal agent or human based on complexity and context.' },
  { title: 'Compliance-First Design',  desc: 'Every automation step is logged, auditable, and compliant by default.' },
];

export default function Automation() {
  const [tick, setTick]    = useState(0);
  const prefersReduced     = useReducedMotion();
  const activeConn         = CONNECTIONS[tick % CONNECTIONS.length];

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(id);
  }, [prefersReduced]);

  return (
    <MarketingSection id="automation" ariaLabelledBy="automation-heading" bg="white">
      <SectionGridBg opacity={40} />
      <SectionBlurOrbs orbs={[{ className: 'top-0 right-0 w-[600px] h-[600px] rounded-full bg-emerald-100/40 blur-[120px]' }]} />

      <SectionContainer>
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <motion.div {...fadeInLeft}>
            <div className="tag-pill mb-4 sm:mb-5">Workflow Automation</div>
            <h2 id="automation-heading" className={marketing.heading} style={marketing.fontSpace}>
              <span className="text-slate-900">AI-Powered</span>
              <br />
              <span className="gradient-text">Enterprise Automation</span>
            </h2>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
              Connect every system in your enterprise. Nexus AI orchestrates workflows across your entire
              technology stack — from Slack to ERP to payroll — with zero manual intervention.
            </p>

            <ol className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
              {FEATURES.map((f, i) => {
                const accent = accentFromIndex(i);
                const styles = getAccentStyles(accent);
                return (
                  <motion.li
                    key={f.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-3 sm:gap-4 items-start"
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border ${styles.icon}`} aria-hidden="true">
                      <span className={`text-[10px] font-bold ${styles.text}`}>{i + 1}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 mb-1">{f.title}</div>
                      <div className="text-sm text-slate-600">{f.desc}</div>
                    </div>
                  </motion.li>
                );
              })}
            </ol>

            <PrimaryLink href="/automation" size="sm" className="group">
              Explore Automation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </PrimaryLink>
          </motion.div>

          <motion.div {...fadeInRight} className="relative">
            <div className={`${marketing.cardStatic} p-4 sm:p-6 aspect-[4/3] overflow-hidden`} role="img" aria-label="Workflow automation diagram showing Nexus AI connecting enterprise systems">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="flex gap-1.5" aria-hidden="true">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-slate-500 ml-1 sm:ml-2 font-mono">nexus-workflow.engine</span>
              </div>

              <div className="relative w-full" style={{ height: 'calc(100% - 40px)' }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {CONNECTIONS.map(([from, to], i) => {
                    const fromNode = NODES.find(n => n.id === from)!;
                    const toNode   = NODES.find(n => n.id === to)!;
                    const isActive = !prefersReduced && activeConn[0] === from && activeConn[1] === to;
                    return (
                      <g key={i}>
                        <line
                          x1={`${fromNode.x + 4}%`} y1={`${fromNode.y}%`}
                          x2={`${toNode.x}%`}        y2={`${toNode.y}%`}
                          stroke={isActive ? ACCENT_HEX.primary : 'rgba(148,163,184,0.35)'}
                          strokeWidth={isActive ? '0.4' : '0.2'}
                          strokeDasharray={isActive ? '2 2' : undefined}
                          style={isActive ? { animation: 'dash 0.4s linear infinite' } : undefined}
                        />
                        {isActive && (
                          <circle r="0.8" fill={ACCENT_HEX.primary} opacity="0.9">
                            <animateMotion dur="0.8s" repeatCount="indefinite" path={`M${fromNode.x + 4},${fromNode.y} L${toNode.x},${toNode.y}`} />
                          </circle>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {NODES.map(node => {
                  const Icon     = node.icon;
                  const isActive = !prefersReduced && activeConn.includes(node.id);
                  const styles   = getAccentStyles(node.isCenter ? 'healthcare' : node.accent);
                  const size     = node.isCenter ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-9 h-9 sm:w-10 sm:h-10';
                  const hex      = node.isCenter ? ACCENT_HEX.primary : styles.hex;

                  return (
                    <div
                      key={node.id}
                      className={`absolute flex flex-col items-center gap-1 sm:gap-1.5 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
                      style={{ left: `${node.x + 4}%`, top: `${node.y}%` }}
                    >
                      <div
                        className={`relative ${size} rounded-xl flex items-center justify-center border ${isActive ? 'border-teal-300 bg-teal-50' : 'border-slate-200 bg-slate-50'}`}
                        style={{ boxShadow: isActive ? '0 0 20px rgba(13,148,136,0.15)' : 'none' }}
                      >
                        <Icon className={node.isCenter ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-3.5 h-3.5 sm:w-4 sm:h-4'} style={{ color: hex }} aria-hidden="true" />
                      </div>
                      <span className="text-[8px] sm:text-[9px] text-slate-500 whitespace-nowrap font-medium">{node.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <motion.div
              className={`absolute -bottom-4 -right-2 sm:-right-4 ${marketing.cardSm} px-3 sm:px-4 py-2 sm:py-3 shadow-sm`}
              animate={prefersReduced ? {} : { y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              aria-label="1.2 million workflows automated per day"
            >
              <div className="text-xs text-slate-500 mb-0.5">Workflows Automated</div>
              <div className="text-base sm:text-lg font-bold gradient-text">1.2M+ / day</div>
            </motion.div>
          </motion.div>
        </div>
      </SectionContainer>
    </MarketingSection>
  );
}
