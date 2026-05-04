const form = document.getElementById("formAgendamento");
const lista = document.getElementById("lista");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const data = document.getElementById("data").value;

  const resposta = await fetch("http://localhost:3000/agendamentos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome, data })
  });

  const novo = await resposta.json();

  adicionarNaLista(novo);
});

function adicionarNaLista(agendamento) {
  const li = document.createElement("li");
  li.textContent = `${agendamento.nome} - ${agendamento.data}`;
  lista.appendChild(li);
}