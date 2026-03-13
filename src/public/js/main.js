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

function initScrollAnimations() {
  const animated = document.querySelectorAll('[data-animate]');
  if (!animated.length || typeof IntersectionObserver === 'undefined') return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  animated.forEach((el) => observer.observe(el));
}

async function initSavingsChart() {
  const canvas = document.getElementById('savingsChart');
  if (!canvas || typeof Chart === 'undefined') return;

  const fallbackData = [120, 180, 240];
  const dataset = {
    label: 'Risparmio stimato totale (€)',
    data: fallbackData,
    backgroundColor: ['rgba(181, 82, 51, 0.7)', 'rgba(31, 111, 120, 0.7)', 'rgba(99, 102, 241, 0.7)'],
    borderRadius: 8,
    borderWidth: 0
  };

  const config = {
    type: 'bar',
    data: {
      labels: ['Benzina', 'Pernottamento', 'Ore di viaggio'],
      datasets: [dataset]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.dataset.label}: €${context.parsed.y}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#5a5a5a' }
        },
        y: {
          beginAtZero: true,
          ticks: { color: '#5a5a5a', stepSize: 50 },
          grid: { color: 'rgba(217, 212, 203, 0.6)' }
        }
      }
    }
  };

  const chart = new Chart(canvas, config);

  try {
    const response = await fetch('/api/metriche');
    if (!response.ok) throw new Error('Impossibile recuperare le metriche');

    const json = await response.json();
    const savings = json.savings;

    if (savings && typeof savings === 'object') {
      chart.data.datasets[0].data = [savings.benzina, savings.pernottamento, savings.oreViaggio];
      chart.update();
    }

    if (json.sopralluoghi != null) {
      const el = document.getElementById('metricSopralluoghi');
      if (el) el.textContent = json.sopralluoghi.toLocaleString();
    }

    if (json.tecnici != null) {
      const el = document.getElementById('metricTecnici');
      if (el) el.textContent = json.tecnici.toLocaleString();
    }
  } catch (error) {
    // keep fallback data if fetch fails
    console.warn('Impossibile caricare metriche:', error.message);
  }
}

function initHeaderScrollBehavior() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateHeader = () => {
    const currentY = window.scrollY;
    const isScrollingDown = currentY > lastScrollY;

    // show/hide header on scroll direction
    header.classList.toggle('hidden', isScrollingDown && currentY > 80);

    // apply solid background when user scrolls past the hero
    header.classList.toggle('scrolled', currentY > 40);

    lastScrollY = currentY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initSavingsChart();
  initHeaderScrollBehavior();
});
