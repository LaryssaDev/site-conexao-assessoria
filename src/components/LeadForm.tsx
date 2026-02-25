import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle } from 'lucide-react';
import { Lead } from '../types';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone inválido';
    }
    return newErrors;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    // Simple mask: (00) 00000-0000
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d+)/, '($1) $2');
    }
    
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newLead: Lead = {
      id: crypto.randomUUID(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
    localStorage.setItem('leads', JSON.stringify([newLead, ...existingLeads]));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', phone: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
      {isSuccess ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h3 className="text-2xl font-bold text-brand-gray-dark mb-4">Mensagem Enviada!</h3>
          <p className="text-brand-gray mb-8">
            Obrigado pelo seu interesse. Um de nossos especialistas entrará em contato com você em breve para realizar sua análise gratuita.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="text-brand-purple font-bold hover:underline"
          >
            Enviar outra mensagem
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-brand-gray-dark">Nome Completo *</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-brand-purple'} outline-none transition-all`}
                placeholder="Seu nome"
              />
              {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-brand-gray-dark">E-mail *</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-brand-purple'} outline-none transition-all`}
                placeholder="seu@email.com"
              />
              {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-semibold text-brand-gray-dark">Telefone / WhatsApp *</label>
            <input
              type="text"
              id="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-brand-purple'} outline-none transition-all`}
              placeholder="(00) 00000-0000"
            />
            {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-brand-gray-dark">Mensagem (Opcional)</label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple outline-none transition-all resize-none"
              placeholder="Conte-nos um pouco sobre o seu caso..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-purple text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-purple-dark transition-all shadow-lg shadow-brand-purple/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send size={20} />
                Solicitar Análise Gratuita
              </>
            )}
          </button>
          <p className="text-center text-xs text-brand-gray">
            Ao enviar, você concorda com nossos termos de privacidade. Seus dados estão seguros.
          </p>
        </form>
      )}
    </div>
  );
}
