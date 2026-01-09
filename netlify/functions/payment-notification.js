const { MercadoPagoConfig, Payment } = require('mercadopago');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405 };

    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
    const payment = new Payment(client);

    try {
        const body = JSON.parse(event.body);
        const paymentId = body.data?.id || event.queryStringParameters?.id;

        if (body.type === 'payment' || event.queryStringParameters?.topic === 'payment') {
            const paymentData = await payment.get({ id: paymentId });
            
            const { nome, email, telefone, localidade } = paymentData.metadata;

            if (paymentData.status === 'approved') {
                await fetch(process.env.VITE_GOOGLE_SHEETS_URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        nome, email, telefone, localidade, 
                        statusPagamento: 'APROVADO',
                        formaPagamento: paymentData.payment_method_id,
                        isWebhook: true
                    })
                });
            }
        }
        return { statusCode: 200, body: 'OK' };
    } catch (error) {
        return { statusCode: 200, body: 'Erro processado' };
    }
};