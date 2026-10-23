import { useEffect } from 'react'
import HeroSection from '../components/home/HeroSection.jsx'
import BenefitsStrip from '../components/home/BenefitsStrip.jsx'
import AboutPreview from '../components/home/AboutPreview.jsx'
import ServicesSection from '../components/home/ServicesSection.jsx'
import ProductsSection from '../components/home/ProductsSection.jsx'
import IndustriesSection from '../components/home/IndustriesSection.jsx'
import AMCSection from '../components/home/AMCSection.jsx'
import StatisticsSection from '../components/home/StatisticsSection.jsx'
import BrandsSection from '../components/home/BrandsSection.jsx'
import TestimonialsSection from '../components/home/TestimonialsSection.jsx'
import BlogSection from '../components/home/BlogSection.jsx'
import FinalCTASection from '../components/home/FinalCTASection.jsx'

export default function HomePage() {
  useEffect(() => {
    document.title = 'AB Enterprises Private Limited | Tech Solutions for Every Need'
  }, [])

  return (
    <>
      <HeroSection />
      <BenefitsStrip />
      <AboutPreview />
      <ServicesSection />
      <ProductsSection />
      <IndustriesSection />
      <AMCSection />
      <StatisticsSection />
      <BrandsSection />
      <TestimonialsSection />
      <BlogSection />
      <FinalCTASection />
    </>
  )
}
