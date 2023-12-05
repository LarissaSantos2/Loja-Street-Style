// JavaScript para autocomplete de endereço

const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const numberInput = document.querySelector("#number");
const complementInput = document.querySelector("#complement");
const neighborhoodInput = document.querySelector("#neighborhood");
const cityInput = document.querySelector("#city");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");

const closeButton = document.querySelector("#close-message");

// Validação do Input de CEP
cepInput.addEventListener("keypress", (e) => {
  const onlyNumbers = /[0-9]|\./;
  const key = String.fromCharCode(e.keyCode);

  if (!onlyNumbers.test(key)) {
    e.preventDefault();
    return;
  }
});

// Evento para obter endereço
cepInput.addEventListener("keyup", (e) => {
  const inputValue = e.target.value;

  if (inputValue.length === 8) {
    getAddress(inputValue);
  }
});

// Função para obter endereço da API
const getAddress = async (cep) => {
  toggleLoader();

  cepInput.blur();

  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

  const response = await fetch(apiUrl);

  const data = await response.json();

  // Mostrar erro e resetar formulário
  if (data.erro === true) {
    if (!addressInput.hasAttribute("disabled")) {
      toggleDisabled();
    }

    addressForm.reset();
    toggleLoader();
    toggleMessage("CEP inválido, tente novamente.");
    return;
  }

  // Ativar atributo desativado se o formulário estiver vazio
  if (addressInput.value === "") {
    toggleDisabled();
  }

  addressInput.value = data.logradouro;
  cityInput.value = data.localidade;
  neighborhoodInput.value = data.bairro;
  regionInput.value = data.uf;

  toggleLoader();
};

// Adicionar ou remover atributo desativado
const toggleDisabled = () => {
  if (regionInput.hasAttribute("disabled")) {
    formInputs.forEach((input) => {
      input.removeAttribute("disabled");
    });
  } else {
    formInputs.forEach((input) => {
      input.setAttribute("disabled", "disabled");
    });
  }
};

// Mostrar ou ocultar loader
const toggleLoader = () => {
  const fadeElement = document.querySelector("#fade");
  const loaderElement = document.querySelector("#loader");

  fadeElement.classList.toggle("hide");
  loaderElement.classList.toggle("hide");
};

// Mostrar ou ocultar mensagem
const toggleMessage = (msg) => {
  const fadeElement = document.querySelector("#fade");
  const messageElement = document.querySelector("#message");

  const messageTextElement = document.querySelector("#message p");

  if (msg) {
    messageTextElement.innerText = msg;

    fadeElement.classList.remove("hide");
    messageElement.classList.remove("hide");
  } else {
    fadeElement.classList.add("hide");
    messageElement.classList.add("hide");

    // Remover completamente o elemento de mensagem do DOM
    messageElement.remove();
  }
};

// Fechar modal de mensagem
closeButton.addEventListener("click", () => {
  toggleMessage();

  // Redirecionar para outra página
  window.location.href = "../HTML/cadastro3.html";
});

// Salvar endereço
addressForm.addEventListener("submit", (e) => {
  e.preventDefault();

  toggleLoader();

  setTimeout(() => {
    toggleLoader();

    toggleMessage("Endereço salvo com sucesso!");

    addressForm.reset();

    toggleDisabled();
  }, 1000);
});
