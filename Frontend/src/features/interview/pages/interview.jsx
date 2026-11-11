
import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../style/interview.scss";

const technicalQuestions = [
  {
    question: "Explain the Node.js event loop and how it handles asynchronous I/O operations.",
    intention: "Evaluates your understanding of Node.js architecture, asynchronous execution and non-blocking I/O.",
    answer: "The Node.js event loop allows JavaScript to perform non-blocking operations despite using a single main thread. It delegates operations such as file access and network requests to the operating system or libuv thread pool. Once these operations complete, their callbacks are queued and executed during the appropriate event-loop phase."
  },
  {
    question: "How do you optimize a MongoDB aggregation pipeline for high-volume data?",
    intention: "Tests database optimization, indexing strategies and your ability to work with large datasets.",
    answer: "Start by filtering documents early using $match, ensure frequently queried fields are indexed, and reduce unnecessary fields using $project. Use explain() to inspect query execution, avoid unnecessary $lookup operations, and consider appropriate indexing and pagination strategies."
  },
  {
    question: "Can you describe the Cache-Aside pattern and when you would use Redis in a Node.js application?",
    intention: "Assesses your understanding of caching strategies and performance optimization.",
    answer: "In the Cache-Aside pattern, an application first checks the cache. If the data is unavailable, it retrieves it from the database and stores it in the cache for future requests. Redis is useful for frequently accessed data, session storage, rate limiting and reducing database load."
  },
  {
    question: "What are the challenges of migrating a monolithic application to a modular service-based architecture?",
    intention: "Evaluates architectural thinking, scalability awareness and distributed-system fundamentals.",
    answer: "Common challenges include identifying service boundaries, managing inter-service communication, maintaining data consistency, handling distributed failures and implementing observability. A gradual migration using the Strangler pattern can reduce risk."
  }
];

const behavioralQuestions = [
  {
    question: "Tell me about a challenging technical problem you solved.",
    intention: "Evaluates problem-solving ability, ownership and technical communication.",
    answer: "Use the STAR method: explain the situation, your responsibility, the actions you took and the measurable result. Focus on your individual contribution."
  },
  {
    question: "Describe a situation where you had to learn a new technology quickly.",
    intention: "Assesses adaptability, curiosity and learning ability.",
    answer: "Discuss the technology, why you needed to learn it, the resources and practical exercises you used, and how you applied it to deliver a result."
  },
  {
    question: "How do you handle disagreements with teammates during development?",
    intention: "Evaluates teamwork, communication and conflict resolution.",
    answer: "Explain how you listen to different perspectives, compare technical trade-offs, use evidence to make decisions and work toward a shared outcome."
  }
];

const skillGaps = [
  { skill: "Message Queues (Kafka/RabbitMQ)", severity: "high" },
  { skill: "Advanced Docker & CI/CD Pipelines", severity: "medium" },
  { skill: "Distributed Systems Design", severity: "medium" },
  { skill: "Production-level Redis Management", severity: "low" }
];

const roadmap = [
  {
    day: 1,
    focus: "Node.js and JavaScript fundamentals",
    tasks: [
      "Revise the JavaScript event loop.",
      "Understand promises, async/await and callbacks.",
      "Practise Node.js asynchronous programming."
    ]
  },
  {
    day: 2,
    focus: "MongoDB and database optimization",
    tasks: [
      "Revise MongoDB indexes.",
      "Practise aggregation pipelines.",
      "Understand query execution and explain()."
    ]
  },
  {
    day: 3,
    focus: "Caching and message queues",
    tasks: [
      "Understand Redis caching strategies.",
      "Learn the Cache-Aside pattern.",
      "Explore Kafka and RabbitMQ fundamentals."
    ]
  },
  {
    day: 4,
    focus: "System design and architecture",
    tasks: [
      "Study monolithic and microservice architectures.",
      "Understand service communication.",
      "Practise designing a scalable backend."
    ]
  },
  {
    day: 5,
    focus: "Deployment and interview revision",
    tasks: [
      "Revise Docker fundamentals.",
      "Understand CI/CD workflows.",
      "Practise answering technical and behavioral questions."
    ]
  }
];

