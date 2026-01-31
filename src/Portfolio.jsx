import React, { useState, useEffect, useRef } from 'react';
import GlobalBackground from './components/GlobalBackground';
import GlowingCursor from './components/GlowingCursor';
import Carousel from './components/Carousel';
import {
    ArrowUpRight,
    ArrowRight,
    Mail,
    Linkedin,
    Menu,
    X,
    Database,

    Layout,
    Code,
    Award,
    BookOpen,
    GraduationCap,
    Users,
    BarChart3,
    Cpu,
    Globe,
    MessageSquare,
    Send,

    Download,
    Github,
    ChevronDown,
    Quote,
    ExternalLink
} from 'lucide-react';

// --- Data ---
const personalInfo = {
    name: "Chetanya Ved",
    role: "Associate Product Manager",
    subRole: "AdTech & Data Strategy",
    company: "Unibots",
    email: "chetanyaved@gmail.com",
    phone: "+91 9354523282",
    location: "New Delhi, India",
    tagline: "On a mission of exploring Intersection - How AI will shape the future of Products, Business and Customer Experience",
    about: "I am an Associate Product Manager with a unique blend of AdTech expertise and technical depth (Python, SQL, ML). Currently driving revenue growth at Unibots by building 0-1 tools and automation pipelines. My background in rigorous research enables me to solve complex problems with data-backed precision.",
    linkedin: "https://www.linkedin.com/in/chetanyaved/"
};

const stats = [
    { label: "Experience", value: "2+ Years" },
    { label: "Revenue Impact", value: "10-15%" },
    { label: "Efficiency Boost", value: "20-30%" },
    { label: "Citations", value: "100+" },
];

const experiences = [
    {
        company: "Unibots",
        role: "Associate Product Manager",
        period: "Dec 2024 — Present",
        type: "New Delhi, India",
        achievements: [
            "Owned end-to-end product execution for multiple internal dashboards & tools, reporting directly to the CEO/founders and leading cross-functional delivery with a team of 5(engineering + QA).",
            "Built 0→1 Keyword Research Tool reducing research time by 70–80% of Media-Buyers and enabling high-RPC campaigns contributing 10–15% revenue.",
            "Managed 5+ revenue products in the New Product Development team contributing 30–35% company revenue.",
            "Designed all-in-one campaign creation system reducing launch time by 50–60% with automation and policy checks.",
            "Developed business proposals for the CEO to launch intent-based advertising campaigns for brands, authoring 5+ case studies and validating new campaign models across domains."
        ],
        tags: ["Product Management", "AdTech", "0-1 Build", "Automation"]
    },
    {
        company: "Product Space",
        role: "Product Management Fellow",
        period: "Aug 2024 — Dec 2024",
        type: "Remote",
        achievements: [
            "Gained hands-on experience addressing user pain points and potential drop-offs through usability testing of various products.",
            "Conducted 30+ User Interviews for Product Improvement, Design & Teardowns to enhance user experiences",
            "Led a team of 5 experienced individuals for capstone and product teardowns, also successfully worked upon 10+ Product Cases."
        ],
        tags: ["User Research", "Usability Testing", "Product Strategy"]
    },
    {
        company: "Stellar Search",
        role: "Research Associate",
        period: "July 2023 — July 2024",
        type: "Gurugram, India",
        achievements: [
            "Partnered with Principals and Senior Consultants to understand client needs and craft tailored search strategies.",
            "Conducted market research under Chairperson’s office for business development mandates in Fintech Industry which contributed to 10% growth in Clientele.",
            "Implementing strategic research on business development mandates contributed to 20% in revenue growth in FY2023-24"
        ],
        tags: ["Market Research", "Business Development", "Strategy"]
    },
    {
        company: "UPSC Preparation & Research",
        role: "UPSC Preparation & Academic Researcher",
        period: "July 2021 — July 2023",
        type: "New Delhi, India",
        achievements: [
            "Prepared for India Civil Services exam for 2 Years.",
            "Presented 2 Research Papers in IEEE Conference (InCACCT2024).",
            "Published 10 Research Papers & Book Chapters in Journals & Academic Books, which have received over 100+ citations in various Journals and academic books."
        ],
        tags: ["Academic Writing", "Deep Learning", "Data Analysis"]
    }
];

const education = {
    degree: "B.Tech in Information Technology",
    university: "Guru Gobind Singh Indraprastha University",
    year: "2017 - 2021",
    location: "New Delhi, India",
    grade: "CGPA: 8.21/10"
};

