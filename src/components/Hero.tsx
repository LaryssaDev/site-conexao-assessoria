import { motion } from 'motion/react';
import { ChevronRight, ShieldCheck, TrendingDown, Scale } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-purple/5 -skew-x-12 translate-x-1/4 -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-4 rounded-full bg-brand-purple/10 text-brand-purple font-semibold text-sm mb-6">
                Especialistas em Direito Bancário
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-brand-gray-dark leading-tight mb-6">
                Está pagando <span className="text-brand-purple">juros abusivos</span> no seu financiamento?
              </h1>
              <p className="text-lg md:text-xl text-brand-gray mb-8 max-w-2xl">
                Solicite uma análise gratuita e descubra se você pode reduzir suas parcelas de forma segura e legal. Proteja seu patrimônio hoje mesmo.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <a 
                  href="#contato" 
                  className="w-full sm:w-auto bg-brand-purple text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-purple-dark transition-all shadow-lg shadow-brand-purple/20 flex items-center justify-center gap-2 group"
                >
                  Solicitar Análise Gratuita
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#sobre" 
                  className="w-full sm:w-auto border-2 border-brand-purple/20 text-brand-gray-dark px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-purple/5 transition-all flex items-center justify-center"
                >
                  Saiba Mais
                </a>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-purple/10 rounded-lg text-brand-purple">
                    <ShieldCheck size={24} />
                  </div>
                  <span className="text-sm font-medium text-brand-gray-dark">100% Seguro e Legal</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-purple/10 rounded-lg text-brand-purple">
                    <TrendingDown size={24} />
                  </div>
                  <span className="text-sm font-medium text-brand-gray-dark">Redução de Parcelas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-purple/10 rounded-lg text-brand-purple">
                    <Scale size={24} />
                  </div>
                  <span className="text-sm font-medium text-brand-gray-dark">Defesa Especializada</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10"
            >
              <img 
                src="https://i.imgur.com/iLitfr1.jpeg" 
                alt="Assessoria Jurídica" 
                className="rounded-3xl shadow-2xl border-8 border-white object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <p className="text-xs text-brand-gray font-medium uppercase tracking-wider">Resultado Garantido</p>
                    <p className="text-lg font-bold text-brand-gray-dark">Análise Técnica</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-purple/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-brand-purple/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
