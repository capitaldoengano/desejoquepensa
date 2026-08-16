const MP_API = 'https://api.mercadopago.com';

async function getPayment(id) {
  const r = await fetch(`${MP_API}/v1/payments/${id}`, { headers: { Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}` } });
  if (!r.ok) throw new Error('payment_lookup_failed');
  return r.json();
}

async function registerApproved(payment) {
  const url = process.env.REGISTRATION_WEBHOOK_URL;
  if (!url) return;
  const md = payment.metadata || {};
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      origem: 'mercado-pago-webhook',
      status: 'approved',
      payment_id: payment.id,
      external_reference: payment.external_reference,
      valor: payment.transaction_amount,
      email: md.email || payment.payer?.email || '',
      nome: md.name || '',
      whatsapp: md.whatsapp || '',
      turma: md.turma || '',
      pago_em: payment.date_approved || new Date().toISOString()
    })
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) return res.status(503).json({ error: 'payment_not_configured' });

  try {
    const id = String(req.body?.data?.id || req.query?.['data.id'] || req.query?.id || '').replace(/[^0-9]/g, '');
    const type = req.body?.type || req.query?.type || req.query?.topic;
    if (!id || (type && !String(type).includes('payment'))) return res.status(200).json({ ok: true, ignored: true });

    const payment = await getPayment(id);
    if (payment.status === 'approved' && Number(payment.transaction_amount) === 60 && payment.external_reference?.startsWith('DQP-')) {
      await registerApproved(payment);
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'webhook_failed' });
  }
}
