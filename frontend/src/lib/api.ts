export interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
  service?: string
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

export async function submitContactForm(data: ContactFormData): Promise<void> {
  // In a real application, this would send data to your backend API
  // For now, we'll simulate an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate API call
      if (Math.random() > 0.1) { // 90% success rate
        resolve()
      } else {
        reject(new Error('Failed to submit form'))
      }
    }, 1000)
  })
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