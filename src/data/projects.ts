// All project content lives here. To add a project, copy an entry and edit it.
// Sheet numbers are generated: series + position, e.g. BA-01, and BA-01.1 for sub-projects.
//
// draft: true  -> shown with a "Draft" tag in `npm run dev`, hidden in the built site.
// Text marked EDIT is wording inferred from your notes. Rewrite it in your own words.
//
// Images: client names, colleagues' emails and 3D models were left out on purpose.
// Add redacted screenshots under /public/projects/<name>/ and list them in `figures`.

export type SeriesCode = 'BA' | 'AR';

export interface Figure {
  src: string; // path under /public, e.g. '/projects/iot-atlas/login-tablet.webp'
  alt: string;
  caption: string;
}

export interface Comparison {
  label: string;
  before: Figure;
  after: Figure;
}

export interface SubProject {
  title: string;
  summary: string;
}

export interface Project {
  slug: string;
  series: SeriesCode;
  draft?: boolean;
  title: string;
  subtitle: string;
  summary: string;
  type: string;
  role: string;
  organisation: string;
  place: string;
  period: string;
  scope: string[];
  brief: string[];
  approach: string[];
  challenges?: string[];
  solutions?: string[];
  outcome: string[];
  metrics?: { value: string; label: string }[];
  note?: string;
  flow?: string[];
  thumb?: Figure;
  sub: SubProject[];
  figures: Figure[];
  comparisons?: Comparison[];
}

