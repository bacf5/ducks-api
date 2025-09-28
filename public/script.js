document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.visibility = 'hidden';
    }, 500);
  });

  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    });
  });

  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  const sections = document.querySelectorAll('section[id]');
  const navHighlighter = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          const activeLink = document.querySelector('.nav-link.active');
          if (activeLink) {
            activeLink.classList.remove('active');
          }
          const newActiveLink = document.querySelector(`.nav-link[href="#${id}"]`);
          if (newActiveLink) {
            newActiveLink.classList.add('active');
          }
        }
      });
    },
    {
      rootMargin: '-50% 0px -50% 0px',
    }
  );

  window.addEventListener('DOMContentLoaded', () => {
    const factQuote = document.getElementById('fact-quote');

    try {
      fetch('.netlify/functions/proxy')
        .then((res) => {
          if (!res.ok) {
            throw new Error('Request failed');
          }
          return res.json();
        })
        .then((data) => {
          factQuote.textContent = `"${data.fact}"`;
        });
    } catch {
      console.log('error');
    }
  });

  window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscription');
    const message = document.getElementById('message');
    const spinner = document.getElementById('spinner');
    const spanGetApi = document.getElementById('getapi');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();

      if (!email) {
        message.textContent = 'Email is required';
        message.style.color = 'red';
        return;
      }
      spanGetApi.style.display = 'none';
      spinner.style.display = 'inline-block';

      try {
        const res = await fetch('https://duck-api.netlify.app/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (res.ok) {
          document.querySelector('.subscription').classList.add('done');
          message.remove();
        } else if (res.status === 400) {
          message.textContent = data.error || 'Email already exists';
          message.style.color = 'red';
          spanGetApi.style.display = 'inline-block';
        } else {
          message.textContent = data.error || 'Something went wrong';
          message.style.color = 'red';
          spanGetApi.style.display = 'inline-block';
        }
      } catch (err) {
        console.log(err);
        message.textContent = 'Network error';
        message.style.color = 'red';
        spanGetApi.style.display = 'inline-block';
      } finally {
        spinner.style.display = 'none';
        spanGetApi.style.display = 'inline-block';
      }
    });
  });

  sections.forEach((section) => {
    navHighlighter.observe(section);
  });
});
