//json-server --watch db.json

let linha;
let tarefa;
let tarefas;
let img = "assets/imgs/logoArnia.png";
let imgBranca = "assets/imgs/arnia.png";
let contraste = false;

function autoContraste() {
  let corpo = document.getElementById("corpo");
  corpo.classList.toggle("body");
  let coluna = document.getElementById("cLateral");
  coluna.classList.toggle("cLateral1");
  let conteudo = document.getElementById("conteudo");
  conteudo.classList.toggle("conteudo1");
  let botaoCad = document.getElementById("botaoCadastro");
  botaoCad.classList.toggle("buttonTop1");
  let botaoEntrar = document.getElementById("botaoEntrar");
  botaoEntrar.classList.toggle("buttonTop1");
  let sair = document.getElementById("botaoSair");
  sair.classList.toggle("botaoSair1");
  let titulo = document.getElementById("imagem-titulo");
  titulo.classList.toggle("imagem-titulo1");
  let conteudos = document.getElementById("conteudos");
  conteudos.classList.toggle("conteudos1");
  let welcome = document.getElementById("welcome");
  welcome.classList.toggle("welcome1");
  let totalizacao = document.getElementById("totalizacao");
  totalizacao.classList.toggle("totalizacao1");

  let tema = document.getElementById("contraste");
  tema.classList.toggle("contraste1");
  contraste = !contraste;
  if (contraste) {
    document.getElementById("logoArnia").src = imgBranca;
    document.getElementById("contraste").innerHTML =
      "<i class='fa-solid fa-moon'></i> Tema";
  } else {
    document.getElementById("logoArnia").src = img;
    document.getElementById("contraste").innerHTML =
      "<i class='fa-solid fa-sun'></i> Tema";
  }
}

function modalCadastro() {
  modalCadastrar.style.display = "block";
  document.getElementById("cadastrado").innerHTML = "";
  document.getElementById("obrigatorioNome").innerHTML = "";
  document.getElementById("obrigatorioLogin").innerHTML = "";
  document.getElementById("obrigatorioEmail").innerHTML = "";
  document.getElementById("obrigatorioSenha").innerHTML = "";
  document.getElementById("obrigatorioConfirma").innerHTML = "";
  document.getElementById("obrigatorioTermos").innerHTML = "";
  document.getElementById("nome").value = "";
  document.getElementById("Login").value = "";
  document.getElementById("email").value = "";
  document.getElementById("senhaCadastro").value = "";
  document.getElementById("senhaCadastro2").value = "";
  slideRight();
}

function cancelaCadastro() {
  modalCadastrar.style.display = "block";
  document.getElementById("obrigatorioNome").innerHTML = "";
  document.getElementById("obrigatorioLogin").innerHTML = "";
  document.getElementById("obrigatorioEmail").innerHTML = "";
  document.getElementById("obrigatorioSenha").innerHTML = "";
  document.getElementById("obrigatorioConfirma").innerHTML = "";
  document.getElementById("obrigatorioTermos").innerHTML = "";
  document.getElementById("nome").value = "";
  document.getElementById("Login").value = "";
  document.getElementById("email").value = "";
  document.getElementById("senhaCadastro").value = "";
  document.getElementById("senhaCadastro2").value = "";
  slideLeft();
}

async function cadastrar() {
  let nome = document.getElementById("nome").value;
  let login = document.getElementById("Login").value;
  let emails = document.getElementById("email").value;
  let password = document.getElementById("senhaCadastro").value;
  let password2 = document.getElementById("senhaCadastro2").value;
  let termos = document.getElementById("termos").checked;
  let obr = "<div>*Campo obrigatório</div>";

  if (nome.length === 0) {
    modalCadastrar.style.display = "block";
    document.getElementById("obrigatorioNome").innerHTML = "*Campo Obrigatório";
  } else if (login.length === 0) {
    modalCadastrar.style.display = "block";
    document.getElementById("obrigatorioLogin").innerHTML =
      "*Campo Obrigatório";
  } else if (emails.length === 0) {
    modalCadastrar.style.display = "block";
    document.getElementById("obrigatorioEmail").innerHTML =
      "*Campo Obrigatório";
  } else if (senhaCadastro.value === "") {
    modalCadastrar.style.display = "block";
    document.getElementById("obrigatorioSenha").innerHTML =
      "*Campo Obrigatório";
  } else if (termos.checked == false) {
    modalCadastrar.style.display = "block";
    document.getElementById("obrigatorioTermos").innerHTML =
      "*Campo Obrigatório";
  } else if (senhaCadastro2.value === "") {
    modalCadastrar.style.display = "block";
    document.getElementById("validacao").innerHTML = "*Campo Obrigatório";
  } else if (password != password2) {
    modalCadastrar.style.display = "block";
    document.getElementById("obrigatorioConfirma").innerHTML =
      "*As senhas não conferem";
  } else {
    let dados = await verificaDados("users", `?login=${login}`);
    // console.log(dados)
    if (dados.length > 0) {
      document.getElementById("cadastrado").innerHTML =
        "*Nome de usuário já cadastrado";
    } else {
      user = {
        nome: nome,
        login: login,
        emails: emails,
        password: btoa(password),
      };
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      slideLeft();
    }
  }
}

