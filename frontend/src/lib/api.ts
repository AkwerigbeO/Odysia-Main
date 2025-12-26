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

import api from './axios';

// Basic configuration for API URL - handled by axios instance now

export async function submitContactForm(data: ContactFormData): Promise<void> {
  await api.post('/contact', data);
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