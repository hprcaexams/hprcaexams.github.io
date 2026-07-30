"use client";

import { useEffect, useMemo, useState } from "react";
import questionBank from "./questions.json";
import osPreviewBank from "./os-questions.json";

const TELEGRAM_URL = "https://t.me/+SXZ3tRw6qU0zNzM9";

type Question = {
  id: number;
  source: "Expert Practice" | "Practice" | "PYQ";
  level: "Beginner" | "Intermediate";
  subject: string;
  topic: string;
  subtopic?: string;
  question: string;
  options: string[];
  answer: string;
  solution: string;
  free: boolean;
};

const previewQuestions: Question[] = [
  {
    id: 1,
    source: "Practice",
    level: "Beginner",
    subject: "Database Management System",
    topic: "DBMS Fundamentals",
    question: "The view of total database content is called:",
    options: ["Conceptual view", "Internal view", "External view", "Physical view"],
    answer: "Conceptual view",
    solution: "The conceptual view represents the complete logical structure of the database, including entities and their relationships.",
    free: true,
  },
  {
    id: 2,
    source: "Practice",
    level: "Beginner",
    subject: "Database Management System",
    topic: "DBMS Fundamentals",
    question: "“Salary of an employee should be a positive integer” corresponds to which constraint?",
    options: ["Entity integrity", "Domain constraint", "Key constraint", "Referential integrity"],
    answer: "Domain constraint",
    solution: "A domain constraint restricts the data type, range and permissible values of an attribute.",
    free: true,
  },
  {
    id: 3,
    source: "PYQ",
    level: "Beginner",
    subject: "Database Management System",
    topic: "ER Diagram",
    question: "The number of attributes in a relation schema is called:",
    options: ["Key", "Arity", "Domain", "Cardinality"],
    answer: "Arity",
    solution: "Arity is the number of attributes or columns. Cardinality is the number of tuples or rows.",
    free: true,
  },
  {
    id: 4,
    source: "PYQ",
    level: "Beginner",
    subject: "Database Management System",
    topic: "ER Diagram",
    question: "An entity set that does not have sufficient attributes to form a key is termed:",
    options: ["Primary entity", "Strong entity", "Weak entity", "Simple entity"],
    answer: "Weak entity",
    solution: "A weak entity depends on an owner entity for identification and combines its partial key with the owner’s key.",
    free: true,
  },
  {
    id: 5,
    source: "Practice",
    level: "Intermediate",
    subject: "Database Management System",
    topic: "ER Diagram",
    question: "What is the minimum cardinality for total participation of an entity in a relationship?",
    options: ["Zero", "One", "Many", "Not defined"],
    answer: "One",
    solution: "Total participation means that every entity must participate at least once, so minimum cardinality is one.",
    free: true,
  },
  {
    id: 6,
    source: "PYQ",
    level: "Beginner",
    subject: "Database Management System",
    topic: "Relational Model",
    question: "In a relational database model, cardinality of a relation means:",
    options: ["Number of constraints", "Number of tuples", "Number of attributes", "Number of tables"],
    answer: "Number of tuples",
    solution: "Cardinality refers to the number of rows or tuples in a relation; degree or arity refers to its attributes.",
    free: false,
  },
  {
    id: 7,
    source: "Practice",
    level: "Intermediate",
    subject: "Computer Fundamentals",
    topic: "Operating Systems",
    question: "Which component of an operating system manages processes and CPU scheduling?",
    options: ["Compiler", "Kernel", "Browser", "Database"],
    answer: "Kernel",
    solution: "The kernel manages CPU scheduling, processes, memory, devices and other core system resources.",
    free: false,
  },
  {
    id: 8,
    source: "Practice",
    level: "Beginner",
    subject: "Himachal Pradesh GK",
    topic: "Geography",
    question: "Which river flows through the Kullu Valley?",
    options: ["Beas", "Yamuna", "Ravi", "Ghaggar"],
    answer: "Beas",
    solution: "The Beas River flows through the Kullu Valley before continuing toward Mandi and Kangra.",
    free: false,
  },
  {
    id: 9,
    source: "Practice",
    level: "Beginner",
    subject: "Reasoning",
    topic: "Number Series",
    question: "Find the next number: 2, 6, 12, 20, 30, ?",
    options: ["36", "40", "42", "48"],
    answer: "42",
    solution: "The differences are 4, 6, 8 and 10. Add the next difference, 12, to get 42.",
    free: false,
  },
  {
    id: 10,
    source: "Practice",
    level: "Intermediate",
    subject: "English",
    topic: "Grammar",
    question: "Choose the correctly written sentence:",
    options: ["He don't know.", "He doesn't knows.", "He doesn't know.", "He not knows."],
    answer: "He doesn't know.",
    solution: "After the auxiliary “doesn't,” the main verb remains in its base form: know.",
    free: false,
  },
  {
    id: 11,
    source: "Practice",
    level: "Beginner",
    subject: "Quantitative Aptitude",
    topic: "Percentage",
    question: "What is 25% of 240?",
    options: ["50", "60", "70", "80"],
    answer: "60",
    solution: "25% is one-fourth. One-fourth of 240 is 60.",
    free: false,
  },
  {
    id: 12,
    source: "Practice",
    level: "Intermediate",
    subject: "Database Management System",
    topic: "Weak Entity",
    question: "The identifying relationship is generally what type from weak entity to strong entity?",
    options: ["One-to-one", "One-to-many", "Many-to-one", "Many-to-many"],
    answer: "Many-to-one",
    solution: "Many weak entities may depend on one strong owner, while each weak entity has one identifying owner.",
    free: false,
  },
];

