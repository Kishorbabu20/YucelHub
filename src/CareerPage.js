import React, { useState, useEffect } from "react";
import { Header } from "./HomePage";
import "./styles/CareerPage.css";
import CareerImg from "./assets/Career.png";
import UploadIcon from "./assets/upload.png";

// EmailJS for automatic email sending
import emailjs from 'emailjs-com';

// Import the job data from admin system
import { getJobsFromStorage } from "./admin/jobService";

function CareerHero({ onViewOpenPositions }) {
  return (
    <section className="cr-hero">
      <p className="cr-eyebrow">Join our global team</p>
      <h1 className="cr-title">Build your career with Yucel Hub</h1>
      <p className="cr-sub">We're always looking for talented individuals who share our passion for creativity, innovation, and excellence. Join our remote-first team and work on exciting projects with global impact.</p>
      <button className="cr-btn-primary" onClick={onViewOpenPositions}>View Open Position</button>
    </section>
  );
}

function Culture() {
  return (
    <section className="cr-culture">
      <div className="cr-culture-inner">
        <div className="cr-culture-text">
          <h2>Our Culture</h2>
          <p>
            At <strong>Yucel Hub</strong>, we believe that great work comes from happy, motivated people. Our culture is built on trust, creativity, and mutual respect.
          </p>
          <p>
            We're a remote-first company that values work-life balance, continuous learning, and the freedom to be creative. Every team member has the autonomy to make decisions and contribute to our collective success.
          </p>
          <h4>What we believe in:</h4>
          <ul>
            <li>Creativity without boundaries</li>
            <li>Technical excellence in everything</li>
            <li>Collaborative by nature</li>
            <li>Growth-oriented mindset</li>
            <li>Global perspective</li>
            <li>Quality over quantity</li>
          </ul>
        </div>
        <div className="cr-culture-image">
          <img src={CareerImg} alt="Team collaboration" />
        </div>
      </div>
    </section>
  );
}

