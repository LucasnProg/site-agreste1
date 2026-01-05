const { MercadoPagoConfig, Preference } = require('mercadopago');

const baseUrl = process.env.URL || "http://localhost:8888";

exports.handler = async (event) => {
    const client = new MercadoPagoConfig({
        accessToken: process.env.MP_ACCESS_TOKEN // Defina isso no painel do Netlify
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
                    unit_price: 150.00, // Valor da inscrição
                    currency_id: 'BRL'
                }
            ],
            payer: {
                name: data.nome,
                email: data.email,
            },
            back_urls: {
                // Certifique-se de que o caminho /ujad-inscricao está correto no seu App.jsx
                success: `${baseUrl}/ujad?status=success`,
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
        return { statusCode: 500, body: JSON.stringify(error) };
    }
};