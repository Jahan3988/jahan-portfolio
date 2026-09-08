import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import portraitImage from "./assets/Jahan.jpeg";
import "./App.css";

const skills = [
  "Python",
  "Java",
  "C++",
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Node.js",
  "Flutter",
  "React Native",
  "Android Studio",
  "MySQL",
  "MongoDB",
  "Git",
  "GitHub",
  "VS Code",
  "Postman",
];

const projects = [
  {
    number: "01",
    title: "Restaurant_App",
    category: "Flutter Mobile Application",
    description:
      "A complete digital restaurant management system designed to simulate real restaurant operations, including menu browsing, ordering, kitchen workflow, reporting, revenue analytics, and professional PDF invoice generation.",
    technologies: [
      "Flutter",
      "Dart",
      "SharedPreferences",
      "Firebase",
      "JSON",
      "PDF",
    ],
    features: [
      "Categorized menu with Meals, Desserts, Drinks, and Fast Food",
      "Detailed food information including price, rating, preparation time, and images",
      "Shopping cart and order confirmation",
      "Kitchen Panel with pending, preparing, and completed statuses",
      "Daily, monthly, and yearly reports",
      "Dynamic revenue calculation and visual reporting",
      "PDF invoices and full reports",
      "Camera and gallery image handling",
      "Animated gradient interface",
    ],
  },
  {
    number: "02",
    title: "My_Wallet",
    category: "Flutter Personal Finance Application",
    description:
      "A personal finance management application designed to help users track income and expenses, manage transactions, monitor financial activity, and understand their finances through visual analytics.",
    technologies: [
      "Flutter",
      "Dart",
      "Hive",
      "SharedPreferences",
      "CRUD",
      "Charts",
    ],
    features: [
      "Income and expense tracking",
      "Dynamic wallet balance calculation",
      "Transaction categories, notes, and dates",
      "Add, edit, and delete transactions",
      "All, Income, and Expense filtering",
      "Activity Report for user actions",
      "Income and expense analytics",
      "Pie-chart financial visualization",
      "Local database persistence",
      "Reusable transaction and chart components",
    ],
  },
];

const experience = [
  {
    period: "2024 – 2025",
    company: "Bakhtar University",
    position: "Library Officer",
    description:
      "Managed book checkouts, assisted with research, coordinated library events, and maintained collections.",
  },
  {
    period: "2024 – 2025",
    company: "Bakhtar High School",
    position: "Database Administrator",
    description:
      "Managed and maintained school databases while ensuring data accuracy, security, and report generation.",
  },
  {
    period: "2022",
    company: "Mico Quebec Logistics Company",
    position: "Data Entry Clerk",
    description:
      "Entered and maintained accurate data, processed documents, and coordinated data submission.",
  },
  {
    period: "2018 – 2021",
    company: "Etisalat Telecommunications Company",
    position: "CCR",
    description:
      "Provided customer support for mobile services and handled billing issues and technical inquiries.",
  },
  {
    period: "2016 – 2018",
    company: "Naveen Primary School",
    position: "Computer Instructor",
    description:
      "Taught basic computer skills to primary students, managed computer labs, and evaluated student performance.",
  },
  {
    period: "2015 – 2017",
    company: "Mahtaab Learning Center",
    position: "English Instructor",
    description:
      "Taught English to students of various age groups, created lesson plans, and provided student support.",
  },
];

const languages = [
  { name: "English", level: "Fluent" },
  { name: "Pashto", level: "Native" },
  { name: "Dari", level: "Native" },
  { name: "Urdu", level: "Native" },
];

const portfolioEmail = "janzebking99@gmail.com";
const portfolioEmailSubject = "Portfolio Inquiry";

const portfolioEmailBody =
  "Hello Jahanzeb,\n\nI came across your portfolio and would like to get in touch.";

const mailtoHref = `mailto:${portfolioEmail}?subject=${encodeURIComponent(
  portfolioEmailSubject
)}&body=${encodeURIComponent(portfolioEmailBody)}`;