const Interview = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("technical");
  const [expandedQuestion, setExpandedQuestion] = useState(0);
  const [activeDay, setActiveDay] = useState(1);

  const selectSection = (section) => {
    setActiveSection(section);
    setExpandedQuestion(0);
  };

  const questions =
    activeSection === "technical"
      ? technicalQuestions
      : behavioralQuestions;

  const selectedDay = roadmap.find((day) => day.day === activeDay);

  return (
    <main className="interview-page">

      <div className="report-container">

        {/* TOP HEADER */}
        <header className="report-header">

          <div className="report-brand">
            Preplix<span>.ai</span>
          </div>

          <div className="report-header-right">
            <span className="report-status">
              Interview preparation
            </span>

            <button
              className="report-back-button"
              onClick={() => navigate("/")}
            >
              <span>←</span>
              Back to home
            </button>
          </div>

        </header>

        {/* REPORT INTRODUCTION */}
        <section className="report-intro">

          <div>
            <span className="report-eyebrow">
              YOUR PERSONALIZED ANALYSIS
            </span>

            <h1>
              Interview <span>report.</span>
            </h1>

            <p>
              Explore your interview questions, identify skill gaps
              and follow your personalized preparation roadmap.
            </p>
          </div>

          <span className="sample-label">
            Sample report preview
          </span>

        </section>

        {/* DASHBOARD LAYOUT */}
        <div className="report-layout">

          {/* LEFT SIDEBAR */}
          <aside className="report-sidebar">

            <span className="sidebar-heading">
              SECTIONS
            </span>

            <button
              className={`sidebar-link ${activeSection === "technical" ? "active" : ""}`}
              onClick={() => selectSection("technical")}
            >
              <span className="sidebar-icon">⌘</span>
              Technical Questions
              <span className="sidebar-count">04</span>
            </button>

            <button
              className={`sidebar-link ${activeSection === "behavioral" ? "active" : ""}`}
              onClick={() => selectSection("behavioral")}
            >
              <span className="sidebar-icon">☷</span>
              Behavioral Questions
              <span className="sidebar-count">03</span>
            </button>

            <button
              className={`sidebar-link ${activeSection === "roadmap" ? "active" : ""}`}
              onClick={() => selectSection("roadmap")}
            >
              <span className="sidebar-icon">↗</span>
              Road Map
              <span className="sidebar-count">05</span>
            </button>

            <div className="sidebar-note">
              <span>✦</span>
              <p>
                Consistent preparation is the key to your next opportunity.
              </p>
            </div>

          </aside>

          {/* CENTER CONTENT */}
          <section className="report-main">

            {activeSection === "technical" && (
              <>
                <div className="section-title-row">
                  <div>
                    <span className="section-eyebrow">ASSESSMENT</span>
                    <h2>Technical Questions</h2>
                  </div>

                  <span className="question-count">
                    {technicalQuestions.length} questions
                  </span>
                </div>

                <div className="question-list">

                  {technicalQuestions.map((item, index) => (
                    <article
                      className={`question-card ${expandedQuestion === index ? "expanded" : ""}`}
                      key={index}
                    >

                      <button
                        className="question-trigger"
                        onClick={() =>
                          setExpandedQuestion(
                            expandedQuestion === index ? null : index
                          )
                        }
                      >
                        <span className="question-number">
                          Q{String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="question-text">
                          {item.question}
                        </span>

                        <span className="question-chevron">
                          {expandedQuestion === index ? "−" : "+"}
                        </span>
                      </button>

                      {expandedQuestion === index && (
                        <div className="question-answer">

                          <div className="answer-block">
                            <span className="answer-label">
                              WHAT THE INTERVIEWER EXPECTS
                            </span>
                            <p>{item.intention}</p>
                          </div>

                          <div className="answer-block">
                            <span className="answer-label">
                              SUGGESTED ANSWER
                            </span>
                            <p>{item.answer}</p>
                          </div>

                        </div>
                      )}

                    </article>
                  ))}

                </div>
              </>
            )}

            {activeSection === "behavioral" && (
              <>
                <div className="section-title-row">
                  <div>
                    <span className="section-eyebrow">ASSESSMENT</span>
                    <h2>Behavioral Questions</h2>
                  </div>

                  <span className="question-count">
                    {behavioralQuestions.length} questions
                  </span>
                </div>

                <div className="question-list">

                  {behavioralQuestions.map((item, index) => (
                    <article
                      className={`question-card ${expandedQuestion === index ? "expanded" : ""}`}
                      key={index}
                    >

                      <button
                        className="question-trigger"
                        onClick={() =>
                          setExpandedQuestion(
                            expandedQuestion === index ? null : index
                          )
                        }
                      >
                        <span className="question-number">
                          Q{String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="question-text">
                          {item.question}
                        </span>

                        <span className="question-chevron">
                          {expandedQuestion === index ? "−" : "+"}
                        </span>
                      </button>

                      {expandedQuestion === index && (
                        <div className="question-answer">

                          <div className="answer-block">
                            <span className="answer-label">
                              WHAT THE INTERVIEWER EXPECTS
                            </span>
                            <p>{item.intention}</p>
                          </div>

                          <div className="answer-block">
                            <span className="answer-label">
                              SUGGESTED ANSWER
                            </span>
                            <p>{item.answer}</p>
                          </div>

                        </div>
                      )}

                    </article>
                  ))}

                </div>
              </>
            )}

            {activeSection === "roadmap" && (
              <>
                <div className="section-title-row">
                  <div>
                    <span className="section-eyebrow">YOUR ACTION PLAN</span>
                    <h2>Preparation Roadmap</h2>
                  </div>

                  <span className="question-count">
                    5 days
                  </span>
                </div>

                <div className="roadmap-layout">

                  <div className="roadmap-days">

                    {roadmap.map((day) => (
                      <button
                        key={day.day}
                        className={`roadmap-day ${activeDay === day.day ? "active" : ""}`}
                        onClick={() => setActiveDay(day.day)}
                      >
                        <span className="roadmap-day-number">
                          {String(day.day).padStart(2, "0")}
                        </span>

                        <span className="roadmap-day-label">
                          Day {day.day}
                        </span>

                        <span className="roadmap-day-arrow">→</span>
                      </button>
                    ))}

                  </div>

                  <div className="roadmap-detail">

                    <span className="section-eyebrow">
                      DAY {selectedDay.day}
                    </span>

                    <h3>{selectedDay.focus}</h3>

                    <span className="answer-label">
                      TASKS TO COMPLETE
                    </span>

                    <ul>
                      {selectedDay.tasks.map((task, index) => (
                        <li key={index}>
                          <span className="task-bullet">✓</span>
                          {task}
                        </li>
                      ))}
                    </ul>

                  </div>

                </div>
              </>
            )}

          </section>

          {/* RIGHT SUMMARY PANEL */}
          <aside className="report-summary">

            <div className="summary-section">

              <span className="sidebar-heading">
                MATCH SCORE
              </span>

              <div className="score-circle">
                <div>
                  <strong>88</strong>
                  <span>%</span>
                </div>
              </div>

              <p className="score-description">
                Strong match for this role
              </p>

            </div>

            <div className="summary-divider" />

            <div className="summary-section">

              <span className="sidebar-heading">
                SKILL GAPS
              </span>

              <div className="skill-gap-list">

                {skillGaps.map((gap, index) => (
                  <div
                    key={index}
                    className={`skill-gap ${gap.severity}`}
                  >
                    <span>{gap.skill}</span>
                    <small>{gap.severity}</small>
                  </div>
                ))}

              </div>

            </div>

            <div className="summary-divider" />

            <div className="summary-tip">
              <span>✦</span>
              <p>
                Focus on your high-priority skill gaps first to improve your preparation.
              </p>
            </div>

          </aside>

        </div>

        {/* FOOTER */}
        <footer className="report-footer">
          <span>Preplix.ai</span>
          <span>Prepare smarter. Stand out.</span>
        </footer>

      </div>

    </main>
  );
};

export default Interview;
