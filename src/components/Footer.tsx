import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-gray-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <img 
              src="https://i.imgur.com/DXQYLhi.jpeg" 
              alt="Conexão Assessoria" 
              className="h-16 object-contain rounded-lg bg-white p-2 shadow-lg"
            />
            <p className="text-white/60 leading-relaxed">
              Especialistas em revisão de contratos bancários e redução de juros abusivos. Nossa missão é trazer justiça financeira para nossos clientes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-purple transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Início</a></li>
              <li><a href="#sobre" className="text-white/60 hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#servicos" className="text-white/60 hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#depoimentos" className="text-white/60 hover:text-white transition-colors">Depoimentos</a></li>
              <li><a href="#contato" className="text-white/60 hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Serviços</h4>
            <ul className="space-y-4">
              <li><a href="#servicos" className="text-white/60 hover:text-white transition-colors">Revisão de Juros</a></li>
              <li><a href="#servicos" className="text-white/60 hover:text-white transition-colors">Busca e Apreensão</a></li>
              <li><a href="#servicos" className="text-white/60 hover:text-white transition-colors">Recalculo de Parcelas</a></li>
              <li><a href="#servicos" className="text-white/60 hover:text-white transition-colors">Reabilitação de Crédito</a></li>
              <li><a href="#servicos" className="text-white/60 hover:text-white transition-colors">Renegociação</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60">
                <MapPin size={20} className="text-brand-purple shrink-0" />
                <span>R Benjamin Pereira, 246 jaçanã - São Paulo/SP - 02274-000</span>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Phone size={20} className="text-brand-purple shrink-0" />
                <span>(11) 94878-6367</span>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Mail size={20} className="text-brand-purple shrink-0" />
                <span>contato@conexaoassessoria.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <p>© {currentYear} Conexão Assessoria. Todos os direitos reservados.</p>
          <Link 
            to="/admin" 
            className="flex items-center gap-2 hover:text-white transition-colors py-2 px-4 rounded-lg bg-white/5 border border-white/10"
          >
            <Lock size={14} />
            Acesso Restrito
          </Link>
        </div>
      </div>
    </footer>
  );
}
