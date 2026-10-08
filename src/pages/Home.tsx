import About from '../components/About';
import Contact from '../components/Contact';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Work from '../components/Work';

// Section order: hero, about, skills, experience, work, education, contact.
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Work />
      <Education />
      <Contact />
    </>
  );
}
