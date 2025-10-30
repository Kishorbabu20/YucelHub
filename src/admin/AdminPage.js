import React, { useState, useEffect } from "react";
import ProjectService from "../services/projectService";
import { saveJobsToStorage, getJobsFromStorage } from "./jobService";
import { saveTestimonialsToStorage, getTestimonialsFromStorage } from "./testimonialService";
import ImageCropper from "../components/ImageCropper";
import "../styles/ImageCropper.css";
import "./AdminPage.css";

export default function AdminPage() {
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "/admin"; // Redirect to login
  };

  const [activeTab, setActiveTab] = useState("portfolio");
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [testimonials, setTestimonials] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    client: "",
    imageUrl: "",
    imageFile: null,
    galleryImages: [],
    galleryFiles: [],
    videoUrl: "",
    tools: [],
    toolsInput: "",
    isUploading: false
  });

  const [jobs, setJobs] = useState([]);

  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);
  const [isEditJobModalOpen, setIsEditJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isAddTestimonialModalOpen, setIsAddTestimonialModalOpen] = useState(false);
  const [isEditTestimonialModalOpen, setIsEditTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [jobFormData, setJobFormData] = useState({
    title: "",
    department: "Design",
    customDepartment: "",
    location: "Remote",
    type: "Full-time",
    customType: "",
    status: "Open",
    description: "",
    roleSummary: "",
    responsibilities: [],
    qualifications: [],
    responsibilitiesInput: "",
    qualificationsInput: "",
    company: "Yucel Hub",
    postedDate: new Date().toLocaleDateString()
  });

  const [testimonialFormData, setTestimonialFormData] = useState({
    name: "",
    position: "",
    company: "",
    review: "",
    rating: 5,
    avatarUrl: "",
    avatarFile: null,
    isUploading: false
  });

  // Image cropping states
  const [cropperState, setCropperState] = useState({
    isOpen: false,
    imageSrc: null,
    aspect: 1,
    onCropComplete: null
  });

  const categories = ["All", "Video Editing", "UI/UX", "Branding"];
  const departments = ["Design", "Production", "Development", "Marketing", "Other"];
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Other"];
  const jobStatuses = ["Open", "Closed", "On Hold"];

  useEffect(() => {
    // Load existing projects from storage
    const existingProjects = ProjectService.getAllProjects();
    setProjects(existingProjects || []);

    // Load existing testimonials from storage
    const existingTestimonials = getTestimonialsFromStorage();
    console.log('Loading testimonials from storage:', existingTestimonials); // Debug log
    setTestimonials(existingTestimonials || []);

    // Load existing jobs from storage using jobService
    const existingJobs = getJobsFromStorage();
    console.log('Loading jobs from storage:', existingJobs); // Debug log

    // If no jobs exist, initialize with some sample data
    if (!existingJobs || existingJobs.length === 0) {
      const sampleJobs = [
        {
          id: Date.now(),
          title: "Video Editor & Motion Designer",
          department: "",
          customDepartment: "",
          location: " ",
          type: "Full-time",
          customType: "",
          status: "Open",
          company: "Yucel Hub",
          postedDate: "09/06/2025",
          description: "YucelHub is a fast-growing marketing agency specializing in digital content creation and brand storytelling. We work with clients across various industries to create compelling visual narratives that engage audiences and drive results. We're looking for a creative and skilled Video Editor and Motion Designer to join our dynamic team.",
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
          ],
          createdAt: new Date().toISOString()
        },
        {
          id: Date.now() + 1,
          title: "Web Developer",
          department: "Development",
          customDepartment: "",
          location: "Remote",
          type: "Full-time",
          customType: "",
          status: "Open",
          company: "Yucel Hub",
          postedDate: new Date().toLocaleDateString(),
          description: "YucelHub is a leading digital agency that specializes in creating innovative web solutions and digital experiences. We work with startups and established companies to build scalable, user-friendly applications that drive business growth. We're seeking a skilled Web Developer to join our development team and help create amazing digital experiences for our clients.",
          roleSummary: "As a Web Developer, you will be responsible for building and maintaining web applications, ensuring they are responsive, user-friendly, and performant across all devices and browsers.",
          responsibilities: [
            "Develop and maintain web applications using modern technologies",
            "Collaborate with designers to implement UI/UX designs",
            "Write clean, efficient, and well-documented code",
            "Test and debug applications across different browsers and devices",
            "Optimize applications for maximum speed and scalability",
            "Stay up-to-date with emerging technologies and industry trends"
          ],
          qualifications: [
            "Proven experience as a Web Developer with a strong portfolio",
            "Proficiency in HTML, CSS, JavaScript, and React",
            "Experience with responsive design and cross-browser compatibility",
            "Knowledge of version control systems (Git)",
            "Strong problem-solving and communication skills",
            "Bachelor's degree in Computer Science or related field preferred"
          ],
          createdAt: new Date().toISOString()
        }
      ];
      console.log('Initializing with sample jobs:', sampleJobs); // Debug log
      setJobs(sampleJobs);
      saveJobsToStorage(sampleJobs);
    } else {
      setJobs(existingJobs);
    }
  }, []);

  const saveProjects = (newProjects) => {
    setProjects(newProjects);
  };

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    // For signed upload, we need these parameters
    const timestamp = Math.round((new Date()).getTime() / 1000);
    formData.append('timestamp', timestamp);

    // Using unsigned upload with your preset
    formData.append('upload_preset', 'YucelHub');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/da1kmr54w/image/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Cloudinary error:', errorData);
        throw new Error(`Upload failed: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };

  const openCropper = (file, aspect, onCropComplete) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCropperState({
        isOpen: true,
        imageSrc: reader.result,
        aspect: aspect,
        onCropComplete: onCropComplete
      });
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedBlob) => {
    if (cropperState.onCropComplete) {
      cropperState.onCropComplete(croppedBlob);
    }
    setCropperState({ isOpen: false, imageSrc: null, aspect: 1, onCropComplete: null });
  };

  const closeCropper = () => {
    setCropperState({ isOpen: false, imageSrc: null, aspect: 1, onCropComplete: null });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Open cropper for main project image (square aspect ratio)
      openCropper(file, 16/9, async (croppedBlob) => {
        setFormData(prev => ({ ...prev, isUploading: true }));

        try {
          // Upload cropped image to Cloudinary
          const cloudinaryUrl = await uploadToCloudinary(croppedBlob);
          setFormData(prev => ({
            ...prev,
            imageUrl: cloudinaryUrl,
            isUploading: false
          }));
        } catch (error) {
          alert('Failed to upload image. Please try again.');
          setFormData(prev => ({ ...prev, isUploading: false }));
        }
      });
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Process each file through cropper
      const processFile = (file) => {
        return new Promise((resolve) => {
          openCropper(file, 16/9, (croppedBlob) => {
            resolve(croppedBlob);
          });
        });
      };

      try {
        setFormData(prev => ({ ...prev, isUploading: true }));

        // For gallery images, we'll crop them one by one
        // Note: This is a simplified approach. In a real app, you might want to handle multiple crops sequentially
        const croppedBlobs = [];
        for (const file of files) {
          const croppedBlob = await new Promise((resolve) => {
            openCropper(file, 16/9, (blob) => resolve(blob));
          });
          croppedBlobs.push(croppedBlob);
        }

        const uploadPromises = croppedBlobs.map(blob => uploadToCloudinary(blob));
        const cloudinaryUrls = await Promise.all(uploadPromises);

        setFormData(prev => ({
          ...prev,
          galleryImages: [...prev.galleryImages, ...cloudinaryUrls],
          galleryFiles: [...prev.galleryFiles, ...files],
          isUploading: false
        }));
      } catch (error) {
        alert('Failed to upload some gallery images. Please try again.');
        setFormData(prev => ({ ...prev, isUploading: false }));
      }
    }
  };

  const removeGalleryImage = (index) => {
    const newGalleryImages = [...formData.galleryImages];
    const newGalleryFiles = [...formData.galleryFiles];
    newGalleryImages.splice(index, 1);
    newGalleryFiles.splice(index, 1);
    setFormData({ ...formData, galleryImages: newGalleryImages, galleryFiles: newGalleryFiles });
  };

  const handleAddProject = () => {
    if (!formData.title || !formData.description || !formData.client) {
      alert("Please fill in all required fields");
      return;
    }

    const projectData = {
      ...formData,
      tools: formData.toolsInput.split(",").map(tool => tool.trim()).filter(tool => tool)
    };

    const result = ProjectService.createProject(projectData);
    if (result.success) {
      setProjects(ProjectService.getAllProjects());
      resetForm();
      setIsAddModalOpen(false);
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  const handleEditProject = () => {
    if (!editingProject || !formData.title || !formData.description || !formData.client) {
      alert("Please fill in all required fields");
      return;
    }

    const projectData = {
      ...formData,
      tools: formData.toolsInput.split(",").map(tool => tool.trim()).filter(tool => tool)
    };

    const result = ProjectService.updateProject(editingProject.id, projectData);
    if (result.success) {
      setProjects(ProjectService.getAllProjects());
      resetForm();
      setIsEditModalOpen(false);
      setEditingProject(null);
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const result = ProjectService.deleteProject(id);
      if (result.success) {
        setProjects(ProjectService.getAllProjects());
        alert(result.message);
      } else {
        alert(result.message);
      }
    }
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      client: project.client,
      imageUrl: project.imageUrl,
      imageFile: null,
      galleryImages: project.galleryImages || [],
      galleryFiles: [],
      videoUrl: project.videoUrl || "",
      tools: project.tools,
      toolsInput: project.tools.join(", ")
    });
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      client: "",
      imageUrl: "",
      imageFile: null,
      galleryImages: [],
      galleryFiles: [],
      videoUrl: "",
      tools: [],
      toolsInput: ""
    });
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const openAddJobModal = () => {
    resetJobForm();
    setIsAddJobModalOpen(true);
  };

  const openAddTestimonialModal = () => {
    resetTestimonialForm();
    setIsAddTestimonialModalOpen(true);
  };

  const openEditTestimonialModal = (testimonial) => {
    setEditingTestimonial(testimonial);
    setTestimonialFormData({
      name: testimonial.name,
      position: testimonial.position,
      company: testimonial.company,
      review: testimonial.review,
      rating: testimonial.rating,
      avatarUrl: testimonial.avatarUrl,
      avatarFile: null,
      isUploading: false
    });
    setIsEditTestimonialModalOpen(true);
  };

  const openEditJobModal = (job) => {
    setEditingJob(job);
    setJobFormData({
      title: job.title,
      department: job.department === "Other" ? "Other" : job.department,
      customDepartment: job.department === "Other" ? job.department : "",
      location: job.location,
      type: job.type === "Other" ? "Other" : job.type,
      customType: job.type === "Other" ? job.type : "",
      status: job.status,
      description: job.description,
      roleSummary: job.roleSummary || "",
      responsibilities: job.responsibilities || [],
      qualifications: job.qualifications || [],
      responsibilitiesInput: (job.responsibilities || []).join('\n'),
      qualificationsInput: (job.qualifications || []).join('\n'),
      company: job.company || "Yucel Hub",
      postedDate: job.postedDate || new Date().toLocaleDateString()
    });
    setIsEditJobModalOpen(true);
  };

  const resetJobForm = () => {
    setJobFormData({
      title: "",
      department: "Design",
      customDepartment: "",
      location: "Remote",
      type: "Full-time",
      customType: "",
      status: "Open",
      description: "",
      roleSummary: "",
      responsibilities: [],
      qualifications: [],
      responsibilitiesInput: "",
      qualificationsInput: "",
      company: "Yucel Hub",
      postedDate: new Date().toLocaleDateString()
    });
  };

  const resetTestimonialForm = () => {
    setTestimonialFormData({
      name: "",
      position: "",
      company: "",
      review: "",
      rating: 5,
      avatarUrl: "",
      avatarFile: null,
      isUploading: false
    });
  };

  const handleAddJob = () => {
    if (!jobFormData.title || !jobFormData.description) {
      alert("Please fill in all required fields");
      return;
    }

    // Use custom department if "Other" is selected
    const finalDepartment = jobFormData.department === "Other" ? jobFormData.customDepartment : jobFormData.department;

    if (jobFormData.department === "Other" && !jobFormData.customDepartment.trim()) {
      alert("Please enter a custom department name");
      return;
    }

    // Use custom job type if "Other" is selected
    const finalType = jobFormData.type === "Other" ? jobFormData.customType : jobFormData.type;

    if (jobFormData.type === "Other" && !jobFormData.customType.trim()) {
      alert("Please enter a custom job type");
      return;
    }

    // Process responsibilities and qualifications from input strings
    const responsibilities = jobFormData.responsibilitiesInput
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const qualifications = jobFormData.qualificationsInput
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const newJob = {
      id: Date.now(),
      ...jobFormData,
      department: finalDepartment,
      type: finalType,
      responsibilities,
      qualifications,
      createdAt: new Date().toISOString()
    };

    const updatedJobs = [...jobs, newJob];
    console.log('Adding new job:', newJob); // Debug log
    console.log('Updated jobs array:', updatedJobs); // Debug log
    setJobs(updatedJobs);
    // Save to shared storage for other pages to access
    const saveResult = saveJobsToStorage(updatedJobs);
    console.log('Save result:', saveResult); // Debug log
    resetJobForm();
    setIsAddJobModalOpen(false);
  };

  const handleEditJob = () => {
    if (!editingJob || !jobFormData.title || !jobFormData.description) {
      alert("Please fill in all required fields");
      return;
    }

    // Use custom department if "Other" is selected
    const finalDepartment = jobFormData.department === "Other" ? jobFormData.customDepartment : jobFormData.department;

    if (jobFormData.department === "Other" && !jobFormData.customDepartment.trim()) {
      alert("Please enter a custom department name");
      return;
    }

    // Use custom job type if "Other" is selected
    const finalType = jobFormData.type === "Other" ? jobFormData.customType : jobFormData.type;

    if (jobFormData.type === "Other" && !jobFormData.customType.trim()) {
      alert("Please enter a custom job type");
      return;
    }

    // Process responsibilities and qualifications from input strings
    const responsibilities = jobFormData.responsibilitiesInput
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const qualifications = jobFormData.qualificationsInput
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const updatedJob = {
      ...editingJob,
      ...jobFormData,
      department: finalDepartment,
      type: finalType,
      responsibilities,
      qualifications
    };

    const updatedJobs = jobs.map(j => j.id === editingJob.id ? updatedJob : j);
    console.log('Editing job:', updatedJob); // Debug log
    console.log('Updated jobs array after edit:', updatedJobs); // Debug log
    setJobs(updatedJobs);
    // Save to shared storage for other pages to access
    const saveResult = saveJobsToStorage(updatedJobs);
    console.log('Save result after edit:', saveResult); // Debug log
    resetJobForm();
    setIsEditJobModalOpen(false);
    setEditingJob(null);
  };

  const handleDeleteJob = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      const updatedJobs = jobs.filter(j => j.id !== id);
      console.log('Deleting job with id:', id); // Debug log
      console.log('Updated jobs array after delete:', updatedJobs); // Debug log
      setJobs(updatedJobs);
      // Save to shared storage for other pages to access
      const saveResult = saveJobsToStorage(updatedJobs);
      console.log('Save result after delete:', saveResult); // Debug log
    }
  };

  const handleAddTestimonial = () => {
    if (!testimonialFormData.name || !testimonialFormData.review) {
      alert("Please fill in all required fields");
      return;
    }

    const newTestimonial = {
      id: Date.now(),
      ...testimonialFormData,
      createdAt: new Date().toISOString()
    };

    const updatedTestimonials = [...testimonials, newTestimonial];
    console.log('Adding new testimonial:', newTestimonial); // Debug log
    console.log('Updated testimonials array:', updatedTestimonials); // Debug log
    setTestimonials(updatedTestimonials);
    // Save to shared storage for other pages to access
    const saveResult = saveTestimonialsToStorage(updatedTestimonials);
    console.log('Save result:', saveResult); // Debug log
    resetTestimonialForm();
    setIsAddTestimonialModalOpen(false);
  };

  const handleEditTestimonial = () => {
    if (!editingTestimonial || !testimonialFormData.name || !testimonialFormData.review) {
      alert("Please fill in all required fields");
      return;
    }

    const updatedTestimonial = {
      ...editingTestimonial,
      ...testimonialFormData
    };

    const updatedTestimonials = testimonials.map(t => t.id === editingTestimonial.id ? updatedTestimonial : t);
    console.log('Editing testimonial:', updatedTestimonial); // Debug log
    console.log('Updated testimonials array after edit:', updatedTestimonials); // Debug log
    setTestimonials(updatedTestimonials);
    // Save to shared storage for other pages to access
    const saveResult = saveTestimonialsToStorage(updatedTestimonials);
    console.log('Save result after edit:', saveResult); // Debug log
    resetTestimonialForm();
    setIsEditTestimonialModalOpen(false);
    setEditingTestimonial(null);
  };

  const handleDeleteTestimonial = (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      const updatedTestimonials = testimonials.filter(t => t.id !== id);
      console.log('Deleting testimonial with id:', id); // Debug log
      console.log('Updated testimonials array after delete:', updatedTestimonials); // Debug log
      setTestimonials(updatedTestimonials);
      // Save to shared storage for other pages to access
      const saveResult = saveTestimonialsToStorage(updatedTestimonials);
      console.log('Save result after delete:', saveResult); // Debug log
    }
  };

  const handleTestimonialImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Open cropper for testimonial avatar (square aspect ratio)
      openCropper(file, 1, async (croppedBlob) => {
        setTestimonialFormData(prev => ({ ...prev, isUploading: true }));

        try {
          // Upload cropped image to Cloudinary
          const cloudinaryUrl = await uploadToCloudinary(croppedBlob);
          setTestimonialFormData(prev => ({
            ...prev,
            avatarUrl: cloudinaryUrl,
            isUploading: false
          }));
        } catch (error) {
          alert('Failed to upload image. Please try again.');
          setTestimonialFormData(prev => ({ ...prev, isUploading: false }));
        }
      });
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>YucelHub Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`sidebar-nav-item ${activeTab === "portfolio" ? "active" : ""}`}
            onClick={() => setActiveTab("portfolio")}
          >
            <span className="nav-icon">📁</span>
            Portfolio
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "jobs" ? "active" : ""}`}
            onClick={() => setActiveTab("jobs")}
          >
            <span className="nav-icon">💼</span>
            Career Updates
          </button>
          <button
            className={`sidebar-nav-item ${activeTab === "testimonials" ? "active" : ""}`}
            onClick={() => setActiveTab("testimonials")}
          >
            <span className="nav-icon">💬</span>
            Testimonials
          </button>
          <button
            className="sidebar-nav-item logout-btn"
            onClick={handleLogout}
          >
            <span className="nav-icon">🚪</span>
            Logout
          </button>
        </nav>
      </div>

      <div className="admin-main">
        {activeTab === "portfolio" && (
          <>
            <div className="admin-header">
              <h1>Portfolio Management</h1>
              <button className="btn-primary" onClick={openAddModal}>
                + Add New Project
              </button>
            </div>

            <div className="admin-filters">
              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="projects-grid">
              {filteredProjects.map(project => (
                <div key={project.id} className="project-card">
                  <div className="project-image">
                    <img src={project.imageUrl} alt={project.title} />
                    <div className="project-category">{project.category}</div>
                  </div>
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p className="project-client">Client: {project.client}</p>
                    <p className="project-description">{project.description.substring(0, 100)}...</p>
                    <div className="project-tools">
                      {project.tools.slice(0, 3).map((tool, index) => (
                        <span key={index} className="tool-tag">{tool}</span>
                      ))}
                      {project.tools.length > 3 && (
                        <span className="tool-tag">+{project.tools.length - 3}</span>
                      )}
                    </div>
                    <div className="project-actions">
                      <button
                        className="btn-secondary"
                        onClick={() => openEditModal(project)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="no-projects">
                <p>No projects found in the {selectedCategory} category.</p>
              </div>
            )}
          </>
        )}

        {activeTab === "jobs" && (
          <>
            <div className="admin-header">
              <h1>Job Positions Management</h1>
              <button className="btn-primary" onClick={openAddJobModal}>
                + Add New Position
              </button>
            </div>

            <div className="jobs-grid">
              {jobs && jobs.length > 0 ? (
                jobs.map(job => (
                  <div key={job.id} className="job-card">
                    <div className="job-header">
                      <div className="job-status-badge" data-status={job.status}>
                        {job.status}
                      </div>
                      <div className="job-type-badge">{job.type}</div>
                    </div>
                    <div className="job-content">
                      <h3>{job.title}</h3>
                      <div className="job-meta">
                        <span className="job-department">{job.department}</span>
                        <span className="job-location">{job.location}</span>
                      </div>
                      <p className="job-description">{job.description.substring(0, 150)}...</p>
                      <div className="job-sections-preview">
                        <small style={{ color: '#666', fontSize: '0.8rem' }}>
                          Sections: Company Description • Role Summary • Responsibilities • Qualifications
                        </small>
                      </div>
                      <div className="job-actions">
                        <button
                          className="btn-primary"
                          onClick={() => window.open(`#/job-application?id=${job.id}`, '_blank')}
                          style={{ marginRight: '8px' }}
                        >
                          View Application
                        </button>
                        <button
                          className="btn-secondary"
                          onClick={() => openEditJobModal(job)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-danger"
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-jobs">
                  <p>No job positions found. Add your first job position above!</p>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "testimonials" && (
          <>
            <div className="admin-header">
              <h1>Testimonials Management</h1>
              <button className="btn-primary" onClick={openAddTestimonialModal}>
                + Add New Testimonial
              </button>
            </div>

            <div className="testimonials-grid">
              {testimonials && testimonials.length > 0 ? (
                testimonials.map(testimonial => (
                  <div key={testimonial.id} className="testimonial-card">
                    <div className="testimonial-header">
                      <div className="testimonial-rating">
                        {"★".repeat(testimonial.rating)}
                      </div>
                      <div className="testimonial-actions">
                        <button
                          className="btn-secondary"
                          onClick={() => openEditTestimonialModal(testimonial)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-danger"
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="testimonial-content">
                      <p className="testimonial-review">"{testimonial.review}"</p>
                      <div className="testimonial-author">
                        <div className="author-avatar">
                          <img src={testimonial.avatarUrl} alt={testimonial.name} />
                        </div>
                        <div className="author-info">
                          <h4>{testimonial.name}</h4>
                          <p>{testimonial.position} at {testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-testimonials">
                  <p>No testimonials found. Add your first testimonial above!</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Project</h2>
              <button onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Project title"
                />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <textarea
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Enter project category (e.g., Video Editing, UI/UX, Branding, Web Development, etc.)"
                  rows="2"
                />
              </div>
              <div className="form-group">
                <label>Company Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Project description"
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label>Client *</label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="Client name"
                />
              </div>
              <div className="form-group">
                <label>Main Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={formData.isUploading}
                />
                {formData.isUploading && <p className="upload-status">Uploading to Cloudinary...</p>}
                {formData.imageUrl && (
                  <div className="image-preview">
                    <img src={formData.imageUrl} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Video URL (YouTube/Vimeo)</label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                />
                <small>This video will play when users click on the project image</small>
              </div>
              <div className="form-group">
                <label>Additional Images (Gallery)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  disabled={formData.isUploading}
                />
                <small>Upload multiple images for the project gallery</small>
                {formData.isUploading && <p className="upload-status">Uploading gallery images to Cloudinary...</p>}
                {formData.galleryImages.length > 0 && (
                  <div className="gallery-preview">
                    <h4>Gallery Images ({formData.galleryImages.length})</h4>
                    <div className="gallery-grid">
                      {formData.galleryImages.map((image, index) => (
                        <div key={index} className="gallery-item">
                          <img src={image} alt={`Gallery ${index + 1}`} />
                          <button
                            type="button"
                            className="remove-gallery-image"
                            onClick={() => removeGalleryImage(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Tools (comma-separated)</label>
                <input
                  type="text"
                  value={formData.toolsInput}
                  onChange={(e) => setFormData({ ...formData, toolsInput: e.target.value })}
                  placeholder="Tool 1, Tool 2, Tool 3"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddProject}>
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Project</h2>
              <button onClick={() => setIsEditModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Project title"
                />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <textarea
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Enter project category (e.g., Video Editing, UI/UX, Branding, Web Development, etc.)"
                  rows="2"
                />
              </div>
              <div className="form-group">
                <label>Company Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Project description"
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label>Client *</label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="Client name"
                />
              </div>
              <div className="form-group">
                <label>Main Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={formData.isUploading}
                />
                {formData.isUploading && <p className="upload-status">Uploading to Cloudinary...</p>}
                {formData.imageUrl && (
                  <div className="image-preview">
                    <img src={formData.imageUrl} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Video URL (YouTube/Vimeo)</label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                />
                <small>This video will play when users click on the project image</small>
              </div>
              <div className="form-group">
                <label>Additional Images (Gallery)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  disabled={formData.isUploading}
                />
                <small>Upload multiple images for the project gallery</small>
                {formData.isUploading && <p className="upload-status">Uploading gallery images to Cloudinary...</p>}
                {formData.galleryImages.length > 0 && (
                  <div className="gallery-preview">
                    <h4>Gallery Images ({formData.galleryImages.length})</h4>
                    <div className="gallery-grid">
                      {formData.galleryImages.map((image, index) => (
                        <div key={index} className="gallery-item">
                          <img src={image} alt={`Gallery ${index + 1}`} />
                          <button
                            type="button"
                            className="remove-gallery-image"
                            onClick={() => removeGalleryImage(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Tools (comma-separated)</label>
                <input
                  type="text"
                  value={formData.toolsInput}
                  onChange={(e) => setFormData({ ...formData, toolsInput: e.target.value })}
                  placeholder="Tool 1, Tool 2, Tool 3"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleEditProject}>
                Update Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Job Modal - ADD NEW POSITIONS - UNIQUE IDENTIFIER */}
      {isAddJobModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Job Position</h2>
              <button onClick={() => setIsAddJobModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Job Title *</label>
                <input
                  type="text"
                  value={jobFormData.title}
                  onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                  placeholder="Job title"
                />
              </div>
              <div className="form-group">
                <label>Department *</label>
                <select
                  value={jobFormData.department}
                  onChange={(e) => setJobFormData({ ...jobFormData, department: e.target.value })}
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {jobFormData.department === "Other" && (
                  <textarea
                    value={jobFormData.customDepartment}
                    onChange={(e) => setJobFormData({ ...jobFormData, customDepartment: e.target.value })}
                    placeholder="Enter custom department name..."
                    rows="2"
                    className="custom-department-textarea"
                  />
                )}
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={jobFormData.location}
                  onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                  placeholder="Remote, New York, etc."
                />
              </div>
              <div className="form-group">
                <label>Job Type</label>
                <select
                  value={jobFormData.type}
                  onChange={(e) => setJobFormData({ ...jobFormData, type: e.target.value })}
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {jobFormData.type === "Other" && (
                  <textarea
                    value={jobFormData.customType}
                    onChange={(e) => setJobFormData({ ...jobFormData, customType: e.target.value })}
                    placeholder="Enter custom job type (e.g., Freelance, Seasonal, Project-based)..."
                    rows="2"
                    className="custom-department-textarea"
                  />
                )}
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={jobFormData.status}
                  onChange={(e) => setJobFormData({ ...jobFormData, status: e.target.value })}
                >
                  {jobStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={jobFormData.company}
                  onChange={(e) => setJobFormData({ ...jobFormData, company: e.target.value })}
                  placeholder="Company name"
                />
              </div>
              <div className="form-group">
                <label>Posted Date</label>
                <input
                  type="text"
                  value={jobFormData.postedDate}
                  onChange={(e) => setJobFormData({ ...jobFormData, postedDate: e.target.value })}
                  placeholder="MM/DD/YYYY"
                />
              </div>
              <div className="form-group">
                <label>Company Description *</label>
                <textarea
                  value={jobFormData.description}
                  onChange={(e) => setJobFormData({ ...jobFormData, description: e.target.value })}
                  placeholder="Brief company description and what the company does..."
                  rows="3"
                />
                <small style={{ color: '#666', marginTop: '4px' }}>This will appear as "Company Description" section</small>
              </div>
              <div className="form-group">
                <label>Role Summary</label>
                <textarea
                  value={jobFormData.roleSummary}
                  onChange={(e) => setJobFormData({ ...jobFormData, roleSummary: e.target.value })}
                  placeholder="Detailed role summary and what the candidate will be doing..."
                  rows="4"
                />
                <small style={{ color: '#666', marginTop: '4px' }}>This will appear as "Role Summary" section</small>
              </div>
              <div className="form-group">
                <label>Key Responsibilities (one per line)</label>
                <textarea
                  value={jobFormData.responsibilitiesInput}
                  onChange={(e) => setJobFormData({ ...jobFormData, responsibilitiesInput: e.target.value })}
                  placeholder="Edit and assemble raw video footage into polished, engaging content&#10;Design and animate 2D and 3D motion graphics&#10;Collaborate with creative teams..."
                  rows="6"
                />
                <small style={{ color: '#666', marginTop: '4px' }}>Enter each responsibility on a new line</small>
              </div>
              <div className="form-group">
                <label>Required Qualifications & Skills (one per line)</label>
                <textarea
                  value={jobFormData.qualificationsInput}
                  onChange={(e) => setJobFormData({ ...jobFormData, qualificationsInput: e.target.value })}
                  placeholder="Proven experience as a Video Editor with a strong portfolio&#10;High proficiency in Adobe Creative Suite&#10;Excellent sense of timing and visual awareness..."
                  rows="6"
                />
                <small style={{ color: '#666', marginTop: '4px' }}>Enter each qualification on a new line</small>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setIsAddJobModalOpen(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddJob}>
                Add Position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Job Modal - EDIT EXISTING POSITIONS - UNIQUE IDENTIFIER */}
      {isEditJobModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Job Position</h2>
              <button onClick={() => setIsEditJobModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Job Title *</label>
                <input
                  type="text"
                  value={jobFormData.title}
                  onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                  placeholder="Job title"
                />
              </div>
              <div className="form-group">
                <label>Department *</label>
                <select
                  value={jobFormData.department}
                  onChange={(e) => setJobFormData({ ...jobFormData, department: e.target.value })}
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {jobFormData.department === "Other" && (
                  <textarea
                    value={jobFormData.customDepartment}
                    onChange={(e) => setJobFormData({ ...jobFormData, customDepartment: e.target.value })}
                    placeholder="Enter custom department name..."
                    rows="2"
                    className="custom-department-textarea"
                  />
                )}
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={jobFormData.location}
                  onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                  placeholder="Remote, New York, etc."
                />
              </div>
              <div className="form-group">
                <label>Job Type</label>
                <select
                  value={jobFormData.type}
                  onChange={(e) => setJobFormData({ ...jobFormData, type: e.target.value })}
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {jobFormData.type === "Other" && (
                  <textarea
                    value={jobFormData.customType}
                    onChange={(e) => setJobFormData({ ...jobFormData, customType: e.target.value })}
                    placeholder="Enter custom job type (e.g., Freelance, Seasonal, Project-based)..."
                    rows="2"
                    className="custom-department-textarea"
                  />
                )}
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={jobFormData.status}
                  onChange={(e) => setJobFormData({ ...jobFormData, status: e.target.value })}
                >
                  {jobStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={jobFormData.company}
                  onChange={(e) => setJobFormData({ ...jobFormData, company: e.target.value })}
                  placeholder="Company name"
                />
              </div>
              <div className="form-group">
                <label>Posted Date</label>
                <input
                  type="text"
                  value={jobFormData.postedDate}
                  onChange={(e) => setJobFormData({ ...jobFormData, postedDate: e.target.value })}
                  placeholder="MM/DD/YYYY"
                />
              </div>
              <div className="form-group">
                <label>Company Description *</label>
                <textarea
                  value={jobFormData.description}
                  onChange={(e) => setJobFormData({ ...jobFormData, description: e.target.value })}
                  placeholder="Brief company description and what the company does..."
                  rows="3"
                />
                <small style={{ color: '#666', marginTop: '4px' }}>This will appear as "Company Description" section</small>
              </div>
              <div className="form-group">
                <label>Role Summary</label>
                <textarea
                  value={jobFormData.roleSummary}
                  onChange={(e) => setJobFormData({ ...jobFormData, roleSummary: e.target.value })}
                  placeholder="Detailed role summary and what the candidate will be doing..."
                  rows="4"
                />
                <small style={{ color: '#666', marginTop: '4px' }}>This will appear as "Role Summary" section</small>
              </div>
              <div className="form-group">
                <label>Key Responsibilities (one per line)</label>
                <textarea
                  value={jobFormData.responsibilitiesInput}
                  onChange={(e) => setJobFormData({ ...jobFormData, responsibilitiesInput: e.target.value })}
                  placeholder="Edit and assemble raw video footage into polished, engaging content&#10;Design and animate 2D and 3D motion graphics&#10;Collaborate with creative teams..."
                  rows="6"
                />
                <small style={{ color: '#666', marginTop: '4px' }}>Enter each responsibility on a new line</small>
              </div>
              <div className="form-group">
                <label>Required Qualifications & Skills (one per line)</label>
                <textarea
                  value={jobFormData.qualificationsInput}
                  onChange={(e) => setJobFormData({ ...jobFormData, qualificationsInput: e.target.value })}
                  placeholder="Proven experience as a Video Editor with a strong portfolio&#10;High proficiency in Adobe Creative Suite&#10;Excellent sense of timing and visual awareness..."
                  rows="6"
                />
                <small style={{ color: '#666', marginTop: '4px' }}>Enter each qualification on a new line</small>
              </div>

            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setIsEditJobModalOpen(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleEditJob}>
                Update Position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Testimonial Modal */}
      {isAddTestimonialModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Testimonial</h2>
              <button onClick={() => setIsAddTestimonialModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={testimonialFormData.name}
                  onChange={(e) => setTestimonialFormData({ ...testimonialFormData, name: e.target.value })}
                  placeholder="Client name"
                />
              </div>
              <div className="form-group">
                <label>Position</label>
                <input
                  type="text"
                  value={testimonialFormData.position}
                  onChange={(e) => setTestimonialFormData({ ...testimonialFormData, position: e.target.value })}
                  placeholder="Job title"
                />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={testimonialFormData.company}
                  onChange={(e) => setTestimonialFormData({ ...testimonialFormData, company: e.target.value })}
                  placeholder="Company name"
                />
              </div>
              <div className="form-group">
                <label>Review *</label>
                <textarea
                  value={testimonialFormData.review}
                  onChange={(e) => setTestimonialFormData({ ...testimonialFormData, review: e.target.value })}
                  placeholder="Testimonial review"
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <select
                  value={testimonialFormData.rating}
                  onChange={(e) => setTestimonialFormData({ ...testimonialFormData, rating: parseInt(e.target.value) })}
                >
                  <option value={5}>★★★★★ (5 stars)</option>
                  <option value={4}>★★★★☆ (4 stars)</option>
                  <option value={3}>★★★☆☆ (3 stars)</option>
                  <option value={2}>★★☆☆☆ (2 stars)</option>
                  <option value={1}>★☆☆☆☆ (1 star)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Avatar Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleTestimonialImageUpload}
                  disabled={testimonialFormData.isUploading}
                />
                {testimonialFormData.isUploading && <p className="upload-status">Uploading to Cloudinary...</p>}
                {testimonialFormData.avatarUrl && (
                  <div className="image-preview">
                    <img src={testimonialFormData.avatarUrl} alt="Avatar Preview" style={{ maxWidth: '100px', marginTop: '10px', borderRadius: '50%' }} />
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setIsAddTestimonialModalOpen(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddTestimonial}>
                Add Testimonial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Testimonial Modal */}
      {isEditTestimonialModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Testimonial</h2>
              <button onClick={() => setIsEditTestimonialModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={testimonialFormData.name}
                  onChange={(e) => setTestimonialFormData({ ...testimonialFormData, name: e.target.value })}
                  placeholder="Client name"
                />
              </div>
              <div className="form-group">
                <label>Position</label>
                <input
                  type="text"
                  value={testimonialFormData.position}
                  onChange={(e) => setTestimonialFormData({ ...testimonialFormData, position: e.target.value })}
                  placeholder="Job title"
                />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={testimonialFormData.company}
                  onChange={(e) => setTestimonialFormData({ ...testimonialFormData, company: e.target.value })}
                  placeholder="Company name"
                />
              </div>
              <div className="form-group">
                <label>Review *</label>
                <textarea
                  value={testimonialFormData.review}
                  onChange={(e) => setTestimonialFormData({ ...testimonialFormData, review: e.target.value })}
                  placeholder="Testimonial review"
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <select
                  value={testimonialFormData.rating}
                  onChange={(e) => setTestimonialFormData({ ...testimonialFormData, rating: parseInt(e.target.value) })}
                >
                  <option value={5}>★★★★★ (5 stars)</option>
                  <option value={4}>★★★★☆ (4 stars)</option>
                  <option value={3}>★★★☆☆ (3 stars)</option>
                  <option value={2}>★★☆☆☆ (2 stars)</option>
                  <option value={1}>★☆☆☆☆ (1 star)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Avatar Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleTestimonialImageUpload}
                  disabled={testimonialFormData.isUploading}
                />
                {testimonialFormData.isUploading && <p className="upload-status">Uploading to Cloudinary...</p>}
                {testimonialFormData.avatarUrl && (
                  <div className="image-preview">
                    <img src={testimonialFormData.avatarUrl} alt="Avatar Preview" style={{ maxWidth: '100px', marginTop: '10px', borderRadius: '50%' }} />
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setIsEditTestimonialModalOpen(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleEditTestimonial}>
                Update Testimonial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Cropper Modal */}
      {cropperState.isOpen && (
        <ImageCropper
          imageSrc={cropperState.imageSrc}
          aspect={cropperState.aspect}
          onCropComplete={handleCropComplete}
          onCancel={closeCropper}
        />
      )}
    </div>
  );
}
