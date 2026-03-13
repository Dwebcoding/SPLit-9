const formMessages = {
  sopralluogo: {
    success: 'Richiesta inviata. Ti contatteremo manualmente a breve.',
    error: 'Invio non riuscito. Controlla i dati e riprova.'
  },
  tecnico: {
    success: 'Registrazione inviata. Verrai ricontattato dal team.',
    error: 'Invio non riuscito. Controlla i dati e riprova.'
  }
};

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const endpoint = form.dataset.endpoint;
  const formType = form.dataset.formType;
  const feedback = form.querySelector('[data-feedback]');
  const submitButton = form.querySelector('button[type="submit"]');
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  if (payload.competenze) {
    payload.competenze = payload.competenze
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Invio in corso...';
  feedback.textContent = '';
  feedback.className = 'form-feedback';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      const message = result.errors?.[0]?.message || formMessages[formType].error;
      throw new Error(message);
    }

    feedback.textContent = formMessages[formType].success;
    feedback.classList.add('success');
    form.reset();
  } catch (error) {
    feedback.textContent = error.message || formMessages[formType].error;
    feedback.classList.add('error');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = form.dataset.buttonLabel;
  }
}

document.querySelectorAll('[data-api-form]').forEach((form) => {
  form.addEventListener('submit', handleFormSubmit);
});
