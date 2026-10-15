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
    'I trained as an architect and spent three years in Delhi designing offices, showrooms and expo booths. Then I moved into BIM.',
    'At Merit, a UK offsite construction contractor in Newcastle, I built the internal BIM platform, the real-time IoT dashboards and the automation that connects Microsoft Teams, Planner and Power BI.',
    'Being an architect means I know what the model is for. Being a developer means I can fix the process around it.',
    'I’m on a career break, building this portfolio and sharpening my Revit API and cloud skills. I’m looking for BIM, digital construction and automation roles in the UAE, Europe and the UK.',
  ],
  photo: {
    src: '/about/namra.webp',
    alt: 'Namra Mahak smiling at her desk',
  },

  skills: [
    {
      group: 'BIM and design',
      items: ['Revit', 'Revit API', 'Navisworks', 'Synchro', 'BIM 360', 'Autodesk Platform Services', 'Figma'],
    },
    {
      group: 'Automation and data',
      items: ['Power Automate', 'Power BI', 'Python', 'SQL'],
    },
    {
      group: 'Languages',
      items: ['JavaScript', 'TypeScript', 'Python', 'C#'],
    },
    {
      group: 'Web and cloud',
      items: ['React', 'Node.js', 'Tailwind CSS', 'Azure', 'Docker', 'Git', 'GitHub Actions'],
    },
  ],

  experience: [
    {
      title: 'Career break: portfolio and upskilling',
      org: 'Self-directed',
      place: 'New Delhi, India',
      years: '2026–present',
      points: [
        'Built a professional portfolio showing BIM automation and platform development work.',
        'Strengthened skills in Revit API, React and cloud-based construction technology.',
        'Pursuing roles across the UAE, Europe and the UK.',
      ],
    },
    {
      title: 'BIM and Digital Construction Specialist',
      org: 'Merit',
      place: 'Newcastle upon Tyne, UK',
      years: '2023–2026',
      points: [
        'Led development of a secure internal BIM platform integrated with Autodesk Platform Services.',
        'Replaced legacy software, with projected licence savings of about £15,000 a year.',
        'Developed real-time IoT dashboards and AI-powered tools.',
        'Automated workflows with Power Automate and Power BI.',
      ],
      tags: ['Autodesk Platform Services', 'React', 'Node.js', 'Azure', 'Power Automate', 'Power BI'],
    },
    {
      title: 'Automation Developer',
      org: 'Merit',
      place: 'Newcastle upon Tyne, UK',
      years: '2023',
      points: [
        'Built automation tools in Python and JavaScript.',
        'Designed intuitive interfaces for internal tools.',
        'Improved team efficiency and operational workflows.',
      ],
      tags: ['Python', 'JavaScript'],
    },
    {
      title: 'Senior Designer',
      org: 'Zeppelin Design and Environments',
      place: 'India',
      years: '2020–2022',
      points: [
        'Led design and execution for commercial, hospitality and retail projects.',
        'Coordinated with vendors and contractors.',
        'Streamlined documentation and increased team efficiency.',
      ],
    },
    {
      title: 'Architect',
      org: 'Sconce Global',
      place: 'India',
      years: '2019–2020',
      points: [
        'Created conceptual designs and presentations for major clients.',
        'Designed expo booths for large-scale events.',
        'Worked with cross-functional teams and delivered on tight timelines.',
      ],
    },
  ] satisfies Role[],

  education: [
    {
      title: 'MSc BIM Project Management',
      org: 'Queen’s University Belfast, UK',
      years: '2022–2023',
      note: 'Building Information Modelling and digital project delivery. Coordinating interdisciplinary teams with Revit, Navisworks and Synchro.',
    },
    {
      title: 'Bachelor of Architecture',
      org: 'Jamia Millia Islamia, India',
      years: '2014–2019',
      note: 'A five-year professional degree focused on sustainable design, construction technology and urban planning.',
    },
  ],

  certificates: [
    { title: 'BIM Manager', issuer: 'LinkedIn Learning' },
    { title: 'Full-Stack JavaScript Development', issuer: 'LinkedIn', date: 'Mar 2025' },
    { title: 'Practical GitHub Actions', issuer: 'LinkedIn', date: 'Mar 2025' },
    { title: 'React in Action', issuer: 'LinkedIn', date: 'Mar 2025' },
    { title: 'Learning Next.js', issuer: 'LinkedIn', date: 'Mar 2025' },
    { title: 'Learn JavaScript, HTML and CSS', issuer: 'Codecademy', date: 'Oct–Nov 2023' },
    { title: 'Learn C#', issuer: 'Codecademy', date: 'Sep 2023' },
  ],

  links: {
    email: 'mahaknamra@outlook.com',
    linkedin: 'https://linkedin.com/in/namra-mahak',
    github: 'https://github.com/dev-namra',
    // EDIT: put your CV in /public and set e.g. '/Namra-Mahak-CV.pdf'. Empty hides the CV buttons.
    cv: '',
  },
};