async function verificaDados(endpoint, param_busca) {
  let dados = await fetch("http://localhost:3000/" + endpoint + param_busca);
  let resposta = await dados.json();
  // console.log(resposta)
  return resposta;
}

function modalEntra() {
  modalEntrar.style.display = "block";
}

async function entrar() {
  let nomeLogin = document.getElementById("nomeLogin").value;
  let senhaLogin = document.getElementById("senha").value;

  let espera = await verificaDados(
    "users",
    `?login=${nomeLogin}&password=${btoa(senhaLogin)}`
  );
  // console.log(espera)

  if (espera.length > 0) {
    document.getElementById(
      "welcome"
    ).innerHTML = `Seja bem-vindo(a), ${espera[0].nome}!`;
    modalEntrar.style.display = "none";
    document.getElementById("usuario").value = espera[0].nome;
    document.getElementById("botaoSair").style.color = "#f8b04e";
    document.getElementById("welcome").classList.remove("d-none");
    document.getElementById("welcome").classList.add("d-block");
    document.getElementById("welcome").style.color = "#68519d";
    document.getElementById("adicionar").classList.remove("d-none");
    document.getElementById("adicionar").classList.add("d-block");
    document.getElementById("botaoEntrar").innerHTML = `${espera[0].nome}`;
    document.getElementById("botaoEntrar").disabled = true;
    await imprimeTarefas(nomeLogin);
    fadeOut();
  } else {
    document.getElementById("negarLogin").innerHTML =
      "*Login ou senha Inválidos";
  }
}

function cancelarLogin() {
  modalEntrar.style.display = "none";
}

function botaoSair() {
  document.getElementById("welcome").classList.remove("d-block");
  document.getElementById("welcome").classList.add("d-none");
  document.getElementById("botaoEntrar").disabled = false;
  document.getElementById("botaoEntrar").innerHTML = "Entrar";
  document.getElementById("adicionar").classList.remove("d-block");
  document.getElementById("adicionar").classList.add("d-none");
  document.getElementById("negarLogin").innerHTML = "";
  document.getElementById("botaoCadastro").classList.remove("animate__fadeOut");
  document.getElementById("totalizacao").innerHTML = "";

  let linha = "";
  document.getElementById("conteudos").innerHTML = linha;
}

function carregamento() {
  document.getElementById("carregamento").style.display = "block";
}

window.addEventListener("load", (event) => {
  carregamento();
});

document.addEventListener("DOMContentLoaded", (event) => {
  window.setTimeout(() => {
    document.getElementById("carregamento").classList.add("animate__fadeOut");
  }, 2000);
  window.setTimeout(() => {
    document.getElementById("carregamento").style.display = "none";
  }, 3000);
});

function adicionar() {
  let modal = document.getElementById("modal");
  modal.style.display = "block";
  document.getElementById("tituloModal").innerHTML = "Adicionar Tarefa";
  document.getElementById("obrigatorioNumero").innerHTML = "";
  document.getElementById("obrigatorioDesc").innerHTML = "";
  document.getElementById("obrigatorioData").innerHTML = "";
  document.getElementById("obrigatorioStts").innerHTML = "";
  document.getElementById("num").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("data").value = "";
  document.getElementById("stt").value = "";

  slideInDown();
}

function cancelaTarefa() {
  erroNoCadastro();
  slideOutUp();
}

