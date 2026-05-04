const form = document.getElementById("form");
const lista = document.getElementById("lista");

async function carregarAgendamentos() {
  const res = await fetch("http://localhost:3000/agendamentos");
  const dados = await res.json();

  lista.innerHTML = "";

  dados.forEach(item => {
    adicionarNaTela(item);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const data = document.getElementById("data").value;

  const res = await fetch("http://localhost:3000/agendamentos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome, data })
  });

  const novo = await res.json();
  adicionarNaTela(novo);

  form.reset();
});

function adicionarNaTela(item) {
  const li = document.createElement("li");
  li.innerHTML = `
    ${item.nome} - ${new Date(item.data).toLocaleString()}
    <button onclick="deletar(${item.id})">❌</button>
  `;
  lista.appendChild(li);
}

async function deletar(id) {
  await fetch(`http://localhost:3000/agendamentos/${id}`, {
    method: "DELETE"
  });

  carregarAgendamentos();
}

carregarAgendamentos();