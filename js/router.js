let ROUTES = {};
let renderFn = null;
let navTo = null;

export function setRoutes(routes) {
  ROUTES = routes || {};
}

export async function navigateTo(pathname) {
  if (window.location.pathname === pathname) return;
  history.pushState({}, "", pathname);
  await handleRoute();
}

export async function initRouter({ renderView, navigateTo }) {
  renderFn = renderView;
  navTo = navigateTo;

  document.addEventListener("click", async (e) => {
    const a = e.target.closest("a[data-link]");
    if (!a) return;
    const url = new URL(a.href);
   
    if (url.origin === window.location.origin) {
      e.preventDefault();
      await navTo(url.pathname);
    }
  });

  window.addEventListener("popstate", handleRoute);

  await handleRoute();
}

async function handleRoute() {
  const path = window.location.pathname || "/";
  const route = ROUTES[path] || ROUTES["/"];

  if (!route) {
    await renderFn(`<section class="container"><h1>404</h1><p>Página não encontrada.</p></section>`);
    return;
  }

  const ok = await renderFn(route.view, { isPath: true });
  if (ok && typeof route.onLoad === "function") {
    route.onLoad();
  }

  const event = new CustomEvent("spa:navigated", { detail: { path } });
  window.dispatchEvent(event);
}