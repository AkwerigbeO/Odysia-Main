import { ReactNode } from 'react'

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  icon: ReactNode
}

export interface ServiceCategory {
  id: string
  name: string
  description: string
  services: Service[]
}

export interface ServiceRequest {
  serviceId: string
  companyName: string
  contactName: string
  email: string
  phone?: string
  message: string
  budget?: string
  timeline?: string
} 