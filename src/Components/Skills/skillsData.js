const skillsData = [
  // 🧱 Core Frontend
  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    info: "Structure of web pages using semantic markup.",
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    info: "Styling and layout with modern CSS techniques.",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    info: "Adding interactivity and dynamic behavior.",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    info: "Strongly typed JavaScript for scalable apps.",
  },
  {
    name: "Sass / SCSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    info: "Advanced CSS preprocessor for better styling structure.",
  },

  // ⚛️ Frameworks & Libraries
  {
    name: "React.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    info: "Building modern, component-based UIs.",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    info: "Full-stack React framework for SSR and SEO.",
  },
  {
    name: "Redux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    info: "State management for complex React apps.",
  },
  {
    name: "Context API",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    info: "Lightweight state sharing between components.",
  },

  // 🎨 UI Frameworks & Design Systems
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    info: "Utility-first CSS framework for fast styling.",
  },
  {
    name: "Bootstrap",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    info: "Responsive UI framework for quick design.",
  },
  {
    name: "shadcn/ui",
    icon: "https://ui.shadcn.com/favicon.ico",
    info: "Modern, customizable UI components for React.",
  },
  {
    name: "React Bits",
    icon: "https://react.dev/images/og-home.png",
    info: "Collection of modern React UI components.",
  },
  {
    name: "Material UI (MUI)",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    info: "Popular React component library following Material Design.",
  },

  // ⚙️ Tools & Development
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    info: "Version control system for tracking changes.",
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    info: "Platform for code hosting and collaboration.",
  },
  {
    name: "Vercel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    info: "Fast deployment platform for frontend projects.",
  },
  {
    name: "Netlify",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
    info: "Modern hosting for web applications and static sites.",
  },

  // 🌐 APIs & Data Fetching
  {
    name: "REST APIs",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    info: "Connecting frontend with backend data sources.",
  },
  {
    name: "Axios",
    icon: "https://avatars.githubusercontent.com/u/32372333?s=200&v=4",
    info: "Promise-based HTTP client for APIs.",
  },
  {
    name: "SWR",
    icon: "https://raw.githubusercontent.com/vercel/swr/main/.github/swr-logo.svg",
    info: "Data fetching library with caching and revalidation.",
  },
  {
    name: "React Query",
    icon: "https://tanstack.com/_build/assets/logo-color-600w-35tYQq.png",
    info: "Powerful data synchronization for React apps.",
  },
  {
    name: "NextAuth.js",
    icon: "https://next-auth.js.org/img/logo/logo-sm.png",
    info: "Authentication and authorization for Next.js apps.",
  },

  // 📈 Performance & Optimization
  {
    name: "Performance Optimization",
    icon: "https://cdn-icons-png.flaticon.com/512/753/753318.png",
    info: "Improving load times and runtime efficiency.",
  },
  {
    name: "SEO",
    icon: "https://cdn-icons-png.flaticon.com/512/3844/3844724.png",
    info: "Improving visibility and performance in search engines.",
  },

  // 🧩 Animation & UX
  {
    name: "GSAP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/greensock/greensock-original.svg",
    info: "High-performance animations for web elements.",
  },
  {
    name: "Framer Motion",
    icon: "https://seeklogo.com/images/F/framer-motion-logo-DA1E33CAA1-seeklogo.com.png",
    info: "Animations and transitions for React components.",
  },

  // 🧠 Other Skills
  {
    name: "Clean Code",
    icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    info: "Writing readable, maintainable, and efficient code.",
  },
  {
    name: "Problem Solving",
    icon: "https://cdn-icons-png.flaticon.com/512/1055/1055646.png",
    info: "Analyzing and implementing optimal solutions.",
  },
  {
    name: "UI/UX Principles",
    icon: "https://cdn-icons-png.flaticon.com/512/10312/10312592.png",
    info: "Designing user-friendly and accessible interfaces.",
  },
  {
    name: "SQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    info: "Structured query language for managing and querying databases.",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    info: "Popular open-source relational database management system.",
  },
  {
    name: "React Native",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    info: "Framework for building native mobile apps using React.",
  },
  {
    name: "Microsoft Office",
    icon: "https://cdn-icons-png.flaticon.com/512/888/888846.png",
    info: "Proficient in Excel, Word, and PowerPoint for data and documentation.",
  },
  {
    name: "WordPress",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg",
    info: "CMS for building and managing dynamic websites efficiently.",
  },
  {
    name: "CRUD with JavaScript",
    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    info: "Building full CRUD systems using native JavaScript.",
  },
  {
    name: "Front-end Project Deployment",
    icon: "https://cdn-icons-png.flaticon.com/512/876/876994.png",
    info: "Deploying web applications",
  },
  {
    name: "React Context API",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    info: "Managing state across React components without Redux.",
  },
  {
    name: "EmailJS Integration",
    icon: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
    info: "Sending emails from frontend apps without a backend using EmailJS.",
  },

  {
    name: "Agile Methodology",
    icon: "https://cdn-icons-png.flaticon.com/512/2910/2910763.png",
    info: "Managing projects and tasks using Agile principles for iterative development.",
  },
  {
    name: "Project Management",
    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    info: "Planning, organizing, and tracking frontend projects efficiently.",
  },
  {
    name: "Figma",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    info: "Designing wireframes, prototypes, and UI/UX layouts.",
  },
  {
    name: "UI/UX Testing",
    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135740.png",
    info: "Validating user flows and interface designs for usability and accessibility.",
  },
];

export default skillsData;
