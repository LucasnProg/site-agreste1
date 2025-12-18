import React from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Menu, Search, Calendar } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">
      
      {/* 1. TOP BAR */}
      <div className="bg-[#0f172a] text-white py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center text-xs">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Phone size={14} className="text-yellow-500"/> (83) 3315-xxxx</span>
            <span className="flex items-center gap-1"><Mail size={14} className="text-yellow-500"/> contato@adcampinagrande.com.br</span>
          </div>
          <div className="flex gap-3">
            <Facebook size={16} className="hover:text-yellow-500 cursor-pointer transition" />
            <Instagram size={16} className="hover:text-yellow-500 cursor-pointer transition" />
            <Youtube size={16} className="hover:text-yellow-500 cursor-pointer transition" />
          </div>
        </div>
      </div>

      {/* 2. NAVBAR */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Placeholder para Logo */}
            <div className="h-12 w-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xs italic">LOGO</div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-tight text-blue-900">AD CAMPINA GRANDE</span>
              <span className="text-[10px] tracking-widest uppercase text-gray-500">Assembleia de Deus</span>
            </div>
          </div>
          
          <div className="hidden lg:flex gap-8 font-semibold text-sm uppercase">
            <a href="#" className="text-blue-900 hover:text-yellow-600">Início</a>
            <a href="#" className="hover:text-yellow-600">A Igreja</a>
            <a href="#" className="hover:text-yellow-600">Departamentos</a>
            <a href="#" className="hover:text-yellow-600">Congregações</a>
            <a href="#" className="hover:text-yellow-600">Eventos</a>
            <a href="#" className="hover:text-yellow-600">Contribua</a>
          </div>

          <div className="flex gap-4 items-center">
            <Search size={20} className="text-gray-500 cursor-pointer" />
            <Menu size={24} className="lg:hidden text-blue-900" />
          </div>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative h-[500px] bg-blue-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1600&q=80" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Igreja"
        />
        <div className="relative container mx-auto h-full flex flex-col justify-center px-4 text-white">
          <span className="bg-yellow-600 w-fit px-4 py-1 rounded-full text-sm font-bold mb-4">DESTAQUE</span>
          <h1 className="text-4xl md:text-6xl font-bold max-w-2xl leading-tight">
            Culto de Doutrina e Ensino da Palavra
          </h1>
          <p className="mt-4 text-lg text-gray-200">Todas as terças-feiras às 19h no Templo Central.</p>
          <button className="mt-8 bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-md font-bold transition w-fit uppercase">
            Ver Programação
          </button>
        </div>
      </section>

      {/* 4. NOTÍCIAS (Grid) */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900">Últimas Notícias</h2>
            <div className="h-1 w-20 bg-yellow-500 mt-2"></div>
          </div>
          <button className="text-blue-900 font-bold border-b-2 border-blue-900 hover:text-yellow-600 hover:border-yellow-600 transition">Ver tudo</button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <div className="h-52 bg-gray-200 relative overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=600&q=80`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                  <Calendar size={14} /> 12 de Outubro, 2024
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-yellow-600 transition">
                  Grande Congresso de Jovens acontece neste final de semana
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  A AD Campina Grande convida todos para o evento que reunirá caravanas de todo o estado para momentos de louvor e adoração...
                </p>
                <button className="mt-4 text-sm font-bold text-blue-900 uppercase tracking-wider">Leia mais +</button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;