const projects = [
    {
        title: "Web Traffic Classification",
        type: "Flask + ML Service",
        focus: "Bot Detection",
        outcome: "High Accuracy",
        github: "https://github.com/chetanya1998/3D_Visualisation_Web_Traffic",
        desc: "Implemented an ML pipeline to classify bot vs human traffic using Logistic Regression, Random Forest, and Isolation Forest.",
        structuredDesc: [
            { label: "Problem", text: "Raw logs are noisy; stealth bots evade single models and cause false positives." },
            { label: "Solution", text: "Built Flask assessment API with 3-model benchmark (LogReg, RF, IsoForest) & traffic simulator." },
            { label: "Impact", text: "Delivered deployable service + 3 model baselines + repeatable evaluation pipeline." }
        ],
        icon: <Cpu className="text-purple-400" size={28} />
    },
    {
        title: "Utility-First NFT Marketplace",
        type: "Web3 / React Native",
        focus: "User Experience",
        outcome: "Simplified Onboarding",
        github: "https://github.com/chetanya1998/NFT-Market-Place",
        demo: "https://chetanya1998.github.io/NFT-Market-Place/",
        desc: "Designed a marketplace where collectibles are utility keys, making web3 approachable via mobile-first UX.",
        structuredDesc: [
            { label: "Problem", text: "Most NFT platforms are trading-first and intimidating. Lack of clear utility hurts retention." },
            { label: "Solution", text: "Defined MVP for utility-based ownership. Built marketplace foundation with listing/browsing flows." },
            { label: "Users", text: "Youth buyers seeking rewards; Creators growing community; Partners tracking usage." }
        ],
        icon: <Globe className="text-blue-400" size={28} />
    },
    {
        title: "Bot Behavior Profiling Tool",
        type: "Security / Data Science",
        focus: "Threat Intelligence",
        outcome: "Behavioral Clustering",
        github: "https://github.com/chetanya1998/Base_Bot_Profiler",
        desc: "Profiling tool using UMAP clustering to identify bot archetypes beyond binary classification.",
        structuredDesc: [
            { label: "Problem", text: "Binary classification fails when tactics shift. Teams need to identify specific bot behaviors." },
            { label: "Solution", text: "Built pipeline: Attack Sim -> Logging -> Feature Extraction -> UMAP Clustering." },
            { label: "Impact", text: "Enabled interpretation of clusters (paths, rates, sessions) for faster countermeasure design." }
        ],
        icon: <BarChart3 className="text-orange-400" size={28} />
    },
    {
        title: "Smart Traffic Firewall",
        type: "Real-time Security",
        focus: "Traffic Monitoring",
        outcome: "Auto-Blocking",
        github: "https://github.com/chetanya1998/Firewall_MVP",
        desc: "Real-time system detecting automated abuse via logging, behavioral features, and anomaly models.",
        structuredDesc: [
            { label: "Problem", text: "Logs are noisy; manual response is slow. Detection without enforcement creates blind spots." },
            { label: "Solution", text: "Flask ingestion + Traffic Simulator + Monitoring Agent (Anomaly Models) + Action Layer." },
            { label: "JTBD", text: "Monitor traffic, quarantine offenders, simulate attacks, and retrain models." }
        ],
        icon: <Code className="text-red-400" size={28} />
    },
    {
        title: "Papersmith",
        type: "AI Research Assistant",
        focus: "Productivity",
        outcome: "10+ AI Outputs",
        demo: "https://paper-smith-e7684bce.base44.app/login?from_url=https%3A%2F%2Fpaper-smith-e7684bce.base44.app%2F",
        desc: "AI platform for researchers to extract summaries, methodologies, and actionable ideas from dense PDFs.",
        structuredDesc: [
            { label: "Problem", text: "Researchers spend excessive time extracting methodologies and ideas from dense PDFs without an organized workflow." },
            { label: "Solution", text: "Shipped core workflows (PDF upload, dashboards) and 10+ AI outputs (summary, method, mind maps) with offline caching." },
            { label: "Users", text: "Researchers summarizing contributions; Students creating study assets; Builders finding MVP ideas." }
        ],
        icon: <BookOpen className="text-teal-400" size={28} />
    }
];

const leadership = [
    {
        role: "1st Position",
        org: "PM School Competition",
        desc: "Secured 1st rank for the Finshots Product Case Study."
    },
    {
        role: "1st Position",
        org: "PM School Competition",
        desc: "Secured 1st rank for the Elderfit Case Study."
    },
    {
        role: "1st Position",
        org: "Product Space - PM Hackathon 2.0",
        desc: "Winner of the Product Management Hackathon."
    },
    {
        role: "Best Pitch Award",
        org: "Unibots",
        desc: "Awarded for building a product within 30 hours during a company-wide hackathon event."
    },
    {
        role: "Vice-Chairperson",
        org: "IEEE Student Branch",
        desc: "Led the student branch operations and initiatives during the 2020-2021 tenure."
    }
];

const leadershipRoles = [
    {
        role: "IEEE-Vice-Chairperson of BVCOE (2020-21)",
        points: [
            <>Organized and managed <span className="text-white font-medium">10+ speaker sessions</span> in collaboration with Industry Experts.</>,
            <>Co-Founder & Head Supervisor of the <span className="text-white font-medium">36-Hour International Women-Centric Hackathon called as</span> <a href="https://wiehack.bwividyapeeth.edu.in/" target="_blank" rel="noreferrer" className="text-orange-500 hover:underline decoration-orange-500/30">WIEHACK 3.0</a>.</>,
            <>Spearheaded a team of <span className="text-white font-medium">74 Members</span>.</>,
            <>Received <span className="text-white font-medium">Dr JK Pal Memorial Award</span> from IEEE Delhi Section.</>,
            <>Received over <span className="text-white font-medium">50 IEEE membership applications</span>.</>
        ]
    },
    {
        role: "IEEE (IAS) - Chairperson | IEEE-Head of Public and Corporate Affairs Relations (2019 -20)",
        points: [
            <>Headed dual <span className="text-white font-medium">responsiblities</span>.</>,
            <>Spearheaded a team of <span className="text-white font-medium">50 members</span>.</>,
            <>Introduced and <span className="text-white font-medium">organized</span> a Smart City workshop.</>,
            <>Organized a workshop on Mozilla Add-ons with a Mozilla Representative.</>,
            <>Event Manager of <span className="text-white font-medium">WIEHack 2.0</span>.</>,
            <>Raised Sponsorship of more than <span className="text-white font-medium">20 Lacs</span> in kinds.</>
        ]
    },
    {
        role: "Head E-Cell (2018-19)",
        points: [
            <>Spearheaded the Team of <span className="text-white font-medium">30+ Members</span>.</>,
            <>Collaborated with KIET E-CELL and signed an MoU for marketing and publicity of events.</>,
            <>Organized workshop on <span className="text-white font-medium">Research-Build-Plan Entrepreneurship</span>.</>,
            <>Head Instructor of <span className="text-white font-medium">Aurora Workshop (Drone Making Workshop)</span>.</>,
            <>Founder and Manager of <span className="text-white font-medium">Plan for India Event</span> in association with PayTM.</>
        ]
    }
];