const questions = questionBank as Question[];
const osPreviewQuestions = osPreviewBank as Array<{ id: number; topic: string; subtopic: string; question: string; options: string[] }>;

const upcomingSubjects = [
  { icon: "CF", name: "Computer Fundamentals", detail: "History, generations, types and applications" },
  { icon: "HW", name: "Hardware & Peripherals", detail: "CPU, memory, storage and input/output devices" },
  { icon: "SW", name: "Computer Software", detail: "System software, applications, utilities and drivers" },
  { icon: "CO", name: "Computer Organisation", detail: "CPU, registers, memory and data representation" },
  { icon: "DL", name: "Digital Logic & Circuits", detail: "Boolean algebra, logic gates and basic circuits" },
  { icon: "NW", name: "Computer Networks", detail: "LAN, WAN, devices, protocols and connectivity" },
  { icon: "MS", name: "Microsoft Office", detail: "Word, Excel, PowerPoint and office operations" },
  { icon: "WB", name: "Internet & Web Technology", detail: "Web, email, HTML, forms, links and tables" },
  { icon: "CY", name: "Cyber Security & Digital Literacy", detail: "Malware, phishing, passwords and e-governance" },
  { icon: "NS", name: "Number System", detail: "Binary, octal, hexadecimal and character codes" },
  { icon: "PY", name: "Python Programming", detail: "Variables, operators, conditions, loops and functions" },
  { icon: "PHP", name: "PHP Programming", detail: "Syntax, forms, functions and MySQL connectivity" },
  { icon: "DS", name: "Data Structures & Algorithms", detail: "Arrays, stacks, queues, trees and basic algorithms" },
  { icon: "SE", name: "Software Engineering", detail: "Development models, testing and software quality" },
  { icon: "TC", name: "Theory of Computation", detail: "Automata, languages and grammar fundamentals" },
  { icon: "CD", name: "Compiler Design", detail: "Compiler phases, parsing and code generation" },
  { icon: "ET", name: "Emerging Technologies", detail: "Cloud computing, AI and current IT awareness" },
];

