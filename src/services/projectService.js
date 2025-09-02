// Project Service - Simple backend using localStorage
// In a real application, this would connect to a database via API

const PROJECTS_STORAGE_KEY = 'projects';

export class ProjectService {
  // Get all projects
  static getAllProjects() {
    try {
      const projects = localStorage.getItem(PROJECTS_STORAGE_KEY);
      return projects ? JSON.parse(projects) : [];
    } catch (error) {
      console.error('Error loading projects:', error);
      return [];
    }
  }

  // Get projects by category
  static getProjectsByCategory(category) {
    if (category === 'All') {
      return this.getAllProjects();
    }
    
    const projects = this.getAllProjects();
    return projects.filter(project => project.category === category);
  }

  // Get project by ID
  static getProjectById(id) {
    const projects = this.getAllProjects();
    return projects.find(project => project.id === parseInt(id));
  }

  // Create new project
  static createProject(projectData) {
    try {
      const projects = this.getAllProjects();
      const newProject = {
        id: Date.now(),
        ...projectData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      projects.push(newProject);
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
      
      return {
        success: true,
        project: newProject,
        message: 'Project created successfully'
      };
    } catch (error) {
      console.error('Error creating project:', error);
      return {
        success: false,
        message: 'Failed to create project'
      };
    }
  }

  // Update existing project
  static updateProject(id, projectData) {
    try {
      const projects = this.getAllProjects();
      const projectIndex = projects.findIndex(project => project.id === parseInt(id));
      
      if (projectIndex === -1) {
        return {
          success: false,
          message: 'Project not found'
        };
      }
      
      const updatedProject = {
        ...projects[projectIndex],
        ...projectData,
        updatedAt: new Date().toISOString()
      };
      
      projects[projectIndex] = updatedProject;
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
      
      return {
        success: true,
        project: updatedProject,
        message: 'Project updated successfully'
      };
    } catch (error) {
      console.error('Error updating project:', error);
      return {
        success: false,
        message: 'Failed to update project'
      };
    }
  }

  // Delete project
  static deleteProject(id) {
    try {
      const projects = this.getAllProjects();
      const filteredProjects = projects.filter(project => project.id !== parseInt(id));
      
      if (filteredProjects.length === projects.length) {
        return {
          success: false,
          message: 'Project not found'
        };
      }
      
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(filteredProjects));
      
      return {
        success: true,
        message: 'Project deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting project:', error);
      return {
        success: false,
        message: 'Failed to delete project'
      };
    }
  }

  // Search projects
  static searchProjects(query) {
    const projects = this.getAllProjects();
    const searchTerm = query.toLowerCase();
    
    return projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.client.toLowerCase().includes(searchTerm) ||
      project.category.toLowerCase().includes(searchTerm) ||
      project.tools.some(tool => tool.toLowerCase().includes(searchTerm))
    );
  }

  // Get project statistics
  static getProjectStats() {
    const projects = this.getAllProjects();
    
    const stats = {
      total: projects.length,
      byCategory: {
        'Video Editing': 0,
        'UI/UX': 0,
        'Branding': 0
      },
      recentProjects: projects
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
    };
    
    projects.forEach(project => {
      if (stats.byCategory[project.category] !== undefined) {
        stats.byCategory[project.category]++;
      }
    });
    
    return stats;
  }

  // Export projects data
  static exportProjects() {
    try {
      const projects = this.getAllProjects();
      const dataStr = JSON.stringify(projects, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = `projects-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      return {
        success: true,
        message: 'Projects exported successfully'
      };
    } catch (error) {
      console.error('Error exporting projects:', error);
      return {
        success: false,
        message: 'Failed to export projects'
      };
    }
  }

  // Import projects data
  static importProjects(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const projects = JSON.parse(e.target.result);
          
          if (Array.isArray(projects)) {
            // Validate project structure
            const validProjects = projects.filter(project => 
              project.title && 
              project.category && 
              project.description && 
              project.client
            );
            
            if (validProjects.length > 0) {
              localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(validProjects));
              resolve({
                success: true,
                message: `${validProjects.length} projects imported successfully`,
                count: validProjects.length
              });
            } else {
              resolve({
                success: false,
                message: 'No valid projects found in file'
              });
            }
          } else {
            resolve({
              success: false,
              message: 'Invalid file format'
            });
          }
        } catch (error) {
          resolve({
            success: false,
            message: 'Failed to parse file'
          });
        }
      };
      
      reader.readAsText(file);
    });
  }

  // Clear all projects (for testing/reset)
  static clearAllProjects() {
    try {
      localStorage.removeItem(PROJECTS_STORAGE_KEY);
      return {
        success: true,
        message: 'All projects cleared'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to clear projects'
      };
    }
  }
}

// Initialize with sample data if no projects exist
export const initializeSampleData = () => {
  const existingProjects = ProjectService.getAllProjects();
  
  if (existingProjects.length === 0) {
    const sampleProjects = [
      {
        id: 1,
        title: "Tech Startup Brand Identity",
        category: "Branding",
        description: "This comprehensive branding project involved creating a complete visual identity system for an emerging AI technology startup. From initial brand strategy to final implementation, we developed a modern, tech-forward identity that resonates with both investors and end users while establishing credibility in the competitive tech landscape.",
        client: "InnovateTech AI",
        imageUrl: "/assets/Service3.png",
        galleryImages: ["/assets/Service3.png", "/assets/Service3.png"],
        tools: ["Illustrator", "Photoshop", "Figma", "Brand Strategy", "Color Theory"],
        createdAt: "2024-01-15T10:00:00.000Z",
        updatedAt: "2024-01-15T10:00:00.000Z"
      },
      {
        id: 2,
        title: "E-commerce UI/UX Redesign",
        category: "UI/UX",
        description: "Complete redesign of an e-commerce platform focusing on user experience and conversion optimization. We conducted extensive user research, created wireframes and prototypes, and implemented a modern, intuitive interface that increased conversion rates by 35%.",
        client: "ShopSmart",
        imageUrl: "/assets/Service1.png",
        galleryImages: ["/assets/Service1.png", "/assets/Service1.png"],
        tools: ["Figma", "Adobe XD", "Prototyping", "User Research", "A/B Testing"],
        createdAt: "2024-01-10T14:30:00.000Z",
        updatedAt: "2024-01-10T14:30:00.000Z"
      },
      {
        id: 3,
        title: "Commercial Video Advertisement",
        category: "Video Editing",
        description: "High-quality video editing and post-production for a national commercial campaign. We handled color grading, sound design, motion graphics, and final delivery in multiple formats for broadcast and digital platforms.",
        client: "Global Brands Inc",
        imageUrl: "/assets/Service0.png",
        galleryImages: ["/assets/Service0.png", "/assets/Service0.png"],
        tools: ["Premiere Pro", "After Effects", "Color Grading", "Sound Design", "Motion Graphics"],
        createdAt: "2024-01-05T09:15:00.000Z",
        updatedAt: "2024-01-05T09:15:00.000Z"
      }
    ];
    
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(sampleProjects));
    return sampleProjects;
  }
  
  return existingProjects;
};

export default ProjectService;