const publications = [
    { title: "Hybrid Deep Learning Approach for Product Categorization in E-Commerce", citations: "4", context: "AIP Conference Proceedings", link: "https://www.notion.so/chetanya-ev-project/Hybrid-Deep-Learning-Approach-for-Product-Categorization-in-E-Commerce-ecc5182d92d8437e83c59278440b93ff?source=copy_link" },
    { title: "Blockchain in Pharmaceutical Sector", citations: "29", context: "Applications of blockchain in healthcare", link: "https://www.notion.so/chetanya-ev-project/Blockchain-In-Pharmaceutical-Sector-048966ace1c24884b59ca471769b152a?source=copy_link" },
    { title: "Emergence of Blockchain Applications with the 6G-Enabled IoT-Based Smart City", citations: "9", context: "Blockchain for 6G-Enabled Networks", link: "https://www.notion.so/chetanya-ev-project/Emergence-of-Blockchain-Applications-with-the-6G-Enabled-IoT-Based-Smart-City-491aa6ade0cb47bcbb305ee0b7199fe0?source=copy_link" },
    { title: "YOLO-Based Vehicle Detection and Counting for Traffic Control on Highway", citations: "7", context: "2024 2nd Intl Conference on Computation", link: "https://www.notion.so/chetanya-ev-project/YOLO-Based-Vehicle-Detection-and-Counting-for-Traffic-Control-on-Highway-e26f7d4b62714dc2a6359f601025168a?source=copy_link" },
    { title: "Prediction of Kyphosis Disease Using Random Forest and Gradient Boosting Algorithm", citations: "1", context: "2024 2nd Intl Conference on Computation", link: "https://www.notion.so/chetanya-ev-project/Prediction-of-Kyphosis-Disease-Using-Random-Forest-and-Gradient-Boosting-Algorithm-b6fa0b9a1eb0466b9d5c12c3d7910c65?source=copy_link" },
    { title: "The Emergence of Blockchain Technology in Industrial Revolution 5.0", citations: "5", context: "Privacy Preservation of Genomic Data", link: "https://www.notion.so/chetanya-ev-project/The-Emergence-of-Blockchain-Technology-in-Industrial-Revolution-5-0-873d38fbbaa9448a84f6d8b8f3458f9e?source=copy_link" },
    { title: "Decentralized and Secured Applications of Blockchain in the Biomedical Domain", citations: "3", context: "Applications of blockchain and big IoT", link: "https://www.notion.so/chetanya-ev-project/Decentralized-and-Secured-Applications-of-Blockchain-in-the-Biomedical-Domain-837c3b8ccb4e4f7f944547a5593850b0?source=copy_link" },
    { title: "Digital Twin in Agriculture Sector: Detection of Disease Using Deep Learning", citations: "13", context: "Digital Twin Technology", link: "https://www.notion.so/chetanya-ev-project/Digital-Twin-in-Agriculture-Sector-Detection-of-Disease-Using-Deep-Learning-b10898d1bdd44c2bbf08bd22da1cc5fc?source=copy_link" },
    { title: "Healthcare Solutions for the Next Generation", citations: "5", context: "Recent Trends in Blockchain", link: "https://www.notion.so/chetanya-ev-project/Healthcare-Solutions-for-the-Next-Generation-A-Useful-Explanation-from-the-User-s-Perspective-30045bb4d57242aa80b17f24f1f48383?source=copy_link" },
    { title: "Decentralize Energy Network (DEN) In Assimilation with Blockchain", citations: "", context: "Research Paper", link: "https://www.notion.so/chetanya-ev-project/Decentralize-Energy-Network-DEN-In-Assimilation-with-Blockchain-30ee2cb6b83043fd9af417f8d78ca81b?source=copy_link" }
];

const skills = {
    product: ["User Research", "UI/UX Development", "Business & Marketing Modelling", "PRD Documentation", "AI-Powered Prototyping"],
    technical: ["Zoho Projects", "Linear", "Github", "Tableau", "PowerBI", "Google Suite", "Postman", "Google Analytics", "BASE44", "Codex", "Google Ads", "Google Adsense", "Firebase", "Notion"],
    // Keeping tools empty/merged as user requested replacement
    tools: []
};




// --- Animation Components ---

const FadeIn = ({ children, delay = 0, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();


    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const currentElement = domRef.current;
        if (currentElement) observer.observe(currentElement);
        return () => {
            if (currentElement) observer.unobserve(currentElement);
        };
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const TypewriterLine = ({ items, speed = 50 }) => {
    const [index, setIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                setIndex(0); // Reset animation when out of view
            }
        }, { threshold: 0.1 }); // Trigger when 10% visible

        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        // Small delay before starting to type after becoming visible
        const startTimeout = setTimeout(() => {
            const totalChars = items.reduce((acc, item) => acc + (item.text ? item.text.length : 0), 0);

            const interval = setInterval(() => {
                setIndex((prev) => {
                    if (prev >= totalChars) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + 1;
                });
            }, speed);

            // Cleanup interval on unmount or visibility change
            return () => clearInterval(interval);
        }, 200);

        return () => clearTimeout(startTimeout);
    }, [items, speed, isVisible]);

    // Render Logic
    let currentGlobalIndex = 0;

    return (
        <span ref={containerRef} className="inline-block">
            {items.map((item, i) => {
                if (item.type === 'break') {
                    return <br key={i} className="hidden md:block" />;
                }

                const startIndex = currentGlobalIndex;
                const endIndex = startIndex + item.text.length;
                currentGlobalIndex = endIndex;

                if (index < startIndex) return null;

                const sliceEnd = Math.min(item.text.length, index - startIndex);
                const textSlice = item.text.substring(0, sliceEnd);

                return (
                    <span key={i} className={item.className}>
                        {textSlice}
                    </span>
                );
            })}
            <span className="animate-pulse text-orange-500 font-light ml-0.5">|</span>
        </span>
    );
};

