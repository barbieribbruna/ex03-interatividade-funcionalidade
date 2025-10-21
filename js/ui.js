export function initUI({ navigateTo }) {
  const header = document.querySelector("header");
  const btn = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu");

  if (btn && header && menu) {
    btn.addEventListener("click", () => {
      const open = header.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });

    // Fechar menu ao clicar em um link de navegação
    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-link]");
      if (!a) return;
      header.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  }

  // Atualiza link ativo na navegação quando a rota muda
  window.addEventListener("spa:navigated", ({ detail }) => {
    setActiveLink(detail.path);
  });

  // Estado inicial
  setActiveLink(window.location.pathname);
}

/** Aplica classe .is-active no link que corresponde ao path atual */
function setActiveLink(pathname) {
  const links = document.querySelectorAll('nav a[data-link]');
  links.forEach((a) => {
    const aPath = new URL(a.href).pathname;
    a.classList.toggle("is-active", aPath === pathname);
  });
}
