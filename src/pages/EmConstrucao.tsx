import React from 'react';
import { Hammer, ArrowLeft, Construction } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmConstrucao = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans text-slate-900">
      <div className="text-center max-w-md">
        {/* Ícone Animado */}
        <div className="relative inline-block mb-6">
          <Construction size={80} className="text-adGold animate-bounce" />
          <Hammer 
            size={32} 
            className="text-adBlue absolute -bottom-2 -right-2 transform -rotate-12" 
          />
        </div>

        <h1 className="text-4xl font-bold text-adBlue mb-4">Página em Construção</h1>
        
        <div className="h-1 w-20 bg-adGold mx-auto mb-6"></div>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Estamos trabalhando para trazer conteúdos abençoados para esta seção. 
          Em breve, você poderá conferir todas as novidades da 
          <span className="font-semibold text-adBlue"> Assembleia de Deus no Agreste 1</span>.
        </p>

        {/* Botão de Voltar utilizando react-router-dom */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mx-auto bg-adBlue hover:bg-slate-800 text-white px-6 py-3 rounded-md font-bold transition shadow-lg hover:shadow-xl uppercase text-sm tracking-wider"
        >
          <ArrowLeft size={18} />
          Voltar para a página anterior
        </button>
      </div>
      
      {/* Rodapé Simples */}
      <footer className="absolute bottom-8 text-gray-400 text-xs uppercase tracking-widest">
        AD Agreste 1&copy; 2025
      </footer>
    </div>
  );
};

export default EmConstrucao;