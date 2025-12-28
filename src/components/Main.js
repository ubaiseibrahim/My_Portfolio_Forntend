import React from 'react';
import Hero from './Hero';
import Projects from './Projects';
import About from './About';
import Contact from './Contact';
import Skills from './Skills';
import Experience from './Experience';

const Main = () => {
    return (
        <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
        </main>
    );
};

export default Main;
