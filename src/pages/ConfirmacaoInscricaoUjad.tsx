import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';

const ConfirmacaoInscricaoUjad = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const redirecionamentoAgendado = async () => {
            setTimeout(() => navigate('/'), 5000);
        };
        redirecionamentoAgendado();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <main className="flex-grow flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-10 text-center border-t-4 border-adGold">
                    <div className="space-y-6">
                        <CheckCircle className="mx-auto text-green-500" size={80} />
                        <h2 className="text-3xl font-bold text-adBlue">Sucesso!</h2>
                        <p className="text-gray-600 italic">Sua inscrição foi confirmada. Você será redirecionado em instantes.</p>
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                            <p className="text-xs text-adBlue font-bold">Pagamento realizado com sucesso.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
export default ConfirmacaoInscricaoUjad;