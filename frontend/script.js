const API = "http://localhost:3000";

const form = document.getElementById("form");
const lista = document.getElementById("lista");

function salvarToken(token) {
  localStorage.setItem("token", token);
}

function pegarToken() {
  return localStorage.getItem("token");
}

function logout() {
  localStorage.removeItem("token");
  location.reload();
}

function mostrarApp() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("app").style.display = "block";
}

async function register() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  await fetch(API + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  });

  alert("Usuário criado!");
}

async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const res = await fetch(API + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  });

  const data = await res.json();

  if (data.token) {
    salvarToken(data.token);
    mostrarApp();
    carregar();
  } else {
    alert("Erro no login");
  }
}

async function carregar() {
  const res = await fetch(API + "/agendamentos");
  const dados = await res.json();

  lista.innerHTML = "";

  dados.forEach(addItem);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const data = document.getElementById("data").value;

  await fetch(API + "/agendamentos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, data })
  });

  carregar();
  form.reset();
});

if (dados.length === 0) {
  lista.innerHTML = "<p>Nenhum agendamento ainda 😴</p>";
  return;
}

function addItem(item) {
  const li = document.createElement("li");

  li.innerHTML = `
    ${item.nome} - ${new Date(item.data).toLocaleString()}
    <button onclick="deletar(${item.id})">❌</button>
  `;

  lista.appendChild(li);
}

async function deletar(id) {
  await fetch(API + "/agendamentos/" + id, {
    method: "DELETE"
  });

  carregar();
}

// auto login
if (pegarToken()) {
  mostrarApp();
  carregar();
}

if (data.token) {
  salvarToken(data.token);
  mostrarApp();
  carregar();
} else {
  alert("❌ Email ou senha inválidos");
}

alert("✅ Conta criada com sucesso!");