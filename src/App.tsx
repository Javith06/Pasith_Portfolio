import Navigation from './components/Navigation'
import Hero from './components/Hero'
import CoreDifferentiator from './components/CoreDifferentiator'
import Services from './components/Services'
import DentureJourney from './components/DentureJourney'
import CaseStudies from './components/CaseStudies'
import BeforeAfter from './components/BeforeAfter'
import VideoGallery from './components/VideoGallery'
import Testimonials from './components/Testimonials'
import About from './components/About'
import WhyPasith from './components/WhyPasith'
import ThirtyTwo from './components/ThirtyTwo'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThemeSwitcher from './components/ThemeSwitcher'

function App() {
  return (
    <div className="min-h-screen bg-warm-white text-charcoal">
      <Navigation />
      <main>
        <Hero />
        <CoreDifferentiator />
        <Services />
        <DentureJourney />
        <WhyPasith />
        <CaseStudies />
        <BeforeAfter />
        <VideoGallery />
        <Testimonials />
        <ThirtyTwo />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  )
}

export default App
