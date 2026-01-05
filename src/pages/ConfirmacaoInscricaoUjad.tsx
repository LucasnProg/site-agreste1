import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';
import Footer from '../components/Footer';

const ConfirmacaoInscricaoUjad = () => {
    const navigate = useNavigate();
    const [statusEnvio, setStatusEnvio] = useState('processando'); // processando, sucesso, erro

    useEffect(() => {
        const enviarDadosEAgendarRedirecionamento = async () => {
            const dadosSalvos = localStorage.getItem('ujad_registration_data');

            if (dadosSalvos) {
                try {
                    const formData = JSON.parse(dadosSalvos);

                    // Envia para o Google Sheets
                    await fetch(import.meta.env.VITE_GOOGLE_SHEETS_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        body: JSON.stringify({
                            ...formData,
                            status: 'PAGO',
                            data_pagamento: new Date().toLocaleString('pt-BR')
                        })
                    });

                    // Limpa para evitar duplicidade
                    localStorage.removeItem('ujad_registration_data');
                    setStatusEnvio('sucesso');
                } catch (error) {
                    console.error("Erro ao enviar para planilha:", error);
                    setStatusEnvio('erro');
                }
            } else {
                setStatusEnvio('sucesso'); // Já processado ou sem dados
            }

            // Redireciona após 5 segundos independente do resultado do Sheets
            const timer = setTimeout(() => {
                navigate('/');
            }, 5000);

            return () => clearTimeout(timer);
        };

        enviarDadosEAgendarRedirecionamento();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <main className="flex-grow flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-10 text-center border-t-4 border-adGold">
                    {statusEnvio === 'processando' ? (
                        <div className="space-y-4">
                            <Loader2 className="mx-auto text-adBlue animate-spin" size={60} />
                            <h2 className="text-2xl font-bold text-adBlue">Finalizando Inscrição...</h2>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <CheckCircle className="mx-auto text-green-500" size={80} />
                            <h2 className="text-3xl font-bold text-adBlue">Sucesso!</h2>
                            <p className="text-gray-600 italic">Sua inscrição foi confirmada. Você será redirecionado em instantes.</p>
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                <p className="text-xs text-adBlue font-bold">Pagamento realizado com sucesso.</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};
export default ConfirmacaoInscricaoUjad;