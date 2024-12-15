const API_URL = "http://localhost:3000/api/emprestimos";
function formatarDataBrasileira(dataISO) {
  if (!dataISO) return ""; // Retorna vazio se não houver data

  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`; // Retorna no formato dd/mm/aaaa
}

// Função para cadastrar um novo usuário
function cadastrarEmprestimo(formId, redirectUrl) {
  const form = document.getElementById(formId);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const tituloLivro = document.getElementById("tituloLivro").value;
    const dataEmprestimo = document.getElementById("dataEmprestimo").value;
    const dataDevolucao = document.getElementById("dataDevolucao").value;

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        tituloLivro,
        dataEmprestimo,
        dataDevolucao,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.mensagem);
        window.location.href = redirectUrl; // Redireciona após cadastro
      })
      .catch((error) => console.error("Erro ao cadastrar Emprestimo:", error));
  });
}

// Função para listar usuários
function listarEmprestimos(tabelaId) {
  const tabela = document.querySelector(`#${tabelaId} tbody`);
  tabela.innerHTML = "";

  fetch(API_URL)
    .then((response) => response.json())
    .then((emprestimos) => {
      emprestimos.forEach((emprestimo) => {
        const linha = `
          <tr>
           
            <td>${emprestimo.nome}</td>
             <td>${emprestimo.tituloLivro}</td>
            <td>${formatarDataBrasileira(emprestimo.dataEmprestimo)}</td>
              <td>${formatarDataBrasileira(emprestimo.dataDevolucao)}</td>
              <td>
              
              <a href="editar-emprestimo.html?id=${
                emprestimo.id
              }" class="btn-btna">
                <img width="10" height="10" src="https://img.icons8.com/ios/50/FFFFFF/pencil--v1.png" alt="pencil--v1"/> Editar
              </a>
              <a href="apagar-usuario.html?id=${
                emprestimo.id
              }" class="btn-btnb">
                <img width="50" height="50" src="https://img.icons8.com/ios/50/FFFFFF/litter-disposal.png" alt="litter-disposal"/> Apagar
              </a>
            </td>
          </tr>
        `;
        tabela.innerHTML += linha;
      });
    })
    .catch((error) => console.error("Erro ao carregar emprestimo:", error));
}

// Função para carregar dados do usuário para edição
function carregarDadosEmprestimos(formId, emprestimoId) {
  fetch(`${API_URL}/${emprestimoId}`)
    .then((response) => response.json())
    .then((emprestimo) => {
      document.getElementById("nome").value = emprestimo.nome;
      document.getElementById("tituloLivro").value = emprestimo.tituloLivro;
      document.getElementById("dataEmprestimo").value =
        emprestimo.dataEmprestimo;
      document.getElementById("dataDevolucao").value = emprestimo.dataDevolucao;
    })
    .catch((error) => console.error("Erro ao carregar livro:", error));

  document.getElementById(formId).addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    console.log("oi");
    console.log(nome);
    const tituloLivro = document.getElementById("tituloLivro").value;

    const dataEmprestimo = document.getElementById("dataEmprestimo").value;
    const dataDevolucao = document.getElementById("dataDevolucao").value;

    fetch(`${API_URL}/${emprestimoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        tituloLivro,
        dataEmprestimo,
        dataDevolucao,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.mensagem);
        window.location.href = "listarEmprestimo.html";
      })
      .catch((error) => console.log("Error ao atualizar Emprestimo:", error));
  });
}

// Função para apagar usuário
function apagarEmprestimo(emprestimoId, redirectUrl) {
  document
    .getElementById("btnConfirmar")
    .addEventListener("click", function () {
      fetch(`${API_URL}/${emprestimoId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.mensagem);
          window.location.href = redirectUrl;
        })
        .catch((error) => console.error("Erro ao apagar Emprestimo:", error));
    });
}
