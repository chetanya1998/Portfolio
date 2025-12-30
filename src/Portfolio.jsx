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

    Download
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
    tagline: "Building high-revenue AdTech products through automation, data pipelines, and user-centric strategy.",
    about: "I am an Associate Product Manager with a unique blend of AdTech expertise and technical depth (Python, SQL, ML). Currently driving revenue growth at Unibots by building 0-1 tools and automation pipelines. My background in rigorous research enables me to solve complex problems with data-backed precision.",
    linkedin: "https://www.linkedin.com/in/chetanyaved/"
};

const stats = [
    { label: "Experience", value: "2+ Years" },
    { label: "Revenue Impact", value: "30-40%" },
    { label: "Efficiency Boost", value: "80%" },
    { label: "Citations", value: "100+" },
];

const experiences = [
    {
        company: "Unibots",
        role: "Associate Product Manager",
        period: "Dec 2024 — Present",
        type: "New Delhi, India",
        achievements: [
            "Built 0-1 Keyword Research Tool reducing research time by 70-80% and enabling high-RPC campaigns contributing 10-15% revenue.",
            "Managed 5+ revenue products in the New Product Development team contributing 30-35% company revenue.",
            "Delivered 7+ Ads/AdSense features improving media-buyer workflow efficiency by 30%.",
            "Designed all-in-one campaign creation system reducing launch time by 60-70% with automation and policy checks.",
            "Built content-gen and QA automation pipelines reducing turnaround by 70-80%."
        ],
        tags: ["Product Management", "AdTech", "0-1 Build", "Automation"]
    },
    {
        company: "Stellar Search",
        role: "Research Associate",
        period: "July 2023 — July 2024",
        type: "Gurugram, India",
        achievements: [
            "Supported business development and talent mapping initiatives contributing to approximately 20% revenue growth.",
            "Executed CXO-level research across Healthcare, Pharma, EPC, Energy, Auto and Fintech mandates.",
            "Built databases of 400+ Tier-1 automobile companies and delivered in-depth industry research."
        ],
        tags: ["Market Research", "Business Development", "Strategy"]
    },
    {
        company: "UPSC Preparation & Research",
        role: "Academic Researcher",
        period: "July 2021 — July 2023",
        type: "New Delhi, India",
        achievements: [
            "Prepared full-time for UPSC Civil Services while publishing 10 research papers.",
            "Works received over 100+ citations in various journals.",
            "Presented research at two IEEE conferences and served as a conference paper reviewer."
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
        title: "Keyword Research Tool",
        type: "AdTech Product (Unibots)",
        focus: "Revenue & Efficiency",
        outcome: "70-80% Time Reduction",
        desc: "Built a 0-1 tool enabling high-RPC campaigns. Drastically reduced manual research time and contributed 10-15% to total revenue.",
        icon: <Database className="text-orange-400" size={28} />
    },
    {
        title: "All-in-One Campaign Manager",
        type: "Internal Tool (Unibots)",
        focus: "Workflow Automation",
        outcome: "60-70% Faster Launch",
        desc: "Unified campaign creation, policy checks, and automation into a single system, streamlining the media-buyer workflow.",
        icon: <Layout className="text-blue-400" size={28} />
    },
    {
        title: "Web Traffic Classifier",
        type: "Machine Learning",
        focus: "Bot Detection",
        outcome: "High Accuracy",
        desc: "Implemented an ML pipeline to classify bot vs human traffic using Logistic Regression, Random Forest, and Isolation Forest.",
        icon: <Cpu className="text-purple-400" size={28} />
    },
    {
        title: "Founder KPI Dashboard",
        type: "Analytics Tool",
        focus: "Data Visualization",
        outcome: "36 Real-time Metrics",
        desc: "Built a comprehensive dashboard tracking 36 real-time metrics for product, revenue, and operational health.",
        icon: <BarChart3 className="text-emerald-400" size={28} />
    }
];

const leadership = [
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

const publications = [
    "Blockchain Applications with 6G-Enabled IoT Smart City (Springer)",
    "Digital Twin for Agriculture Disease Detection (Springer)",
    "YOLO-Based Vehicle Detection & Counting (IEEE)",
    "Blockchain in Industrial Revolution 5.0 (CRC Press)"
];

const skills = {
    product: ["Roadmapping", "PRDs", "KPIs", "GTM Strategy", "Pricing", "User Research"],
    adtech: ["Google Ads", "AdSense (RSOC/AFS)", "Campaign Setup", "Policy Compliance"],
    technical: ["Python", "SQL", "REST APIs", "Streamlit", "Flask", "ML Basics"],
    tools: ["Jira", "Linear", "Git", "Power BI", "Google Analytics", "New Relic"]
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
                        <a href="/Chetanya_Ved_Resume.pdf" target="_blank" className="px-5 py-2 bg-neutral-100 text-neutral-900 text-base font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-orange-500/20">
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
                                    <span className="text-neutral-400 text-2xl sm:text-3xl md:text-5xl block mt-5 min-h-[3em] md:min-h-[2.5em] font-bold">
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
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href="#projects" className="group flex items-center justify-center gap-3 px-8 py-4 bg-neutral-900 border border-neutral-800 rounded-full text-white hover:bg-neutral-800 hover:border-orange-500/50 transition-all shadow-lg text-base md:text-lg">
                                        View Work
                                        <ArrowUpRight className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" size={18} />
                                    </a>
                                    <a
                                        href="/Chetanya_Ved_Resume.pdf"
                                        download
                                        className="group flex items-center justify-center gap-3 px-8 py-4 text-neutral-400 hover:text-white transition-colors border border-neutral-800 rounded-full hover:bg-neutral-900 text-base md:text-lg"
                                    >
                                        <Download size={20} /> Download Resume
                                    </a>
                                    <a
                                        href="https://scholar.google.com/citations?user=OqCUANwAAAAJ&hl=en"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex items-center justify-center gap-3 px-8 py-4 text-neutral-400 hover:text-white transition-all border border-neutral-800 rounded-full hover:bg-neutral-900 text-base md:text-lg"
                                    >
                                        <BookOpen size={20} />
                                        <span>Scholar</span>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/chetanya-ved/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex items-center justify-center gap-3 px-8 py-4 text-neutral-400 hover:text-white transition-all border border-neutral-800 rounded-full hover:bg-[#0077b5] hover:border-[#0077b5] text-base md:text-lg"
                                    >
                                        <Linkedin size={20} />
                                        <span>LinkedIn</span>
                                    </a>
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
                                <div className="group relative border-t border-neutral-800 py-12 md:py-16 transition-all hover:bg-neutral-900/30 -mx-4 px-4 md:-mx-6 md:px-6 rounded-xl">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                                        <div className="md:col-span-3">
                                            <span className="font-mono text-base md:text-lg text-neutral-400 block mb-1 group-hover:text-orange-500 transition-colors">{exp.period}</span>
                                            <span className="text-base text-neutral-500 block mb-3 font-medium">{exp.type}</span>
                                            <h3 className="text-2xl font-medium text-white mt-1">{exp.company}</h3>
                                        </div>
                                        <div className="md:col-span-4">
                                            <h4 className="text-xl md:text-2xl text-neutral-200 group-hover:text-white transition-colors flex items-center gap-2 font-bold">
                                                {exp.role} <ArrowUpRight size={20} className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-orange-500" />
                                            </h4>
                                        </div>
                                        <div className="md:col-span-5">
                                            <ul className="space-y-4 mb-6">
                                                {exp.achievements.map((item, i) => (
                                                    <li key={i} className="text-neutral-300 leading-relaxed text-base md:text-lg flex items-start gap-3">
                                                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-neutral-500 shrink-0 group-hover:bg-orange-500 transition-colors"></span>
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
                            </FadeIn>
                        ))}
                        <div className="border-t border-neutral-800" />
                    </div>
                </section>

                {/* Projects Carousel */}
                <section id="projects" className="py-16 md:py-24">
                    <SectionHeader num="2" title="Selected Projects" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, idx) => (
                            <FadeIn key={idx} delay={idx * 100}>
                                <div className="group relative bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 md:p-8 hover:bg-neutral-900 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-900/10 transition-all duration-500 h-[500px] flex flex-col overflow-hidden">
                                    <div className="absolute top-6 right-6 md:top-8 md:right-8 p-3 bg-neutral-950 rounded-full border border-neutral-800 text-neutral-400 group-hover:text-white group-hover:border-orange-500/50 group-hover:scale-110 transition-all duration-300">
                                        <ArrowUpRight size={20} />
                                    </div>

                                    <div className="mb-6 md:mb-8">
                                        <div className="w-14 h-14 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center mb-6 group-hover:border-orange-500/20 transition-colors">
                                            {project.icon}
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-light text-white mb-2 group-hover:text-orange-100 transition-colors">{project.title}</h3>
                                        <p className="font-mono text-base text-orange-500">{project.type}</p>
                                    </div>

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
                            { title: "Google Maps", subtitle: "Improving Navigation", tags: ["Product Design", "Product Improvement"], icon: "map", color: "from-red-500 to-yellow-500" },
                            { title: "Air Fryer", subtitle: "Product Market Research", tags: ["Market Research", "Data Analysis"], icon: "wind", color: "from-orange-100 to-orange-300" },
                            { title: "EV Industry", subtitle: "Competitive Dynamics", tags: ["Market Research", "EV"], icon: "zap", color: "from-blue-500 to-purple-500" }
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
                                    {[
                                        { title: "Blockchain in pharmaceutical sector", citations: "29", context: "Applications of blockchain in healthcare" },
                                        { title: "Healthcare solutions for smart era: An useful explanation from user's perspective", citations: "25", context: "Recent trends in blockchain security" },
                                        { title: "Digital twin in agriculture sector: Detection of disease using deep learning", citations: "13", context: "Digital Twin Technology" },
                                        { title: "Emergence of Blockchain Applications with the 6G-Enabled IoT-Based Smart City", citations: "9", context: "Blockchain for 6G-Enabled Networks" },
                                        { title: "YOLO-Based Vehicle Detection and Counting for Traffic Control on Highway", citations: "7", context: "2024 2nd Intl Conference on Computation" },
                                        { title: "Emergence of Big Data and Blockchain Technology in Smart City", citations: "6", context: "Convergence of IoT, Blockchain" },
                                        { title: "The emergence of blockchain technology in industrial revolution 5.0", citations: "5", context: "Privacy Preservation of Genomic Data" },
                                        { title: "Healthcare Solutions for the Next Generation", citations: "5", context: "Recent Trends in Blockchain" },
                                        { title: "Hybrid deep learning approach for product categorization in e-commerce", citations: "4", context: "AIP Conference Proceedings" },
                                        { title: "Decentralized and secured applications of blockchain in the biomedical domain", citations: "3", context: "Applications of blockchain and big IoT" },
                                        { title: "Prediction of Kyphosis Disease Using Random Forest and Gradient Boosting Algorithm", citations: "1", context: "2024 2nd Intl Conference on Computation" }
                                    ].map((pub, idx) => (
                                        <FadeIn key={idx} delay={idx * 100}>
                                            <div className="h-full p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800 hover:border-orange-500/30 hover:bg-neutral-900 transition-all duration-300 flex flex-col group relative overflow-hidden">
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
                                                <h4 className="text-white font-medium text-lg mb-2 leading-snug group-hover:text-orange-100 transition-colors line-clamp-3">{pub.title}</h4>
                                                <p className="text-neutral-500 text-sm mt-auto pt-4 border-t border-neutral-800 line-clamp-2">
                                                    {pub.context}
                                                </p>
                                            </div>
                                        </FadeIn>
                                    ))}
                                </div>
                            </div>

                            {/* Initiatives & Talks - w/ Carousel */}
                            <div>
                                <SectionHeader num="5" title="Initiatives & Talks" />
                                <Carousel>
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
                                        <FadeIn key={idx} delay={idx * 100} className="snap-center min-w-[70vw] md:min-w-0 md:basis-[calc(33.33%-1rem)] shrink-0 h-full">
                                            {/* Standardized to 3-column layout */}
                                            <div className="h-[320px] p-5 md:p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800 hover:border-orange-500/30 hover:bg-neutral-900 transition-all duration-300 flex flex-col group relative overflow-hidden">
                                                <div className="absolute top-4 right-4 text-neutral-600 group-hover:text-orange-500 transition-colors">
                                                    <ArrowUpRight size={16} />
                                                </div>
                                                <h4 className="text-white font-medium text-lg mb-1 pr-6 truncate">{item.title}</h4>
                                                <p className="text-orange-500 text-xs uppercase tracking-wider mb-2 font-bold truncate">{item.role}</p>
                                                <p className="text-neutral-400 text-sm leading-relaxed mt-auto border-t border-neutral-800 pt-3 flex-1 line-clamp-4 text-ellipsis overflow-hidden">{item.desc}</p>
                                            </div>
                                        </FadeIn>
                                    ))}
                                </Carousel>
                            </div>

                            {/* Education */}
                            <div>
                                <SectionHeader num="5" title="Education" />
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
                                            <h4 className="text-sm text-neutral-400 uppercase tracking-widest mb-4">Product & AdTech</h4>
                                            <div className="flex flex-wrap gap-2.5">
                                                {[...skills.product, ...skills.adtech].map(skill => (
                                                    <span key={skill} className="px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-full text-neutral-300 text-base md:text-lg hover:border-neutral-600 hover:text-white transition-colors cursor-default">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm text-neutral-400 uppercase tracking-widest mb-4">Technical & Tools</h4>
                                            <div className="flex flex-wrap gap-2.5">
                                                {[...skills.technical, ...skills.tools].map(skill => (
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

                    <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-600 text-sm">
                        <p className="text-center md:text-left">© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-white transition-colors">Resume</a>
                            <a href="#" className="hover:text-white transition-colors">Twitter</a>
                            <a href="#" className="hover:text-white transition-colors">Medium</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    );
}