const dbmsNotes = [
  { title: "DBMS Fundamentals", summary: "Understand data, databases, DBMS advantages, database users and the three-schema architecture.", points: ["Data vs information", "File system limitations", "Schema and instance", "Data independence"] },
  { title: "ER Diagram", summary: "Learn how real-world objects are represented through entities, attributes and relationships.", points: ["Strong and weak entities", "Attribute types", "Cardinality ratios", "Participation constraints"] },
  { title: "Relational Model & Functional Dependencies", summary: "Build the foundation for relations, keys and the dependencies used in database design.", points: ["Relation, tuple and attribute", "Functional dependency", "Attribute closure", "Minimal cover"] },
  { title: "Keys & Integrity Constraints", summary: "Identify records correctly and protect database accuracy with essential constraints.", points: ["Candidate and primary keys", "Composite and foreign keys", "Entity integrity", "Referential integrity"] },
  { title: "Normalization (1NF–BCNF)", summary: "Remove redundancy and update anomalies by organizing tables into well-designed normal forms.", points: ["First normal form", "Partial dependency", "Transitive dependency", "3NF and BCNF"] },
  { title: "Decomposition Properties & 4NF", summary: "Check whether a decomposition preserves information, dependencies and multivalued facts.", points: ["Lossless join", "Dependency preservation", "Multivalued dependency", "Fourth normal form"] },
  { title: "SQL", summary: "Use SQL to define, retrieve, combine and manage relational data effectively.", points: ["DDL, DML, DCL and TCL", "SELECT and filtering", "Grouping and functions", "Joins and set operations"] },
  { title: "File Organization & Indexing", summary: "See how records are stored and how indexes reduce the work required to find them.", points: ["Primary and secondary indexes", "Dense and sparse indexes", "Clustered indexing", "B-tree and B+ tree"] },
  { title: "Transaction Management", summary: "Study reliable database operations, schedules and the rules that keep data consistent.", points: ["ACID properties", "Transaction states", "Serial schedules", "Recoverability"] },
  { title: "Concurrency Control", summary: "Understand how simultaneous transactions are coordinated without losing correctness.", points: ["Shared and exclusive locks", "Two-phase locking", "Deadlocks", "Isolation levels"] },
];

