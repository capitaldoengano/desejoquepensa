const MP_API = 'https://api.mercadopago.com';

function cors(req, res) {
  const allowed = (process.env.ALLOWED_ORIGINS || 'https://capitaldoengano.github.io').split(',').map(s => s.trim());
  const origin = req.headers.origin;
  if (origin && allowed.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
}

export default async function handler(req, res) {
  cors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'method_not_allowed' });
  if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) return res.status(503).json({ error: 'payment_not_configured' });

  const paymentId = String(req.query.payment_id || '').replace(/[^0-9]/g, '');
  if (!paymentId) return res.status(400).json({ error: 'missing_payment_id' });
  const r = await fetch(`${MP_API}/v1/payments/${paymentId}`, { headers: { Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}` } });
  const data = await r.json();
  if (!r.ok) return res.status(r.status).json({ error: 'mercado_pago_error' });
  return res.status(200).json({ id: data.id, status: data.status, statusDetail: data.status_detail, externalReference: data.external_reference });
}
