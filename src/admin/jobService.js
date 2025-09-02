// Job Service - Manages job data from admin system
// This service provides access to job data stored in localStorage

const JOBS_STORAGE_KEY = 'admin_jobs';

export const getJobsFromStorage = () => {
  try {
    const jobs = localStorage.getItem(JOBS_STORAGE_KEY);
    return jobs ? JSON.parse(jobs) : [];
  } catch (error) {
    console.error('Error loading jobs from storage:', error);
    return [];
  }
};

export const saveJobsToStorage = (jobs) => {
  try {
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
    return true;
  } catch (error) {
    console.error('Error saving jobs to storage:', error);
    return false;
  }
};

export const getOpenJobs = () => {
  const jobs = getJobsFromStorage();
  return jobs.filter(job => job.status === "Open");
};

export const getJobsByDepartment = (department) => {
  const jobs = getJobsFromStorage();
  return jobs.filter(job => job.department === department);
};

export const getJobById = (id) => {
  const jobs = getJobsFromStorage();
  return jobs.find(job => job.id === id);
};

export default {
  getJobsFromStorage,
  saveJobsToStorage,
  getOpenJobs,
  getJobsByDepartment,
  getJobById
};