export default function Home() {
  const [subject, setSubject] = useState("All subjects");
  const [topic, setTopic] = useState("All topics");
  const [subtopic, setSubtopic] = useState("All subtopics");
  const [level, setLevel] = useState("All levels");
  const [sourceFilter, setSourceFilter] = useState("All sources");
  const [current, setCurrent] = useState<Question | null>(null);
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [visibleCount, setVisibleCount] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [lessonSearch, setLessonSearch] = useState("");
  const [mobileCourseOpen, setMobileCourseOpen] = useState(false);

  const subjects = ["All subjects", ...Array.from(new Set(questions.map((q) => q.subject)))];
  const topics = ["All topics", ...Array.from(new Set(questions.filter((q) => subject === "All subjects" || q.subject === subject).map((q) => q.topic)))];
  const subtopics = ["All subtopics", ...Array.from(new Set(questions.filter((q) => (subject === "All subjects" || q.subject === subject) && (topic === "All topics" || q.topic === topic)).map((q) => q.subtopic || "General")))];

  const filtered = useMemo(
    () =>
      questions.filter(
        (q) =>
          (subject === "All subjects" || q.subject === subject) &&
          (topic === "All topics" || q.topic === topic) &&
          (subtopic === "All subtopics" || q.subtopic === subtopic) &&
          (level === "All levels" || q.level === level) &&
          (sourceFilter === "All sources" || q.source === sourceFilter),
      ),
    [subject, topic, subtopic, level, sourceFilter],
  );
  const currentIndex = current ? filtered.findIndex((q) => q.id === current.id) : -1;
  const topicGroups = useMemo(() => {
    const dbms = questions.filter((q) => q.subject === "Database Management System");
    return Array.from(new Set(dbms.map((q) => q.topic))).map((name) => ({
      name,
      count: dbms.filter((q) => q.topic === name).length,
      subtopics: Array.from(new Set(dbms.filter((q) => q.topic === name).map((q) => q.subtopic || "General"))),
    }));
  }, []);

  useEffect(() => {
    if (!current) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [current]);

  function openQuestion(question: Question) {
    setCurrent(question);
    setSelected("");
    setChecked(false);
    setSeconds(0);
  }

  function submitAnswer() {
    if (!current || !selected || checked) return;
    setChecked(true);
    setAnswered((value) => value + 1);
    if (selected === current.answer) setScore((value) => value + 1);
  }

  function moveQuestion(direction: number) {
    if (!filtered.length) return;
    const nextIndex = Math.min(Math.max(currentIndex + direction, 0), filtered.length - 1);
    openQuestion(filtered[nextIndex]);
  }

  if (current) {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    const visibleTopics = topicGroups.filter((group) => group.name.toLowerCase().includes(lessonSearch.toLowerCase()));
    return (
      <main className="learn-app">
        <header className="learn-topbar">
          <a className="learn-logo" href="#home" onClick={(e) => { e.preventDefault(); setCurrent(null); }}><span>HP</span><strong>HREA</strong><small>Learning Centre</small></a>
          <div className="learn-stats">
            <span><b>{questions.length}</b><small>Free DBMS questions</small></span>
            <span><b>{topicGroups.length}</b><small>Topics</small></span>
            <span><b>{score}/{answered}</b><small>Your score</small></span>
          </div>
          <div className="learn-actions"><a href={TELEGRAM_URL} target="_blank" rel="noreferrer">Get Notes on Telegram</a><button onClick={() => setCurrent(null)}>Exit lesson ×</button></div>
        </header>

        <div className="course-ribbon">
          <div><button onClick={() => setCurrent(null)}>‹</button><strong>JOA IT - Database Management System</strong><span>Free complete course</span></div>
          <button className="mobile-course-trigger" onClick={() => setMobileCourseOpen(true)} aria-expanded={mobileCourseOpen} aria-controls="course-overview-panel">☰ Course Overview</button>
          <div className="ribbon-progress"><span><small>PROGRESS</small><b>{answered} solved</b></span><span><small>ACCURACY</small><b>{answered ? Math.round((score / answered) * 100) : 0}%</b></span><span><small>TIME</small><b>{minutes}:{secs}</b></span></div>
        </div>

        <div className="learn-workspace">
          {mobileCourseOpen && <button className="mobile-course-backdrop" aria-label="Close course overview" onClick={() => setMobileCourseOpen(false)} />}
          <aside id="course-overview-panel" className={`lesson-sidebar ${mobileCourseOpen ? "mobile-open" : ""}`}>
            <div className="overview-card"><span>▣</span><div><strong>Course overview</strong><small>{answered}/{questions.length} questions completed</small><i><b style={{ width: `${Math.min((answered / questions.length) * 100, 100)}%` }} /></i></div><button className="mobile-course-close" aria-label="Close course overview" onClick={() => setMobileCourseOpen(false)}>×</button></div>
            <label className="lesson-search">⌕<input value={lessonSearch} onChange={(e) => setLessonSearch(e.target.value)} placeholder="Search topics..." /></label>
            <div className="lesson-list">
              {visibleTopics.map((group, index) => (
                <details key={group.name} open={group.name === current.topic}>
                  <summary><span>{index + 1}</span><div><strong>{group.name}</strong><small>{group.count} questions · {group.subtopics.length} subtopics</small></div><b>⌄</b></summary>
                  <div className="subtopic-list">
                    {group.subtopics.map((name) => <button key={name} className={name === current.subtopic ? "active" : ""} onClick={() => { const match = questions.find((q) => q.topic === group.name && q.subtopic === name); if (match) { setTopic(group.name); setSubtopic(name); openQuestion(match); setMobileCourseOpen(false); } }}><span>○</span>{name}</button>)}
                  </div>
                </details>
              ))}
            </div>
            <a className="sidebar-pdf" href={TELEGRAM_URL} target="_blank" rel="noreferrer"><b>TG</b><span>Unlock Free PDF Notes<small>Join once for notes, updates and support</small></span></a>
          </aside>

          <section className="question-stage">
            <div className="mobile-quiz-status">
              <span><small>QUESTION</small><b>{Math.max(currentIndex + 1, 1)} / {filtered.length}</b></span>
              <span><small>TIME</small><b>{minutes}:{secs}</b></span>
              <span><small>SCORE</small><b>{score}/{answered}</b></span>
            </div>
            <div className="question-heading">
              <div><span>Question #{current.id}</span><b>MCQ</b><small>{current.source}</small></div>
              <button className={bookmarked.includes(current.id) ? "saved" : ""} onClick={() => setBookmarked((items) => items.includes(current.id) ? items.filter((id) => id !== current.id) : [...items, current.id])}>♡ {bookmarked.includes(current.id) ? "Saved" : "Bookmark"}</button>
            </div>
            <div className="topic-path"><span>Database Management System</span><b>›</b><span>{current.topic}</span><b>›</b><span>{current.subtopic}</span><em>FREE</em></div>
            <article className="question-card"><p>{current.question}</p></article>
            <article className="answer-card">
              <h2><span>✓</span> Your Answer</h2>
              <div className="answer-grid">
                {current.options.map((option, index) => {
                  const isCorrect = checked && option === current.answer;
                  const isWrong = checked && option === selected && option !== current.answer;
                  return <button className={`${selected === option ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`} key={option} onClick={() => !checked && setSelected(option)}><b>{String.fromCharCode(65 + index)}</b><span>{option}</span></button>;
                })}
              </div>
              {!checked ? <div className="answer-submit"><button disabled={!selected} onClick={submitAnswer}>Submit Answer</button><small>You can change your answer until you submit.</small></div> :
                <div className={`learn-solution ${selected === current.answer ? "right" : "retry"}`}><strong>{selected === current.answer ? "Correct answer - well done!" : `Correct answer: ${current.answer}`}</strong><p>{current.solution}</p></div>}
            </article>
            <nav className="mobile-quiz-nav" aria-label="Mobile question navigation">
              <button disabled={currentIndex <= 0} onClick={() => moveQuestion(-1)}>‹ Previous</button>
              <span><b>{Math.max(currentIndex + 1, 1)}</b><small>of {filtered.length}</small></span>
              <button disabled={currentIndex >= filtered.length - 1} onClick={() => moveQuestion(1)}>Next ›</button>
            </nav>
          </section>

          <aside className="question-tools">
            <div className="navigator-card">
              <h3>Question Navigator</h3>
              <div className="tool-filters"><label>Source<select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}><option>All sources</option><option>PYQ</option><option>Expert Practice</option></select></label><label>Level<select value={level} onChange={(e) => setLevel(e.target.value)}><option>All levels</option><option>Beginner</option><option>Intermediate</option></select></label></div>
              <div className="question-numbers">{filtered.slice(Math.max(0, currentIndex - 2), Math.max(0, currentIndex - 2) + 5).map((q, index) => <button className={q.id === current.id ? "active" : ""} key={q.id} onClick={() => openQuestion(q)}><b>{Math.max(1, currentIndex - 1) + index}</b><small>MCQ</small></button>)}</div>
              <div className="next-controls"><button disabled={currentIndex <= 0} onClick={() => moveQuestion(-1)}>‹ Previous</button><button disabled={currentIndex >= filtered.length - 1} onClick={() => moveQuestion(1)}>Next ›</button></div>
            </div>
            <div className="timer-card"><span>◷</span><div><small>TIME ON QUESTION</small><strong>{minutes}:{secs}</strong><p>Target time: 01:00</p></div><button onClick={() => setSeconds(0)}>↻ Reset</button></div>
            <div className="mastery-card"><span>◎</span><div><strong>Build your mastery</strong><p>Solve questions and review every explanation.</p></div></div>
          </aside>
        </div>
      </main>
    );
  }

  return (
    <main className="academy portal-shell">
      <aside className="portal-sidebar" aria-label="Learner portal navigation">
        <a className="portal-logo" href="#home"><span>HP</span><div><strong>HREA Portal</strong><small>Himachal Exam Academy</small></div></a>
        <div className="portal-user"><span>RT</span><div><strong>Welcome, Learner</strong><small>JOA IT preparation</small></div></div>
        <nav>
          <a className="active" href="#home"><span>⌂</span><b>Dashboard</b></a>
          <a href="#subject-library"><span>▦</span><b>All Subjects</b><em>20</em></a>
          <a href="#courses"><span>▣</span><b>Free DBMS &amp; SQL</b><em>FREE</em></a>
          <a href="#operating-system"><span>◉</span><b>Operating System</b><em className="paid">PAID</em></a>
          <a href="#learning-support"><span>▶</span><b>Video Guidance</b></a>
          <a href="#practice"><span>✓</span><b>Question Bank</b></a>
          <a href="#notes"><span>▤</span><b>Study Notes</b></a>
          <a href="#joa-syllabus"><span>≡</span><b>JOA Syllabus</b></a>
          <a href="#exams"><span>◎</span><b>Target Exams</b></a>
        </nav>
        <div className="portal-help"><strong>Need notes or access?</strong><small>Contact the HREA team directly.</small><a href={TELEGRAM_URL} target="_blank" rel="noreferrer">Open Telegram →</a></div>
      </aside>
      <div className="portal-main">
      <div className="announcement">
        <span>100% FREE</span>
        Complete DBMS and SQL course: all 1,022 questions, answers and explanations—no payment required
        <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">Get PDF notes on Telegram →</a>
      </div>

      <header className="academy-header">
        <a className="academy-brand" href="#home" aria-label="HREA home">
          <span className="academy-brand__seal">HP</span>
          <span><strong>Himachal Recruitment</strong><small>Exam Academy · HREA</small></span>
        </a>
        <div className="portal-page-title"><strong>Learner Dashboard</strong><small>Courses, quizzes and preparation resources</small></div>
        <nav aria-label="Main navigation">
          <a href="#courses">Free DBMS &amp; SQL</a>
          <a href="#operating-system">OS Premium</a>
          <a href="#joa-syllabus">JOA Syllabus</a>
          <a href="#why-hrea">Why HREA</a>
          <a href="#notes">Free Notes</a>
          <a href="#practice">Practice</a>
          <a href="#exams">Exams</a>
        </nav>
        <div className="header-actions">
          <button className="primary-small" onClick={() => openQuestion(questions[0])}>Start Free Quiz</button>
        </div>
      </header>

      <section className="applicant-banner" aria-label="JOA IT applicant statistics">
        <div className="applicant-total"><span>JOA IT · POST CODE 26001</span><strong>44,248</strong><p>Total applicants competing for the examination</p></div>
        <div className="applicant-action"><strong>Competition is high. Start preparing now.</strong><small>Applicant statistics—not a live website-user counter.</small><button onClick={() => openQuestion(questions[0])}>Attempt Free Quiz →</button></div>
      </section>

      <section className="portal-dashboard-bar" aria-label="Course dashboard summary">
        <div><small>ACTIVE COURSE</small><strong>JOA IT · Post Code 26001</strong></div>
        <article><span>▣</span><div><b>1,022</b><small>Free DBMS &amp; SQL MCQs</small></div></article>
        <article><span>◫</span><div><b>30</b><small>OS premium previews</small></div></article>
        <article><span>▦</span><div><b>{upcomingSubjects.length}</b><small>Subjects coming soon</small></div></article>
        <article><span>★</span><div><b>{answered ? Math.round((score / answered) * 100) : 0}%</b><small>Current accuracy</small></div></article>
      </section>

      <section className="learning-hero" id="home">
        <div className="learning-hero__copy">
          <p className="overline">Complete course · No paywall</p>
          <h1>Learn <span>DBMS and SQL completely free.</span></h1>
          <p>Prepare with 1,022 checked questions, topic-wise practice and clear explanations. Every DBMS and SQL question on HREA is open to every learner.</p>
          <div className="hero-buttons">
            <button className="primary-cta" onClick={() => openQuestion(filtered.find((question) => question.free) || questions[0])}>Start Free Quiz Now →</button>
            <a className="secondary-cta video-hero-cta" href={TELEGRAM_URL} target="_blank" rel="noreferrer">▶ Need video course? Telegram</a>
          </div>
          <p className="hero-guidance-note">Concepts not clear? Get guided video-course support directly through our Telegram channel.</p>
          <div className="hero-facts">
            <span><strong>1,022</strong> free questions</span>
            <span><strong>36</strong> subtopics</span>
            <span><strong>₹0</strong> course fee</span>
          </div>
        </div>
        <div className="learning-hero__panel">
          <div className="panel-head"><span>Today&apos;s learning path</span><strong>18% complete</strong></div>
          <div className="big-progress"><i /></div>
          <button className="path-card active path-card-button" onClick={() => openQuestion(filtered.find((question) => question.free) || questions[0])}>
            <span className="path-icon">01</span>
            <div><small>Free complete course</small><h3>Database Management System</h3><p>Concepts · Keys · Normalization</p></div>
            <b>→</b>
          </button>
          <article className="path-card">
            <span className="path-icon pale">02</span>
            <div><small>Included free</small><h3>SQL Practice</h3><p>Queries · Joins · Functions</p></div>
            <b>→</b>
          </article>
          <div className="streak"><span>🔥</span><div><strong>3 day streak</strong><small>Keep learning every day</small></div><b>+120 XP</b></div>
        </div>
      </section>

      <section className="learner-support-section" id="learning-support">
        <div className="learner-support-copy">
          <p className="overline">For every preparation stage</p>
          <h2>Questions help you practise. Clear concepts help you score.</h2>
          <p>Use the free question bank for self-practice. If a topic still feels confusing, you need step-by-step teaching, or you prefer learning through videos, contact us on Telegram for course guidance.</p>
          <div className="support-actions">
            <a className="video-course-cta" href={TELEGRAM_URL} target="_blank" rel="noreferrer"><span>▶</span><span><strong>Need concept videos?</strong><small>Contact us on Telegram for the video course</small></span><b>→</b></a>
            <button onClick={() => openQuestion(questions[0])}>First test your concepts</button>
          </div>
        </div>
        <div className="learner-types" aria-label="Who can learn on HREA">
          <article><span>01</span><div><strong>Starting from basics</strong><small>Build your foundation before attempting exam-level questions.</small></div></article>
          <article><span>02</span><div><strong>Concepts are not clear</strong><small>Get guided video lessons and step-by-step explanations.</small></div></article>
          <article><span>03</span><div><strong>Self-study learners</strong><small>Practise topic-wise MCQs at your own pace without registration.</small></div></article>
          <article><span>04</span><div><strong>Revision-focused learners</strong><small>Use questions and notes to identify weak topics quickly.</small></div></article>
          <article><span>05</span><div><strong>First-time aspirants</strong><small>Follow the organised subject roadmap instead of random material.</small></div></article>
          <article><span>06</span><div><strong>Serious exam aspirants</strong><small>Combine PYQs, expert practice and guided learning for preparation.</small></div></article>
        </div>
      </section>

      <section className="course-section" id="courses">
        <div className="section-title">
          <div><p className="overline">Free learning tracks</p><h2>Everything you need for DBMS and SQL</h2></div>
          <a href="#practice">View question bank →</a>
        </div>
        <div className="course-grid">
          <button className="course-card blue" onClick={() => { setSubject("Database Management System"); setTopic("All topics"); document.querySelector("#practice")?.scrollIntoView(); }}>
            <span className="course-icon">DB</span><h3>DBMS Complete Course</h3><p>Fundamentals, ER model, keys, normalization, transactions and indexing</p><div className="course-progress"><i style={{ width: "100%" }} /></div><small>Completely free <b>→</b></small>
          </button>
          <button className="course-card green" onClick={() => { setSubject("Database Management System"); setTopic("SQL"); setSubtopic("All subtopics"); document.querySelector("#practice")?.scrollIntoView(); }}>
            <span className="course-icon">SQL</span><h3>SQL Complete Practice</h3><p>DDL, DML, joins, functions, nested queries, grouping and constraints</p><div className="course-progress"><i style={{ width: "100%" }} /></div><small>Completely free <b>→</b></small>
          </button>
          <button className="course-card purple" onClick={() => openQuestion(questions[0])}>
            <span className="course-icon">✓</span><h3>PYQs + Expert Practice</h3><p>Four-option MCQs with checked answers and learner-friendly explanations</p><div className="course-progress"><i style={{ width: "100%" }} /></div><small>Attempt now—no login <b>→</b></small>
          </button>
        </div>
      </section>

      <section className="subject-library" id="subject-library">
        <div className="section-title">
          <div><p className="overline">Complete subject directory</p><h2>JOA IT learning library</h2><p className="section-copy">DBMS, SQL and Operating System are available now. The remaining subjects are listed so learners can see the complete preparation roadmap; they will unlock as verified content is uploaded.</p></div>
          <span className="library-count">3 ACTIVE · {upcomingSubjects.length} COMING SOON</span>
        </div>
        <div className="subject-library-grid">
          <button className="subject-tile available" onClick={() => { setSubject("Database Management System"); setTopic("All topics"); document.querySelector("#practice")?.scrollIntoView(); }}>
            <span className="subject-tile-icon">DB</span><span><strong>Database Management System</strong><small>1,022 questions · Completely free</small></span><em>OPEN</em>
          </button>
          <button className="subject-tile available" onClick={() => { setSubject("Database Management System"); setTopic("SQL"); setSubtopic("All subtopics"); document.querySelector("#practice")?.scrollIntoView(); }}>
            <span className="subject-tile-icon">SQL</span><span><strong>SQL</strong><small>Included with the free DBMS course</small></span><em>OPEN</em>
          </button>
          <a className="subject-tile available premium" href="#operating-system">
            <span className="subject-tile-icon">OS</span><span><strong>Operating System</strong><small>30 easy previews · Full bank via Telegram</small></span><em>PREVIEW</em>
          </a>
          {upcomingSubjects.map((subject) => (
            <button className="subject-ti