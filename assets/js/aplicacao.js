//json-server --watch db.json
let linha;
let tarefa;
let tarefas;

function modalCadastro() {
  modalCadastrar.style.display = "block";
  document.getElementById("obrigatorio1").innerHTML = "";
  document.getElementById("obrigatorio2").innerHTML = "";
  document.getElementById("obrigatorio3").innerHTML = "";
  document.getElementById("obrigatorio4").innerHTML = "";
  document.getElementById("obrigatorio5").innerHTML = "";
  document.getElementById("nome").value = "";
  document.getElementById("Login").value = "";
  document.getElementById("email").value = "";
  document.getElementById("senhaCadastro").value = "";
  document.getElementById("confirmacao").value = "";
  slideRight()
}

async function cadastrar() {

  let nome = document.getElementById("nome").value;
  let login = document.getElementById("Login").value;
  let emails = document.getElementById("email").value;
  let password = document.getElementById("senhaCadastro").value;
  let confirm = document.getElementById("confirmacao").value;

  if (nome.length === 0) {
    modalCadastrar.style.display = "block";
    obr = "<div>*Campo obrigatório</div>";
    document.getElementById("obrigatorio1").innerHTML = obr;
  } else if (login.length === 0) {
    modalCadastrar.style.display = "block";
    obr = "<div>*Campo obrigatório</div>";
    document.getElementById("obrigatorio2").innerHTML = obr;
  } else if (emails.length === 0) {
    modalCadastrar.style.display = "block";
    obr = "<div>*Campo obrigatório</div>";
    document.getElementById("obrigatorio3").innerHTML = obr;
  } else if (senhaCadastro.value === "") {
    modalCadastrar.style.display = "block";
    obr = "<div>*Campo obrigatório</div>";
    document.getElementById("obrigatorio4").innerHTML = obr;
  } else if (confirmacao.value === ""){
    modalCadastrar.style.display = "block";
    obr = "<div>*Campo obrigatório</div>";
    document.getElementById("obrigatorio5").innerHTML = obr;
  }else {
    let dados = await verificaDados("users", `?login=${login}`)
    console.log(dados)
    if(dados.length > 0){
      document.getElementById("cadastrado1").innerHTML = "Nome de usuário já cadastrado"
    }else{
      user = {
        nome: nome,
        login: login,
        emails: emails,
        password: password,
        confirmacao: confirm,
      };  
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      slideLeft()
    }    
  }

}

async function verificaDados(endpoint, param_busca){
  let dados = await fetch("http://localhost:3000/" + endpoint + param_busca)
  let resposta = await dados.json()
  console.log(resposta)
  return resposta
}

function cancelaCadastro(){
  modalCadastrar.style.display = "block";
  slideLeft()
}

function modalEntra() {
  modalEntrar.style.display = "block";
}

async function entrar() {
  let nomeLogin = document.getElementById("nomeLogin").value
  let senhaLogin = document.getElementById("senha").value

  let espera = await verificaDados("users", `?login=${nomeLogin}&password=${senhaLogin}`)
  console.log(espera)

  if(espera.length > 0){
    document.getElementById("welcome").innerHTML = `Seja Bem vindo ${espera[0].nome}`;
    modalEntrar.style.display = "none";
    document.getElementById("usuario").value = espera[0].nome
  }else {
    document.getElementById("negarLogin").innerHTML =
      "Login ou senha Inválidos";
  }

  document.getElementById("botaoEntrar").classList.add("d-none")
  document.getElementById("botaoSair").classList.remove("d-none")
  document.getElementById("welcome").classList.remove("d-none")
  document.getElementById("welcome").classList.add("d-block")
}

function botaoSair() {
  document.getElementById("botaoSair").classList.add("d-none")
  document.getElementById("botaoEntrar").classList.remove("d-none")
  document.getElementById("botaoEntrar").classList.add("d-block")
  document.getElementById("welcome").classList.remove("d-block")
  document.getElementById("welcome").classList.add("d-none")

  // let linha = ""

  // document.getElementById("conteudos").innerHTML = linha;
}

