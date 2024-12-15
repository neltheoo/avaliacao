const API_URL = "http://localhost:3000/api/usuarios";

// Função para cadastrar um novo usuário
function cadastrarUsuario(formId, redirectUrl) {
  const form = document.getElementById(formId);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const status = document.getElementById("status").value;

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, telefone, status }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.mensagem);
        window.location.href = redirectUrl; // Redireciona após cadastro
      })
      .catch((error) => console.error("Erro ao cadastrar usuário:", error));
  });
}

// Função para listar usuários
function listarUsuarios(tabelaId) {
  const tabela = document.querySelector(`#${tabelaId} tbody`);
  tabela.innerHTML = "";

  fetch(API_URL)
    .then((response) => response.json())
    .then((usuarios) => {
      usuarios.forEach((usuario) => {
        const linha = `
          <tr>
         
            <td>${usuario.nome}</td>
             <td>${usuario.email}</td>
            <td>${usuario.telefone}</td>
              <td>${usuario.status}</td>
              <td>
              <a href="editar-usuario.html?id=${usuario.id}" class="btn-btna">
                <i class="bi bi-pencil"></i> Editar
              </a>
              <a href="apagar-usuario.html?id=${usuario.id}" class="btn-btnb">
                <i class="bi bi-trash"></i> Apagar
              </a>
            </td>
          </tr>
        `;
        tabela.innerHTML += linha;
      });
    })
    .catch((error) => console.error("Erro ao carregar usuários:", error));
}

// Função para carregar dados do usuário para edição
function carregarDadosUsuario(formId, usuarioId) {
  fetch(`${API_URL}/${usuarioId}`)
    .then((response) => response.json())
    .then((usuario) => {
      document.getElementById("nome").value = usuario.nome;
      document.getElementById("email").value = usuario.email;
      document.getElementById("telefone").value = usuario.telefone;
      document.getElementById("status").selected = usuario.status;
    })
    .catch((error) => console.error("Erro ao carregar usuário:", error));

  document.getElementById(formId).addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    const telefone = document.getElementById("telefone").value;
    const status = document.getElementById("status").value;

    fetch(`${API_URL}/${usuarioId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, telefone, status }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.mensagem);
        window.location.href = "listar-usuario.html";
      })
      .catch((error) => console.error("Erro ao atualizar usuário:", error));
  });
}

// Função para apagar usuário
function apagarUsuario(usuarioId, redirectUrl) {
  document
    .getElementById("btnConfirmar")
    .addEventListener("click", function () {
      fetch(`${API_URL}/${usuarioId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.mensagem);
          window.location.href = redirectUrl;
        })
        .catch((error) => console.error("Erro ao apagar usuário:", error));
    });
}
