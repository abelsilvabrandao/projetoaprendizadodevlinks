function toggleMode() {
  const html = document.documentElement
  html.classList.toggle("light")
  // pegar a tag img//
  const img = document.querySelector("#profile img")
  // substituir a imagem//
  if (html.classList.contains("light")) {
    //se tiver light mod adicionar a imagem ligth
    img.setAttribute("src", "./assets/avatar-memeu-light.png")
    //se tiver sem light mod mantem a imagem
  } else {
    img.setAttribute("src", "./assets/avatar-memeu.png")
  }
}

function openForm() {
  var modal = document.getElementById("form-modal")
  modal.style.display = "block"
}

function closeForm() {
  var modal = document.getElementById("form-modal")
  modal.style.display = "none"
}

// Função para formatar o telefone
function formatarTelefone(telefone) {
  // Remove todos os caracteres que não são dígitos
  telefone = telefone.replace(/\D/g, "")

  // Limita o telefone a 11 caracteres (incluindo o formato de telefone)
  telefone = telefone.slice(0, 11)

  // Formatação do telefone: (xx) xxxxx-xxxx
  return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
}

// Adiciona um ouvinte de evento de entrada ao campo de telefone
document
  .getElementById("contactPhone")
  .addEventListener("input", function (event) {
    // Obtém o valor atual do campo de telefone
    let telefone = event.target.value

    // Formata o telefone
    telefone = formatarTelefone(telefone)

    // Define o valor formatado de volta no campo de telefone
    event.target.value = telefone
  })

// Obter o elemento <span> pelo ID
var spanAno = document.getElementById("ano-atual")

// Obter o ano atual
var anoAtual = new Date().getFullYear()

// Atualizar o conteúdo do <span> com o ano atual
spanAno.textContent = anoAtual

// Obtenha o elemento textarea
const textarea = document.getElementById("eventDescription")

// Adicione um ouvinte de evento de entrada ao textarea
textarea.addEventListener("input", function (event) {
  const maxLength = 2000 // Limite máximo de caracteres
  const currentLength = event.target.value.length // Comprimento atual do texto

  if (currentLength === 1000) {
    alert(
      "Você atingiu 1000 caracteres. Continue digitando ou clique em OK para continuar."
    )
  } else if (currentLength === maxLength) {
    alert(
      "Você atingiu o limite máximo de 2000 caracteres. Não é possível adicionar mais texto."
    )
  }
})

// Função para enviar o formulário
function enviarFormulario() {
  // Verifica se todos os campos do formulário estão preenchidos
  var nomeEvento = document.getElementById("eventName").value
  var enderecoEvento = document.getElementById("eventAddress").value
  var telefoneContato = document.getElementById("contactPhone").value
  var emailContato = document.getElementById("contactEmail").value
  var descricaoEvento = document.getElementById("eventDescription").value

  if (
    nomeEvento &&
    enderecoEvento &&
    telefoneContato &&
    emailContato &&
    descricaoEvento
  ) {
    // Envia os dados do formulário para o arquivo PHP
    fetch("send_email.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName: nomeEvento,
        eventAddress: enderecoEvento,
        contactPhone: telefoneContato,
        contactEmail: emailContato,
        eventDescription: descricaoEvento,
      }),
    })
      .then(function (response) {
        // Verifica se a resposta da requisição está OK
        if (response.ok) {
          // Exibe o alerta de sucesso
          alert(
            "Agradecemos o seu contato! Retornaremos o contato o mais breve possível. Memeu Ramos"
          )

          // Limpa todos os campos do formulário após o envio
          document.getElementById("eventName").value = ""
          document.getElementById("eventAddress").value = ""
          document.getElementById("contactPhone").value = ""
          document.getElementById("contactEmail").value = ""
          document.getElementById("eventDescription").value = ""
        } else {
          // Se a resposta não estiver OK, exibe um alerta de erro
          alert("Ocorreu um erro ao enviar o formulário. Página em manutenção.")
        }
      })
      .catch(function (error) {
        // Se houver um erro de conexão, exibe um alerta de erro
        alert("Página em manutenção... Solicite o orçamento via Whatsapp.")
      })
  } else {
    // Caso algum campo esteja vazio, exibe um alerta solicitando que o usuário preencha todos os campos
    alert("Por favor, preencha todos os campos do formulário antes de enviar.")
  }
}
