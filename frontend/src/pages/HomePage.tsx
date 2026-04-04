import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects/Projects'
import Blog from '../components/Blog/Blog'
import Contact from '../components/Contact/Contact'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Blog />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
