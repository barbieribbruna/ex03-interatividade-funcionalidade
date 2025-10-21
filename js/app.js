import { initRouter, navigateTo, setRoutes } from "./router.js";
import { renderView } from "./templates.js";
import { initCadastro } from "./forms.js";
import { initUI } from "./ui.js";

// 1) Mapa de rotas
const routes = {
  "/": {
    view: "views/home.html",
    onLoad: null,
  },
  "/projetos": {
    view: "views/projetos.html",
    onLoad: null,
  },
  "/cadastro": {
    view: "views/cadastro.html",
    onLoad: initCadastro,
  },
};

// 2) Inicialização da SPA
async function bootstrap() {
  setRoutes(routes);

  initUI({ navigateTo });
  
  await initRouter({ renderView, navigateTo });

  // footer: ano corrente
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
}

// Iniciar
bootstrap();
