import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout.jsx'
import LandingPage from '../pages/LandingPage.jsx'
import HomePage from '../pages/HomePage.jsx'
import AboutPage from '../pages/AboutPage.jsx'
import ServicesPage from '../pages/ServicesPage.jsx'
import ServiceDetailsPage from '../pages/ServiceDetailsPage.jsx'
import ProductsPage from '../pages/ProductsPage.jsx'
import ProductDetailsPage from '../pages/ProductDetailsPage.jsx'
import IndustriesPage from '../pages/IndustriesPage.jsx'
import IndustryDetailsPage from '../pages/IndustryDetailsPage.jsx'
import AMCPage from '../pages/AMCPage.jsx'
import ArticlesPage from '../pages/ArticlesPage.jsx'
import ArticleDetailsPage from '../pages/ArticleDetailsPage.jsx'
import SearchPage from '../pages/SearchPage.jsx'
import ContactPage from '../pages/ContactPage.jsx'
import QuoteRequestPage from '../pages/QuoteRequestPage.jsx'
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage.jsx'
import TermsPage from '../pages/TermsPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'
import AdminLoginPage from '../features/admin/AdminLoginPage.jsx'
import AdminLayout from '../features/admin/AdminLayout.jsx'
import DashboardOverview from '../features/admin/DashboardOverview.jsx'
import EnquiriesPage from '../features/admin/EnquiriesPage.jsx'
import EnquiryDetailsPage from '../features/admin/EnquiryDetailsPage.jsx'
import RequireAuth from '../features/auth/RequireAuth.jsx'

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  {
    element: <MainLayout />,
    children: [
      { path: '/home', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/services', element: <ServicesPage /> },
      { path: '/services/:slug', element: <ServiceDetailsPage /> },
      { path: '/products', element: <ProductsPage /> },
      { path: '/products/:slug', element: <ProductDetailsPage /> },
      { path: '/industries', element: <IndustriesPage /> },
      { path: '/articles', element: <ArticlesPage /> },
      { path: '/articles/:slug', element: <ArticleDetailsPage /> },
      { path: '/industries/:slug', element: <IndustryDetailsPage /> },
      { path: '/amc-support', element: <AMCPage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/request-quote', element: <QuoteRequestPage /> },
      { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
      { path: '/terms', element: <TermsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  { path: '/admin/login', element: <AdminLoginPage /> },
  {
    path: '/admin',
    element: <RequireAuth />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardOverview /> },
          { path: 'dashboard', element: <Navigate to="/admin" replace /> },
          { path: 'contact-enquiries', element: <EnquiriesPage type="contact" /> },
          { path: 'quote-requests', element: <EnquiriesPage type="quote" /> },
          { path: 'enquiries', element: <EnquiriesPage type="all" /> },
          { path: 'enquiries/:id', element: <EnquiryDetailsPage /> },
        ],
      },
    ],
  },
])