const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  portfolioEmail
)}&su=${encodeURIComponent(
  portfolioEmailSubject
)}&body=${encodeURIComponent(portfolioEmailBody)}`;

const STORAGE_KEY = "portfolio-inquiries";

/*
 * EMAILJS CONFIGURATION
 *
 * These are your EmailJS credentials.
 *
 * You are using the DEFAULT EmailJS TEMPLATE,
 * so the code sends the standard variables:
 *
 * {{to_name}}
 * {{from_name}}
 * {{message}}
 * {{reply_to}}
 */

const emailjsConfig = {
  serviceId: "service_zmsjum2",
  templateId: "template_snol2vh",
  publicKey: "qw653HQp_RnhQmieX",
};

function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrollProgress, setScrollProgress] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Web Development",
    projectType: "Business Website",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [savedInquiries, setSavedInquiries] = useState<
    Array<{
      name: string;
      email: string;
      service: string;
      projectType: string;
      message: string;
      createdAt: string;
    }>
  >([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        setSavedInquiries(JSON.parse(stored));
      } catch {
        setSavedInquiries([]);
      }
    }
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollProgress(
        maxScroll > 0
          ? Math.min(window.scrollY / maxScroll, 1)
          : 0
      );
    };

    updateScrollProgress();

    window.addEventListener("scroll", updateScrollProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  const saveInquiry = (inquiry: {
    name: string;
    email: string;
    service: string;
    projectType: string;
    message: string;
    createdAt: string;
  }) => {
    const existing = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    const updated = [inquiry, ...existing].slice(0, 10);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    setSavedInquiries(updated);
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitted(false);
    setSuccessMessage("");

    const inquiry = {
      name: formData.name,
      email: formData.email,
      service: formData.service,
      projectType: formData.projectType,
      message: formData.message,
      createdAt: new Date().toISOString(),
    };

    /*
     * Save the inquiry locally as before.
     */
    saveInquiry(inquiry);

    /*
     * Put the service and project type inside the
     * standard EmailJS {{message}} variable.
     *
     * This allows your DEFAULT EmailJS template
     * to display everything without requiring
     * custom template variables.
     */
    const emailMessage = `
Portfolio Inquiry

Name: ${formData.name}
Email: ${formData.email}

Service Needed: ${formData.service}
Project Type: ${formData.projectType}