async function salva() {
  let salvarInfo = document.getElementById("salvar");

  let nomeLogin = document.getElementById("nomeLogin").value;
  let usuario = document.getElementById("usuario").value;
  let num = document.getElementById("num").value;
  let descricao = document.getElementById("descricao").value;
  let data = document.getElementById("data").value;
  let stts = document.getElementById("stt").value;

  if (num.length === 0) {
    modal.style.display = "block";
    document.getElementById("obrigatorioNumero").innerHTML =
      "*Campo Obrigatório";
  } else if (descricao.length === 0) {
    modal.style.display = "block";
    document.getElementById("obrigatorioDesc").innerHTML = "*Campo Obrigatório";
  } else if (data.length === 0) {
    modal.style.display = "block";
    document.getElementById("obrigatorioData").innerHTML = "*Campo Obrigatório";
  } else if (stt.value === "") {
    modal.style.display = "block";
    document.getElementById("obrigatorioStts").innerHTML = "*Campo Obrigatório";
  } else {
    tarefa = {
      nomeLogin: nomeLogin,
      usuario: usuario,
      codigo: parseInt(num),
      descri: descricao,
      entrega: data,
      stats: stts,
    };

    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tarefa),
    });

    await imprimeTarefas(nomeLogin);
    tarefaCadastrada();
    slideOutUp();
  }
}

async function imprimeTarefas(nomeLogin) {
  let total = 0;
  let linha = "";
  if (nomeLogin != "") {
    nomeLogin = "/?nomeLogin=" + nomeLogin;
  }

  let response = await fetch(`http://localhost:3000/tasks${nomeLogin}`);
  let tasks = await response.json();
  console.log(tasks);

  tasks.forEach((tarefa) => {
    total++;
    let cor;
    // console.log(tarefa.stats);
    if (tarefa.stats === "Concluída") {
      cor = "verde";
    } else if (tarefa.stats === "Em andamento") {
      cor = "laranja";
    } else {
      cor = "vermelho";
    }

    linha =
      linha +
      `
        <tr id='linha${tarefa.id}'>
            <td id='codigo${tarefa.id}' class='text-break'>${tarefa.codigo}</td>
            <td id='descri${tarefa.id}' class='text-break textoResponsivo'>${tarefa.descri}</td>
            <td id='entrega${tarefa.id}'>${tarefa.entrega}</td>
            <td id='stats${tarefa.id}' class='${cor} teste'>${tarefa.stats}</td>
            <td class = 'linhaFinal' ><span class = 'botaoTabela editar' id='editar${tarefa.id}'><i onclick='edita(${tarefa.id})' class="me-1 fa-solid fa-pen-to-square"></i></span> 
            <span class = 'botaoTabela lixeira'><i id='remove${tarefa.id}' onclick="modalExcluir(${tarefa.id})" class="fa-solid fa-trash-can"></i></span></td>
        </tr>
    `;

    // console.log(linha);
  });

  document.getElementById("conteudos").innerHTML = linha;
  if (total == 1) {
    document.getElementById("totalizacao").innerHTML =
      total + " Tarefa encontrada.";
  } else {
    document.getElementById("totalizacao").innerHTML =
      total + " Tarefas encontradas.";
  }
}

async function edita(idTarefa) {
  slideInDown();

  // console.log(idTarefa);
  modal.style.display = "block";
  let response = await fetch(`http://localhost:3000/tasks/${idTarefa}`);
  let tarefa = await response.json();
  // console.log(tarefa);

  document.getElementById("obrigatorioNumero").innerHTML = "";
  document.getElementById("obrigatorioDesc").innerHTML = "";
  document.getElementById("obrigatorioData").innerHTML = "";
  document.getElementById("obrigatorioStts").innerHTML = "";
  document.getElementById("tituloModal").innerHTML = "Editar tarefa";
  document.getElementById("num").value = tarefa.codigo;
  document.getElementById("descricao").value = tarefa.descri;
  document.getElementById("data").value = tarefa.entrega;
  document.getElementById("stt").value = tarefa.stats;

  document.getElementById("salvar").onclick = function () {
    saveEdit(idTarefa);
  };
}

