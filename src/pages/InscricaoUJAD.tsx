import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, User, MapPin, Phone, Mail, Shirt, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { useEffect } from 'react';

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY);

const InscricaoUJAD = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [pixData, setPixData] = useState<{ qr_code: string, qr_code_url: string } | null>(null);
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get('status');

        if (status === 'success') {
            handleFinalizeRegistration();
        }
    }, []);

    const handleFinalizeRegistration = async () => {
        await fetch(import.meta.env.VITE_GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({ ...formData, status: 'PAGO' })
        });
        alert("Inscrição finalizada com Sucesso!");
        navigate('/');
    };

    const handleProceedToPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsRedirecting(true);

        try {
            const response = await fetch('/.netlify/functions/create-preference', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            const preference = await response.json();

            // Salva os dados temporariamente para persistir após o redirecionamento
            localStorage.setItem('ujad_registration_data', JSON.stringify(formData));

            // Redireciona o usuário para o Checkout Pro do Mercado Pago
            //window.location.href = preference.init_point;
        } catch (error) {
            alert("Erro ao iniciar pagamento. Tente novamente.");
            setIsRedirecting(false);
        }
    };

    const localidadesAgreste1 = [
        "AD Chã dos Marinhos", "AD Chã dos Pereiras", "AD Fagundes", "AD Galante",
        "AD Independência", "AD Ingá", "AD Itatuba", "AD Juarez Távora", "AD Jurema",
        "AD Massaranduba", "AD Pontina", "AD Riachão do Bacamarte", "AD Serra Redonda"
    ];

    const tamanhosCamisas = [
        "PP", "PP (Baby Look)", "P", "P (Baby Look)", "M", "M (Baby Look)",
        "G", "G (Baby Look)", "GG", "GG (Baby Look)", "XG", "XG (Baby Look)"
    ];
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        localidade: '',
        tamanhoCamisa: '',
        metodoPagamento: 'pix',
        confirmado: false
    });

    const maskPhone = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{4})\d+?$/, "$1");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setFormData({ ...formData, [name]: target.checked });
        } else if (name === "telefone") {
            setFormData({ ...formData, [name]: maskPhone(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsRedirecting(true);

        try {
            const response = await fetch('/.netlify/functions/create-preference', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro na Function: ${errorText}`);
            }

            const preference = await response.json();

            if (preference && preference.init_point) {
                localStorage.setItem('ujad_registration_data', JSON.stringify(formData));
                window.location.href = preference.init_point;
            } else {
                throw new Error("Link de pagamento (init_point) não recebido do servidor.");
            }
        } catch (error) {
            console.error("Erro detalhado:", error);
            alert("Falha ao gerar pagamento. Verifique o terminal do ntl dev.");
            setIsRedirecting(false);
        }
    };

    if (pixData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-xl max-w-md text-center border-t-4 border-adGold">
                    <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
                    <h2 className="text-2xl font-bold text-adBlue mb-2">Pedido Gerado!</h2>
                    <p className="text-gray-600 mb-6">Escaneie o QR Code abaixo para pagar via PIX e confirmar sua inscrição.</p>
                    <img src={pixData.qr_code_url} alt="QR Code Pix" className="mx-auto mb-4 w-48 h-48" />
                    <div className="bg-gray-100 p-3 rounded text-xs break-all mb-4 font-mono">{pixData.qr_code}</div>
                    <button onClick={() => navigate('/')} className="bg-adBlue text-white px-6 py-2 rounded-lg font-bold">Voltar ao Início</button>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 font-sans text-slate-900 flex flex-col">
            {/* Header da Página */}
            <div className="bg-adBlue text-white py-12 px-4 text-center">
                <button
                    onClick={() => navigate('/')}
                    className="mb-6 flex items-center gap-2 mx-auto text-adGold hover:text-yellow-400 transition font-bold uppercase text-xs tracking-widest"
                >
                    <ArrowLeft size={16} /> Voltar ao Início
                </button>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Inscrição UJAD 2026</h1>
                <p className="text-gray-400 max-w-lg mx-auto italic">
                    Preencha os campos abaixo para prosseguir com sua inscrição no próximo encontro regional.
                </p>
            </div>

            {/* Formulário */}
            <main className="container mx-auto px-4 -mt-10 mb-16 flex-grow">
                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-8 border-t-4 border-adGold"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nome Completo */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-blue-900 mb-2">Nome Completo</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="text" name="nome" required onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-adGold outline-none"
                                    placeholder="Seu nome completo"
                                />
                            </div>
                        </div>

                        {/* E-mail */}
                        <div>
                            <label className="block text-sm font-bold text-blue-900 mb-2">E-mail</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="email" name="email" required onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-adGold outline-none"
                                    placeholder="exemplo@gmail.com"
                                />
                            </div>
                        </div>

                        {/* Telefone */}
                        <div>
                            <label className="block text-sm font-bold text-blue-900 mb-2">Telefone (WhatsApp)</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="tel"
                                    name="telefone"
                                    value={formData.telefone}
                                    required
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-adGold outline-none"
                                    placeholder="(83) 99999-9999"
                                />
                            </div>
                        </div>

                        {/* Localidade */}
                        <div>
                            <label className="block text-sm font-bold text-blue-900 mb-2">Localidade</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                                <select
                                    name="localidade"
                                    required
                                    value={formData.localidade}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-adGold outline-none bg-white appearance-none cursor-pointer"
                                >
                                    <option value="">Selecione sua cidade</option>
                                    {localidadesAgreste1.map((loc) => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Tamanho das Camisas */}
                        <div className="md:col-span-1">
                            <label className="block text-sm font-bold text-blue-900 mb-2">Tamanho da Camisa</label>
                            <div className="relative">
                                {/* Importe Shirt de 'lucide-react' se ainda não o fez */}
                                <Shirt className="absolute left-3 top-3 text-gray-400" size={18} />
                                <select
                                    name="tamanhoCamisa"
                                    required
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-adGold outline-none bg-white appearance-none cursor-pointer"
                                >
                                    <option value="">Selecione o tamanho</option>
                                    {tamanhosCamisas.map((tamanho) => (
                                        <option key={tamanho} value={tamanho}>
                                            {tamanho}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Checkbox de Confirmação */}
                    <div className="md:col-span-2 mt-4 flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <input
                            type="checkbox"
                            id="confirmado"
                            name="confirmado"
                            required
                            checked={formData.confirmado}
                            onChange={handleChange}
                            className="mt-1 w-5 h-5 accent-adBlue cursor-pointer"
                        />
                        <label htmlFor="confirmado" className="text-sm text-gray-700 cursor-pointer select-none">
                            Confirmo que todos os dados preenchidos acima estão corretos e são de minha responsabilidade.<a className='text-red-700'>*</a>
                        </label>
                    </div>

                    {/* Botão de Submissão */}
                    <button
                        type="submit"
                        disabled={!formData.confirmado}
                        className={`w-full mt-8 font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg uppercase tracking-widest text-sm
                        ${formData.confirmado
                                ? 'bg-adBlue hover:bg-slate-800 text-white cursor-pointer'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                            }`}
                    >
                        <Send size={18} /> {isRedirecting ? "Redirecionando..." : "Prosseguir com a Inscrição"}
                    </button>

                </form>
            </main>

            <Footer />
        </div>
    );
};

export default InscricaoUJAD;