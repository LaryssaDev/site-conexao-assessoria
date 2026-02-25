import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import LeadForm from '../components/LeadForm';
import Footer from '../components/Footer';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <section id="contato" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-brand-gray-dark mb-4"
              >
                Solicite uma Análise Gratuita
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-brand-gray"
              >
                Preencha o formulário abaixo e um de nossos especialistas entrará em contato com você em breve.
              </motion.p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