export interface SideProject {
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export const seriesInfo: Record<SeriesCode, { id: string; title: string; intro: string }> = {
  BA: {
    id: 'bim-automation',
    title: 'BIM automation',
    intro:
      'Software and workflows I built so BIM data is usable by the whole project team, not only the modellers.',
  },
  AR: {
    id: 'core-architecture',
    title: 'Core architecture',
    intro: 'Design, working drawings and detailing from my years in practice.',
  },
};

export const projects: Project[] = [
  {
    slug: 'spark-construct',
    series: 'BA',
    title: 'Spark Construct',
    subtitle: 'Web-based 3D model management on Autodesk Platform Services',
    summary:
      'A secure web app that lets project teams open, review and discuss BIM 360 models without a Revit licence.',
    type: 'Full stack',
    role: 'Lead developer',
    organisation: 'Merit',
    place: 'Newcastle, UK',
    period: '2023–2026',
    scope: [
      'JavaScript',
      'Node.js',
      'Tailwind CSS',
      'Autodesk Platform Services',
      'SQL',
      'Azure',
      'TruStack',
      'Figma',
    ],
    brief: [
      'Spark Construct is a secure, web-based 3D model management application built on Autodesk Platform Services and hosted on private endpoints for enterprise data security.',
      'It is designed for engineering, construction and manufacturing teams. It gives them BIM 360 model access, visualisation and collaboration without Revit licences or advanced technical skills, on mobile, tablet and desktop.',
    ],
    approach: [
      'Led the full-stack build in JavaScript, with Tailwind CSS for styling and Node.js middleware.',
      'Hosted on Azure with private endpoints, secured with TruStack.',
      'Integrated Autodesk Platform Services securely, and connected databases for logging and real-time monitoring.',
      'Worked with stakeholders to shape features around real engineering and construction workflows.',
      'Owned UI and UX design, backend development, authentication, data management and deployment.',
    ],
    challenges: [
      'No accessible tool let team members view and interact with 3D models without complex software.',
      'Revit was slow to load and process models, which delayed project workflows.',
      'Teams collaborated inefficiently because there were no real-time updates or shared working environment.',
      'Factory teams struggled to read complex 3D designs, which led to miscommunication and errors on site.',
      'Mobile and remote access was limited, which restricted on-the-go decisions and model review.',
    ],
    solutions: [
      'A secure, web-based 3D model viewer open to every team member without specialist software.',
      'Much faster model loading through optimised use of Autodesk Platform Services.',
      'Real-time collaboration and updates, so stakeholders stay in step across the project.',
      'Simpler 3D visualisation for factory teams, which cuts miscommunication and reads complex designs more precisely.',
      'A fully responsive app for mobile, tablet and desktop, supporting flexible workflows.',
    ],
    outcome: [
      'The platform reached more than 62 active users and is projected to save about £15,000 a year in software licences.',
    ],
    metrics: [
      { value: '62+', label: 'Active users' },
      { value: '£15,000', label: 'Projected annual licensing savings' },
    ],
    note: 'Screenshots are not shown because they include client project names and 3D models. The diagram above shows how the platform fits together.',
    flow: [
      'BIM 360 hub',
      'Autodesk Platform Services',
      'Spark Construct web app on Azure',
      'Any device, no Revit licence',
    ],
    sub: [
      {
        title: 'Autodesk Platform Services integration',
        summary: 'Secure access to model data, with faster loading than opening the file in Revit.',
      },
      {
        title: 'BIM 360 model viewer',
        summary: 'A browser viewer for hubs, projects and models, built for non-modellers and factory teams.',
      },
      {
        title: 'Logging and monitoring',
        summary: 'A SQL database behind the app for usage logging and real-time monitoring.',
      },
    ],
    figures: [],
  },
  {
    slug: 'iot-atlas',
    series: 'BA',
    title: 'IoT Atlas',
    subtitle: 'Real-time device data for smart environments',
    summary:
      'A platform for aggregating, visualising and managing IoT device data in real time, so smart buildings give people something to act on.',
    type: 'Front end',
    role: 'Lead front-end developer',
    organisation: 'Merit',
    place: 'Newcastle, UK',
    period: '2025–2026',
    scope: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Azure',
      'Docker',
      'Real-time data',
      'Data visualisation',
      'Figma',
    ],
    brief: [
      'IoT Atlas collects data from IoT devices and presents it in one place, with live dashboards for monitoring and tools for managing devices.',
      'I led a front-end rebuild that replaced a disconnected interface with one design system across every module.',
    ],
    approach: [
      'Led front-end development in React and Tailwind CSS, hosted on Azure with private endpoints.',
      'Owned UI and UX design, integration with the backend APIs, data visualisation and deployment.',
      'Built a shared design system so every module looks and behaves the same.',
    ],
    challenges: [
      'The interface was disconnected and inconsistent across modules, so it was hard to navigate and read device data.',
      'Data visualisation was not real time and updates were slow, which got in the way of monitoring.',
      'Onboarding a device was manual and error-prone, which caused delays and mistakes.',
      'Managing and searching large numbers of devices and data streams was difficult.',
      'The interface was poorly responsive and hard to use on mobile for field engineers.',
      'Branding was inconsistent and data was presented unclearly.',
    ],
    solutions: [
      'A front-end revamp with a unified design system and clearer navigation.',
      'Real-time charts and dashboards for instant monitoring of device metrics.',
      'Guided forms with automatic validation for device onboarding, which cuts set-up time and errors.',
      'Search, filtering and pagination for devices and data.',
      'A fully responsive interface that works on mobile, tablet and desktop.',
      'A consistent visual language and clearer data visualisation.',
    ],
    outcome: [],
    note: 'Client names and colleagues’ details are removed from the screens shown here.',
    thumb: {
      src: '/projects/iot-atlas/login-tablet.webp',
      alt: 'IoT Atlas sign-in screen on a tablet',
      caption: 'Redesigned IoT Atlas sign-in screen.',
    },
    sub: [
      {
        title: 'Real-time dashboards',
        summary: 'Live charts of device metrics, readable at a glance.',
      },
      {
        title: 'Device onboarding',
        summary: 'Guided forms with automatic validation, replacing a manual process.',
      },
      {
        title: 'Search and filtering',
        summary: 'Search, filtering and pagination across large numbers of devices.',
      },
    ],
    figures: [],
    comparisons: [
      {
        label: 'Trend chart',
        before: {
          src: '/projects/iot-atlas/old-chart.webp',
          alt: 'The original energy trend chart on a plain black page',
          caption: 'Before',
        },
        after: {
          src: '/projects/iot-atlas/new-chart.webp',
          alt: 'The redesigned energy trend chart inside a panel with side navigation',
          caption: 'After',
        },
      },
      {
        label: 'Sign-in',
        before: {
          src: '/projects/iot-atlas/old-login.webp',
          alt: 'The original sign-in form with username and password',
          caption: 'Before',
        },
        after: {
          src: '/projects/iot-atlas/new-login.webp',
          alt: 'The redesigned sign-in screen with an illustration and Microsoft sign-in',
          caption: 'After',
        },
      },
    ],
  },
  {
    slug: 'bim-workflow-automation',
    series: 'BA',
    title: 'BIM workflow automation',
    subtitle: 'From a request in Teams to a report in Power BI',
    summary:
      'A pipeline that takes BIM tasks from Microsoft Teams and Planner into Power BI reporting through Power Automate.',
    type: 'Automation',
    role: 'BIM and Digital Construction Specialist',
    organisation: 'Merit',
    place: 'Newcastle, UK',
    period: '2023–2026',
    scope: ['Microsoft Teams', 'Planner', 'Power Automate', 'Power BI'],
    brief: [
      'BIM coordination generates a steady stream of small tasks across teams. I built a connected pipeline so those tasks are raised, tracked and reported without copying data between tools by hand.', // EDIT
    ],
    approach: [
      'Requests are raised in Microsoft Teams and tracked as tasks in Planner.', // EDIT
      'Power Automate flows move the task data between the tools.', // EDIT
      'Power BI reports on the task data for the wider team.', // EDIT
    ],
    outcome: [], // EDIT: add the measured result (hours saved, tasks tracked, teams using it).
    flow: [
      'Request in Microsoft Teams',
      'Task in Planner',
      'Power Automate flow',
      'Power BI report',
    ],
    sub: [
      {
        title: 'Task intake',
        summary: 'Requests raised in Microsoft Teams and tracked as Planner tasks.', // EDIT
      },
      {
        title: 'Automated flows',
        summary: 'Power Automate flows that move task data between the tools.', // EDIT
      },
      {
        title: 'Reporting',
        summary: 'Power BI reporting built on the task data.', // EDIT
      },
    ],
    figures: [],
  },
  {
    slug: 'revit-api-tools',
    series: 'BA',
    draft: true, // EDIT: describe one real tool, add sub-projects, then remove this line.
    title: 'Revit API tools',
    subtitle: 'Add-ins that take repetitive work out of Revit',
    summary: 'Revit add-ins that automate repetitive modelling and documentation tasks.',
    type: 'Revit API',
    role: 'Developer',
    organisation: 'Merit',
    place: 'Newcastle, UK',
    period: '2023–2026',
    scope: ['Revit API'],
    brief: ['Describe the problem the add-ins solved and who used them.'],
    approach: ['Describe how you built them.'],
    outcome: [],
    sub: [],
    figures: [],
  },
  {
    slug: 'jaquar-spaces',
    series: 'AR',
    title: 'Jaquar regional centres, offices and showrooms',
    subtitle: 'Design, working drawings and furniture detailing',
    summary:
      'Design, working drawings and furniture detailing for Jaquar’s regional centres, offices and showrooms, including its premium range and lighting.',
    type: 'Interior architecture',
    role: 'Senior Designer',
    organisation: 'Zeppelin Design and Environments',
    place: 'India',
    period: '2020–2022',
    scope: ['Interior design', 'Working drawings', 'Furniture detailing'],
    brief: [
      'Jaquar was the main client at Zeppelin Design and Environments. I designed spaces for its regional centres, offices and showrooms, from concept through to the drawings a contractor builds from.',
    ],
    approach: [
      'Led design and execution for commercial, hospitality and retail projects.',
      'Produced working drawing sets, and detailed the bespoke furniture at the level a joiner needs.',
      'Coordinated with vendors and contractors, and streamlined documentation across the team.',
    ],
    outcome: [],
    note: 'Add images of built work here when you have permission to publish them.',
    sub: [
      {
        title: 'Regional centres',
        summary: 'Design development and working drawings for regional centres.', // EDIT
      },
      {
        title: 'Offices',
        summary: 'Design development and working drawings for offices.', // EDIT
      },
      {
        title: 'Showrooms',
        summary: 'Showrooms for the premium range and lighting, with detailed furniture drawings.', // EDIT
      },
    ],
    figures: [],
  },
  {
    slug: 'expo-booths',
    series: 'AR',
    title: 'Expo booths and concept design',
    subtitle: 'Concept designs and presentations for major clients',
    summary:
      'Conceptual designs and client presentations, including expo booths for large-scale events, delivered on tight timelines.',
    type: 'Architecture',
    role: 'Architect',
    organisation: 'Sconce Global',
    place: 'India',
    period: '2019–2020',
    scope: ['Concept design', 'Presentations', 'Exhibition design'],
    brief: [
      'At Sconce Global I created conceptual designs and presentations for major clients, and designed expo booths for large-scale events.',
    ],
    approach: [
      'Developed concepts and presented them to clients.',
      'Worked with cross-functional teams and delivered on tight timelines.',
    ],
    outcome: [],
    note: 'Add images of booths or concept boards here when you have permission to publish them.',
    sub: [],
    figures: [],
  },
];

// Smaller front-end builds, shown as a short list under the main work.
export const sideProjects: SideProject[] = [
  {
    title: 'Ibtida Restaurant',
    description: 'A restaurant website with a digital menu and online ordering.',
    tags: ['React', 'Tailwind CSS', 'MongoDB'],
    href: 'https://ibtida.netlify.app/',
  },
  {
    title: 'BMI Calculator',
    description: 'A BMI calculator in plain JavaScript and Tailwind CSS.',
    tags: ['JavaScript', 'Tailwind CSS'],
    href: 'https://bmicalculator-tailwind.netlify.app/',
  },
];

const pad = (n: number) => String(n).padStart(2, '0');

export const visibleProjects = (): Project[] =>
  projects.filter((p) => !p.draft || import.meta.env.DEV);

export const projectsInSeries = (series: SeriesCode): Project[] =>
  visibleProjects().filter((p) => p.series === series);

export const sheetNumber = (p: Project): string =>
  `${p.series}-${pad(projectsInSeries(p.series).indexOf(p) + 1)}`;

export const subSheetNumber = (p: Project, index: number): string =>
  `${sheetNumber(p)}.${index + 1}`;

export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
