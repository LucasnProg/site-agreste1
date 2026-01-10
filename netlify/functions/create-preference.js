const { Phone } = require('lucide-react');
const { MercadoPagoConfig, Preference } = require('mercadopago');

exports.handler = async (event) => {

    const baseUrl = 'https://comead-agreste1.com.br';
    const client = new MercadoPagoConfig({
        accessToken: process.env.MP_ACCESS_TOKEN
    });
    const preference = new Preference(client);
    const data = JSON.parse(event.body);
    try {
        const body = {
            items: [
                {
                    id: 'inscricao-ujad-2026',
                    title: `Inscrição UJAD + Camisa ${data.tamanhoCamisa}`,
                    quantity: 1,
                    unit_price: 150.00,
                    currency_id: 'BRL'
                }
            ],
            payer: {
                name: data.nome,
                email: data.email,
                Phone: {
                    area_code: data.telefone.substring(0, 2),
                    number: data.telefone.substring(2)
                }
            },
            binary_mode: true,
            payment_methods: {
                installments: 4,
                excluded_payment_types: [
                    { id: "ticket" }
                ],
            },
            metadata: {
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                localidade: data.localidade
            },
            notification_url: `${baseUrl}/.netlify/functions/payment-notification`,
            back_urls: {
                success: `${baseUrl}/ujad-sucesso`,
                failure: `${baseUrl}/ujad?status=failure`,
                pending: `${baseUrl}/ujad?status=failure`
            },
            auto_return: "approved",
        };

        const response = await preference.create({ body });

        return {
            statusCode: 200,
            body: JSON.stringify({
                id: response.id,
                init_point: response.init_point
            })
        };
    } catch (error) {
        // Log detalhado no terminal para você ver exatamente o que o MP diz
        console.error("ERRO DETALHADO DO MERCADO PAGO:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};