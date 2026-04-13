import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/Hero'
import About from '../components/About'
import WhyMe from '../components/WhyMe/WhyMe'
import Projects from '../components/Projects/Projects'
import Blog from '../components/Blog/Blog'
import FAQ from '../components/FAQ/FAQ'
import Contact from '../components/Contact'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1 – Hero: dark primary */}
        <Hero />

        {/* 2 – About: dark secondary */}
        <About />

        {/* 3 – Why Me: LIGHT — visual breathing room */}
        <WhyMe />

        {/* 4 – Projects: dark primary */}
        <Projects />

        {/* 5 – Blog: dark secondary */}
        <Blog />

        {/* 6 – FAQ: dark primary */}
        <FAQ />

        {/* 7 – Contact: dark secondary */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
