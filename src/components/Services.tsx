import { motion } from 'motion/react';
import { 
  FileText, 
  TrendingDown, 
  ShieldAlert, 
  Calculator, 
  UserCheck, 
  Handshake 
} from 'lucide-react';

const services = [
  {
    title: "Revisão de Juros Abusivos",
    description: "Análise técnica detalhada para identificar taxas acima do permitido pelo Banco Central.",
    icon: <TrendingDown size={32} />,
  },
  {
    title: "Ação Revisional de Contrato",
    description: "Medidas legais para reajustar seu contrato e reduzir o saldo devedor de forma justa.",
    icon: <FileText size={32} />,
  },
  {
    title: "Defesa Contra Busca e Apreensão",
    description: "Proteção imediata para o seu veículo através de liminares e defesas especializadas.",
    icon: <ShieldAlert size={32} />,
  },
  {
    title: "Recalculo de Parcelas",
    description: "Cálculo pericial para determinar o valor real que você deveria estar pagando.",
    icon: <Calculator size={32} />,
  },
  {
    title: "Reabilitação de Crédito",
    description: "Auxílio na regularização do seu nome perante os órgãos de proteção ao crédito.",
    icon: <UserCheck size={32} />,
  },
  {
    title: "Renegociação de Dívidas",
    description: "Intermediação profissional para conseguir os melhores descontos na quitação de débitos.",
    icon: <Handshake size={32} />,
  },
];

export default function Services() {
  return (
    <section id="servicos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-purple font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Nossas Soluções
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-brand-gray-dark mb-6"
          >
            Serviços Especializados para sua Segurança Financeira
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-gray"
          >
            Oferecemos uma gama completa de serviços focados em proteger seus direitos e reduzir seus custos bancários.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-brand-purple/10 rounded-2xl flex items-center justify-center text-brand-purple mb-6 group-hover:bg-brand-purple group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-gray-dark mb-4">{service.title}</h3>
              <p className="text-brand-gray leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
