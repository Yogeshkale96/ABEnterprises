import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import Container from '../components/common/Container.jsx'

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found | AB Enterprises Private Limited'
  }, [])

  return (
    <section className="flex min-h-[60vh] items-center bg-surface py-20">
      <Container className="text-center">
        <p className="text-7xl font-bold text-blue-700">404</p>
        <h1 className="mt-4 text-2xl font-bold text-navy-900">Page Not Found</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button to="/home" variant="primary" size="lg">Go to Homepage</Button>
          <Link to="/contact" className="inline-flex items-center rounded-lg px-5 py-3.5 text-sm font-medium text-blue-700 hover:bg-surface-blue">
            Contact Support
          </Link>
        </div>
      </Container>
    </section>
  )
}
