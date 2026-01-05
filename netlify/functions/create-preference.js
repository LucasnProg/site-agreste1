const { MercadoPagoConfig, Preference } = require('mercadopago');

exports.handler = async (event) => {

    const baseUrl = 'https://adagreste1.netlify.app';
    const client = new MercadoPagoConfig({
        accessToken: process.env.MP_ACCESS_TOKEN
    });
    const preference = new Preference(client);
    const data = JSON.parse(event.body);

    try {
        const body = {
            items: [
                {
                    id: 'inscricao-ujad-2025',
                    title: `Inscrição UJAD - Camisa ${data.tamanhoCamisa}`,
                    quantity: 1,
                    unit_price: 150.00,
                    currency_id: 'BRL'
                }
            ],
            payer: {
                name: data.nome,
                email: data.email,
            },
            payment_methods: {
                installments: 3,
                excluded_payment_types: [
                    { id: "ticket" } // Isso remove apenas Boleto/Lotérica
                ],
            },
            back_urls: {
                // Ajustado para garantir que a URL nunca seja 'undefined'
                success: `${baseUrl}/ujad-successo`,
                failure: `${baseUrl}/ujad?status=failure`,
                pending: `${baseUrl}/ujad?status=pending`
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