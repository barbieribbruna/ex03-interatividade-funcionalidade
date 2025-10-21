// Helpers de máscara
const onlyDigits = (v) => v.replace(/\D/g, "");

/** 000.000.000-00 */
function maskCPF(v) {
  const d = onlyDigits(v).slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

/** (00) 00000-0000 ou (00) 0000-0000 */
function maskTel(v) {
  const d = onlyDigits(v).slice(0, 11);
  return d.length <= 10
    ? d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
    : d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

/** 00000-000 */
function maskCEP(v) {
  const d = onlyDigits(v).slice(0, 8);
  return d.replace(/(\d{5})(\d{0,3})/, "$1-$2");
}

/** Seta max do input date = hoje (yyyy-mm-dd) e valor inicial se vazio */
function lockDateToToday(input) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const iso = `${yyyy}-${mm}-${dd}`;
  input.max = iso;
  if (!input.value) input.value = iso;
}

/** Mostra mensagem amigável no <p id="status"> */
function showStatus(msg, ok = false) {
  const s = document.getElementById("status");
  if (!s) return;
  s.textContent = msg;
  s.classList.toggle("is-error", !ok);
  s.classList.toggle("is-ok", ok);
}

/** Marca/desmarca campos inválidos/válidos */
function decorateValidity(form) {
  [...form.elements].forEach((el) => {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement)) return;
    el.addEventListener("input", () => {
      el.classList.toggle("is-invalid", !el.checkValidity());
      el.classList.toggle("is-valid", el.checkValidity());
    });
  });
}

export function initCadastro() {
  const form =
    document.getElementById("formCadastro") ||
    document.getElementById("form-cadastro") ||
    document.querySelector("form");
  if (!form) return;

  // Aplicar máscaras
  const cpf = form.querySelector("#cpf");
  const tel = form.querySelector("#telefone");
  const cep = form.querySelector("#cep");
  if (cpf) cpf.addEventListener("input", (e) => (e.target.value = maskCPF(e.target.value)));
  if (tel) tel.addEventListener("input", (e) => (e.target.value = maskTel(e.target.value)));
  if (cep) cep.addEventListener("input", (e) => (e.target.value = maskCEP(e.target.value)));

  // Data de nascimento: limite = hoje
  const nasc = form.querySelector("#nascimento");
  if (nasc) lockDateToToday(nasc);

  // Validação visual reativa
  decorateValidity(form);

  // Envio: verificação de consistência + UX
  form.addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      showStatus("Verifique os campos destacados. Alguns dados estão inválidos.", false);
      // foca no primeiro inválido
      const firstInvalid = form.querySelector(":invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    e.preventDefault(); // simulação
    showStatus("Cadastro enviado com sucesso! (simulado)", true);
    form.reset();
    if (nasc) lockDateToToday(nasc); // restaura data
  });
}
