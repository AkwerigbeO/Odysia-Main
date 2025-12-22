export interface ContactFormData {
  name: string
  email: string
  company?: string
  projectType: string
  budget?: string
  timeline?: string
  message: string
}

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
}

// Basic configuration for API URL - ideally this comes from env vars
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function submitContactForm(data: ContactFormData): Promise<void> {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to submit form');
  }
}

export async function fetchServices(): Promise<Service[]> {
  // In a real application, this would fetch from your API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([])
    }, 500)
  })
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  // In a real application, this would fetch from your API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([])
    }, 500)
  })
} 