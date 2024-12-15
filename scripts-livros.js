const API_URL = "http://localhost:3000/api/livros";

function formatarDataBrasileira(dataISO) {
  if (!dataISO) return ""; // Retorna vazio se não houver data

  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`; // Retorna no formato dd/mm/aaaa
}

// Função para cadastrar um novo usuário
function cadastrarLivro(formId, redirectUrl) {
  const form = document.getElementById(formId);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const anopublicacao = document.getElementById("anopublicacao").value;
    const status = document.getElementById("status").value;

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo, autor, anopublicacao, status }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.mensagem);
        window.location.href = redirectUrl; // Redireciona após cadastro
      })
      .catch((error) => console.error("Erro ao cadastrar livro:", error));
  });
}

// Função para listar usuários
function listarlivros(tabelaId) {
  const tabela = document.querySelector(`#${tabelaId} tbody`);
  tabela.innerHTML = "";

  fetch(API_URL)
    .then((response) => response.json())
    .then((livros) => {
      livros.forEach((livro) => {
        const linha = `
          <tr>
          
            <td>${livro.titulo}</td>
             <td>${livro.autor}</td>
            <td>${livro.anopublicacao}</td>
              <td>${livro.status}</td>
              <td>
              <a href="editar-livro.html?id=${livro.id}" class="btn-btna">
                <i class="bi bi-pencil"></i> Editar
              </a>
              <a href="apagar-usuario.html?id=${livro.id}" class="btn-btnb">
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
function carregarDadosLivros(formId, livroId) {
  fetch(`${API_URL}/${livroId}`)
    .then((response) => response.json())
    .then((livro) => {
      document.getElementById("titulo").value = livro.titulo;
      document.getElementById("autor").value = livro.autor;
      document.getElementById("anopublicacao").value = livro.anopublicacao;

      document.getElementById("status").selected = livro.status;
    })
    .catch((error) => console.error("Erro ao carregar livro:", error));

  document.getElementById(formId).addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;

    const anopublicacao = document.getElementById("anopublicacao").value;
    const status = document.getElementById("status").value;

    fetch(`${API_URL}/${livroId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo, autor, anopublicacao, status }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.mensagem);
        window.location.href = "listar-livro.html";
      })
      .catch((error) => console.log("Error ao atualizar livro:", error));
  });
}

// Função para apagar usuário
function apagarLivro(livroId, redirectUrl) {
  document
    .getElementById("btnConfirmar")
    .addEventListener("click", function () {
      fetch(`${API_URL}/${livroId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.mensagem);
          window.location.href = redirectUrl;
        })
        .catch((error) => console.error("Erro ao apagar livro:", error));
    });
}
