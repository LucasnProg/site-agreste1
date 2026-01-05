const axios = require('axios');

exports.handler = async (event) => {
  // Habilitar CORS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" } };
  }

  try {
    const data = JSON.parse(event.body);
    const secretKey = process.env.PAGARME_SECRET_KEY;

    // Pedido no Pagar.me
    const orderBody = {
      items: [{
        amount: 15000,
        description: `Inscrição UJAD 2026 + Camisa ${data.tamanhoCamisa}`,
        quantity: 1
      }],
      customer: {
        name: data.nome,
        email: data.email,
        phones: {
          mobile_phone: {
            country_code: '55',
            area_code: data.telefone.substring(1, 3),
            number: data.telefone.replace(/\D/g, '').substring(2)
          }
        }
      },
      payments: [{
        payment_method: data.metodoPagamento,
        pix: data.metodoPagamento === 'pix' ? { expires_in: 3600 } : undefined
      }]
    };

    const response = await axios.post('https://api.pagar.me/core/v5/orders', orderBody, {
      auth: { username: secretKey, password: '' }
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error(error.response?.data || error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Falha ao processar pagamento" })
    };
  }
};