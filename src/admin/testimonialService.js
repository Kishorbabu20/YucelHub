const TESTIMONIALS_STORAGE_KEY = 'yucelhub_testimonials';

// Save testimonials to localStorage
export const saveTestimonialsToStorage = (testimonials) => {
  try {
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(testimonials));
    console.log('Testimonials saved to storage:', testimonials);
    return { success: true, message: 'Testimonials saved successfully' };
  } catch (error) {
    console.error('Error saving testimonials to storage:', error);
    return { success: false, message: 'Failed to save testimonials' };
  }
};

// Get testimonials from localStorage
export const getTestimonialsFromStorage = () => {
  try {
    const testimonials = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
    const parsedTestimonials = testimonials ? JSON.parse(testimonials) : [];
    console.log('Testimonials loaded from storage:', parsedTestimonials);
    return parsedTestimonials;
  } catch (error) {
    console.error('Error loading testimonials from storage:', error);
    return [];
  }
};

// Add a new testimonial
export const addTestimonial = (testimonial) => {
  const testimonials = getTestimonialsFromStorage();
  const newTestimonial = {
    id: Date.now(),
    ...testimonial,
    createdAt: new Date().toISOString()
  };
  testimonials.push(newTestimonial);
  saveTestimonialsToStorage(testimonials);
  return { success: true, message: 'Testimonial added successfully', testimonial: newTestimonial };
};

// Update an existing testimonial
export const updateTestimonial = (id, updatedTestimonial) => {
  const testimonials = getTestimonialsFromStorage();
  const index = testimonials.findIndex(t => t.id === id);
  if (index !== -1) {
    testimonials[index] = { ...testimonials[index], ...updatedTestimonial };
    saveTestimonialsToStorage(testimonials);
    return { success: true, message: 'Testimonial updated successfully', testimonial: testimonials[index] };
  }
  return { success: false, message: 'Testimonial not found' };
};

// Delete a testimonial
export const deleteTestimonial = (id) => {
  const testimonials = getTestimonialsFromStorage();
  const filteredTestimonials = testimonials.filter(t => t.id !== id);
  if (filteredTestimonials.length < testimonials.length) {
    saveTestimonialsToStorage(filteredTestimonials);
    return { success: true, message: 'Testimonial deleted successfully' };
  }
  return { success: false, message: 'Testimonial not found' };
};

// Get all testimonials
export const getAllTestimonials = () => {
  return getTestimonialsFromStorage();
};
