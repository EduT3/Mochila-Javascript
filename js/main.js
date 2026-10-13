const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const status = document.getElementById("status");
let itens = [];
try {
  const salvos = JSON.parse(localStorage.getItem("itens") || "[]");
  if (Array.isArray(salvos)) itens = salvos.filter(item => item && typeof item.nome === "string" && item.nome.trim() && Number.isInteger(Number(item.quantidade)) && Number(item.quantidade) > 0).map((item, id) => ({ id, nome: item.nome.trim(), quantidade: Number(item.quantidade) }));
} catch {
  status.textContent = "Não foi possível carregar os itens salvos. Você pode começar uma nova lista.";
}
function salvar() {
  try { localStorage.setItem("itens", JSON.stringify(itens)); }
  catch { status.textContent = "Lista atualizada nesta página, mas o navegador não permitiu salvar. Ela pode se perder ao fechar."; }
}
function renderizar() {
  lista.replaceChildren();
  for (const item of itens) {
    const linha = document.createElement("li");
    linha.className = "item";
    const quantidade = document.createElement("strong");
    quantidade.textContent = item.quantidade;
    const nome = document.createElement("span");
    nome.textContent = item.nome;
    const remover = document.createElement("button");
    remover.type = "button";
    remover.textContent = "Remover";
    remover.setAttribute("aria-label", `Remover ${item.nome}`);
    remover.addEventListener("click", () => {
      itens = itens.filter(atual => atual.id !== item.id);
      status.textContent = `${item.nome} removido.`;
      renderizar(); salvar(); form.elements.nome.focus();
    });
    linha.append(quantidade, nome, remover);
    lista.append(linha);
  }
  document.getElementById("lista-vazia").hidden = itens.length > 0;
}
form.addEventListener("submit", evento => {
  evento.preventDefault();
  const nome = form.elements.nome.value.trim();
  const quantidade = Number(form.elements.quantidade.value);
  if (!nome || !Number.isSafeInteger(quantidade) || quantidade < 1) {
    status.textContent = "Informe um nome e uma quantidade inteira maior que zero.";
    return;
  }
  const existente = itens.find(item => item.nome.toLocaleLowerCase("pt-BR") === nome.toLocaleLowerCase("pt-BR"));
  if (existente) existente.quantidade = quantidade;
  else itens.push({ id: Math.max(-1, ...itens.map(item => item.id)) + 1, nome, quantidade });
  status.textContent = existente ? "Quantidade atualizada." : "Item adicionado à mochila.";
  renderizar(); salvar(); form.reset(); form.elements.nome.focus();
});
renderizar();