function WhyWork() {
  const items = [
    { t: "Remote-First Culture", d: "Work from anywhere in the world with flexible hours that fit your lifestyle." },
    { t: "Professional growth", d: "Continuous learning opportunities and career advancement paths." },
    { t: "Competitive Compensation", d: "Fair compensation packages with performance based bonuses." },
    { t: "Impact-Driven Work", d: "Work on meaningful projects with global reach and impact." },
    { t: "Collaborative Team", d: "Join a supportive team that values creativity and innovation." },
  ];
  return (
    <section className="cr-why">
      <div className="cr-why-inner">
        <h2>Why Work With Us</h2>
        <p>We offer more than just a job — we provide a platform for growth, creativity, and meaningful impact.</p>
        <div className="cr-why-grid">
          {items.map((it, i) => (
            <div className="cr-why-item" key={i}>
              <h3>{it.t}</h3>
              <p>{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpenPositions({
  activeTab,
  setActiveTab,
  uploadedFiles,
  handleFileUpload,
  removeFile,
  selectedPosition,
  setSelectedPosition,
  applicationForm,
  handleApplicationSubmit,
  handleFormChange,
  isUploading
}) {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load jobs from admin system
    const loadJobs = () => {
      try {
        const jobs = getJobsFromStorage();
        console.log("Loaded jobs from storage:", jobs); // Debug log
        // Filter only open positions
        const openJobs = jobs.filter(job => job.status === "Open");
        console.log("Open jobs:", openJobs); // Debug log
        setPositions(openJobs);
      } catch (error) {
        console.error("Error loading jobs:", error);
        // Fallback to default positions if admin system fails
        setPositions([
          {
            title: "Video Editor & Motion Designer",
            department: "Production",
            location: "Hybrid",
            type: "Full-time",
            description: "Create compelling video content and motion graphics for our clients across various industries.",
          },
          {
            title: "Project Manager",
            department: "Operations",
            location: "On Site",
            type: "Full-time",
            description: "Lead cross-functional teams and ensure successful project delivery for our clients.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [activeTab]); // Reload when tab changes

  const getLocationIcon = (location) => {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    );
  };

  const getTimeIcon = () => {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
      </svg>
    );
  };

  return (
    <section className="cr-open" id="open-positions">
      <div className="cr-open-inner">
        <div className="cr-open-cta">
          <div className={"cr-tab-switch " + (activeTab === "apply" ? "right" : "left")}>
            <div className="cr-tab-slider"></div>
            <button
              className={"cr-tab" + (activeTab === "open" ? " active" : "")}
              onClick={() => setActiveTab("open")}
            >
              Open Positions
            </button>
            <button
              className={"cr-tab" + (activeTab === "apply" ? " active" : "")}
              onClick={() => setActiveTab("apply")}
            >
              Send Application
            </button>
          </div>
        </div>
        {activeTab === "open" && (
          <>
            <h2>Open Positions</h2>
            <p className="cr-open-sub">Join our growing team and help us deliver exceptional results for clients worldwide.</p>
            {loading ? (
              <div className="cr-loading">Loading positions...</div>
            ) : (
              <div className="cr-positions">
                {positions.map((p, i) => (
                  <div className="cr-position" key={i}>
                    <div className="cr-position-content">
                      <div className="cr-position-info">
                        <h3>{p.title}</h3>
                        <p className="cr-position-desc">{p.description}</p>
                        <div className="cr-tags">
                          <span className="cr-tag">
                            {getLocationIcon(p.location)}
                            {p.location}
                          </span>
                          <span className="cr-tag">
                            {getTimeIcon()}
                            {p.type}
                          </span>
                        </div>
                      </div>
                      <button className="cr-apply-btn" onClick={() => {
                        // Redirect to job application page with job ID
                        window.location.hash = `#/job-application?id=${p.id || 'default'}`;
                      }}>Apply Now</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="cr-view-all"><button className="cr-btn-secondary">View All Positions</button></div>
          </>
        )}

        {activeTab === "apply" && (
          <div className="cr-apply">
            <h2 className="cr-apply-title">Submit Your Application</h2>
            <p className="cr-apply-sub">Ready to join our team? Fill out the form below and upload your portfolio.</p>
            <form className="cr-apply-form" onSubmit={handleApplicationSubmit}>
              <div className="cr-field full">
                <label>Position Apply For *</label>
                <div className="cr-position-toggle">
                  <button
                    type="button"
                    className={`cr-toggle-btn ${!selectedPosition ? 'active' : ''}`}
                    onClick={() => setSelectedPosition("")}
                  >
                    Custom Position
                  </button>
                  <button
                    type="button"
                    className={`cr-toggle-btn ${selectedPosition ? 'active' : ''}`}
                    onClick={() => {
                      if (positions.length > 0) {
                        setSelectedPosition(positions[0].title);
                      }
                    }}
                  >
                    Open Positions
                  </button>
                </div>
                {selectedPosition ? (
                  <>
                    <select
                      value={selectedPosition}
                      onChange={(e) => {
                        setSelectedPosition(e.target.value);
                        handleFormChange('position', e.target.value);
                      }}
                    >
                      <option value="">Select a position</option>
                      {positions.map((pos, idx) => (
                        <option key={idx} value={pos.title}>{pos.title}</option>
                      ))}
                    </select>
                    <small className="cr-helper-text">You're applying for a specific open position</small>
                  </>
                ) : (
                  <>
                    <textarea
                      placeholder="Describe the position you're interested in or the type of role you're looking for..."
                      value={applicationForm.position}
                      onChange={(e) => handleFormChange('position', e.target.value)}
                      required
                      rows={2}
                      className="cr-position-textarea"
                    />
                    <small className="cr-helper-text">Tell us about the role you're looking for or your area of expertise</small>
                  </>
                )}
              </div>
              <div className="cr-field">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={applicationForm.fullName}
                  onChange={(e) => handleFormChange('fullName', e.target.value)}
                  required
                />
              </div>
              <div className="cr-field">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={applicationForm.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="cr-field">
                <label>Phone number *</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={applicationForm.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  required
                />
              </div>
              <div className="cr-field">
                <label>LinkedIn Profile *</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/yourname"
                  value={applicationForm.linkedin}
                  onChange={(e) => handleFormChange('linkedin', e.target.value)}
                  required
                />
              </div>
              <div className="cr-field full">
                <label>Portfolio URL</label>
                <input
                  type="url"
                  placeholder="https://yourportfolio.com"
                  value={applicationForm.portfolio}
                  onChange={(e) => handleFormChange('portfolio', e.target.value)}
                />
              </div>
              <div className="cr-field">
                <label>Year of Experience *</label>
                <select
                  value={applicationForm.experience}
                  onChange={(e) => handleFormChange('experience', e.target.value)}
                  required
                >
                  <option value="">Select experience level</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="2-4 years">2-4 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
              <div className="cr-field">
                <label>When Can you start ?</label>
                <select
                  value={applicationForm.availability}
                  onChange={(e) => handleFormChange('availability', e.target.value)}
                >
                  <option value="">Select availability</option>
                  <option value="Immediately">Immediately</option>
                  <option value="In 2 weeks">In 2 weeks</option>
                  <option value="Next month">Next month</option>
                </select>
              </div>
              <div className="cr-field full">
                <label>Cover letter (Optional)</label>
                <textarea
                  placeholder="Tell us why you are interested in this position and what makes you great fit for our team..."
                  value={applicationForm.coverLetter}
                  onChange={(e) => handleFormChange('coverLetter', e.target.value)}
                ></textarea>
              </div>
              <div className="cr-field full">
                <label>Upload Resume & Portfolio Files *</label>
                <div className="cr-upload">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.gif"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cr-upload-area">
                    <img src={UploadIcon} alt="Upload" className="cr-upload-icon" />
                    <div className="cr-upload-hint">Click to upload files</div>
                    <div className="cr-upload-sub">PDF, JPG, PNG, GIF, upto 10MB each</div>
                  </label>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="cr-uploaded-files">
                    <h4>Uploaded Files:</h4>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="cr-file-item">
                        <span className="cr-file-name">{file.name}</span>
                        <span className="cr-file-size">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        <button
                          type="button"
                          className="cr-remove-file"
                          onClick={() => removeFile(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="cr-field full submit">
                <button
                  className="cr-btn-primary"
                  type="submit"
                  disabled={isUploading}
                >
                  {isUploading ? "Sending Application..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

// function Process() {
//   const steps = [
//     { n: "1", t: "Application", d: "Submit your application with portfolio" },
//     { n: "2", t: "Screening", d: "Initial review and phone screening" },
//     { n: "3", t: "Interview", d: "Virtual interview with team leads" },
//     { n: "4", t: "Welcome", d: "Onboarding and team integration" },
//   ];
//   return (
//     <section className="cr-process">
//       <div className="cr-process-inner">
//         <h2>Our Application Process</h2>
//         <p>A simple, transparent process designed to get to know you better.</p>
//         <div className="cr-steps">
//           {steps.map((s) => (
//             <div className="cr-step" key={s.n}>
//               <div className="cr-step-num">{s.n}</div>
//               <h3>{s.t}</h3>
//               <p>{s.d}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

function CTABox({ onSendPortfolio }) {
  return (
    <section className="cr-cta">
      <div className="cr-cta-inner">
        <h3>Don't see a perfect fit?</h3>
        <p>
          We're always open to meeting talented individuals. Send us your portfolio and let us know how you'd like to contribute to our team.
        </p>
        <button className="cr-btn-primary light" onClick={onSendPortfolio}>Send Us Your Portfolio</button>
      </div>
    </section>
  );
}

export default function CareerPage() {
  const [careerTab, setCareerTab] = useState("open");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [applicationForm, setApplicationForm] = useState({
    position: "",
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    experience: "",
    availability: "",
    coverLetter: ""
  });

  const handleViewOpenPositions = () => {
    setCareerTab("open");
    const target = document.getElementById("open-positions");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSendPortfolio = () => {
    setCareerTab("apply");
    setSelectedPosition(""); // Clear selected position to show textarea
    const target = document.getElementById("open-positions");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(file.type)) {
        alert(`Invalid file type: ${file.name}. Please upload PDF, JPG, PNG, or GIF files only.`);
        return false;
      }

      if (file.size > maxSize) {
        alert(`File too large: ${file.name}. Maximum size is 10MB.`);
        return false;
      }

      return true;
    });

    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!applicationForm.position || !applicationForm.fullName || !applicationForm.email || !applicationForm.phone || !applicationForm.linkedin) {
      alert("Please fill in all required fields marked with *");
      return;
    }

    if (uploadedFiles.length === 0) {
      alert("Please upload at least one file (resume/portfolio)");
      return;
    }

    // Show loading state
    setIsUploading(true);

    try {
      // Prepare email template parameters
      const templateParams = {
        to_email: 'praveen@yucelhub.in',
        position: applicationForm.position,
        full_name: applicationForm.fullName,
        email: applicationForm.email,
        phone: applicationForm.phone,
        linkedin: applicationForm.linkedin,
        portfolio: applicationForm.portfolio || 'Not provided',
        experience: applicationForm.experience || 'Not specified',
        availability: applicationForm.availability || 'Not specified',
        cover_letter: applicationForm.coverLetter || 'No cover letter provided',
        uploaded_files: uploadedFiles.map(file => `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`).join(', '),
        submission_date: new Date().toLocaleString(),
        reply_to: applicationForm.email
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        'service_de30rsg', // Your EmailJS service ID
        'e6ScUui8fi-mhJMjNIdpB', // Your EmailJS template ID
        templateParams,
        's7WX2xkMlPjoYNcA-' // Replace with your EmailJS public key
      );

      if (response.status === 200) {
        alert("Application submitted successfully! We'll review your application and get back to you soon.");

        // Reset form
        setApplicationForm({
          position: "",
          fullName: "",
          email: "",
          phone: "",
          linkedin: "",
          portfolio: "",
          experience: "",
          availability: "",
          coverLetter: ""
        });
        setUploadedFiles([]);
        setSelectedPosition("");
      }
    } catch (error) {
      console.error('Application submission failed:', error);
      alert("Sorry, there was an error sending your application. Please try again or contact us directly.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormChange = (field, value) => {
    setApplicationForm(prev => ({
      ...prev,
      [field]: value
    }));

    // Update selectedPosition when position field changes
    if (field === 'position') {
      if (value === "") {
        setSelectedPosition(""); // Clear selected position if position field is empty
      } else {
        setSelectedPosition(value);
      }
    }
  };
  return (
    <div className="cr-container">
      <Header />
      <CareerHero onViewOpenPositions={handleViewOpenPositions} />
      <Culture />
      <WhyWork />
      <OpenPositions
        activeTab={careerTab}
        setActiveTab={setCareerTab}
        uploadedFiles={uploadedFiles}
        handleFileUpload={handleFileUpload}
        removeFile={removeFile}
        selectedPosition={selectedPosition}
        setSelectedPosition={setSelectedPosition}
        applicationForm={applicationForm}
        handleApplicationSubmit={handleApplicationSubmit}
        handleFormChange={handleFormChange}
        isUploading={isUploading}
      />
      {/* <Process /> */}
      <CTABox onSendPortfolio={handleSendPortfolio} />
    </div>
  );
}


