import React, { useState, useEffect, useRef } from "react";
import { Header } from "./HomePage";
import "./styles/JobApplicationPage.css";
import UploadIcon from "./assets/upload.png";
import IconImg from "./assets/Icon.png";

// EmailJS for automatic email sending
import emailjs from 'emailjs-com';

// Import the job data from admin system
import { getJobsFromStorage } from "./admin/jobService";

function JobApplicationPage() {
    const applicationFormRef = useRef(null);
    const [job, setJob] = useState({
        title: 'Job Position',
        company: 'Yucel Hub',
        location: 'Remote',
        postedDate: new Date().toLocaleDateString(),
        description: 'Job description not available.',
        roleSummary: '',
        responsibilities: [],
        qualifications: []
    });
    const [loading, setLoading] = useState(true);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [applicationForm, setApplicationForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        linkedin: "",
        portfolio: "",
        experience: "",
        availability: "",
        coverLetter: ""
    });

    useEffect(() => {
        // Get job ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = urlParams.get('id');

        if (jobId) {
            loadJob(jobId);
        } else {
            // Fallback to first available job
            loadJobs();
        }
    }, []);

    const loadJob = (jobId) => {
        try {
            const jobs = getJobsFromStorage();
            const selectedJob = jobs.find(job => job.id === jobId);
            if (selectedJob) {
                setJob(selectedJob);
            } else {
                // Fallback to default job
                setJob({
                    id: "default",
                    title: "Video Editor & Motion Designer",
                    company: "Yucel Hub",
                    location: "Coimbatore, India",
                    postedDate: "09/06/2025",
                    description: "We are a fast-growing marketing agency specializing in digital content, and we're looking for a creative and skilled Video Editor and Motion Designer to join our dynamic team.",
                    roleSummary: "As a Video Editor and Motion Designer, you will be responsible for creating high-quality video content that tells compelling stories and engages our audience. You'll work closely with our creative team to bring ideas to life through video editing, motion graphics, and visual effects.",
                    responsibilities: [
                        "Edit and assemble raw video footage into polished, engaging content",
                        "Design and animate 2D and 3D motion graphics, including logos, lower thirds, and titles",
                        "Incorporate music, sound effects, and dialogue to enhance video content",
                        "Collaborate with creative, marketing, and product teams to understand project requirements",
                        "Develop storyboards and style frames for video projects",
                        "Ensure all content aligns with brand guidelines and maintains consistency",
                        "Manage multiple projects simultaneously while meeting deadlines",
                        "Maintain and organize project files and assets",
                        "Stay up-to-date with industry trends and new editing techniques",
                        "Prepare and optimize final video files for various digital platforms"
                    ],
                    qualifications: [
                        "Proven experience as a Video Editor and Motion Designer with a strong portfolio",
                        "High proficiency in Adobe Creative Suite (Premiere Pro, After Effects, Photoshop, Illustrator)",
                        "Excellent sense of timing, visual awareness, and a keen eye for detail",
                        "Experience with color correction, color grading, and audio mixing",
                        "Ability to work independently and collaboratively in a fast-paced environment",
                        "Exceptional time management, organizational, and problem-solving skills"
                    ]
                });
            }
        } catch (error) {
            console.error("Error loading job:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadJobs = () => {
        try {
            const jobs = getJobsFromStorage();
            if (jobs && jobs.length > 0) {
                setJob(jobs[0]);
            } else {
                // Fallback to default job
                setJob({
                    id: "default",
                    title: "Video Editor & Motion Designer",
                    company: "Yucel Hub",
                    location: "Coimbatore, India",
                    postedDate: "09/06/2025",
                    description: "We are a fast-growing marketing agency specializing in digital content, and we're looking for a creative and skilled Video Editor and Motion Designer to join our dynamic team.",
                    roleSummary: "As a Video Editor and Motion Designer, you will be responsible for creating high-quality video content that tells compelling stories and engages our audience. You'll work closely with our creative team to bring ideas to life through video editing, motion graphics, and visual effects.",
                    responsibilities: [
                        "Edit and assemble raw video footage into polished, engaging content",
                        "Design and animate 2D and 3D motion graphics, including logos, lower thirds, and titles",
                        "Incorporate music, sound effects, and dialogue to enhance video content",
                        "Collaborate with creative, marketing, and product teams to understand project requirements",
                        "Develop storyboards and style frames for video projects",
                        "Ensure all content aligns with brand guidelines and maintains consistency",
                        "Manage multiple projects simultaneously while meeting deadlines",
                        "Maintain and organize project files and assets",
                        "Stay up-to-date with industry trends and new editing techniques",
                        "Prepare and optimize final video files for various digital platforms"
                    ],
                    qualifications: [
                        "Proven experience as a Video Editor and Motion Designer with a strong portfolio",
                        "High proficiency in Adobe Creative Suite (Premiere Pro, After Effects, Photoshop, Illustrator)",
                        "Excellent sense of timing, visual awareness, and a keen eye for detail",
                        "Experience with color correction, color grading, and audio mixing",
                        "Ability to work independently and collaboratively in a fast-paced environment",
                        "Exceptional time management, organizational, and problem-solving skills"
                    ]
                });
            }
        } catch (error) {
            console.error("Error loading jobs:", error);
        } finally {
            setLoading(false);
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

    const handleFormChange = (field, value) => {
        setApplicationForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleApplicationSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!applicationForm.fullName || !applicationForm.email || !applicationForm.phone || !applicationForm.linkedin) {
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
                position: job?.title || 'Job Application',
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
            }
        } catch (error) {
            console.error('Application submission failed:', error);
            alert("Sorry, there was an error sending your application. Please try again or contact us directly.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleBackToCareers = () => {
        window.location.hash = '#/career';
    };

    const scrollToApplicationForm = () => {
        if (applicationFormRef.current) {
            applicationFormRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    if (loading) {
        return (
            <div className="jap-container">
                <Header />
                <div className="jap-loading">Loading job details...</div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="jap-container">
                <Header />
                <div className="jap-error">Job not found</div>
            </div>
        );
    }

    return (
        <div className="jap-container">
            <Header />

            <div className="jap-content">
                {/* Breadcrumb */}
                <div className="jap-breadcrumb">
                    <h1>Careers</h1>
                    <button className="jap-back-btn" onClick={handleBackToCareers}>
                        ← Back to Careers
                    </button>
                </div>

                <div className="jap-main">
                    {/* Job Details Section */}
                    <div className="jap-job-details">
                        <div className="jap-job-header">
                            <h2 className="jap-job-title">{job.title || 'Job Position'}</h2>

                            <div className="jap-job-info">
                                <div className="jap-company-info">
                                    <div className="jap-company-logo">
                                        <img src={IconImg} alt="Yucel Hub" />
                                        <span>{job.company || 'Yucel Hub'}</span>
                                    </div>
                                    <div className="jap-job-meta">
                                        <div className="jap-location">📍 {job.location || 'Remote'}</div>
                                        <div className="jap-posted">📅 Posted on {job.postedDate || new Date().toLocaleDateString()}</div>
                                    </div>
                                    <button className="jap-apply-btn" onClick={scrollToApplicationForm}>Apply Now</button>
                                </div>
                            </div>
                        </div>

                        <div className="jap-job-content">
                            <div className="jap-job-description">
                                <h3>Company Description</h3>
                                <p>{job.description || 'Job description not available.'}</p>
                            </div>

                            <div className="jap-job-description">
                                <h3>Role Summary</h3>
                                <p>{job.roleSummary || ''}</p>
                            </div>

                            <div className="jap-responsibilities">
                                <h3>Key Responsibilities</h3>
                                <ul>
                                    {(job.responsibilities || []).map((responsibility, index) => (
                                        <li key={index}>{responsibility}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="jap-qualifications">
                                <h3>Required Qualifications & Skills</h3>
                                <ul>
                                    {(job.qualifications || []).map((qualification, index) => (
                                        <li key={index}>{qualification}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Application Form Section */}
                    <div className="jap-application-form" ref={applicationFormRef}>
                        <h3 className="jap-form-title">Apply For this Job</h3>
                        <p className="jap-form-subtitle">Ready to join our team? Fill out the form below and upload your portfolio.</p>

                        <form onSubmit={handleApplicationSubmit}>
                            <div className="jap-form-group">
                                <label>Position Apply For *</label>
                                <input
                                    type="text"
                                    value={job?.title || 'Job Position'}
                                    readOnly
                                    className="jap-readonly-input"
                                />
                            </div>

                            <div className="jap-form-row">
                                <div className="jap-form-group">
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        placeholder="Your full name"
                                        value={applicationForm.fullName}
                                        onChange={(e) => handleFormChange('fullName', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="jap-form-group">
                                    <label>Email Address *</label>
                                    <input
                                        type="email"
                                        placeholder="your.email@example.com"
                                        value={applicationForm.email}
                                        onChange={(e) => handleFormChange('email', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="jap-form-row">
                                <div className="jap-form-group">
                                    <label>Phone number *</label>
                                    <input
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        value={applicationForm.phone}
                                        onChange={(e) => handleFormChange('phone', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="jap-form-group">
                                    <label>LinkedIn Profile *</label>
                                    <input
                                        type="url"
                                        placeholder="https://linkedin.com/in/yourname"
                                        value={applicationForm.linkedin}
                                        onChange={(e) => handleFormChange('linkedin', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="jap-form-group">
                                <label>Portfolio URL</label>
                                <input
                                    type="url"
                                    placeholder="https://yourportfolio.com"
                                    value={applicationForm.portfolio}
                                    onChange={(e) => handleFormChange('portfolio', e.target.value)}
                                />
                            </div>

                            <div className="jap-form-row">
                                <div className="jap-form-group">
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
                                <div className="jap-form-group">
                                    <label>When Can you start?</label>
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
                            </div>

                            <div className="jap-form-group">
                                <label>Cover letter *</label>
                                <textarea
                                    placeholder="Tell us why you are interested in this position and what makes you great fit for our team..."
                                    value={applicationForm.coverLetter}
                                    onChange={(e) => handleFormChange('coverLetter', e.target.value)}
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="jap-form-group">
                                <label>Upload Resume & Portfolio Files *</label>
                                <div className="jap-upload-area">
                                    <input
                                        type="file"
                                        multiple
                                        accept=".pdf,.jpg,.jpeg,.png,.gif"
                                        onChange={handleFileUpload}
                                        style={{ display: 'none' }}
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="jap-upload-label">
                                        <img src={UploadIcon} alt="Upload" className="jap-upload-icon" />
                                        <div className="jap-upload-text">Click to upload files</div>
                                        <div className="jap-upload-sub">PDF, JPG, PNG, GIF, upto 10MB each</div>
                                    </label>
                                </div>
                                {uploadedFiles.length > 0 && (
                                    <div className="jap-uploaded-files">
                                        <h4>Uploaded Files:</h4>
                                        {uploadedFiles.map((file, index) => (
                                            <div key={index} className="jap-file-item">
                                                <span className="jap-file-name">{file.name}</span>
                                                <span className="jap-file-size">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                                <button
                                                    type="button"
                                                    className="jap-remove-file"
                                                    onClick={() => removeFile(index)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="jap-submit-btn"
                                disabled={isUploading}
                            >
                                {isUploading ? "Submitting Application..." : "Submit Application"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobApplicationPage;