async function saveEdit(idTarefa) {
  let nomeLogin = document.getElementById("nomeLogin").value;
  let usuario = document.getElementById("usuario").value;
  let num = document.getElementById("num").value;
  let descricao = document.getElementById("descricao").value;
  let data = document.getElementById("data").value;
  let stts = document.getElementById("stt").value;
  //console.log(stts)

  if (num.length === 0) {
    modal.style.display = "block";
    document.getElementById("obrigatorioNumero").innerHTML =
      "*Campo Obrigatório";
  } else if (descricao.length === 0) {
    modal.style.display = "block";
    document.getElementById("obrigatorioDesc").innerHTML = "*Campo Obrigatório";
  } else if (data.length === 0) {
    modal.style.display = "block";
    document.getElementById("obrigatorioData").innerHTML = "*Campo Obrigatório";
  } else if (stt.value === "") {
    modal.style.display = "block";
    document.getElementById("obrigatorioStts").innerHTML = "*Campo Obrigatório";
  } else {
    tarefa = {
      nomeLogin: nomeLogin,
      usuario: usuario,
      codigo: parseInt(num),
      descri: descricao,
      entrega: data,
      stats: stts,
    };

    await fetch(`http://localhost:3000/tasks/${idTarefa}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tarefa),
    });

    document.getElementById("salvar").onclick = function () {
      salva();
    };

    await imprimeTarefas(nomeLogin);
    slideOutUp();
  }
}

function modalExcluir(parametro) {
  modalDelete.style.display = "block";
  deletar = parametro;
}

function cancelarExcluir() {
  modalDelete.style.display = "none";
}

let deletar;
async function excluir() {
  let nomeLogin = document.getElementById("nomeLogin").value;
  modalDelete.style.display = "none";
  await fetch(`http://localhost:3000/tasks/${deletar}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  await imprimeTarefas(nomeLogin);
}

function tarefaCadastrada() {
  let sucesso;
  sucesso = document.getElementById("tarefaSalvo");
  sucesso.innerHTML = "Tarefa Cadastrada!";
  sucesso.classList.add("animate__fadeInUp");
  sucesso.classList.remove("d-none");

  window.setTimeout(() => {
    sucesso.classList.remove("animate_fadeInUp");
    sucesso.classList.add("animate__fadeOutDown");
  }, 1500);

  window.setTimeout(() => {
    sucesso.classList.add("d-none");
    sucesso.classList.remove("animate__fadeOutDown");
  }, 3000);
}

async function proucurarTarefa() {
  let total = 0;
  let nomeLogin = document.getElementById("nomeLogin").value;
  let linha = "";
  var valor = "";
  valor = document.getElementById("textoDeProucura").value;
  var status = "";
  status = document.getElementById("sttsFiltro").value;

  if (valor != "") {
    var espera = await fetch(
      `http://localhost:3000/tasks?q=${valor}&nomeLogin=${nomeLogin}`
    );
    var resposta = await espera.json();
  }
  if (status != "") {
    var espera = await fetch(
      `http://localhost:3000/tasks?q=${status}&nomeLogin=${nomeLogin}`
    );
    var resposta = await espera.json();
  }

  resposta.forEach((tarefa) => {
    total++;
    let cor;
    if (tarefa.stats === "Concluída") {
      cor = "verde";
    } else if (tarefa.stats === "Em andamento") {
      cor = "laranja";
    } else {
      cor = "vermelho";
    }

    linha =
      linha +
      `
        <tr id='linha${tarefa.id}'>
            <td id='codigo${tarefa.id}'>${tarefa.codigo}</td>
            <td id='descri${tarefa.id}' class='text-break textoResponsivo'>${tarefa.descri}</td>
            <td id='entrega${tarefa.id}'>${tarefa.entrega}</td>
            <td id='stats${tarefa.id}' class='${cor} teste'>${tarefa.stats}</td>
            <td class = 'linhaFinal' ><span class = 'botaoTabela editar' id='editar${tarefa.id}'><i onclick='edita(${tarefa.id})' class="me-1 fa-solid fa-pen-to-square"></i></span> 
            <span class = 'botaoTabela lixeira'><i id='remove${tarefa.id}' onclick="modalExcluir(${tarefa.id})" class="fa-solid fa-trash-can"></i></span></td>
        </tr>
    `;
  });

  document.getElementById("conteudos").innerHTML = linha;
  document.getElementById("sttsFiltro").value = "";
  document.getElementById("textoDeProucura").value = "";

  if (total == 1) {
    document.getElementById("totalizacao").innerHTML =
      total + " Tarefa encontrada.";
  } else {
    document.getElementById("totalizacao").innerHTML =
      total + " Tarefas encontradas.";
  }
}

async function numCrescente(variavel, AscDesc) {
  let nomeLogin = document.getElementById("nomeLogin").value;
  let linha = "";
  let espera = await fetch(
    `http://localhost:3000/tasks?_sort=${variavel}&_order=${AscDesc}&nomeLogin=${nomeLogin}`
  );
  let resposta = await espera.json();
  // console.log(resposta)

  resposta.forEach((tarefa) => {
    let cor;
    if (tarefa.stats === "Concluída") {
      cor = "verde";
    } else if (tarefa.stats === "Em andamento") {
      cor = "laranja";
    } else {
      cor = "vermelho";
    }

    linha =
      linha +
      `
        <tr id='linha${tarefa.id}'>
            <td id='codigo${tarefa.id}'>${tarefa.codigo}</td>
            <td id='descri${tarefa.id}'class='text-break textoResponsivo'>${tarefa.descri}</td>
            <td id='entrega${tarefa.id}'>${tarefa.entrega}</td>
            <td id='stats${tarefa.id}' class='${cor} teste'>${tarefa.stats} </td>
            <td class = 'linhaFinal' ><span class = 'botaoTabela editar' id='editar${tarefa.id}'><i onclick='edita(${tarefa.id})' class="me-1 fa-solid fa-pen-to-square"></i></span> 
            <span class = 'botaoTabela lixeira'><i id='remove${tarefa.id}' onclick="modalExcluir(${tarefa.id})" class="fa-solid fa-trash-can"></i></span></td>
        </tr>
    `;
  });

  document.getElementById("conteudos").innerHTML = linha;
}

function erroNoCadastro() {
  let sucesso;
  sucesso = document.getElementById("cadastroCancelado");
  sucesso.innerHTML = "Cadastrado cancelado!";
  sucesso.classList.add("animate__fadeInUp");
  sucesso.classList.remove("d-none");

  window.setTimeout(() => {
    sucesso.classList.remove("animate_fadeInUp");
    sucesso.classList.add("animate__fadeOutDown");
  }, 1200);

  window.setTimeout(() => {
    sucesso.classList.add("d-none");
    sucesso.classList.remove("animate__fadeOutDown");
  }, 2000);
}

function slideInDown() {
  let sucesso;
  sucesso = document.getElementById("conteudoModal");
  sucesso.classList.remove("animate__slideOutUp");
  sucesso.classList.add("animate__slideInDown");
}

function slideOutUp() {
  let sucesso;
  sucesso = document.getElementById("conteudoModal");
  sucesso.classList.remove("animate__slideInDown");
  sucesso.classList.add("animate__slideOutUp");
  window.setTimeout(() => {
    modal.style.display = "none";
  }, 650);
}

function cadastroComSucesso() {
  let sucesso;
  sucesso = document.getElementById("cadastroSalvo");
  sucesso.innerHTML = "Cadastrado com sucesso!";
  sucesso.classList.add("animate__fadeInUp");
  sucesso.classList.remove("d-none");

  window.setTimeout(() => {
    sucesso.classList.remove("animate_fadeInUp");
    sucesso.classList.add("animate__fadeOutDown");
  }, 1500);

  window.setTimeout(() => {
    sucesso.classList.add("d-none");
    sucesso.classList.remove("animate__fadeOutDown");
  }, 3000);
}

function slideRight() {
  let sucesso;
  sucesso = document.getElementById("modalCadastrar");
  sucesso.classList.remove("animate__slideOutRight");
  sucesso.classList.add("animate__slideInRight");
}

function slideLeft() {
  let sucesso;
  sucesso = document.getElementById("modalCadastrar");
  sucesso.classList.remove("animate__slideInRight");
  sucesso.classList.add("animate__slideOutRight");
  window.setTimeout(() => {
    modal.style.display = "none";
  }, 650);
}

function fadeOut() {
  let sucesso;
  sucesso = document.getElementById("botaoCadastro");
  sucesso.classList.add("animate__fadeOut");
}
