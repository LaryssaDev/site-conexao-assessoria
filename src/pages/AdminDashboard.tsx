import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as XLSX from 'xlsx';
import { 
  Users, 
  LogOut, 
  Trash2, 
  Search, 
  Download,
  Upload,
  Calendar,
  Mail,
  Phone,
  MessageSquare,
  X
} from 'lucide-react';
import { Lead } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('leads');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedLeads = JSON.parse(localStorage.getItem('leads') || '[]');
    setLeads(storedLeads);
  }, []);

  const handleDeleteLead = (id: string) => {
    setLeads(prevLeads => {
      const updatedLeads = prevLeads.filter(lead => lead.id !== id);
      localStorage.setItem('leads', JSON.stringify(updatedLeads));
      return updatedLeads;
    });
    setLeadToDelete(null);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

        const newLeads: Lead[] = jsonData.map((item, index) => ({
          id: `imported-${Date.now()}-${index}`,
          name: item.Nome || item.name || item.Name || 'Sem Nome',
          email: item.Email || item.email || 'sem@email.com',
          phone: item.Telefone || item.phone || item.Phone || '',
          message: item.Mensagem || item.message || item.Message || '',
          createdAt: item.Data || item.date || item.Date || new Date().toISOString()
        }));

        const updatedLeads = [...newLeads, ...leads];
        setLeads(updatedLeads);
        localStorage.setItem('leads', JSON.stringify(updatedLeads));
        alert(`${newLeads.length} leads importados com sucesso!`);
        
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Erro ao importar arquivo:', error);
        alert('Erro ao importar arquivo. Verifique se o formato está correto.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const exportToCSV = () => {
    if (leads.length === 0) {
      alert('Não há leads para exportar.');
      return;
    }

    const headers = ['ID', 'Nome', 'Email', 'Telefone', 'Mensagem', 'Data de Envio'];
    const csvContent = [
      headers.join(';'),
      ...leads.map(lead => [
        lead.id,
        lead.name,
        lead.email,
        lead.phone,
        (lead.message || '').replace(/;/g, ','),
        new Date(lead.createdAt).toLocaleString('pt-BR')
      ].join(';'))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_conexao_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm)
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-gray-dark text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10 flex justify-center">
          <img 
            src="https://i.imgur.com/A2EBx2X.jpeg" 
            alt="Conexão Assessoria" 
            className="h-16 w-16 object-contain"
          />
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'leads' ? 'bg-brand-purple text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <Users size={20} />
            <span className="font-medium">Leads</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-brand-gray-dark">Gerenciamento de Leads</h1>
          <div className="flex items-center gap-4">
            <div className="bg-brand-purple/10 text-brand-purple px-4 py-2 rounded-full font-bold text-sm">
              {leads.length} Leads Totais
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header / Actions */}
            <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar por nome, email ou telefone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-purple outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImport}
                  accept=".csv, .xlsx, .xls"
                  className="hidden"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-6 py-3 bg-brand-purple/10 text-brand-purple rounded-xl font-bold hover:bg-brand-purple/20 transition-colors"
                >
                  <Upload size={20} />
                  Importar
                </button>
                <button 
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-brand-gray-dark rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  <Download size={20} />
                  Exportar CSV
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-brand-gray uppercase text-xs font-bold tracking-wider">
                    <th className="px-6 py-4">Lead</th>
                    <th className="px-6 py-4">Contato</th>
                    <th className="px-6 py-4">Mensagem</th>
                    <th className="px-6 py-4">Data de Envio</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-6">
                          <p className="font-bold text-brand-gray-dark">{lead.name}</p>
                          <p className="text-xs text-brand-gray font-mono">{lead.id.slice(0, 8)}</p>
                        </td>
                        <td className="px-6 py-6">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-brand-gray">
                              <Mail size={14} className="text-brand-purple" />
                              {lead.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-brand-gray">
                              <Phone size={14} className="text-brand-purple" />
                              {lead.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="max-w-xs">
                            <p className="text-sm text-brand-gray line-clamp-2">
                              {lead.message || <span className="italic opacity-50">Sem mensagem</span>}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-2 text-sm text-brand-gray">
                            <Calendar size={14} className="text-brand-purple" />
                            {formatDate(lead.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => setSelectedLead(lead)}
                              title="Ver Detalhes"
                              className="p-2 text-brand-gray hover:text-brand-purple hover:bg-brand-purple/10 rounded-lg transition-all"
                            >
                              <MessageSquare size={20} />
                            </button>
                            <button 
                              onClick={() => setLeadToDelete(lead.id)}
                              title="Excluir Lead"
                              className="p-2 text-brand-gray hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <Users size={48} className="text-gray-200" />
                          <p className="text-brand-gray font-medium">Nenhum lead encontrado.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      {/* Modal de Confirmação de Exclusão */}
      <AnimatePresence>
        {leadToDelete && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLeadToDelete(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 text-center"
            >
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-brand-gray-dark mb-2">Excluir Lead?</h3>
              <p className="text-brand-gray mb-8">
                Esta ação não pode ser desfeita. O lead será removido permanentemente da sua lista.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setLeadToDelete(null)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-brand-gray-dark rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => handleDeleteLead(leadToDelete)}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
                >
                  Excluir
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal de Detalhes */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold text-brand-gray-dark">Detalhes do Lead</h2>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-brand-gray uppercase tracking-wider">Nome Completo</label>
                    <p className="text-lg font-medium text-brand-gray-dark">{selectedLead.name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-brand-gray uppercase tracking-wider">Data de Envio</label>
                    <p className="text-lg font-medium text-brand-gray-dark">{formatDate(selectedLead.createdAt)}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-brand-gray uppercase tracking-wider">E-mail</label>
                    <p className="text-lg font-medium text-brand-gray-dark">{selectedLead.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-brand-gray uppercase tracking-wider">Telefone</label>
                    <p className="text-lg font-medium text-brand-gray-dark">{selectedLead.phone}</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-brand-gray uppercase tracking-wider">Mensagem</label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-2xl border border-gray-100 min-h-[100px]">
                    <p className="text-brand-gray whitespace-pre-wrap">
                      {selectedLead.message || "Nenhuma mensagem enviada."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="px-8 py-3 bg-brand-purple text-white rounded-xl font-bold hover:bg-brand-purple-dark transition-all"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
