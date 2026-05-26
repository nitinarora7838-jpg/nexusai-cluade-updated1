export interface ProductStat {
  value: string;
  label: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ProductUseCase {
  title: string;
  description: string;
  outcome: string;
}

export interface ProductStep {
  step: string;
  title: string;
  description: string;
}

export interface ProductData {
  slug: string;
  name: string;
  tag: string;
  tagline: string;
  description: string;
  heroDescription: string;
  color: string;
  accentColor: string;
  stats: ProductStat[];
  features: ProductFeature[];
  useCases: ProductUseCase[];
  steps: ProductStep[];
  industries: string[];
  ctaHeadline: string;
  ctaSubtext: string;
}

export const PRODUCTS_DATA: ProductData[] = [
  {
    slug: 'ai-payroll-intelligence',
    name: 'AI Payroll Intelligence',
    tag: 'Payroll',
    tagline: 'Zero-Error Payroll. Infinite Scale.',
    description: 'End-to-end payroll automation with AI compliance checks, anomaly detection, and real-time reporting.',
    heroDescription:
      'Stop losing hours to manual payroll runs, missed tax deadlines, and compliance headaches. Nexus AI Payroll Intelligence automates every step — from salary calculations and tax filings to multi-jurisdiction compliance — so your HR team focuses on people, not spreadsheets.',
    color: '#00D4FF',
    accentColor: '#6C63FF',
    stats: [
      { value: '99.8%', label: 'Payroll Accuracy' },
      { value: '70%', label: 'Time Saved on Processing' },
      { value: '150+', label: 'Tax Jurisdictions Covered' },
      { value: '$0', label: 'Compliance Penalties' },
    ],
    features: [
      {
        icon: 'Calculator',
        title: 'Automated Tax Calculations',
        description:
          'AI computes federal, state, and local taxes in real time across every employee type — full-time, part-time, contractor, and international. Say goodbye to manual tax tables and version control nightmares.',
      },
      {
        icon: 'Shield',
        title: 'Proactive Compliance Engine',
        description:
          'Continuously monitors changing labor laws, tax codes, and statutory requirements across 150+ jurisdictions. Flags risks before they become violations — keeping you audit-ready 365 days a year.',
      },
      {
        icon: 'AlertTriangle',
        title: 'Anomaly Detection & Fraud Prevention',
        description:
          'Proprietary AI model scans every payroll run for duplicate entries, ghost employees, unusual deductions, and data inconsistencies — catching errors humans miss before money leaves the account.',
      },
      {
        icon: 'Globe',
        title: 'Multi-Jurisdiction & Global Payroll',
        description:
          'Process payroll across US states, Canadian provinces, and 40+ international markets from a single platform. Handles currency conversion, local statutory benefits, and country-specific reporting seamlessly.',
      },
      {
        icon: 'BarChart2',
        title: 'Real-Time Payroll Reporting',
        description:
          'Executive dashboards, cost-center breakdowns, and trend analysis delivered instantly. Export to ERP systems like SAP, Oracle, and QuickBooks with one click.',
      },
      {
        icon: 'Users',
        title: 'Employee Self-Service Portal',
        description:
          'Employees access pay stubs, tax documents, and benefits summaries 24/7. Reduce HR ticket volume by up to 60% with AI-powered answers to payroll FAQs.',
      },
    ],
    useCases: [
      {
        title: 'Multi-State Enterprise Payroll',
        description:
          'A 2,000-employee retailer operating in 28 states processes payroll for hourly, salaried, and commission-based staff — all in one automated run.',
        outcome: '65% reduction in payroll processing time',
      },
      {
        title: 'Contractor & Gig Workforce Management',
        description:
          'Tech company managing 500+ contractors across 12 countries automates 1099/W-8BEN filings, milestone-based payments, and currency conversions.',
        outcome: '80% fewer compliance errors',
      },
      {
        title: 'Acquisition Payroll Integration',
        description:
          'Post-merger HR team integrates two separate payroll systems and employee databases into a unified platform within 72 hours.',
        outcome: 'Zero disruption to employee pay cycles',
      },
      {
        title: 'Compliance Audit Preparation',
        description:
          'Legal and HR teams generate full audit trails, tax reconciliation reports, and statutory filings for a Department of Labor review.',
        outcome: 'Passed audit with zero findings',
      },
    ],
    steps: [
      { step: '01', title: 'Connect Your Systems', description: 'Integrate with your existing HRIS (Workday, ADP, BambooHR) and ERP in under 2 hours via pre-built connectors.' },
      { step: '02', title: 'Configure AI Rules', description: 'Set compensation structures, deduction policies, and jurisdiction rules. AI learns your organization\'s payroll patterns.' },
      { step: '03', title: 'AI Processes & Validates', description: 'AI runs calculations, cross-checks compliance, and flags anomalies — all before a single cent is moved.' },
      { step: '04', title: 'Review & Approve', description: 'Your payroll manager reviews a clean summary dashboard. Approve with one click or drill into any exception.' },
      { step: '05', title: 'Auto-File & Archive', description: 'Tax filings, statutory deposits, and payroll records are automatically submitted and archived for compliance.' },
    ],
    industries: ['Retail & E-Commerce', 'Financial Services', 'Healthcare', 'Technology', 'Manufacturing', 'Professional Services'],
    ctaHeadline: 'Ready to Run Payroll on Autopilot?',
    ctaSubtext: 'Get a personalized demo and see how AI Payroll Intelligence eliminates errors and compliance risk for your organization.',
  },
  {
    slug: 'ai-pmo-copilot',
    name: 'AI PMO Copilot',
    tag: 'PMO',
    tagline: 'Your AI Project Office. Always On.',
    description: 'AI-powered project management intelligence that tracks milestones, predicts risks, and optimizes resources.',
    heroDescription:
      'Most projects fail not because of bad strategy, but because of invisible risks and delayed decisions. Nexus AI PMO Copilot gives your project office a real-time intelligence layer — predicting delays 3 weeks before they happen, optimizing resource allocation automatically, and keeping every stakeholder aligned without endless status meetings.',
    color: '#6C63FF',
    accentColor: '#00D4FF',
    stats: [
      { value: '40%', label: 'Faster Project Delivery' },
      { value: '60%', label: 'Risk Reduction' },
      { value: '10x', label: 'Portfolio Visibility' },
      { value: '85%', label: 'Stakeholder Satisfaction' },
    ],
    features: [
      {
        icon: 'AlertOctagon',
        title: 'Predictive Risk Intelligence',
        description:
          'AI analyzes historical project data, team velocity, dependency chains, and external signals to predict scope creep, budget overruns, and timeline slippage — up to 3 weeks before they occur.',
      },
      {
        icon: 'Users',
        title: 'Smart Resource Optimization',
        description:
          'Automatically balances workloads across teams based on skill sets, availability, and project priority. Reduces burnout by 45% while maximizing utilization of your most critical talent.',
      },
      {
        icon: 'PieChart',
        title: 'Portfolio Analytics & Governance',
        description:
          'Executive-grade portfolio dashboard showing RAG status, budget health, strategic alignment scores, and capacity forecasts across every active initiative — in real time.',
      },
      {
        icon: 'FileText',
        title: 'Automated Status Reporting',
        description:
          'AI generates board-ready status reports, executive summaries, and stakeholder updates in seconds. Pulls live data from Jira, Azure DevOps, Asana, and 50+ PM tools.',
      },
      {
        icon: 'Target',
        title: 'Milestone & Dependency Tracking',
        description:
          'Visual dependency mapping with AI-powered critical path analysis. Get instant alerts when upstream delays threaten downstream milestones across interconnected projects.',
      },
      {
        icon: 'DollarSign',
        title: 'Budget Intelligence',
        description:
          'Real-time burn rate tracking, EAC (Estimate at Completion) forecasting, and variance analysis. AI flags budget anomalies and recommends corrective actions before overspend occurs.',
      },
    ],
    useCases: [
      {
        title: 'Enterprise Digital Transformation',
        description:
          'A global bank managing 120 concurrent digital initiatives uses AI PMO Copilot to track interdependencies, reallocate resources dynamically, and report to the board weekly.',
        outcome: '35% improvement in on-time delivery',
      },
      {
        title: 'Agile at Scale',
        description:
          'A 500-person engineering org syncs sprint data from Jira to get cross-team velocity analytics, PI planning forecasts, and impediment escalation — all automated.',
        outcome: '50% fewer escalations to leadership',
      },
      {
        title: 'M&A Integration Management',
        description:
          'Post-acquisition integration PMO tracks 200+ workstreams across legal, IT, HR, and operations — getting real-time red flags and automated stakeholder comms.',
        outcome: 'Integration completed 6 weeks ahead of schedule',
      },
      {
        title: 'Infrastructure Programme Delivery',
        description:
          'Construction PMO monitors 40 concurrent infrastructure projects for schedule, cost, and compliance — with automated contractor performance scoring.',
        outcome: '28% reduction in cost overruns',
      },
    ],
    steps: [
      { step: '01', title: 'Connect Your PM Tools', description: 'Sync Jira, MS Project, Asana, Smartsheet, or any PM tool via API. Data flows in within minutes.' },
      { step: '02', title: 'AI Learns Your Portfolio', description: 'AI maps your project taxonomy, risk appetite, and success metrics to create a tailored intelligence baseline.' },
      { step: '03', title: 'Real-Time Monitoring Begins', description: 'Continuous analysis of milestones, resources, budgets, and risks with proactive alerts and recommendations.' },
      { step: '04', title: 'Stakeholders Stay Aligned', description: 'Automated reports, dashboards, and smart notifications keep every stakeholder informed without manual effort.' },
      { step: '05', title: 'Continuous Improvement', description: 'AI learns from completed projects to improve future forecasts and risk models for your organization.' },
    ],
    industries: ['Financial Services', 'Technology', 'Construction', 'Government', 'Healthcare', 'Consulting'],
    ctaHeadline: 'Stop Projects from Going Off the Rails.',
    ctaSubtext: 'See AI PMO Copilot predict your next project risk — before it becomes a crisis. Book a live demo.',
  },
  {
    slug: 'ai-workflow-engine',
    name: 'AI Workflow Engine',
    tag: 'Automation',
    tagline: 'Orchestrate Every Business Process. Intelligently.',
    description: 'Orchestrate complex business workflows with intelligent routing, conditional logic, and AI decision engines.',
    heroDescription:
      'Every enterprise runs on workflows — approvals, handoffs, escalations, data routing. But most of them still depend on email chains, manual steps, and human memory. Nexus AI Workflow Engine replaces fragile manual processes with intelligent, self-optimizing automation that adapts in real time, integrates with 500+ enterprise tools, and scales to millions of workflow executions without breaking.',
    color: '#00D4FF',
    accentColor: '#6C63FF',
    stats: [
      { value: '10x', label: 'Faster Process Execution' },
      { value: '80%', label: 'Manual Tasks Eliminated' },
      { value: '500+', label: 'Native Integrations' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
    features: [
      {
        icon: 'Layout',
        title: 'Visual Drag-Drop Builder',
        description:
          'Build enterprise-grade workflows visually — no code required. Drag triggers, actions, conditions, and AI nodes onto a canvas. What used to take developers weeks now takes business teams hours.',
      },
      {
        icon: 'Brain',
        title: 'AI Decision Nodes',
        description:
          'Embed AI intelligence directly into your workflows. Route approvals based on sentiment, classify documents automatically, predict outcomes, and make context-aware decisions at every step.',
      },
      {
        icon: 'Zap',
        title: '500+ Native Integrations',
        description:
          'Connect Salesforce, SAP, Workday, ServiceNow, Slack, Microsoft 365, and 500+ more enterprise tools. Bi-directional data sync ensures every system stays in perfect harmony.',
      },
      {
        icon: 'Activity',
        title: 'Real-Time Monitoring & Alerting',
        description:
          'Live execution dashboard shows every workflow in flight. Get instant alerts on bottlenecks, failures, and SLA breaches. AI root-cause analysis tells you exactly what broke and why.',
      },
      {
        icon: 'GitBranch',
        title: 'Conditional Logic & Dynamic Routing',
        description:
          'Build sophisticated if-then-else logic, multi-level approvals, parallel branches, and time-based triggers. Workflows that adapt to data in real time — not just follow a rigid script.',
      },
      {
        icon: 'Lock',
        title: 'Enterprise Security & Governance',
        description:
          'Role-based access controls, full audit trails, SOC 2 Type II compliance, and end-to-end encryption. Every workflow execution is logged and versioned for complete accountability.',
      },
    ],
    useCases: [
      {
        title: 'Purchase Order Approval Automation',
        description:
          'Finance teams automate multi-level PO approvals across business units — with AI routing based on amount, vendor risk score, and budget availability.',
        outcome: '90% reduction in approval cycle time',
      },
      {
        title: 'HR Employee Onboarding',
        description:
          'Orchestrate IT provisioning, benefits enrollment, training assignment, and document signing across 12 systems — all triggered by a single HRIS event.',
        outcome: 'New hires fully operational on Day 1',
      },
      {
        title: 'Customer Onboarding & KYC',
        description:
          'Financial institutions automate KYC document collection, AI-powered identity verification, risk scoring, and account provisioning — all in one seamless workflow.',
        outcome: '75% faster customer onboarding',
      },
      {
        title: 'IT Service Management',
        description:
          'IT teams automate ticket routing, escalation, vendor notifications, SLA tracking, and resolution verification — fully integrated with ServiceNow and Jira.',
        outcome: '60% improvement in MTTR',
      },
    ],
    steps: [
      { step: '01', title: 'Map Your Process', description: 'Upload existing SOPs or build from scratch using our visual canvas. AI suggests optimizations based on best practices.' },
      { step: '02', title: 'Connect Your Tools', description: 'Link your existing systems via 500+ pre-built connectors or our universal REST/GraphQL API framework.' },
      { step: '03', title: 'Add AI Intelligence', description: 'Drop AI decision nodes into your workflow to add classification, prediction, and autonomous decision-making.' },
      { step: '04', title: 'Test & Deploy', description: 'Simulate workflow execution in sandbox, validate with real data, and deploy to production with zero downtime.' },
      { step: '05', title: 'Monitor & Optimize', description: 'AI continuously analyzes execution patterns and recommends optimizations to improve speed and reliability.' },
    ],
    industries: ['Financial Services', 'Healthcare', 'Manufacturing', 'Retail', 'Technology', 'Government'],
    ctaHeadline: 'Your Processes Deserve Better Than Email Chains.',
    ctaSubtext: 'See how AI Workflow Engine automates your most critical business processes in a live 30-minute demo.',
  },
  {
    slug: 'ai-analytics-dashboard',
    name: 'AI Analytics Dashboard',
    tag: 'Analytics',
    tagline: 'From Raw Data to Boardroom Decisions. Instantly.',
    description: 'Transform raw data into actionable intelligence with predictive analytics and AI-generated insights.',
    heroDescription:
      'Your business generates thousands of data signals every minute — but most organizations are still looking at last month\'s numbers. Nexus AI Analytics Dashboard connects every data source, applies predictive intelligence, and surfaces the insights that actually move the needle — before your competitors even see the problem.',
    color: '#6C63FF',
    accentColor: '#00D4FF',
    stats: [
      { value: '5x', label: 'Faster Decision Making' },
      { value: '200+', label: 'Data Sources Connected' },
      { value: '90%', label: 'Less Manual Reporting' },
      { value: '<1s', label: 'Query Response Time' },
    ],
    features: [
      {
        icon: 'TrendingUp',
        title: 'Predictive Analytics Engine',
        description:
          'AI models trained on your historical data forecast revenue, churn, demand, and operational KPIs with confidence intervals. Know what\'s coming — not just what happened.',
      },
      {
        icon: 'MessageSquare',
        title: 'Natural Language Queries',
        description:
          'Ask your data questions in plain English: "What were our top 5 revenue drivers last quarter?" — and get instant answers with supporting charts. No SQL. No data team dependency.',
      },
      {
        icon: 'Sliders',
        title: 'Custom KPI Tracking',
        description:
          'Define any metric that matters to your business. From ARR and NRR to defect rates and NPS — build your single source of truth with flexible, formula-based KPI builders.',
      },
      {
        icon: 'FileText',
        title: 'AI-Generated Executive Summaries',
        description:
          'Every dashboard generates a plain-English narrative highlighting top wins, anomalies, and recommended actions. Your weekly business review writes itself.',
      },
      {
        icon: 'Bell',
        title: 'Intelligent Anomaly Alerts',
        description:
          'AI learns your normal patterns and fires precise alerts when something deviates — revenue drops, traffic spikes, quality issues — before they cascade into bigger problems.',
      },
      {
        icon: 'Database',
        title: '200+ Data Connectors',
        description:
          'Native connectors for Salesforce, HubSpot, Google Analytics, Snowflake, BigQuery, SAP, and 200+ more. Full historical data import and real-time streaming supported.',
      },
    ],
    useCases: [
      {
        title: 'C-Suite Performance Dashboard',
        description:
          'CEO and CFO get a single live view of revenue, pipeline, headcount cost, and operational efficiency — with AI narrative summaries refreshed daily.',
        outcome: '80% reduction in time spent preparing board reports',
      },
      {
        title: 'Sales Forecasting & Pipeline Intelligence',
        description:
          'Sales leaders get AI-powered revenue forecasts, deal risk scores, and rep performance benchmarking — updated in real time from CRM data.',
        outcome: 'Forecast accuracy improved from 65% to 94%',
      },
      {
        title: 'Supply Chain Risk Monitoring',
        description:
          'Operations teams monitor supplier performance, inventory levels, and demand signals across 50+ data feeds — with AI alerts on supply disruption risks.',
        outcome: '45% reduction in stockout events',
      },
      {
        title: 'Customer Churn Prevention',
        description:
          'SaaS company uses AI churn probability scores to identify at-risk accounts 90 days before renewal — triggering automated customer success interventions.',
        outcome: '28% improvement in net revenue retention',
      },
    ],
    steps: [
      { step: '01', title: 'Connect Your Data Sources', description: 'Link databases, SaaS apps, data warehouses, and APIs via 200+ pre-built connectors in minutes.' },
      { step: '02', title: 'Define Your KPIs', description: 'Use our KPI builder to define the metrics that matter. AI suggests additional metrics based on your industry.' },
      { step: '03', title: 'AI Builds Your Models', description: 'Predictive models are automatically trained on your historical data. No data science degree required.' },
      { step: '04', title: 'Explore & Share Insights', description: 'Ask questions in plain English, build dashboards, and share live reports with any stakeholder.' },
      { step: '05', title: 'Act on AI Recommendations', description: 'AI surfaces prioritized action items with projected impact — turning analytics into outcomes.' },
    ],
    industries: ['SaaS & Technology', 'Retail & E-Commerce', 'Financial Services', 'Healthcare', 'Manufacturing', 'Media'],
    ctaHeadline: 'Stop Reporting the Past. Start Predicting the Future.',
    ctaSubtext: 'See your own data come alive in a personalized AI Analytics Dashboard demo.',
  },
  {
    slug: 'ai-customer-support-agent',
    name: 'AI Customer Support Agent',
    tag: 'Support',
    tagline: 'Resolve 80% of Tickets. Automatically.',
    description: 'Deploy intelligent AI agents that resolve 80% of customer inquiries autonomously with human-like accuracy.',
    heroDescription:
      'Your customers expect instant, accurate answers — 24 hours a day, 7 days a week, across every channel. But scaling a human support team to meet that demand is unsustainable. Nexus AI Customer Support Agent deploys an AI-powered front line that resolves 80% of inquiries autonomously — with human-like empathy, brand-consistent tone, and escalation intelligence that your human agents actually trust.',
    color: '#00D4FF',
    accentColor: '#6C63FF',
    stats: [
      { value: '80%', label: 'Autonomous Resolution Rate' },
      { value: '60%', label: 'Support Cost Reduction' },
      { value: '<2s', label: 'Average Response Time' },
      { value: '24/7', label: 'Availability Across All Channels' },
    ],
    features: [
      {
        icon: 'Layers',
        title: 'Omnichannel Deployment',
        description:
          'Deploy across web chat, email, WhatsApp, SMS, Slack, Teams, and voice in a single configuration. Consistent experience and conversation memory across every channel — even when customers switch mid-conversation.',
      },
      {
        icon: 'Heart',
        title: 'Real-Time Sentiment Analysis',
        description:
          'AI detects frustration, urgency, and satisfaction in real time. Automatically adjusts tone, prioritizes responses, and escalates to human agents when emotional signals indicate a high-risk conversation.',
      },
      {
        icon: 'ArrowUpCircle',
        title: 'Intelligent Auto-Escalation',
        description:
          'When the AI reaches its confidence threshold, it hands off to the right human agent — with full conversation context, customer history, and a suggested resolution — so agents never start from zero.',
      },
      {
        icon: 'BookOpen',
        title: 'Dynamic Knowledge Base Sync',
        description:
          'Automatically syncs with your product docs, FAQs, Confluence, Notion, and helpdesk — so the AI always has the latest answers. Content gaps are flagged and suggested for human review.',
      },
      {
        icon: 'Link',
        title: 'Deep CRM & Helpdesk Integration',
        description:
          'Native integrations with Salesforce, Zendesk, Freshdesk, HubSpot, and Intercom. AI logs every interaction, updates customer records, and triggers automated follow-up workflows.',
      },
      {
        icon: 'Globe',
        title: 'Multilingual Support',
        description:
          'Supports 95+ languages with native-quality translation and locale-aware responses. Serve global customers in their preferred language without separate workflows or agent teams.',
      },
    ],
    useCases: [
      {
        title: 'E-Commerce Customer Service',
        description:
          'Online retailer deploys AI agent to handle order tracking, returns, exchange requests, and product questions — resolving 85% without human intervention during peak season.',
        outcome: '60% reduction in support headcount cost',
      },
      {
        title: 'SaaS Technical Support',
        description:
          'B2B SaaS company uses AI to triage, diagnose, and resolve Tier-1 technical issues — with automatic Jira ticket creation for Tier-2 escalations.',
        outcome: 'CSAT improved from 3.2 to 4.7 out of 5',
      },
      {
        title: 'Financial Services Inquiries',
        description:
          'Bank deploys AI agent for account balance queries, transaction disputes, card block requests, and product information — fully compliant with financial regulations.',
        outcome: '70% of inquiries resolved without branch visit',
      },
      {
        title: 'Healthcare Patient Communication',
        description:
          'Hospital network uses AI to handle appointment scheduling, prescription refill requests, and insurance queries — reducing front-desk call volume dramatically.',
        outcome: '55% reduction in call center volume',
      },
    ],
    steps: [
      { step: '01', title: 'Train on Your Knowledge', description: 'Feed the AI your product docs, FAQs, past tickets, and SOPs. Training completes in 48 hours.' },
      { step: '02', title: 'Configure Your Channels', description: 'Deploy to web chat, email, WhatsApp, or voice with our no-code channel configuration wizard.' },
      { step: '03', title: 'Set Escalation Rules', description: 'Define when and how the AI hands off to human agents — by topic, sentiment, or customer tier.' },
      { step: '04', title: 'Go Live in Days', description: 'Launch with a supervised period where AI suggestions are reviewed before being sent — build confidence before full autonomy.' },
      { step: '05', title: 'Improve Continuously', description: 'AI learns from every resolved ticket, human correction, and CSAT rating — getting smarter every week.' },
    ],
    industries: ['E-Commerce', 'Financial Services', 'Healthcare', 'SaaS & Technology', 'Telecommunications', 'Travel & Hospitality'],
    ctaHeadline: 'Your Customers Are Waiting. Your AI Agent is Ready.',
    ctaSubtext: 'Deploy a fully trained AI support agent for your business in under 2 weeks. Book your setup call.',
  },
  {
    slug: 'ai-automation-studio',
    name: 'AI Automation Studio',
    tag: 'Low-Code',
    tagline: 'Automate Anything. No Developer Required.',
    description: 'No-code automation builder powered by AI suggestions, with enterprise-grade reliability and scalability.',
    heroDescription:
      'Your operations team has 100 manual processes that need automating. Your dev team has a 6-month backlog. Nexus AI Automation Studio bridges the gap — giving business users the power to build, test, and deploy enterprise-grade automations in hours, with AI guidance every step of the way and the reliability your enterprise demands.',
    color: '#6C63FF',
    accentColor: '#00D4FF',
    stats: [
      { value: '10x', label: 'Faster Automation Build' },
      { value: '500+', label: 'Pre-Built Connectors' },
      { value: '0', label: 'Lines of Code Required' },
      { value: '99.9%', label: 'Enterprise SLA' },
    ],
    features: [
      {
        icon: 'MousePointer',
        title: 'Drag-Drop Automation Builder',
        description:
          'Visual canvas lets business users build complex automations by dragging triggers, actions, and conditions. What used to require a developer now takes an analyst an afternoon.',
      },
      {
        icon: 'Lightbulb',
        title: 'AI-Powered Build Suggestions',
        description:
          'As you build, AI analyzes your intent and suggests the next best steps, missing error handlers, optimization opportunities, and similar templates used by other enterprise customers.',
      },
      {
        icon: 'Plug',
        title: '500+ Enterprise Connectors',
        description:
          'Pre-built connectors for Salesforce, SAP, Oracle, Workday, Slack, Microsoft 365, Google Workspace, and 500+ more. If we don\'t have it, our universal API builder creates it in minutes.',
      },
      {
        icon: 'Copy',
        title: 'Automation Template Library',
        description:
          '300+ ready-to-use automation templates for finance, HR, marketing, IT, and operations. Import, customize, and deploy — skipping 80% of build time.',
      },
      {
        icon: 'Shield',
        title: 'Enterprise Governance & Control',
        description:
          'Centralized automation governance with approval workflows, version control, audit logging, and environment management (dev/staging/prod). IT stays in control without being a bottleneck.',
      },
      {
        icon: 'Cpu',
        title: 'Scalable Execution Engine',
        description:
          'Built on cloud-native infrastructure that scales from 10 to 10 million automation executions per day without performance degradation. Auto-scaling, failover, and 99.9% SLA included.',
      },
    ],
    useCases: [
      {
        title: 'Finance Month-End Close',
        description:
          'Finance team automates data collection from 12 systems, reconciliation checks, journal entry creation, and CFO report generation — cutting close time in half.',
        outcome: 'Month-end close time reduced from 5 days to 2 days',
      },
      {
        title: 'Marketing Campaign Operations',
        description:
          'Marketing ops team automates lead scoring updates, campaign tag management, audience segmentation syncs, and performance report distribution across 8 tools.',
        outcome: '20 hours per week of manual work eliminated',
      },
      {
        title: 'IT Provisioning & Offboarding',
        description:
          'IT team automates employee onboarding (account creation, software licensing, hardware requests) and offboarding (access revocation, asset recovery) across 15 systems.',
        outcome: 'IT provisioning time cut from 3 days to 4 hours',
      },
      {
        title: 'Procurement & Vendor Management',
        description:
          'Procurement team automates RFQ issuance, vendor response collection, comparison matrix generation, and PO creation — all from a single trigger.',
        outcome: '70% reduction in procurement cycle time',
      },
    ],
    steps: [
      { step: '01', title: 'Choose Your Template', description: 'Start from 300+ pre-built templates or a blank canvas. AI recommends the best starting point for your use case.' },
      { step: '02', title: 'Connect Your Apps', description: 'Authenticate your tools in seconds. 500+ connectors with pre-mapped fields mean zero manual configuration.' },
      { step: '03', title: 'Build with AI Guidance', description: 'Drag, drop, and configure while AI suggests improvements, catches errors, and optimizes your logic in real time.' },
      { step: '04', title: 'Test in Sandbox', description: 'Run your automation against live or test data in a safe sandbox environment before production deployment.' },
      { step: '05', title: 'Deploy & Monitor', description: 'Go live with one click. Monitor execution logs, error rates, and performance from a central operations dashboard.' },
    ],
    industries: ['Financial Services', 'Healthcare', 'Retail', 'Technology', 'Manufacturing', 'Professional Services'],
    ctaHeadline: 'Your Team Should Work on What Matters. Not Manual Tasks.',
    ctaSubtext: 'See AI Automation Studio eliminate your most painful manual process in a live 30-minute demo.',
  },
  {
    slug: 'ai-reporting-system',
    name: 'AI Reporting System',
    tag: 'Reports',
    tagline: 'Reports That Write Themselves. Insights That Speak for Themselves.',
    description: 'Automated report generation with AI narrative writing, scheduled delivery, and dynamic visualizations.',
    heroDescription:
      'Your team spends 20% of their time compiling data, formatting reports, and writing commentary that goes out of date the moment it\'s published. Nexus AI Reporting System replaces that entire workflow with fully automated, AI-narrated, dynamically visualized reports — delivered to every stakeholder on schedule, in the format they prefer, with insights they can actually act on.',
    color: '#00D4FF',
    accentColor: '#6C63FF',
    stats: [
      { value: '90%', label: 'Reporting Time Saved' },
      { value: '100%', label: 'Reports Auto-Generated' },
      { value: '15min', label: 'From Data to Delivery' },
      { value: '50+', label: 'Report Templates Available' },
    ],
    features: [
      {
        icon: 'Zap',
        title: 'Fully Automated Report Generation',
        description:
          'Connect your data sources and define your report structure once. AI handles data retrieval, calculation, formatting, and delivery automatically — every time, on schedule.',
      },
      {
        icon: 'Edit3',
        title: 'AI Narrative Writing',
        description:
          'Beyond charts and numbers, AI generates plain-English commentary that explains what changed, why it matters, and what to do about it — tailored to the audience (executive, operational, or technical).',
      },
      {
        icon: 'Clock',
        title: 'Scheduled & Event-Triggered Delivery',
        description:
          'Send reports on any schedule (daily, weekly, monthly) or trigger delivery based on events — a threshold breach, a deal closing, a system alert. Right information, right time, right person.',
      },
      {
        icon: 'BarChart2',
        title: 'Dynamic Visualizations',
        description:
          'AI selects the most effective chart type for each metric — trend lines, heat maps, waterfall charts, scatter plots — and auto-adapts when underlying data changes structure.',
      },
      {
        icon: 'Layout',
        title: 'Custom Report Templates',
        description:
          'White-label report templates that match your brand standards. Build once, use everywhere — from board-level summaries to operational drill-downs. Export to PDF, Excel, PowerPoint, or live web link.',
      },
      {
        icon: 'Share2',
        title: 'Intelligent Distribution',
        description:
          'Role-based distribution lists ensure each stakeholder receives the right version of each report. AI tracks engagement — flagging reports that are opened vs. ignored to optimize communication.',
      },
    ],
    useCases: [
      {
        title: 'Board & Investor Reporting',
        description:
          'CFO office automates quarterly board pack generation — pulling financials from ERP, KPIs from BI tools, and risk metrics from GRC systems into a board-ready PDF in 15 minutes.',
        outcome: 'Board pack preparation time cut from 3 days to 15 minutes',
      },
      {
        title: 'Sales Performance Reporting',
        description:
          'Sales ops delivers weekly rep scorecards, regional performance summaries, and pipeline health reports to 200 managers simultaneously — all automated and personalized.',
        outcome: '100% report delivery rate, zero manual effort',
      },
      {
        title: 'Regulatory & Compliance Reporting',
        description:
          'Compliance teams auto-generate regulatory submissions, AML reports, and audit trails from transaction data — with AI-verified accuracy and digital signatures.',
        outcome: '100% on-time regulatory submissions',
      },
      {
        title: 'Operational KPI Monitoring',
        description:
          'Manufacturing plant managers receive shift-by-shift production reports with AI analysis of downtime causes, quality variance, and yield optimization recommendations.',
        outcome: '15% improvement in OEE within 90 days',
      },
    ],
    steps: [
      { step: '01', title: 'Connect Data Sources', description: 'Link your databases, SaaS tools, and data warehouses. AI automatically maps available data fields to report elements.' },
      { step: '02', title: 'Choose or Build Templates', description: 'Select from 50+ professional templates or build your own branded layout with our drag-drop report designer.' },
      { step: '03', title: 'Configure AI Narrative', description: 'Set the tone (executive, analytical, operational), audience, and key metrics AI should highlight in commentary.' },
      { step: '04', title: 'Set Delivery Schedule', description: 'Define recipients, delivery timing, and trigger conditions. Configure format preferences per stakeholder.' },
      { step: '05', title: 'Reports Deliver Themselves', description: 'Sit back. AI generates, narrates, and distributes every report automatically — and alerts you only when something needs attention.' },
    ],
    industries: ['Financial Services', 'Healthcare', 'Manufacturing', 'Retail', 'Government', 'Professional Services'],
    ctaHeadline: 'What If Your Reports Just Appeared in Every Inbox?',
    ctaSubtext: 'See how AI Reporting System eliminates your reporting burden in a personalized live demo.',
  },
  {
    slug: 'ai-productivity-assistant',
    name: 'AI Productivity Assistant',
    tag: 'Productivity',
    tagline: 'Your Smartest Team Member. Available 24/7.',
    description: 'An intelligent workplace AI that manages tasks, schedules, communications, and knowledge retrieval.',
    heroDescription:
      'The average knowledge worker spends 41% of their time on low-value tasks — scheduling meetings, searching for information, writing status updates, and managing email. Nexus AI Productivity Assistant takes all of that off their plate — acting as an intelligent executive assistant for every person in your organization, not just the C-suite.',
    color: '#6C63FF',
    accentColor: '#00D4FF',
    stats: [
      { value: '3x', label: 'Individual Productivity Gain' },
      { value: '5hrs', label: 'Saved Per Employee Per Week' },
      { value: '40%', label: 'Fewer Unnecessary Meetings' },
      { value: '95%', label: 'Employee Adoption Rate' },
    ],
    features: [
      {
        icon: 'Calendar',
        title: 'Intelligent Meeting Scheduling',
        description:
          'AI coordinates calendars across your organization, finds optimal meeting times, blocks focus time, and declines low-priority requests — based on each employee\'s work preferences and priorities.',
      },
      {
        icon: 'CheckSquare',
        title: 'Autonomous Task Management',
        description:
          'AI captures tasks from emails, meeting notes, and Slack messages — organizes them by priority, deadline, and dependencies — and sends smart reminders before things fall through the cracks.',
      },
      {
        icon: 'Search',
        title: 'Enterprise Knowledge Retrieval',
        description:
          'One search box that spans every system — Confluence, SharePoint, Notion, Google Drive, email, Slack. AI finds exactly what you need and synthesizes answers from multiple sources instantly.',
      },
      {
        icon: 'Mail',
        title: 'Email & Communication Intelligence',
        description:
          'AI drafts responses, summarizes long email threads, flags action items, and unsubscribes from noise — cutting email management time by 60% while ensuring nothing important slips through.',
      },
      {
        icon: 'Mic',
        title: 'Meeting Intelligence & Summaries',
        description:
          'AI joins your meetings, transcribes discussions, identifies decisions and action items, and sends summaries to all participants within minutes of the call ending. No more manual note-taking.',
      },
      {
        icon: 'Users',
        title: 'Team Collaboration Amplifier',
        description:
          'AI surfaces relevant context when you collaborate — showing related documents, past decisions, and team member expertise before you even ask. Keeps distributed teams synchronized without overhead.',
      },
    ],
    useCases: [
      {
        title: 'Executive & Leadership Teams',
        description:
          'C-suite executives use AI assistant to manage complex calendars, brief them before every meeting, draft communications, and synthesize daily news and internal metrics into a morning briefing.',
        outcome: '10 hours per week reclaimed for strategic work',
      },
      {
        title: 'Sales Teams',
        description:
          'Sales reps get AI-generated call prep briefs, automated CRM updates, follow-up email drafts, and deal coaching suggestions — letting them focus on building relationships, not admin.',
        outcome: '35% increase in selling time per rep',
      },
      {
        title: 'Engineering & Product Teams',
        description:
          'Developers get AI-powered stand-up summaries, sprint report automation, documentation drafting, and intelligent code review scheduling — eliminating process overhead.',
        outcome: '20% increase in sprint velocity',
      },
      {
        title: 'HR & People Operations',
        description:
          'HR teams use AI to automate interview scheduling, onboarding checklist management, policy Q&A, and employee engagement survey analysis.',
        outcome: '65% reduction in HR admin overhead',
      },
    ],
    steps: [
      { step: '01', title: 'Connect Your Work Tools', description: 'Integrate email, calendar, Slack, Teams, and your key SaaS tools. Setup takes under 30 minutes.' },
      { step: '02', title: 'AI Learns Your Preferences', description: 'AI observes your patterns, priorities, and communication style during a 2-week learning period.' },
      { step: '03', title: 'Delegation Begins', description: 'Start delegating scheduling, research, drafting, and task management to your AI assistant at your own pace.' },
      { step: '04', title: 'Roll Out to Your Team', description: 'Expand to your entire organization with centralized admin controls and team-level customization.' },
      { step: '05', title: 'Measure Productivity Gains', description: 'Track time savings, meeting reduction, and task completion rates across your organization in the analytics dashboard.' },
    ],
    industries: ['Professional Services', 'Technology', 'Financial Services', 'Healthcare', 'Media & Advertising', 'Education'],
    ctaHeadline: 'Give Everyone in Your Company an AI Executive Assistant.',
    ctaSubtext: 'Start a free pilot for your team and measure the productivity impact in 30 days.',
  },
  {
    slug: 'ai-monitoring-intelligence',
    name: 'AI Monitoring Intelligence',
    tag: 'Monitoring',
    tagline: 'Every Camera. Every Alert. Zero Blind Spots.',
    description: 'Transform existing cameras into intelligent monitoring systems with real-time AI analytics and alerts.',
    heroDescription:
      'Traditional CCTV systems record everything and understand nothing. Nexus AI Monitoring Intelligence turns your existing camera infrastructure into a real-time intelligence network — detecting threats, compliance violations, operational inefficiencies, and safety hazards the moment they occur, not hours later when someone reviews the footage.',
    color: '#00D4FF',
    accentColor: '#6C63FF',
    stats: [
      { value: '99%', label: 'Threat Detection Accuracy' },
      { value: '<3s', label: 'Real-Time Alert Latency' },
      { value: '100+', label: 'Compatible Camera Types' },
      { value: '60%', label: 'Security Incident Reduction' },
    ],
    features: [
      {
        icon: 'Plug',
        title: 'Plug-and-Play Integration',
        description:
          'Works with 100+ existing camera brands and NVR/DVR systems — HIKVISION, Dahua, Axis, Bosch, and more. No hardware replacement, no rip-and-replace. Your existing infrastructure becomes intelligent overnight.',
      },
      {
        icon: 'Bell',
        title: 'Real-Time Intelligent Alerts',
        description:
          'AI detects unauthorized access, perimeter breaches, unattended objects, crowd formation, slip-and-fall events, and PPE violations — sending instant alerts to the right personnel via SMS, email, or app.',
      },
      {
        icon: 'Monitor',
        title: 'Multi-Camera Unified Dashboard',
        description:
          'Monitor dozens of camera feeds simultaneously from a single AI-powered dashboard. Smart tiling surfaces the most relevant feeds automatically based on active alerts and risk levels.',
      },
      {
        icon: 'FileText',
        title: 'Automated Compliance Reporting',
        description:
          'Generate audit-ready compliance reports automatically — occupancy logs, PPE compliance rates, access event records, and incident timelines — eliminating hours of manual footage review.',
      },
      {
        icon: 'Eye',
        title: 'Behavioral AI Analytics',
        description:
          'Detects behavioral patterns beyond simple motion — loitering, tailgating, unusual dwell time, restricted zone access, and abnormal crowd dynamics — with configurable sensitivity thresholds.',
      },
      {
        icon: 'TrendingUp',
        title: 'Operational Intelligence',
        description:
          'Beyond security, AI provides people counting, queue length monitoring, space utilization analysis, and footfall heatmaps — turning your cameras into operational intelligence tools.',
      },
    ],
    useCases: [
      {
        title: 'Enterprise Campus Security',
        description:
          'Corporate HQ uses AI monitoring to detect tailgating at access points, identify unattended bags in lobbies, and dispatch security within seconds of an incident — not after reviewing footage.',
        outcome: '70% reduction in security incident response time',
      },
      {
        title: 'Manufacturing Safety Compliance',
        description:
          'Factory floor AI monitors PPE compliance (hard hats, safety vests, goggles) across 40 cameras — alerting supervisors in real time and generating daily compliance scorecards.',
        outcome: '80% reduction in PPE compliance violations',
      },
      {
        title: 'Retail Loss Prevention',
        description:
          'Retail chain uses AI to detect shoplifting behaviors, monitor self-checkout anomalies, and track high-value merchandise zones — reducing shrinkage significantly.',
        outcome: '45% reduction in inventory shrinkage',
      },
      {
        title: 'Smart Building Operations',
        description:
          'Property manager uses occupancy analytics from cameras to optimize HVAC scheduling, desk booking systems, and cleaning rosters — reducing operational costs.',
        outcome: '25% reduction in building operational costs',
      },
    ],
    steps: [
      { step: '01', title: 'Audit Your Camera Infrastructure', description: 'Our team assesses your existing cameras, NVRs, and network capacity. Most setups are fully compatible with zero new hardware.' },
      { step: '02', title: 'Connect & Configure', description: 'AI Monitoring Intelligence connects to your camera feeds via RTSP/ONVIF in hours. Define zones, rules, and alert thresholds.' },
      { step: '03', title: 'AI Begins Learning', description: 'AI calibrates to your environment — learning normal patterns before activating alerts to minimize false positives.' },
      { step: '04', title: 'Go Live with Alerts', description: 'Real-time monitoring activates. Security and operations teams receive instant alerts via their preferred communication channels.' },
      { step: '05', title: 'Review Insights & Reports', description: 'Access daily intelligence reports, compliance logs, incident timelines, and operational analytics from the central dashboard.' },
    ],
    industries: ['Corporate Real Estate', 'Manufacturing', 'Retail', 'Healthcare', 'Logistics & Warehousing', 'Government & Public Safety'],
    ctaHeadline: 'Your Cameras Are Watching. Is Your AI Listening?',
    ctaSubtext: 'Get a free infrastructure assessment and see AI Monitoring Intelligence detect threats in your own environment.',
  },
];

export function getProductBySlug(slug: string): ProductData | undefined {
  return PRODUCTS_DATA.find(p => p.slug === slug);
}
