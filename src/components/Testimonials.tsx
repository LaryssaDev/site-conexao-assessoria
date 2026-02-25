import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Juliana Ribeiro",
    city: "Campinas – SP",
    image: "https://i.imgur.com/MvTZmt7.jpeg",
  },
  {
    name: "André Lima",
    city: "Guarulhos – SP",
    image: "https://i.imgur.com/7DjRar1.jpeg",
  },
  {
    name: "Patrícia Souza",
    city: "Osasco – SP",
    image: "https://i.imgur.com/xdBj0Hr.jpeg",
  },
  {
    name: "Roberto Nascimento",
    city: "Santo André – SP",
    image: "https://i.imgur.com/WYHB54h.jpeg",
  },
  {
    name: "Fernanda Alves",
    city: "São Bernardo do Campo – SP",
    image: "https://i.imgur.com/cF7Wueq.jpeg",
  },
  {
    name: "Carlos Mendes",
    city: "São Paulo – SP",
    image: "https://i.imgur.com/j19WJfu.jpeg",
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="depoimentos" className="py-20 bg-brand-purple text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-white/70 font-bold uppercase tracking-widest text-sm mb-4 block">Depoimentos</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">O que nossos clientes dizem</h2>
          <p className="text-lg text-white/80">
            A satisfação de quem já recuperou seu equilíbrio financeiro com nossa ajuda.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-[500px] md:h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-3xl border border-white/20"
              >
                <div className="w-full h-full flex flex-col items-center">
                  <div className="flex-1 w-full overflow-hidden rounded-2xl mb-4">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={`Depoimento de ${testimonials[currentIndex].name}`} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-white/60">Cliente de {testimonials[currentIndex].city}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-white w-8' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