function carregamento() {
  document.getElementById("carregamento").style.display = "block";
  // fadeLoad()
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
  document.getElementById("obrigatorio6").innerHTML = "";
  document.getElementById("obrigatorio7").innerHTML = "";
  document.getElementById("obrigatorio8").innerHTML = "";
  document.getElementById("obrigatorio9").innerHTML = "";
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

  let usuario = document.getElementById("usuario").value
  let num = document.getElementById("num").value;
  let descricao = document.getElementById("descricao").value;
  let data = document.getElementById("data").value;
  let stts = document.getElementById("stt").value;
  

  if (num.length === 0) {
    modal.style.display = "block";
    obr = "<div>*Campo obrigatório</div>";
    document.getElementById("obrigatorio6").innerHTML = obr;
  } else if (descricao.length === 0) {
    modal.style.display = "block";
    obr = "<div>*Campo obrigatório</div>";
    document.getElementById("obrigatorio7").innerHTML = obr;
  } else if (data.length === 0) {
    modal.style.display = "block";
    obr = "<div>*Campo obrigatório</div>";
    document.getElementById("obrigatorio8").innerHTML = obr;
  } else if (stt.value === "") {
    modal.style.display = "block";
    obr = "<div>*Campo obrigatório</div>";
    document.getElementById("obrigatorio9").innerHTML = obr;
  } else {
    tarefa = {
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

    await imprimeTarefas();
    tarefaCadastrada();
    slideOutUp();
  }
}

async function imprimeTarefas() {
  let linha = "";
  let response = await fetch(" http://localhost:3000/tasks");
  let tasks = await response.json();

  tasks.forEach((tarefa) => {
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
            <td id='codigo${tarefa.id}'>${tarefa.codigo}</td>
            <td id='descri${tarefa.id}'>${tarefa.descri}</td>
            <td id='entrega${tarefa.id}'>${tarefa.entrega}</td>
            <td id='stats${tarefa.id}' class='${cor} teste'>${tarefa.stats}</td>
            <td class = 'linhaFinal' ><span class = 'editar' id='editar${tarefa.id}'><button onclick='edita(${tarefa.id})'><img src=assets/imgs/editar.png></button></span> 
            <span class = 'lixeira'><button id='remove${tarefa.id}' onclick="modalExcluir(${tarefa.id})"> <img src=assets/imgs/excluir.png></button></span></td>
        </tr>
    `;

    //console.log(linha);
  });

  document.getElementById("conteudos").innerHTML = linha;
}

imprimeTarefas();

async function edita(idTarefa) {
  slideInDown();

  console.log(idTarefa);
  modal.style.display = "block";
  let response = await fetch(`http://localhost:3000/tasks/${idTarefa}`);
  let tarefa = await response.json();
  console.log(tarefa);

  document.getElementById("num").value = tarefa.codigo;
  document.getElementById("descricao").value = tarefa.descri;
  document.getElementById("data").value = tarefa.entrega;
  document.getElementById("stt").value = tarefa.stats;

  document.getElementById("salvar").onclick = function () {
    saveEdit(idTarefa);
  };
}

async function saveEdit(idTarefa) {
  let num = document.getElementById("num").value;
  let descricao = document.getElementById("descricao").value;
  let data = document.getElementById("data").value;
  let stts = document.getElementById("stt").value;
  //console.log(stts)

  if (num.length === 0) {
    modal.style.display = "block";
    obr = "<div>*Campo obrigatório</div>";
    document.getElementById("obrigatorio1").innerHTML = obr;
  } else if (descricao.length === 0) {
    modal.style.display = "block";
    obr = "<div>*Campo obrigatório</div>";
    document.getElementById("obrigatorio2").innerHTML = obr;
  } else if (data.length === 0) {
    modal.style.display = "block";
    obr = "<div>*Campo obrigatório</div>";
    document.getElementById("obrigatorio3").innerHTML = obr;
  } else if (stt.value === "") {
    modal.style.display = "block";
    obr = "<div>*Campo obrigatório</div>";
    document.getElementById("obrigatorio4").innerHTML = obr;
  } else {
    tarefa = {
      codigo: num,
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

    await imprimeTarefas();
    slideOutUp();
  }
}

let deletar;

function modalExcluir(parametro){
  modalDelete.style.display = "block"
  deletar = parametro
}

function cancelarExcluir(){
  modalDelete.style.display = "none"
}

async function excluir() {
  modalDelete.style.display = "none"
  await fetch(`http://localhost:3000/tasks/${deletar}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  await imprimeTarefas();
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

async function proucurarTarefa(){
  let linha = ""
  var valor = ""
  valor = document.getElementById("textoDeProucura").value
  var status = ""
  status = document.getElementById("sttsFiltro").value
  
  if(valor != ""){
    var espera = await fetch(`http://localhost:3000/tasks?q=${valor}`)
    var resposta = await espera.json()
  }if(status != ""){
    var espera = await fetch(`http://localhost:3000/tasks?q=${status}`)
    var resposta = await espera.json()
  }
 
  resposta.forEach((tarefa) =>{
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
            <td id='descri${tarefa.id}'>${tarefa.descri}</td>
            <td id='entrega${tarefa.id}'>${tarefa.entrega}</td>
            <td id='stats${tarefa.id}' class='${cor} teste'>${tarefa.stats}</td>
            <td class = 'linhaFinal' ><span class = 'editar' id='editar${tarefa.id}'><button onclick='edita(${tarefa.id})'><img src=assets/imgs/editar.png></button></span>
            <span class = 'lixeira'><button id='remove${tarefa.id}' onclick="excluir(${tarefa.id})"> <img src=assets/imgs/excluir.png></button></span></td>
        </tr>
    `;
  });

  document.getElementById("conteudos").innerHTML = linha;
  document.getElementById("sttsFiltro").value = ""

}

async function numCrescente(param1, param2){
  document.getElementById("numAsc")
  let linha = ""
  let espera = await fetch(`http://localhost:3000/tasks?_sort=${param1}&_order=${param2}`)
  let resposta = await espera.json()  
  console.log(resposta)
  
  resposta.forEach((tarefa) =>{
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
            <td id='descri${tarefa.id}'>${tarefa.descri}</td>
            <td id='entrega${tarefa.id}'>${tarefa.entrega}</td>
            <td id='stats${tarefa.id}' class='${cor} teste'>${tarefa.stats}</td>
            <td class = 'linhaFinal' ><span class = 'editar' id='editar${tarefa.id}'><button onclick='edita(${tarefa.id})'><img src=assets/imgs/editar.png></button></span>
            <span class = 'lixeira'><button id='remove${tarefa.id}' onclick="excluir(${tarefa.id})"> <img src=assets/imgs/excluir.png></button></span></td>
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

function slideRight(){
  let sucesso;
  sucesso = document.getElementById("modalCadastrar");
  sucesso.classList.remove("animate__slideOutRight");
  sucesso.classList.add("animate__slideInRight");
}

function slideLeft(){
  let sucesso;
  sucesso = document.getElementById("modalCadastrar");
  sucesso.classList.remove("animate__slideInRight");
  sucesso.classList.add("animate__slideOutRight");
  window.setTimeout(() => {
    modal.style.display = "none";
  }, 650);
}

