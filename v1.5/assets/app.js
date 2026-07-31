
const WAITLIST_URL = "https://script.google.com/macros/s/AKfycbwE1TP3rlB1O0qRy0z5vCGykCmvIBW3Lno3E7piBQ4o6Q2IGUBmtldZoic3BW1UB5qa/exec";
const CANAL_URL = "https://instagram.com/ogustavosouzapauli"; // provisório até entrar o link exato do canal

function setInterest(formId, mode) {
  const form = document.getElementById(formId);
  if (!form) return;
  const target = mode === 'reprise' ? 'interesse-reprise' : 'interesse-turma';
  const input = form.querySelector(`#${target}`);
  if (input) input.checked = true;
  document.getElementById(formId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function handleSignup(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = form.querySelector('.message');
  const button = form.querySelector('button[type="submit"]');
  const email = form.querySelector('input[name="email"]').value.trim();
  const turma = form.querySelector('input[name="turma"]:checked')?.value || '';
  const interesse = form.querySelector('input[name="interesse"]:checked')?.value || '';
  const consentiu = form.querySelector('input[name="consent"]')?.checked;
  const honeypot = form.querySelector('input[name="website"]')?.value;

  if (honeypot) return;

  if (!email || !turma || !interesse || !consentiu) {
    message.textContent = 'Preencha o email, escolha terça ou quinta e confirme o consentimento.';
    return;
  }

  const payload = {
    email,
    origem: form.dataset.origin || 'capital-do-engano-site-v1.3',
    consentiu: true,
    turma,
    interesse,
    projeto: 'Desejo que Pensa',
    pagina: location.pathname || 'local'
  };

  button.disabled = true;
  button.textContent = 'Enviando...';
  message.textContent = 'Registrando seu pedido...';

  try {
    await fetch(WAITLIST_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    message.textContent = `Registrado: ${interesse}, preferência de ${turma}. Você entra no mailing e recebe o próximo aviso.`;
    message.style.color = '#4b6200';
    form.reset();
  } catch (error) {
    message.textContent = 'Houve um ruído no envio. Tente novamente em instantes.';
    message.style.color = '#8d132d';
  } finally {
    button.disabled = false;
    button.textContent = 'Entrar no mailing';
  }
}
