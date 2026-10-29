// Everything about you lives here, except projects (see projects.ts).
// Content comes from your existing portfolio at dev-namra.github.io/namramahak.
// Lines marked EDIT need your decision before you publish.

export interface Role {
  title: string;
  org: string;
  place: string;
  years: string;
  points: string[];
  tags?: string[];
}

export interface Stat {
  to: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date?: string;
}

// For licences and registrations. Add entries to `licenses` below, for example:
// { title: 'Council of Architecture registration', issuer: 'Council of Architecture, India', valid: 'Since 2020' }
export interface License {
  title: string;
  issuer: string;
  valid?: string;
}

export const profile = {
  name: 'Namra Mahak',
  initials: 'NM',
  based: 'New Delhi, India',
  availability: 'the UAE, Europe and the UK',
  // Hero headline, split so one phrase can be emphasised.
  headline: [
    { text: 'Architect turned BIM specialist building ' },
    { text: 'automation for construction data', strong: true },
    { text: ' that teams actually use.' },
  ],

  // Counted up in the hero.
  stats: [
    { to: 5, suffix: '+', label: 'years across architecture and BIM' },
    { to: 3, label: 'firms, from design practice to construction' },
    { to: 2, label: 'countries of practice, India and the UK' },
    { to: 2, label: 'degrees: B.Arch and MSc in BIM' },
  ] as Stat[],

  about: [
    'I\u2019m a BIM specialist with an architect\u2019s eye, and I use automation to keep models accurate, current and easy for project teams to use.',
    'My career has crossed two countries. In India I trained as an architect and spent three years in Delhi designing offices, showrooms and expo booths, then producing the working drawings to build them. That taught me what a drawing has to do once it leaves the studio.',
    'In the UK I completed a master\u2019s in BIM and then spent almost three years with an offsite construction contractor. There I managed model information for hospital projects using ISO 19650, BIM 360 and a common data environment, built Revit tools that automate drawings, and created a web platform that gives project and factory teams direct access to model data.',
    'I\u2019m looking for BIM, digital construction and automation roles.',
  ],
  photo: {
    src: '/about/namra.webp',
    alt: 'Namra Mahak smiling at her desk',
  },

  // Shown in this order. BIM first, because that is what you are applying for.
  skills: [
    {
      group: 'BIM and coordination',
      items: ['Revit', 'Navisworks', 'BIM 360 / ACC', 'Autodesk Platform Services'],
    },
    {
      group: 'Standards and delivery',
      items: ['ISO 19650', 'Common data environment (CDE)', 'Model information management', 'Offsite construction (DfMA)'],
    },
    {
      group: 'Design and documentation',
      items: ['Working drawings', 'AutoCAD', '3ds Max', 'Client presentations'],
    },
    {
      group: 'BIM automation',
      items: ['Revit API', 'C#', 'Python', 'Power Automate', 'Power BI', 'SQL'],
    },
    {
      group: 'Web and cloud',
      items: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Tailwind CSS', 'Azure', 'Docker', 'Git', 'GitHub Actions'],
    },
  ],

  experience: [
    {
      title: 'Career break: portfolio and upskilling',
      org: 'Self-directed',
      place: 'New Delhi, India',
      years: '2026\u2013present',
      points: [
        'Built this portfolio to show my BIM automation and platform development work.',
        'Extending my Revit API, Autodesk Platform Services and cloud skills.',
      ],
    },
    {
      title: 'BIM and Digital Construction Specialist',
      org: 'Merit',
      place: 'Newcastle upon Tyne, UK',
      years: '2023\u20132026',
      points: [
        'Sole developer of Spark Construct, a full-stack BIM platform built on Autodesk Platform Services and the common data environment, now used by 62+ people across project and business teams.',
        'Replaced and consolidated third-party BIM tools, saving a projected \u00a315,000 a year in licences.',
        'Built a Revit API plugin that generates elevations automatically, cutting a four-hour task to about 30 minutes (roughly 87% saved).',
        'Built an MEP tool that places cable trays, wires and conduits automatically, and a parametric concept generator that compares modular hospital layouts from site dimensions.',
        'Automated project tracking, tasks and reporting with Power Automate, Planner and Power BI.',
        'Managed model information to ISO 19650 using BIM 360 and a common data environment on offsite (DfMA) hospital projects.',
      ],
      tags: ['Revit API', 'Autodesk Platform Services', 'ISO 19650', 'BIM 360', 'React', 'Node.js', 'Azure', 'Power Automate', 'Power BI'],
    },
    {
      title: 'Senior Architect',
      org: 'Zeppelin Design and Environments',
      place: 'New Delhi, India',
      years: '2020\u20132022',
      points: [
        'Designed offices, regional centres and showrooms for the principal client, a premium bathware brand.',
        'Produced complete working drawings and detailed furniture drawings for every project.',
        'Delivered a temporary exhibition structure from concept to completion, including site coordination drawings and visits.',
        'Created 3D models and visualisations in 3ds Max and presented designs to restaurant and bakery clients.',
      ],
      tags: ['Working drawings', 'AutoCAD', '3ds Max'],
    },
    {
      title: 'Architect',
      org: 'Sconce Global',
      place: 'New Delhi, India',
      years: '2019\u20132020',
      points: [
        'Developed conceptual and detailed designs across multiple project stages.',
        'Prepared client presentations, working drawings and design documentation.',
        'Coordinated with clients, consultants and site teams to resolve design and site issues.',
      ],
    },
  ] satisfies Role[],

  education: [
    {
      title: 'MSc BIM Project Management',
      org: 'Queen\u2019s University Belfast, UK',
      years: '2022\u20132023',
      note: 'Building Information Modelling and digital project delivery. Coordinating interdisciplinary teams with Revit and Navisworks.',
    },
    {
      title: 'Bachelor of Architecture',
      org: 'Jamia Millia Islamia, India',
      years: '2014\u20132019',
      note: 'A five-year professional degree focused on sustainable design, construction technology and urban planning.',
    },
  ],

  certificates: [
    { title: 'BIM Manager', issuer: 'LinkedIn Learning' },
    { title: 'Full-Stack JavaScript Development', issuer: 'LinkedIn', date: 'Mar 2025' },
    { title: 'Practical GitHub Actions', issuer: 'LinkedIn', date: 'Mar 2025' },
    { title: 'React in Action', issuer: 'LinkedIn', date: 'Mar 2025' },
    { title: 'Learning Next.js', issuer: 'LinkedIn', date: 'Mar 2025' },
    { title: 'Learn JavaScript, HTML and CSS', issuer: 'Codecademy', date: 'Oct\u2013Nov 2023' },
    { title: 'Learn C#', issuer: 'Codecademy', date: 'Sep 2023' },
  ] as Certificate[],

  // Shown as a third card when it has entries. Empty means the card is hidden.
  licenses: [] as License[],

  links: {
    email: 'mahaknamra@outlook.com',
    linkedin: 'https://linkedin.com/in/namra-mahak',
    github: 'https://github.com/dev-namra',
    cv: '/Namra-Mahak-CV.pdf',
  },
};