Project Details:
${formData.message}
`.trim();

    try {
      /*
       * Send using your EmailJS service,
       * template and public key.
       *
       * These variable names match the DEFAULT
       * EmailJS template.
       */
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          to_name: "Jahanzeb Khan",
          from_name: formData.name,
          message: emailMessage,
          reply_to: formData.email,
        },
        emailjsConfig.publicKey
      );

      setSuccessMessage(
        "Your message has been sent successfully. Thank you for getting in touch!"
      );

      setSubmitted(true);
    } catch (error) {
      console.error("EmailJS send failed:", error);

      setSuccessMessage(
        "Your inquiry was saved locally, but the email could not be sent. Please check your EmailJS settings and try again."
      );

      setSubmitted(true);
    }

    setIsSubmitting(false);

    setFormData({
      name: "",
      email: "",
      service: "Web Development",
      projectType: "Business Website",
      message: "",
    });
  };

  return (
    <div
      className={`portfolio theme-${theme}`}
      style={
        {
          "--scroll-progress": scrollProgress,
        } as React.CSSProperties
      }
    >
      <div className="star-field" aria-hidden="true">
        {Array.from({ length: 34 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="sunrise-disc" aria-hidden="true" />

      <nav className="navbar">
        <a href="#home" className="logo">
          J<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>

        <button
          type="button"
          className="theme-toggle"
          onClick={() =>
            setTheme((current) =>
              current === "dark" ? "light" : "dark"
            )
          }
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </nav>

      <main>
        <section id="home" className="hero">
          <img
            className="hero-photo"
            src={portraitImage}
            alt="Jahanzeb Khan"
          />

          <div className="hero-glow hero-glow-one"></div>
          <div className="hero-glow hero-glow-two"></div>

          <div className="hero-content">
            <div className="hero-badge">
              Warning: neural core online
            </div>

            <p className="eyebrow">
              AI / SOFTWARE DEVELOPER
            </p>

            <h1 className="hero-name">
              <span>Jahanzeb</span>
              <small>Engineering the unknown</small>
            </h1>

            <p className="hero-description">
              I build sharp digital systems where software, data,
              and human intent converge into something that feels
              one step ahead.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="primary-button">
                Enter the network
              </a>

              <a href="#contact" className="secondary-button">
                Initiate contact
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>4+</strong>
                <span>Years</span>
              </div>

              <div>
                <strong>20+</strong>
                <span>Projects</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>Driven</span>
              </div>
            </div>

            <div className="scroll-indicator">
              <span></span>
              Scroll to explore
            </div>
          </div>
        </section>

        <section id="about" className="section about">
          <div className="section-heading">
            <p className="eyebrow">01 — ABOUT ME</p>
            <h2>
              Computer Science graduate. Software developer.
            </h2>
          </div>

          <div className="about-grid">
            <div className="about-text">
              <p>
                I am a highly motivated Computer Science graduate
                with strong foundations in solving technical
                problems and full-stack development.
              </p>

              <p>
                I am passionate about coding, problem-solving, and
                building scalable software solutions. My development
                interests include mobile applications, web
                development, databases, and modern software
                technologies.
              </p>

              <p>
                I am seeking opportunities where I can apply my
                technical skills, contribute to real-world projects,
                and continue growing within a dynamic development
                environment.
              </p>
            </div>

            <div className="about-card">
              <div className="card-number">01</div>
              <p>Computer Science Graduate</p>

              <div className="about-line"></div>

              <div className="card-number">02</div>
              <p>Featured Software Projects</p>

              <div className="about-line"></div>

              <div className="card-number">17+</div>
              <p>Technical Skills & Tools</p>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="section skills-section"
        >
          <div className="section-heading">
            <p className="eyebrow">02 — SKILLS</p>
            <h2>Technologies I work with.</h2>
          </div>

          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-card" key={skill}>
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className="section projects-section"
        >
          <div className="section-heading">
            <p className="eyebrow">03 — PROJECTS</p>
            <h2>Selected work.</h2>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article
                className="project-card"
                key={project.title}
              >
                <div className="project-top">
                  <span className="project-number">
                    {project.number}
                  </span>

                  <span className="project-category">
                    {project.category}
                  </span>
                </div>

                <h3>{project.title}</h3>

                <p className="project-description">
                  {project.description}
                </p>

                <h4>Key Features</h4>

                <div className="feature-list">
                  {project.features.map((feature) => (
                    <div className="feature" key={feature}>
                      <span>+</span>
                      {feature}
                    </div>
                  ))}
                </div>

                <h4>Technologies</h4>

                <div className="technology-list">
                  {project.technologies.map((technology) => (
                    <span key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="section experience-section"
        >
          <div className="section-heading">
            <p className="eyebrow">04 — EXPERIENCE</p>
            <h2>Professional experience.</h2>
          </div>

          <div className="experience-list">
            {experience.map((item) => (
              <article
                className="experience-item"
                key={`${item.company}-${item.position}`}
              >
                <div className="experience-period">
                  {item.period}
                </div>

                <div className="experience-content">
                  <p className="experience-company">
                    {item.company}
                  </p>

                  <h3>{item.position}</h3>

                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section education-section">
          <div className="section-heading">
            <p className="eyebrow">05 — EDUCATION</p>
            <h2>Academic background.</h2>
          </div>

          <div className="education-grid">
            <div className="education-card">
              <span>16th Grade</span>
              <h3>Bachelor of Computer Science</h3>
              <p>Bakhtar University</p>
            </div>

            <div className="education-card">
              <span>12th Grade</span>
              <h3>High School</h3>
              <p>
                Ghazi Mohammad Jan Khan High School
              </p>
            </div>
          </div>
        </section>

        <section className="section languages-section">
          <div className="section-heading">
            <p className="eyebrow">06 — LANGUAGES</p>
            <h2>Communication.</h2>
          </div>

          <div className="languages-grid">
            {languages.map((language) => (
              <div
                className="language-card"
                key={language.name}
              >
                <h3>{language.name}</h3>
                <p>{language.level}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section certificates-section">
          <div className="section-heading">
            <p className="eyebrow">07 — CERTIFICATES</p>
            <h2>Continuous learning.</h2>
          </div>

          <div className="certificate-list">
            <div className="certificate-card">
              <span>01</span>

              <div>
                <h3>English Language Certificate</h3>
                <p>Mahtaab Academy</p>
              </div>
            </div>

            <div className="certificate-card">
              <span>02</span>

              <div>
                <h3>CIT | IT Certificate</h3>
                <p>Saniya Academy</p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="section contact-section"
        >
          <div className="contact-content">
            <p className="eyebrow">08 — CONTACT</p>

            <h2>
              Let's build
              <br />
              <span>something useful.</span>
            </h2>

            <p>
              Share your goals, the kind of service you need, and
              how you want to work together. I will get back to you
              with the right next step.
            </p>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="form-row">
                <label>
                  Full Name

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                  />
                </label>

                <label>
                  Email Address

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Service Needed

                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                  >
                    <option>
                      Web Development
                    </option>

                    <option>
                      Mobile App Development
                    </option>

                    <option>
                      UI/UX Design
                    </option>

                    <option>
                      Database & Backend
                    </option>

                    <option>
                      Consultation
                    </option>

                    <option>
                      Other
                    </option>
                  </select>
                </label>

                <label>
                  Project Type

                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                  >
                    <option>
                      Business Website
                    </option>

                    <option>
                      Portfolio Website
                    </option>

                    <option>
                      Mobile Application
                    </option>

                    <option>
                      E-commerce
                    </option>

                    <option>
                      Dashboard / System
                    </option>

                    <option>
                      Other
                    </option>
                  </select>
                </label>
              </div>

              <label>
                Project Details

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me what you need, the timeline, and the kind of solution you want..."
                  rows={6}
                  required
                />
              </label>

              <div className="contact-buttons">
                <button
                  type="submit"
                  className="primary-button submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Sending..."
                    : "Send Inquiry"}
                </button>

                <a
                  href="https://www.linkedin.com/in/jahanzeb-khan-0b4718174"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-button"
                >
                  LinkedIn
                </a>

                <a
                  href="tel:+93780003988"
                  className="primary-button"
                >
                  Call Me
                </a>
              </div>

              {submitted ? (
                <p className="success-message">
                  {successMessage}
                </p>
              ) : null}
            </form>

            <div className="inquiries-panel">
              <h3>Recent inquiries</h3>

              {savedInquiries.length === 0 ? (
                <p className="empty-state">
                  No inquiries saved yet.
                </p>
              ) : (
                <div className="inquiry-list">
                  {savedInquiries.map((item, index) => (
                    <div
                      className="inquiry-item"
                      key={`${item.email}-${item.createdAt}-${index}`}
                    >
                      <strong>{item.name}</strong>

                      <span>{item.service}</span>

                      <small>
                        {new Date(
                          item.createdAt
                        ).toLocaleString()}
                      </small>

                      <p>{item.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="email-link-row">
              <a
                href={mailtoHref}
                className="email-link"
              >
                Or email directly
              </a>

              <a
                href={gmailHref}
                target="_blank"
                rel="noopener noreferrer"
                className="email-link secondary-link"
              >
                Open Gmail
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>
          © 2026 Jahanzeb Khan. Built with React & TypeScript.
        </p>

        <a href="#home">
          Back to top ↑
        </a>
      </footer>
    </div>
  );
}

export default App;
