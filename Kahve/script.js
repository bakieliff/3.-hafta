document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  function setActive(hash) {
    const current = hash || '#home';
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === current);
    });

    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    const id = current.replace('#','');
    const target = document.getElementById(id) || document.getElementById('home');
    if (target) target.classList.add('active');
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      history.pushState(null, '', href);
      setActive(href);
    });
  });

  window.addEventListener('popstate', () => setActive(location.hash || '#home'));
  setActive(location.hash || '#home');
});
