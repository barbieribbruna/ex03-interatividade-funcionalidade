export async function renderView(source, { isPath = false } = {}) {
  const outlet = document.getElementById("app");
  if (!outlet) return false;

  try {
    let html = source;

    if (isPath) {
      const res = await fetch(`${source}?v=${Date.now()}`, { headers: { "Accept": "text/html" } });
      if (!res.ok) throw new Error(`Falha ao carregar view: ${source}`);
      html = await res.text();
    }

    outlet.innerHTML = html;
    outlet.scrollTo({ top: 0, behavior: "instant" });
    return true;
  } catch (err) {
    console.error(err);
    outlet.innerHTML = `
      <section class="container">
        <h2>Erro ao carregar conteúdo</h2>
        <p>Tente novamente em instantes.</p>
      </section>`;
    return false;
  }
}
