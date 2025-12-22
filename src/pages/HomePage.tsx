import React, { useEffect } from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Menu, Search, Calendar } from 'lucide-react';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import logoImage from '../assets/image/logo.png';
import bannerImg from '../assets/image/banner.jpg';
import conferenciaImg from '../assets/image/conferencia.png';
import ujadImg from '../assets/image/ujad.png';
import ufadImg from '../assets/image/ufad.png';

const Home = () => {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    useEffect(() => {
        const processEmbeds = () => {
            const globalWindow = window as any;
            if (globalWindow.instgrm && globalWindow.instgrm.Embeds) {
                globalWindow.instgrm.Embeds.process();
            }
        };

        const scriptId = 'instagram-embed-script';
        let script = document.getElementById(scriptId) as HTMLScriptElement | null;

        if (!script) {
            script = document.createElement('script') as HTMLScriptElement;
            script.id = scriptId;
            script.src = "https://www.instagram.com/embed.js";
            script.async = true;
            script.onload = processEmbeds;
            document.body.appendChild(script);
        } else {
            processEmbeds();
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-slate-900">

            {/* 1. TOP BAR */}
            <div className="bg-[#0f172a] text-white py-2 px-4 hidden md:block">
                <div className="container mx-auto flex justify-between items-center text-xs">
                    <div className="flex gap-4">
                        {/*<span className="flex items-center gap-1"><Phone size={14} className="text-yellow-500"/> (83) 3315-xxxx</span>*/}
                        <a
                            href="mailto:agresteparaibano1@gmail.com"
                            className="flex items-center gap-1 hover:text-yellow-500 transition"
                        >
                            <Mail size={14} className="text-yellow-500" />
                            agresteparaibano1@gmail.com
                        </a>
                    </div>
                    <div className="flex gap-3">
                        <a href='https://www.facebook.com/ADCampinaGrande/' target='_blank' rel='noopener noreferrer'><Facebook size={20} className="hover:text-yellow-500 cursor-pointer transition" /></a>
                        <a href='https://www.instagram.com/adagreste1/' target='_blank' rel='noopener noreferrer'><Instagram size={20} className="hover:text-yellow-500 cursor-pointer transition" /></a>
                        <a href='https://www.youtube.com/@ADCampinaGrandeOficial' target='_blank' rel='noopener noreferrer'><Youtube size={20} className="hover:text-yellow-500 cursor-pointer transition" /></a>
                    </div>
                </div>
            </div>

            {/* 2. NAVBAR */}
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">

                    <div className="flex items-center gap-2 min-w-max">
                        <img
                            src={logoImage}
                            alt="Logo AD Agreste"
                            className="h-16 w-20 object-contain"
                        />
                        <div className="flex flex-col">
                            <span className="font-bold text-xl leading-tight text-blue-900">AD AGRESTE I</span>
                            <span className="text-[10px] tracking-widest uppercase text-gray-500">
                                Assembleia de Deus na Região do Agreste 1
                            </span>
                        </div>
                    </div>

                    <div className="hidden lg:flex flex-grow justify-center gap-10 font-semibold text-sm uppercase">
                        <a href="/" className="text-blue-900 hover:text-yellow-600 border-b-2 border-transparent hover:border-yellow-600 transition-all">Início</a>
                        <a href="/UJAD" className="hover:text-yellow-600 border-b-2 border-transparent hover:border-yellow-600 transition-all">UJAD</a>
                        <a href="/em-breve" className="hover:text-yellow-600 border-b-2 border-transparent hover:border-yellow-600 transition-all">UFAD</a>
                        <a href="/em-breve" className="hover:text-yellow-600 border-b-2 border-transparent hover:border-yellow-600 transition-all">SEMAD</a>
                    </div>

                    <div className="flex gap-4 items-center min-w-max lg:w-[320px] justify-end">
                        <Menu size={24} className="lg:hidden text-blue-900 cursor-pointer" onClick={() => setIsMenuOpen(true)} />
                    </div>
                    {isMenuOpen && (
                        <div className="fixed inset-0 z-[100] lg:hidden">
                            <div
                                className="fixed inset-0 bg-black/50"
                                onClick={() => setIsMenuOpen(false)}
                            ></div>

                            <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl p-6 flex flex-col gap-6">
                                <div className="flex justify-end">
                                    <button onClick={() => setIsMenuOpen(false)} className="text-blue-900 font-bold text-2xl">✕</button>
                                </div>

                                <nav className="flex flex-col gap-6 font-semibold uppercase text-sm">
                                    <a href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-600">Início</a>
                                    <a href="/UJAD" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-600">UJAD</a>
                                    <a href="/em-breve" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-600">UFAD</a>
                                    <a href="/em-breve" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-600">SEMAD</a>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* 3. HERO SECTION */}
            <section className="relative h-[500px] bg-blue-900 overflow-hidden">
                <img
                    src={bannerImg}
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                    alt="Igreja"
                />
                <div className="relative container mx-auto h-full flex flex-col justify-center px-4 text-white">
                    <h1 className="text-4xl md:text-6xl font-bold max-w-2xl leading-tight">

                    </h1>
                    <p className="mt-4 text-lg text-gray-200"></p>

                </div>
            </section>

            {/* 4. NOTÍCIAS (Grid) */}
            <section className="container mx-auto px-4 py-16">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-blue-900">Eventos</h2>
                        <div className="h-1 w-20 bg-yellow-500 mt-2"></div>
                    </div>
                    {<button className="text-blue-900 font-bold border-b-2 border-blue-900 hover:text-yellow-600 hover:border-yellow-600 transition">
                        <a href='https://www.instagram.com/adagreste1/' target='_blank'>Ver tudo</a></button>}
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <PostCard
                        title="1º Conferencia Regional de Missões do Agreste 1"
                        date="29 de Novembro, 2025"
                        content="A Assembleia de Deus – Região Agreste 1 realizou, no dia 29 de novembro de 2025, a 1ª Conferência Regional de Missões, na AD Galante, em Galante-PB, com o tema “O avivamento realinha a missão da Igreja”. O evento foi marcado por momentos de renovação espiritual, capacitação e forte mobilização missionária, reunindo líderes e fiéis de todo o Agreste em um dia de despertamento e comunhão."
                        imageUrl={conferenciaImg}
                    />
                    <PostCard
                        title=" Encontro da UFAD no Agreste 1"
                        date="28 de Setembro, 2025"
                        content="O Encontro da UFAD no Agreste 1, aconteceu durante a tarde e a noite do sábado (27) no Ginásio José Tito Filho Travessa, em Riachão do Bacamarte.

A programação teve o tema: “A excelência de Maria no mundo de Marta” (Lucas 10:42) e contou com a presença de convidados como a Supervisora Geral da UFAD Missionária Vânia Costa, além da cantora Ruthe Dayanne e as pregadoras Sadja Rolim e Etânia Simões.

Foram centenas de mulheres que compõe os 13 municípios do agreste 1 que ofertaram sua adoração a Deus com um repertório de louvores especiais.

O mover do Espírito Santo restaurou as servas de Deus e todos que estavam presentes sentiram esse agir."
                        imageUrl={ufadImg}
                    />
                    <PostCard
                        title="Pré-Encontro UJAD Agreste 1"
                        date="23 de Outubro, 2025"
                        content="A presença de Deus foi real, poderosa e transformadora. Corações foram tocados, vidas renovadas e o fogo do Espírito reacendido!

E isso é só o começo do que o Senhor ainda vai realizar!

Nos vemos novamente em 2026 "
                        imageUrl={ujadImg}
                    />
                </div>
            </section>
            <section className="container mx-auto px-4 py-16">
                {/* Cabeçalho Centralizado */}
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-3xl font-bold text-blue-900 text-center">Mídias Sociais</h2>
                    <div className="h-1 w-20 bg-yellow-500 mt-2"></div>
                </div>

                {/* Grid de Carrosséis */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Carrossel 1 */}
                    <div className="p-4 flex justify-center">
                        {/* Aqui você insere o código de Embed do Instagram */}
                        <blockquote
                            className="instagram-media"
                            data-instgrm-permalink="https://www.instagram.com/p/DRsIoW4Ee07/"
                            data-instgrm-version="14"
                        ></blockquote>
                    </div>

                    {/* Carrossel 2 */}
                    <div className="p-4 flex justify-center">
                        <blockquote
                            className="instagram-media"
                            data-instgrm-permalink="https://www.instagram.com/p/DRsJkukkQ6U/"
                            data-instgrm-version="14"
                        ></blockquote>
                    </div>

                    {/* Carrossel 3 */}
                    <div className="p-4 flex justify-center">
                        <blockquote
                            className="instagram-media"
                            data-instgrm-permalink="https://www.instagram.com/p/DRucUBLkVTY/"
                            data-instgrm-version="14"
                        ></blockquote>
                    </div>

                    {/* Carrossel 3 */}
                    <div className="p-4 flex justify-center">
                        <blockquote
                            className="instagram-media"
                            data-instgrm-permalink="https://www.instagram.com/p/DPPflQ8DxjB/"
                            data-instgrm-version="14"
                        ></blockquote>
                    </div>

                </div>
            </section>
            <Footer />
        </div>

    );
};

export default Home;