// GridBackground and CursorSpotlight removed as they are replaced by HeroBackground



// --- Structural Components ---

const NavItem = ({ href, label }) => (
    <a
        href={href}
        className="text-base font-medium tracking-wide text-neutral-400 hover:text-white transition-colors relative group"
    >
        {label}
        <span className="absolute -bottom-1 left-0 w-0 h-px bg-orange-500 transition-all group-hover:w-full"></span>
    </a>
);

const SectionHeader = ({ title, num }) => (
    <FadeIn>
        <div className="flex items-baseline gap-4 mb-12 border-b border-neutral-800 pb-4">
            <span className="font-mono text-orange-500 text-sm">0{num}</span>
            <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">{title}</h2>
        </div>
    </FadeIn>
);

export default function Portfolio() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openExperienceIndex, setOpenExperienceIndex] = useState(0);

    const toggleExperience = (index) => {
        setOpenExperienceIndex(openExperienceIndex === index ? -1 : index);
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const heroTypewriterItems = [
        { text: personalInfo.role, className: "" },
        { type: "break" }, // Responsive break
        { text: " @ ", className: "" },
        { text: personalInfo.company, className: "text-orange-500" }
    ];

    return (
        <div className="min-h-screen bg-transparent text-neutral-300 font-sans selection:bg-orange-500/30 selection:text-orange-100 relative overflow-x-hidden">
            <GlobalBackground />
            <GlowingCursor />


            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-neutral-950/90 backdrop-blur-lg border-b border-neutral-800 py-4 shadow-2xl' : 'py-4 md:py-6 bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
                    <a href="#" className="text-xl font-bold text-white tracking-tighter flex items-center gap-2 hover:scale-105 transition-transform">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        VED.
                    </a>

                    <div className="hidden md:flex items-center gap-8">
                        <NavItem href="#work" label="Work" />
                        <NavItem href="#projects" label="Projects" />
                        <NavItem href="#research" label="Research" />
                        <a href="https://drive.google.com/drive/folders/1zVni9cvt_s8TvqIpot_URAaL6RC7LrfB?usp=sharing" target="_blank" className="px-5 py-2 bg-neutral-100 text-neutral-900 text-base font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-orange-500/20">
                            Resume
                        </a>
                    </div>

                    <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-neutral-950/95 backdrop-blur-xl pt-24 px-6 md:hidden animate-in slide-in-from-top-10 duration-200">
                    <div className="flex flex-col gap-8 text-2xl font-light text-white">
                        <a href="#work" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-500 transition-colors">Work</a>
                        <a href="#projects" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-500 transition-colors">Projects</a>
                        <a href="#research" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-500 transition-colors">Research</a>
                        <a href={`mailto:${personalInfo.email}`} className="text-orange-500 font-medium">Contact</a>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 md:pt-60 md:pb-32 px-4 md:px-6 z-10 min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-8">
                            {/* Avatar - Mobile/Tablet */}


                            <FadeIn delay={100}>
                                <h1 className="text-4xl sm:text-5xl md:text-8xl font-medium text-white leading-[1.1] md:leading-[0.9] tracking-tight mb-8">
                                    {personalInfo.name}<span className="text-orange-500">.</span> <br />
                                    <span className="text-neutral-400 text-2xl sm:text-3xl md:text-5xl block mt-5 min-h-[3em] md:min-h-[2.5em]">
                                        <TypewriterLine items={heroTypewriterItems} />
                                    </span>
                                </h1>
                            </FadeIn>

                            <FadeIn delay={1200}>
                                <p className="text-xl md:text-2xl text-neutral-300 max-w-2xl leading-relaxed mb-10 border-l border-orange-500 pl-6">
                                    {personalInfo.tagline} <br />
                                    <span className="text-neutral-400 text-base md:text-lg mt-2 block">Based in {personalInfo.location}</span>
                                </p>
                            </FadeIn>

                            <FadeIn delay={1400}>
                                <div className="flex flex-col gap-6">
                                    {/* Primary Actions */}
                                    <div className="flex flex-wrap gap-4">
                                        <a href="#work" className="group flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-full text-white hover:bg-neutral-800 hover:border-orange-500/50 transition-all shadow-lg text-sm md:text-base font-medium">
                                            View Work
                                            <ArrowUpRight className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" size={16} />
                                        </a>
                                        <a
                                            href="https://drive.google.com/drive/folders/1zVni9cvt_s8TvqIpot_URAaL6RC7LrfB?usp=sharing"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group flex items-center justify-center gap-2 px-6 py-3 text-neutral-400 hover:text-white transition-colors border border-neutral-800 rounded-full hover:bg-neutral-900 text-sm md:text-base font-medium"
                                        >
                                            <Download size={18} /> Download Resume
                                        </a>
                                    </div>

                                    {/* Social Links */}
                                    <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
                                        <a
                                            href="https://scholar.google.com/citations?user=OqCUANwAAAAJ&hl=en"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group flex items-center justify-center gap-2 px-5 py-2.5 text-neutral-400 hover:text-white transition-all border border-neutral-800 rounded-full hover:bg-neutral-900 text-sm font-medium hover:border-neutral-700"
                                        >
                                            <BookOpen size={18} />
                                            <span>Scholar</span>
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/chetanya-ved/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group flex items-center justify-center gap-2 px-5 py-2.5 text-neutral-400 hover:text-white transition-all border border-neutral-800 rounded-full hover:bg-[#0077b5] hover:border-[#0077b5] text-sm font-medium"
                                        >
                                            <Linkedin size={18} />
                                            <span>LinkedIn</span>
                                        </a>
                                        <a
                                            href="https://github.com/chetanya1998"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group flex items-center justify-center gap-2 px-5 py-2.5 text-neutral-400 hover:text-white transition-all border border-neutral-800 rounded-full hover:bg-neutral-900 text-sm font-medium hover:border-neutral-700"
                                        >
                                            <Github size={18} />
                                            <span>GitHub</span>
                                        </a>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Stats Bento */}
                        <div className="md:col-span-4 w-full mt-8 md:mt-0">

                            {/* Stats Bento */}
                            <FadeIn delay={1600}>
                                <div className="grid grid-cols-2 gap-px bg-neutral-800 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
                                    {stats.map((stat, i) => (
                                        <div key={i} className="bg-neutral-900/80 backdrop-blur-sm p-6 hover:bg-neutral-800 transition-colors flex flex-col justify-center min-h-[140px] group cursor-default">
                                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-2 group-hover:text-orange-400 transition-colors">{stat.value}</h3>
                                            <p className="text-sm font-mono text-neutral-400 uppercase tracking-widest leading-relaxed">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 md:px-6 z-10 relative">

                {/* Selected Work */}
                <section id="work" className="py-16 md:py-24">
                    <SectionHeader num="1" title="Experience" />

                    <div className="space-y-0">
                        {experiences.map((exp, idx) => (
                            <FadeIn key={idx} delay={idx * 100}>
                                <div
                                    className={`group relative border-t border-neutral-800 transition-all duration-300 -mx-4 px-4 md:-mx-6 md:px-6 rounded-xl cursor-pointer ${openExperienceIndex === idx ? 'bg-neutral-900/30 py-8 md:py-10' : 'hover:bg-neutral-900/10 py-6 md:py-8'}`}
                                    onClick={() => toggleExperience(idx)}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                                        <div className="md:col-span-3">
                                            <span className="font-mono text-base md:text-lg text-neutral-400 block mb-1 group-hover:text-orange-500 transition-colors">{exp.period}</span>
                                            <span className="text-base text-neutral-500 block mb-3 font-medium">{exp.type}</span>
                                            {/* Mobile Chevron */}
                                            <div className="md:hidden mt-2 text-neutral-600 group-hover:text-orange-500 transition-colors">
                                                <ChevronDown size={20} className={`transform transition-transform duration-300 ${openExperienceIndex === idx ? 'rotate-180' : ''}`} />
                                            </div>
                                        </div>

                                        <div className="md:col-span-9 relative">
                                            {/* Desktop Chevron */}
                                            <div className="absolute right-0 top-1 hidden md:block text-neutral-600 group-hover:text-orange-500 transition-colors">
                                                <ChevronDown size={24} className={`transform transition-transform duration-300 ${openExperienceIndex === idx ? 'rotate-180' : ''}`} />
                                            </div>

                                            <h3 className="text-2xl md:text-3xl font-light text-white mb-2 group-hover:text-orange-100 transition-colors pr-8">
                                                {exp.role} {exp.company !== "UPSC Preparation & Research" && <><span className="text-neutral-500">at</span> <span className="text-orange-500">{exp.company}</span></>}
                                            </h3>

                                            <div className={`grid transition-all duration-300 ease-in-out ${openExperienceIndex === idx ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                                                <div className="overflow-hidden">
                                                    <ul className="space-y-3 mb-6">
                                                        {exp.achievements.map((item, i) => (
                                                            <li key={i} className="flex items-start text-neutral-300 text-base md:text-lg leading-relaxed">
                                                                <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0"></span>
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <div className="flex flex-wrap gap-2">
                                                        {exp.tags.map(tag => (
                                                            <span key={tag} className="text-sm md:text-base px-3 py-1.5 rounded border border-neutral-700 text-neutral-400 group-hover:border-neutral-600 transition-colors">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                        <div className="border-t border-neutral-800" />
                    </div>
                </section>

                {/* Quote Section */}
                <FadeIn delay={200}>
                    <section className="py-12 md:py-20 flex justify-center">
                        <div className="max-w-4xl text-center relative px-6">
                            <Quote className="text-neutral-800 absolute -top-8 -left-4 md:-left-12 transform -scale-x-100" size={64} />
                            <h2 className="text-2xl md:text-4xl font-serif italic text-neutral-400 leading-normal md:leading-relaxed">
                                "The best way to predict the future is to create it."
                            </h2>
                            <p className="mt-6 text-neutral-500 uppercase tracking-widest text-sm font-bold">— Peter Drucker</p>
                        </div>
                    </section>
                </FadeIn>

                {/* Projects Carousel */}
                <section id="projects" className="py-16 md:py-24">
                    <SectionHeader num="2" title="Side Projects" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project, idx) => (
                            <FadeIn key={idx} delay={idx * 100}>
                                <div className="group relative bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 md:p-8 hover:bg-neutral-900 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-900/10 transition-all duration-500 h-full flex flex-col overflow-hidden">
                                    <div className="absolute top-6 right-6 md:top-8 md:right-8 flex gap-3 opacity-0">
                                        {/* Hidden as requested */}
                                    </div>

                                    <div className="mb-6 md:mb-8">
                                        <div className="w-14 h-14 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center mb-6 group-hover:border-orange-500/20 transition-colors">
                                            {project.icon}
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-light text-white mb-2 group-hover:text-orange-100 transition-colors">{project.title}</h3>
                                        <p className="font-mono text-base text-orange-500">{project.type}</p>
                                    </div>

                                    {project.structuredDesc ? (
                                        <div className="space-y-4 mt-auto flex-1">
                                            {project.structuredDesc.map((item, i) => (
                                                <div key={i}>
                                                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1">{item.label}</span>
                                                    <p className="text-neutral-300 text-sm md:text-base leading-relaxed">{item.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 min-w-0">
                                                    <span className="block text-sm text-neutral-400 uppercase tracking-wider mb-1">Focus</span>
                                                    <span className="text-neutral-200 font-medium text-base md:text-lg break-words line-clamp-2">{project.focus}</span>
                                                </div>
                                                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 min-w-0">
                                                    <span className="block text-sm text-neutral-400 uppercase tracking-wider mb-1">Result</span>
                                                    <span className="text-green-400 font-medium text-base md:text-lg break-words line-clamp-2">{project.outcome}</span>
                                                </div>
                                            </div>

                                            <p className="text-neutral-300 leading-relaxed text-base md:text-lg border-l-2 border-neutral-700 pl-6 group-hover:border-orange-500/50 transition-colors mt-auto flex-1 line-clamp-4 text-ellipsis overflow-hidden">
                                                {project.desc}
                                            </p>
                                        </>
                                    )}

                                    <div className="mt-6 pt-6 border-t border-neutral-800/50 flex flex-wrap gap-3">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-neutral-950 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-orange-500/50 transition-colors text-sm font-medium"
                                            >
                                                <Github size={16} /> GitHub
                                            </a>
                                        )}
                                        {project.demo && (
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-full border border-neutral-700 text-white hover:bg-orange-600 hover:border-orange-600 transition-colors text-sm font-medium"
                                            >
                                                <ExternalLink size={16} /> Mockup
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </section>

                {/* Product Cases Analyzed */}
                <section id="product-cases" className="py-16 md:py-24">
                    <SectionHeader num="3" title="Product Cases Analyzed & Breakdowns" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Bumble Dating App", subtitle: "Sentiment Analysis", tags: ["Customer Review Analysis", "Market Research", "Data Analysis"], icon: "smartphone", color: "from-yellow-400 to-yellow-600", link: "https://www.notion.so/chetanya-ev-project/Bumble-Dating-App-Sentiment-Analysis-141c9bd6786e80468013d1fcb2b7641d?source=copy_link" },
                            { title: "Third Wave Coffee", subtitle: "Capstone Project", tags: ["Customer Acquisition", "Adoption", "Wireframes"], icon: "coffee", color: "from-amber-700 to-amber-900", link: "https://www.notion.so/chetanya-ev-project/Third-Wave-Coffee-Capstone-Project-111c9bd6786e8037896ef9de20ad38ce?source=copy_link" },
                            { title: "FitTrack", subtitle: "PRD", tags: ["PRD", "Product Design", "Product Improvement"], icon: "activity", color: "from-emerald-500 to-emerald-700", link: "https://www.notion.so/chetanya-ev-project/FitTrack-PRD-a018727168574bce8994ba2778171916?source=copy_link" },
                            { title: "FinBot", subtitle: "Personal Finance Manager", tags: ["Product Design", "Wireframes", "Fintech"], icon: "dollar-sign", color: "from-green-600 to-green-800", link: "https://www.notion.so/chetanya-ev-project/FinBot-Personal-Finance-Manager-107c9bd6786e80d288cde7bb1542750c?source=copy_link" },
                            { title: "ATM for the Elderly", subtitle: "Design Case Study", tags: ["Market Research", "Product Improvement"], icon: "credit-card", color: "from-blue-600 to-blue-800", link: "https://www.notion.so/chetanya-ev-project/Case-Study-Design-an-ATM-for-the-Elderly-938aaffea94a4bb8a209fdb2c1c4ca43?source=copy_link" },
                            { title: "Elderfit", subtitle: "Product Case Study", tags: ["Product Innovation", "Product Design", "Wireframes"], icon: "heart", color: "from-red-500 to-red-700", link: "https://www.notion.so/chetanya-ev-project/Elderfit-Product-Case-Study-ccfbffd632db4907889bdee7032844a2?source=copy_link" },
                            { title: "Finshots", subtitle: "Product Case Study", tags: ["Fintech", "Product Improvement", "Wireframes"], icon: "trending-up", color: "from-blue-400 to-blue-600", link: "https://www.notion.so/chetanya-ev-project/Finshots-Product-Case-Study-d19d44940d3f4f18b01bbc8be558bc37?source=copy_link" },
                            { title: "Spotify", subtitle: "Product Case Study", tags: ["Market Research", "Product Improvement", "Wireframes"], icon: "mouse-pointer", color: "from-green-500 to-green-700", link: "https://www.notion.so/chetanya-ev-project/Spotify-Product-Case-Study-479ca6717ced4a3fbabdd32fd818c16b?source=copy_link" },
                            { title: "Evernote", subtitle: "Product Case Study", tags: ["Product Improvement", "Product Design", "Wireframes"], icon: "file-text", color: "from-green-400 to-green-600", link: "https://www.notion.so/chetanya-ev-project/Evernote-Product-Case-Study-cb6574893d4d4991af869613af275105?source=copy_link" },
                            { title: "Google Maps", subtitle: "Improving Navigation", tags: ["Product Design", "Product Improvement"], icon: "map", color: "from-red-500 to-yellow-500", link: "https://chetanya-ev-project.notion.site/Google-Maps-Improving-Navigation-Screens-12fe6f8166df43c1948f3ea9b13dc327" },
                            { title: "EV Industry", subtitle: "Competitive Dynamics", tags: ["Market Research", "EV"], icon: "zap", color: "from-blue-500 to-purple-500", link: "https://www.notion.so/chetanya-ev-project/Analyzing-Competitive-Dynamics-and-Market-Opportunities-in-the-Global-Electric-Vehicle-EV-Industry-49cb52c1609c4ecbafa2c60d8f7dd048?source=copy_link" }
                        ].map((item, idx) => (
                            <FadeIn key={idx} delay={idx * 50}>
                                <a
                                    href={item.link || undefined}
                                    target={item.link ? "_blank" : undefined}
                                    rel={item.link ? "noreferrer" : undefined}
                                    className={`group h-full bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-900/5 transition-all duration-300 flex flex-col ${item.link ? 'cursor-pointer' : 'cursor-default'}`}
                                    onClick={(e) => !item.link && e.preventDefault()}
                                >
                                    {/* Thumbnail Placeholder */}
                                    <div className={`h-40 w-full bg-gradient-to-br ${item.color} relative p-6 flex flex-col justify-between group-hover:scale-105 transition-transform duration-500`}>
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                        <div className="relative z-10 p-3 bg-white/20 backdrop-blur-md rounded-xl w-fit text-white">
                                            {/* Icons would normally be imported, using generic box for now if dynamic import tricky, but assuming Lucide usage */}
                                            {/* Mapping string to component is tricky in loop without a map object. Using generic icon for simplicity in this snippet, or I will update imports later. 
                                                Actually, I'll use a simple generic icon here effectively or rely on conditional rendering if I can.
                                                Simplest approach: Just use ArrowUpRight in corner and the text title.
                                             */}
                                            <ArrowUpRight size={20} className="text-white" />
                                        </div>
                                        <h3 className="relative z-10 text-xl font-bold text-white shadow-sm">{item.title}</h3>
                                    </div>

                                    <div className="p-5 flex flex-col flex-1">
                                        <h4 className="text-neutral-200 font-medium mb-3">{item.subtitle}</h4>

                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {item.tags.map((tag, tIdx) => (
                                                <span key={tIdx} className="text-xs px-2 py-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-400">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className={`mt-4 pt-4 border-t border-neutral-800 flex items-center gap-2 text-sm text-orange-500 font-medium transition-all ${item.link ? 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0' : 'hidden'}`}>
                                            Read Case Study <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </a>
                            </FadeIn>
                        ))}
                    </div>
                </section>

                {/* Research, Education & Skills */}
                <section id="research" className="py-16 md:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                        {/* Left Column: Publications, Initiatives, Education */}
                        <div className="md:col-span-7 space-y-12 md:space-y-16">

                            {/* Publications */}
                            <div>
                                <SectionHeader num="4" title="Publications" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {publications.map((pub, idx) => (
                                        <FadeIn key={idx} delay={idx * 100}>
                                            <a
                                                href={pub.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="h-full p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800 hover:border-orange-500/30 hover:bg-neutral-900 transition-all duration-300 flex flex-col group relative overflow-hidden cursor-pointer"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors shrink-0">
                                                        <BookOpen size={18} />
                                                    </div>
                                                    {pub.citations && (
                                                        <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider bg-neutral-950 px-2 py-1 rounded border border-neutral-800">
                                                            Citations: <span className="text-orange-500">{pub.citations}</span>
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-start justify-between gap-2">
                                                    <h4 className="text-white font-medium text-lg mb-2 leading-snug group-hover:text-orange-100 transition-colors line-clamp-3">{pub.title}</h4>
                                                    <ArrowUpRight size={16} className="text-neutral-600 group-hover:text-orange-500 shrink-0 transition-colors" />
                                                </div>
                                                <p className="text-neutral-500 text-sm mt-auto pt-4 border-t border-neutral-800 line-clamp-2">
                                                    {pub.context}
                                                </p>
                                            </a>
                                        </FadeIn>
                                    ))}
                                </div>
                            </div>

                            {/* Initiatives & Talks - w/ Carousel */}
                            <div>
                                <SectionHeader num="5" title="Initiatives & Talks" />
                                <div className="flex flex-col gap-4">
                                    {[
                                        {
                                            title: "IEEE - INCACCT’23 & 24",
                                            role: "Research Paper Presented & Reviewer",
                                            desc: "Contributed to academic discourse by presenting original research papers and serving as a reviewer for peer-reviewed conference submissions.",
                                            link: "https://ieee-incacct.org/"
                                        },
                                        {
                                            title: "Wiehack 3.0 (Covid-19)",
                                            role: "Lead Organizer",
                                            desc: "Organized a flagship online hackathon during the pandemic, fostering innovation and collaboration among hundreds of participants globally.",
                                            link: "https://wiehack.bwividyapeeth.edu.in/"
                                        },
                                        {
                                            title: "Important Initiatives",
                                            role: "Various Projects",
                                            desc: "Led multiple strategic initiatives focusing on community engagement, technical workshops, and student mentorship programs.",
                                            link: "#"
                                        }
                                    ].map((item, idx) => (
                                        <FadeIn key={idx} delay={idx * 100}>
                                            <div
                                                className="group block w-full text-left"
                                            >
                                                <div className="p-6 md:p-8 bg-neutral-900 border border-neutral-800 rounded-2xl md:rounded-3xl hover:border-orange-500/30 hover:bg-neutral-800 transition-all duration-300 flex flex-col md:flex-row gap-6 md:items-start relative overflow-hidden">

                                                    {/* Left: Role & Title */}
                                                    <div className="md:w-[35%] flex-shrink-0 pr-8">
                                                        <h4 className="text-white font-medium text-lg md:text-xl mb-3 group-hover:text-orange-100 transition-colors">{item.title}</h4>
                                                        <p className="text-orange-500 text-xs uppercase tracking-wider font-bold">{item.role}</p>
                                                    </div>

                                                    {/* Right: Desc */}
                                                    <div className="md:w-[65%] border-t md:border-t-0 md:border-l border-neutral-800 pt-4 md:pt-0 md:pl-8">
                                                        <p className="text-neutral-300 text-sm md:text-base leading-relaxed">{item.desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </FadeIn>
                                    ))}
                                </div>
                            </div>

                            {/* Education */}
                            <div>
                                <SectionHeader num="6" title="Education" />
                                <FadeIn>
                                    <div className="p-6 md:p-8 bg-neutral-900/30 rounded-3xl border border-neutral-800 hover:border-neutral-700 transition-colors">
                                        <div className="flex flex-col sm:flex-row items-start gap-6">
                                            <div className="p-4 bg-neutral-800 rounded-2xl shrink-0">
                                                <GraduationCap className="text-white" size={28} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-medium text-white">{education.degree}</h3>
                                                <p className="text-orange-400 mt-1 font-medium">{education.university}</p>
                                                <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-4 text-base text-neutral-500">
                                                    <span className="bg-neutral-900 px-3 py-1 rounded-full">{education.year}</span>
                                                    <span className="hidden sm:block w-1 h-1 bg-neutral-700 rounded-full"></span>
                                                    <span>{education.location}</span>
                                                    <span className="hidden sm:block w-1 h-1 bg-neutral-700 rounded-full"></span>
                                                    <span className="text-neutral-200 font-semibold">{education.grade}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>

                        </div>

                        {/* Right Column: Skills & Leadership */}
                        <div className="md:col-span-5 space-y-8">

                            {/* Skills */}
                            <FadeIn delay={200}>
                                <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 md:p-8 hover:bg-neutral-900 transition-colors">
                                    <h3 className="text-xl font-light text-white mb-8 flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Database size={20} /></div>
                                        Skills & Stack
                                    </h3>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-sm text-neutral-400 uppercase tracking-widest mb-4">Product Skills</h4>
                                            <div className="flex flex-wrap gap-2.5">
                                                {skills.product.map(skill => (
                                                    <span key={skill} className="px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-full text-neutral-300 text-base md:text-lg hover:border-neutral-600 hover:text-white transition-colors cursor-default">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm text-neutral-400 uppercase tracking-widest mb-4">Tools & Technologies</h4>
                                            <div className="flex flex-wrap gap-2.5">
                                                {skills.technical.map(skill => (
                                                    <span key={skill} className="px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-full text-neutral-300 text-base md:text-lg hover:border-neutral-600 hover:text-white transition-colors cursor-default">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </FadeIn>

                            {/* Leadership & Awards */}
                            <FadeIn delay={300}>
                                <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 md:p-8 hover:bg-neutral-900 transition-colors">
                                    <h3 className="text-xl font-light text-white mb-8 flex items-center gap-3">
                                        <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400"><Award size={20} /></div>
                                        Recognition
                                    </h3>
                                    <div className="space-y-6">
                                        {leadership.map((item, idx) => (
                                            <div key={idx} className="relative pl-6 border-l border-neutral-800 hover:border-orange-500 transition-colors">
                                                <h4 className="text-white font-medium text-lg">{item.role}</h4>
                                                <p className="text-sm text-orange-500 uppercase tracking-wider mb-2 font-bold">{item.org}</p>
                                                <p className="text-base text-neutral-400 leading-relaxed">{item.desc}</p>
                                            </div>
                                        ))}
                                        <div className="relative pl-6 border-l border-neutral-800 hover:border-orange-500 transition-colors">
                                            <h4 className="text-white font-medium text-lg">Dr. J. K. Pal Memorial Award</h4>
                                            <p className="text-sm text-orange-500 uppercase tracking-wider mb-2 font-bold">IEEE Delhi Section</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>

                            {/* Leadership Roles & Responsibilities */}
                            <FadeIn delay={400}>
                                <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 md:p-8 hover:bg-neutral-900 transition-colors">
                                    <h3 className="text-xl font-light text-white mb-8 flex items-center gap-3">
                                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Users size={20} /></div>
                                        Leadership Role & Responsibilities
                                    </h3>
                                    <div className="space-y-8">
                                        {leadershipRoles.map((role, idx) => (
                                            <div key={idx} className="relative pl-6 border-l border-neutral-800 hover:border-orange-500 transition-colors">
                                                <h4 className="text-white font-medium text-lg leading-snug mb-3">{role.role}</h4>
                                                <ul className="space-y-2">
                                                    {role.points.map((point, pIdx) => (
                                                        <li key={pIdx} className="text-neutral-400 text-sm leading-relaxed list-disc list-outside ml-4">
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </FadeIn>

                        </div>

                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="relative mt-16 md:mt-24 bg-neutral-950 pt-16 md:pt-24 pb-12 px-4 md:px-6 border-t border-neutral-900 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] bg-orange-600/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-24">
                        <div>
                            <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8 leading-none">
                                Let's <br />
                                <span className="text-orange-500">Connect.</span>
                            </h2>
                            <p className="text-neutral-400 text-base md:text-lg max-w-md leading-relaxed">
                                Open to product management roles and interesting collaborations. Let's discuss how we can build meaningful products together.
                            </p>
                        </div>

                        <div className="flex flex-col justify-end items-start md:items-end gap-6">
                            <a
                                href={`mailto:${personalInfo.email}`}
                                className="group flex items-center gap-4 text-xl md:text-3xl text-neutral-300 hover:text-white transition-colors"
                            >
                                <div className="p-3 md:p-4 bg-neutral-900 rounded-full group-hover:bg-orange-500 transition-colors">
                                    <Mail size={20} className="text-white md:w-6 md:h-6" />
                                </div>
                                <span>{personalInfo.email}</span>
                            </a>

                            <a
                                href={personalInfo.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center gap-4 text-xl md:text-3xl text-neutral-300 hover:text-white transition-colors"
                            >
                                <div className="p-3 md:p-4 bg-neutral-900 rounded-full group-hover:bg-[#0077b5] transition-colors">
                                    <Linkedin size={20} className="text-white md:w-6 md:h-6" />
                                </div>
                                <span>LinkedIn Profile</span>
                            </a>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-neutral-900 flex justify-center items-center text-neutral-600 text-sm">
                        <p className="text-center">© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div >
    );
}