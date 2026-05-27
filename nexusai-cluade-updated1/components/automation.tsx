'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Database, MessageSquare, CreditCard, Cloud, Users, BarChart3, Zap, ArrowRight, type LucideIcon } from 'lucide-react';

interface WorkflowNode {
  id: string;
  label: string;
  icon: LucideIcon;
  x: number;
  y: number;
  color: string;
  isCenter?: boolean;
}
interface Feature { title: string; desc: string; }

const NODES: WorkflowNode[] = [
  { id: 'slack',    label: 'Slack',    icon: MessageSquare, x: 10, y: 15, color: '#00D4FF' },
  { id: 'crm',      label: 'CRM',      icon: Database,      x: 10, y: 50, color: '#6C63FF' },
  { id: 'erp',      label: 'ERP',      icon: Cloud,         x: 10, y: 82, color: '#00D4FF' },
  { id: 'nexus',    label: 'Nexus AI', icon: Zap,           x: 42, y: 50, color: '#00D4FF', isCenter: true },
  { id: 'payroll',  label: 'Payroll',  icon: CreditCard,    x: 74, y: 15, color: '#6C63FF' },
  { id: 'hr',       label: 'HR Suite', icon: Users,         x: 74, y: 50, color: '#00D4FF' },
  { id: 'analytics',label: 'Analytics',icon: BarChart3,     x: 74, y: 82, color: '#6C63FF' },
];

const CONNECTIONS: [string, string][] = [
  ['slack','nexus'], ['crm','nexus'], ['erp','nexus'],
  ['nexus','payroll'], ['nexus','hr'], ['nexus','analytics'],
];

const FEATURES: Feature[] = [
  { title: 'Zero-Touch Automation',    desc: 'Fully automated workflows with AI decision-making and exception handling.'  },
  { title: 'Real-Time Orchestration',  desc: 'Millisecond-level coordination across all integrated enterprise systems.'    },
  { title: 'Intelligent Routing',      desc: 'AI routes tasks to the optimal agent or human based on complexity and context.' },
  { title: 'Compliance-First Design',  desc: 'Every automation step is logged, auditable, and compliant by default.'      },
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
    <section
      id="automation"
      aria-labelledby="automation-heading"
      className="py-20 sm:py-28 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0B1120]" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#6C63FF]/4 blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="tag-pill mb-4 sm:mb-5">Workflow Automation</div>
            <h2
              id="automation-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 sm:mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-space)' }}
            >
              <span className="text-white">AI-Powered</span>
              <br />
              <span className="gradient-text">Enterprise Automation</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
              Connect every system in your enterprise. Nexus AI orchestrates workflows across your entire
              technology stack — from Slack to ERP to payroll — with zero manual intervention.
            </p>

            <ol className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
              {FEATURES.map((f, i) => (
                <motion.li
                  key={f.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 sm:gap-4 items-start"
                >
                  <div
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6C63FF] flex items-center justify-center flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <span className="text-[10px] font-bold text-[#0B1120]">{i + 1}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">{f.title}</div>
                    <div className="text-sm text-slate-500">{f.desc}</div>
                  </div>
                </motion.li>
              ))}
            </ol>

            <a
              href="/automation"
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-semibold text-[#0B1120] rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]"
            >
              Explore Automation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Right — workflow diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="glass rounded-2xl border border-white/[0.08] p-4 sm:p-6 aspect-[4/3] relative overflow-hidden"
              role="img"
              aria-label="Workflow automation diagram showing Nexus AI connecting enterprise systems"
            >
              {/* Titlebar */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="flex gap-1.5" aria-hidden="true">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-slate-500 ml-1 sm:ml-2 font-mono">nexus-workflow.engine</span>
              </div>

              <div className="relative w-full" style={{ height: 'calc(100% - 40px)' }}>
                {/* SVG connections */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {CONNECTIONS.map(([from, to], i) => {
                    const fromNode = NODES.find(n => n.id === from)!;
                    const toNode   = NODES.find(n => n.id === to)!;
                    const isActive = !prefersReduced && activeConn[0] === from && activeConn[1] === to;
                    return (
                      <g key={i}>
                        <line
                          x1={`${fromNode.x + 4}%`} y1={`${fromNode.y}%`}
                          x2={`${toNode.x}%`}        y2={`${toNode.y}%`}
                          stroke={isActive ? '#00D4FF' : 'rgba(255,255,255,0.06)'}
                          strokeWidth={isActive ? '0.4' : '0.2'}
                          strokeDasharray={isActive ? '2 2' : undefined}
                          style={isActive ? { animation: 'dash 0.4s linear infinite' } : undefined}
                        />
                        {isActive && (
                          <circle r="0.8" fill="#00D4FF" opacity="0.9">
                            <animateMotion
                              dur="0.8s"
                              repeatCount="indefinite"
                              path={`M${fromNode.x + 4},${fromNode.y} L${toNode.x},${toNode.y}`}
                            />
                          </circle>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Nodes */}
                {NODES.map(node => {
                  const Icon     = node.icon;
                  const isActive = !prefersReduced && activeConn.includes(node.id);
                  const size     = node.isCenter ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-9 h-9 sm:w-10 sm:h-10';

                  return (
                    <div
                      key={node.id}
                      className={`absolute flex flex-col items-center gap-1 sm:gap-1.5 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
                      style={{ left: `${node.x + 4}%`, top: `${node.y}%` }}
                    >
                      <div
                        className={`relative ${size} rounded-xl flex items-center justify-center`}
                        style={{
                          background:  isActive ? `${node.color}30` : 'rgba(255,255,255,0.05)',
                          border:      `1px solid ${isActive ? node.color + '60' : 'rgba(255,255,255,0.1)'}`,
                          boxShadow:   isActive ? `0 0 20px ${node.color}30` : 'none',
                        }}
                      >
                        <Icon
                          className={node.isCenter ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-3.5 h-3.5 sm:w-4 sm:h-4'}
                          style={{ color: node.color }}
                          aria-hidden="true"
                        />
                      </div>
                      <span className="text-[8px] sm:text-[9px] text-slate-400 whitespace-nowrap font-medium">
                        {node.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -right-2 sm:-right-4 glass rounded-xl px-3 sm:px-4 py-2 sm:py-3 border border-white/10"
              animate={prefersReduced ? {} : { y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              aria-label="1.2 million workflows automated per day"
            >
              <div className="text-xs text-slate-500 mb-0.5">Workflows Automated</div>
              <div className="text-base sm:text-lg font-bold gradient-text">1.2M+ / day</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
