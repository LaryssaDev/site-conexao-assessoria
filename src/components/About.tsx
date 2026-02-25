import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  const points = [
    "Autoridade no mercado de assessoria bancária",
    "Segurança jurídica em todos os processos",
    "Transparência total com nossos clientes",
    "Especialização técnica de alto nível",
    "Atendimento personalizado e humanizado",
    "Foco absoluto em resultados reais"
  ];

  return (
    <section id="sobre" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://i.imgur.com/DXQYLhi.jpeg" 
                alt="Nossa Equipe" 
                className="rounded-3xl shadow-xl w-full h-full object-contain bg-white p-8"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 bg-brand-purple p-8 rounded-2xl text-white shadow-2xl hidden lg:block">
                <p className="text-4xl font-bold mb-1">+1000</p>
                <p className="text-sm font-medium opacity-80">Contratos Revisados</p>
              </div>
            </motion.div>
          </div>

          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-brand-purple font-bold uppercase tracking-widest text-sm mb-4 block">Sobre a Conexão Assessoria</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-dark mb-6 leading-tight">
                Sua parceira estratégica na busca pelo equilíbrio financeiro
              </h2>
              <p className="text-lg text-brand-gray mb-8 leading-relaxed">
                A Conexão Assessoria nasceu com o propósito de equilibrar a relação entre consumidores e instituições financeiras. Com anos de experiência e uma equipe altamente qualificada, oferecemos soluções técnicas e jurídicas para quem se sente prejudicado por juros abusivos e cláusulas contratuais obscuras.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {points.map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="text-brand-purple shrink-0" size={20} />
                    <span className="text-brand-gray-dark font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <a 
                href="#contato" 
                className="inline-block bg-brand-purple text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-purple-dark transition-all shadow-lg shadow-brand-purple/20"
              >
                Falar com um Especialista
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
