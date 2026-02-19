// ================= SABORES =================
const sabores = {
  salgadas: [
    {
      nome: "Calabresa",
      ingredientes: "Calabresa fatiada, cebola, mussarela, orégano",
    },
    {
      nome: "4 Queijos",
      ingredientes: "Mussarela, parmesão, provolone, gorgonzola",
    },
    {
      nome: "Frango com Catupiry",
      ingredientes: "Frango desfiado, catupiry, mussarela",
    },
    {
      nome: "Portuguesa",
      ingredientes: "Presunto, ovo, cebola, azeitona, mussarela",
    },
    {
      nome: "Marguerita",
      ingredientes: "Mussarela, tomate, manjericão, azeite",
    },
    {
      nome: "Pepperoni",
      ingredientes: "Pepperoni, mussarela, molho de tomate",
    },
    { nome: "Bacon", ingredientes: "Bacon crocante, mussarela, orégano" },
    {
      nome: "Napolitana",
      ingredientes: "Mussarela, tomate, parmesão, orégano",
    },
    { nome: "Atum", ingredientes: "Atum, cebola, azeitona, mussarela" },
    { nome: "Mussarela", ingredientes: "Mussarela, molho de tomate, orégano" },
    { nome: "Palmito", ingredientes: "Palmito, mussarela, azeitona" },
    {
      nome: "Brócolis com Bacon",
      ingredientes: "Brócolis, bacon, alho, mussarela",
    },
    { nome: "Milho", ingredientes: "Milho, mussarela, orégano" },
    {
      nome: "Baiana",
      ingredientes: "Calabresa moída, pimenta, cebola, mussarela",
    },
    {
      nome: "Carne Seca",
      ingredientes: "Carne seca desfiada, cebola, mussarela",
    },
    {
      nome: "Lombo Canadense",
      ingredientes: "Lombo canadense, abacaxi, mussarela",
    },
    {
      nome: "Coração de Frango",
      ingredientes: "Coração de frango, cebola, mussarela",
    },
    {
      nome: "Escarola",
      ingredientes: "Escarola refogada, alho, bacon, mussarela",
    },
    { nome: "Toscana", ingredientes: "Linguiça toscana, cebola, mussarela" },
    { nome: "Alho e Óleo", ingredientes: "Alho frito, azeite, mussarela" },
    {
      nome: "Camarão",
      ingredientes: "Camarão, alho, molho especial, mussarela",
    },
    {
      nome: "Strogonoff de Frango",
      ingredientes: "Frango, molho de strogonoff, mussarela",
    },
    {
      nome: "Strogonoff de Carne",
      ingredientes: "Carne, molho de strogonoff, mussarela",
    },
    {
      nome: "Mexicana",
      ingredientes: "Carne moída, pimenta, milho, mussarela",
    },
    {
      nome: "Vegetariana (+ R$11)",
      ingredientes: "Abobrinha, berinjela, pimentão, mussarela",
    },
    {
      nome: "Caipira (+ R$11)",
      ingredientes: "Frango, milho, catupiry, mussarela",
    },
    {
      nome: "Nordestina (+ R$11)",
      ingredientes: "Carne de sol, cebola roxa, manteiga de garrafa",
    },
    {
      nome: "Picanha (+ R$11)",
      ingredientes: "Picanha fatiada, cebola, mussarela",
    },
  ],

  doces: [
    { nome: "Chocolate", ingredientes: "Chocolate ao leite, mussarela" },
    { nome: "Romeu e Julieta", ingredientes: "Goiabada, mussarela" },
    {
      nome: "Banana com Canela",
      ingredientes: "Banana, açúcar, canela, mussarela",
    },
    { nome: "Doce de Leite", ingredientes: "Doce de leite, mussarela" },
    { nome: "Prestígio", ingredientes: "Chocolate, coco ralado, mussarela" },
    { nome: "Nutella", ingredientes: "Nutella, mussarela" },
    {
      nome: "Morango com Chocolate",
      ingredientes: "Morango, chocolate ao leite, mussarela",
    },
    { nome: "Chocolate Branco ", ingredientes: "Chocolate branco, mussarela" },
    {
      nome: "Oreo (+ R$11)",
      ingredientes: "Chocolate, biscoito Oreo, mussarela",
    },
    {
      nome: "Confete (+ R$11)",
      ingredientes: "Chocolate, confetes coloridos, mussarela",
    },
  ],
};

// ================= ESTADO =================
let escolhidos = [];
let categoriaAtual = "salgadas";
let cart = [];
const cartCount = document.getElementById("cart-count");
const totalWithDelivery = document.getElementById("total-with-delivery");

// ================= ELEMENTOS =================
const listaSabores = document.getElementById("listaSabores");
const resumoSabores = document.getElementById("resumoSabores");
const btnConfirmar = document.getElementById("btnConfirmar");
const contador = document.getElementById("contador");
const modalPizza = document.getElementById("modalPizza");
const toastAdicionado = document.getElementById("toastAdicionado");
const toastConteudo = document.getElementById("toastConteudo");
const FecharToast = document.getElementById("FecharToast");
const cartModal = document.getElementById("cart-modal");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-modal-btn");

const nameInput = document.getElementById("nameInput");
const streetInput = document.getElementById("street");
const numberInput = document.getElementById("number");
const referenceInput = document.getElementById("reference");
const observacoesInput = document.getElementById("observacoes");
const addressWarn = document.getElementById("address-warn");

// ================= MODAL =================
function abrirModal() {
  modalPizza.classList.remove("hidden");
  modalPizza.classList.add("flex");
  trocarCategoria("salgadas");
}

function fecharModal() {
  modalPizza.classList.add("hidden");
  modalPizza.classList.remove("flex");
  escolhidos = [];
  atualizarTudo();
}

btnConfirmar.addEventListener("click", () => {
  if (!pizzaSelecionada || escolhidos.length === 0) return;

cart.push({
  ...pizzaSelecionada,
  sabores: [...escolhidos],
  quantidade: 1,
});

  escolhidos = [];
  atualizarTudo();
  atualizarCarrinho();
  fecharModal();
  mostrarToast();
});

// ================= ABAS =================
function trocarCategoria(tipo) {
  categoriaAtual = tipo;

  document.getElementById("abaSalgadas").className =
    tipo === "salgadas"
      ? "flex-1 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold"
      : "flex-1 py-2 rounded-lg bg-gray-200 text-sm font-semibold";

  document.getElementById("abaDoces").className =
    tipo === "doces"
      ? "flex-1 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold"
      : "flex-1 py-2 rounded-lg bg-gray-200 text-sm font-semibold";

  renderizarSabores();
}

// ================= RENDER =================
sabores[categoriaAtual].forEach((item) => {
  const btn = document.createElement("button");
  btn.dataset.sabor = item.nome;

  btn.className =
    "px-3 py-2 text-sm rounded-lg border flex flex-col items-start hover:bg-red-50 transition";

  btn.innerHTML = `
    <span class="font-medium">🍕 ${item.nome}</span>
    <span class="text-[5px] text-gray-500 leading-tight">${item.ingredientes}</span>
    <span class="ml-auto text-xs hidden">✔</span>
  `;

  btn.onclick = () => adicionarSabor(item.nome);
  listaSabores.appendChild(btn);
});

// ================= RENDER =================
function renderizarSabores() {
  listaSabores.innerHTML = "";

  sabores[categoriaAtual].forEach((item) => {
    const btn = document.createElement("button");
    btn.dataset.sabor = item.nome;

    btn.className =
      "px-3 py-2 text-sm rounded-lg border flex flex-col items-start relative hover:bg-red-50 transition";

    btn.innerHTML = `
      <span class="font-medium">🍕 ${item.nome}</span>
    <span class="text-[11px] text-gray-500 leading-tight">${item.ingredientes}</span>
<span class="absolute top-2 right-2 text-xs hidden">✔</span>
    `;

    btn.onclick = () => adicionarSabor(item.nome);
    listaSabores.appendChild(btn);
  });

  atualizarBotoes();
}

// ================= LÓGICA =================
function adicionarSabor(sabor) {
  const index = escolhidos.indexOf(sabor);

  // remove se já estiver selecionado
  if (index !== -1) {
    escolhidos.splice(index, 1);
    atualizarTudo();
    return;
  }

  // adiciona se ainda tiver espaço
  if (escolhidos.length >= 3) return;

  escolhidos.push(sabor);
  atualizarTudo();
}

function atualizarTudo() {
  atualizarResumo();
  atualizarBotoes();
  atualizarIndicador();
}

// ================= RESUMO =================
function atualizarResumo() {
  resumoSabores.innerHTML = "";
  contador.innerText = escolhidos.length;

  escolhidos.forEach((sabor) => {
    const li = document.createElement("li");
    li.innerText = sabor;
    resumoSabores.appendChild(li);
  });

  btnConfirmar.disabled = escolhidos.length === 0;
}

// ================= VISUAL BOTÕES =================
function atualizarBotoes() {
  document.querySelectorAll("#listaSabores button").forEach((btn) => {
    const sabor = btn.dataset.sabor;
    const selecionado = escolhidos.includes(sabor);
    const badge = btn.querySelector("span:last-child");

    btn.classList.remove("bg-red-100", "border-red-500", "opacity-40");

    if (selecionado) {
      btn.classList.add("bg-red-100", "border-red-500");
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }

    // desabilita outros ao chegar em 3
    if (escolhidos.length >= 3 && !selecionado) {
      btn.disabled = true;
      btn.classList.add("opacity-40");
    } else {
      btn.disabled = false;
    }
  });
}

// ================= INDICADOR =================
function atualizarIndicador() {
  contador.innerHTML =
    "🍕".repeat(escolhidos.length) + "▫️".repeat(3 - escolhidos.length);
}

//  ================= Toast =================
function mostrarToast() {
  toastAdicionado.classList.remove("hidden");

  setTimeout(() => {
    toastAdicionado.classList.add("hidden");
  }, 4000);
}

function fecharToast() {
  toastAdicionado.classList.add("hidden");
}

btnConfirmar.addEventListener("click", mostrarToast);
FecharToast.addEventListener("click", fecharToast);

//  ================= MODAL CART =================
function abrirCart() {
  cartModal.classList.remove("hidden");
  cartModal.classList.add("flex");
}

function fecharCart() {
  cartModal.classList.add("hidden");
  cartModal.classList.remove("flex");
}

cartBtn.addEventListener("click", abrirCart);

closeCart.addEventListener("click", fecharCart);

let pizzaSelecionada = null;

document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = {
      nome: btn.dataset.name,
      preco: Number(btn.dataset.price),
      img: btn.dataset.img,
      sabores: [],
    };

    //  BEBIDA → direto no carrinho
    if (btn.dataset.type === "bebida") {
      cart.push(item);
      atualizarCarrinho();
      mostrarToast();
      return;
    }

    if (btn.dataset.type === "produto") {
      const itemExistente = cart.find((p) => p.nome === item.nome);

      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        cart.push({
          ...item,
          quantidade: 1,
        });
      }

      atualizarCarrinho();
      mostrarToast();
      return;
    }

    // 🍕 PIZZA → abre modal
    pizzaSelecionada = item;
    abrirModal();
  });
});

function atualizarCarrinho() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const quantidade = item.quantidade || 1;

let adicionalSabores = 0;

item.sabores.forEach((sabor) => {
  const match = sabor.match(/\+ R\$(\d+)/);
  if (match) {
    adicionalSabores += parseInt(match[1]);
  }
});

    const precoFinal = (item.preco + adicionalSabores) * quantidade;

    total += precoFinal;

    cartItems.innerHTML += `
      <div class="flex gap-3 items-center border-b pb-3">

        <img 
          src="${item.img}" 
          alt="${item.nome}"
          class="w-14 h-14 min-w-[56px] rounded-lg object-cover"
        />

        <div class="flex-1">
          <p class="font-bold">${item.nome}</p>
          
          ${
            item.sabores.length > 0
              ? `
            <p class="text-sm text-gray-500">
              Sabores: ${item.sabores.join(", ")}
            </p>
          `
              : ""
          }

          <p class="font-medium mt-1">
R$ ${precoFinal.toFixed(2)}          </p>
        </div>

        ${
          item.quantidade
            ? `
          <div class="flex items-center gap-2">
            <button onclick="diminuirQtd(${index})"
              class="bg-gray-300 px-2 rounded">-</button>

            <span>${quantidade}</span>

            <button onclick="aumentarQtd(${index})"
              class="bg-gray-300 px-2 rounded">+</button>
          </div>
        `
            : `
          <button onclick="removerItem(${index})" 
            class="text-red-500 text-lg">
            ✕
          </button>
        `
        }

      </div>
    `;
  });

  cartCount.textContent = cart.reduce(
    (acc, item) => acc + (item.quantidade || 1),
    0,
  );
  cartTotal.textContent = `R$ ${total.toFixed(2)}`;
  totalWithDelivery.textContent = `R$ ${(total + 6).toFixed(2)}`;
}

function removerItem(index) {
  cart.splice(index, 1);
  atualizarCarrinho();
}

cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    fecharCart();
  }
});

modalPizza.addEventListener("click", (e) => {
  if (e.target === modalPizza) {
    fecharModal();
  }
});

const menuPizzas = document.getElementById("menuPizzas");
const menuLanches = document.getElementById("menuLanches");
const menuCombos = document.getElementById("menuCombos");
const menuPasteis = document.getElementById("menuPasteis");
const menuDogs = document.getElementById("menuDogs");
const menuBebidas = document.getElementById("menuBebidas");

const lanchesBtn = document.getElementById("LanchesBtn");
const CombosBtn = document.getElementById("CombosBtn");
const PasteisBtn = document.getElementById("PasteisBtn");
const DogsBtn = document.getElementById("DogsBtn");
const BebidasBtn = document.getElementById("BebidasBtn");
const PizzasBtn = document.getElementById("PizzasBtn");

function esconderTodosMenus() {
  menuPizzas.classList.add("hidden");
  menuLanches.classList.add("hidden");
  menuCombos.classList.add("hidden");
  menuPasteis.classList.add("hidden");
  menuDogs.classList.add("hidden");
  menuBebidas.classList.add("hidden");
}
PizzasBtn.addEventListener("click", () => {
  esconderTodosMenus();
  menuPizzas.classList.remove("hidden");
  ativarBotao(PizzasBtn);
});

lanchesBtn.addEventListener("click", () => {
  esconderTodosMenus();
  menuLanches.classList.remove("hidden");
  ativarBotao(lanchesBtn);
});

CombosBtn.addEventListener("click", () => {
  esconderTodosMenus();
  menuCombos.classList.remove("hidden");
  ativarBotao(CombosBtn);
});

PasteisBtn.addEventListener("click", () => {
  esconderTodosMenus();
  menuPasteis.classList.remove("hidden");
  ativarBotao(PasteisBtn);
});

DogsBtn.addEventListener("click", () => {
  esconderTodosMenus();
  menuDogs.classList.remove("hidden");
  ativarBotao(DogsBtn);
});

BebidasBtn.addEventListener("click", () => {
  esconderTodosMenus();
  menuBebidas.classList.remove("hidden");
  ativarBotao(BebidasBtn);
});
ativarBotao(PizzasBtn);

// ================= PAGAMENTO =================
const changeInput = document.getElementById("change");

const paymentInputs = document.querySelectorAll("input[name='payment']");

paymentInputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.value === "Dinheiro") {
      changeInput.classList.remove("hidden");
    } else {
      changeInput.classList.add("hidden");
      changeInput.value = "";
    }
  });
});

///CHECKOUT

// VALIDAÇÃO ENDEREÇO

function finalizarPedido() {
  // ================= VALIDAÇÃO PAGAMENTO =================
  const pagamentoSelecionado = document.querySelector(
    "input[name='payment']:checked",
  );

  if (!pagamentoSelecionado) {
    pay.classList.add("border", "border-red-500", "p-3", "rounded-lg");
    return;
  } else {
    pay.classList.remove("border-red-500");
  }

  // ================= VALIDAÇÃO TROCO =================
  if (pagamentoSelecionado.value === "Dinheiro") {
    if (changeInput.value.trim() === "") {
      changeInput.classList.remove("hidden");
      changeInput.classList.add("border-red-500");
      changeInput.focus();
      return;
    } else {
      changeInput.classList.remove("border-red-500");
    }
  }

  // ================= CARRINHO =================
  if (cart.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  // ================= VALIDAÇÕES  =================
  if (streetInput.value.trim() === "" || numberInput.value.trim() === "") {
    addressWarn.classList.remove("hidden");

    if (streetInput.value.trim() === "") {
      streetInput.classList.add("border-red-500");
    }

    if (numberInput.value.trim() === "") {
      numberInput.classList.add("border-red-500");
    }

    if (nameInput.value.trim() === "") {
      nameInput.classList.add("border-red-500");
    }

    if (pay.value.trim() === "") {
      pay.classList.add("border-red-500");
    }
    if (!pagamentoSelecionado) {
      payDiv.classList.add("border", "border-red-500", "p-3", "rounded-lg");
      return; // BLOQUEIA envio
    } else {
      payDiv.classList.remove("border-red-500");
    }

    return;
  }

  //PAGAMENTO

  if (cart.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  let total = 0;

  const itensMensagem = cart
    .map((item) => {
      const quantidade = item.quantidade || 1;

let adicionalSabores = 0;

item.sabores.forEach((sabor) => {
  const match = sabor.match(/\+ R\$(\d+)/);
  if (match) {
    adicionalSabores += parseInt(match[1]);
  }
});

      const precoFinal = (item.preco + adicionalSabores) * quantidade;

      total += precoFinal;

      return `• ${item.nome}
Qtd: ${quantidade}
Sabores: ${item.sabores.length ? item.sabores.join(", ") : "—"}
R$ ${precoFinal.toFixed(2)}
`;
    })
    .join("\n");

  const totalComEntrega = total + 6;

  // PAGAMENTO

  const pagamento = pagamentoSelecionado
    ? pagamentoSelecionado.value
    : "Não informado";

  const troco =
    pagamento === "Dinheiro" && changeInput.value
      ? `Troco para: R$ ${changeInput.value}`
      : "";

  const mensagem = encodeURIComponent(
    `Nome: ${nameInput.value}

Pedido:

${itensMensagem}

Endereço: ${streetInput.value}, Nº ${numberInput.value}
${referenceInput.value ? "Referência: " + referenceInput.value : ""}

Pagamento: ${pagamento}
${troco}

Taxa de entrega: R$ 6,00
Total com entrega: R$ ${totalComEntrega.toFixed(2)}


Observações: ${observacoesInput.value || "—"}`,
  );

  window.open(`https://wa.me/5541999316134?text=${mensagem}`, "_blank");

}

function checkRestaurantOpen() {
  const hour = new Date().getHours();
  return hour >= 8 && hour < 22;
}

const spanItem = document.getElementById("date-span");

spanItem.classList.add(checkRestaurantOpen() ? "bg-green-600" : "bg-red-500");

[nameInput, streetInput, numberInput].forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      input.classList.remove("border-red-500");
    }
  });
});

paymentInputs.forEach((input) => {
  input.addEventListener("change", () => {
    pay.classList.remove("border-red-500");
  });
});

changeInput.addEventListener("input", () => {
  if (changeInput.value.trim() !== "") {
    changeInput.classList.remove("border-red-500");
  }
});

function ativarBotao(botaoAtivo) {
  const botoes = [
    PizzasBtn,
    lanchesBtn,
    CombosBtn,
    PasteisBtn,
    DogsBtn,
    BebidasBtn,
  ];

  botoes.forEach((btn) => {
    btn.classList.remove("bg-gray-700", "text-white");
  });

  botaoAtivo.classList.add("bg-gray-700", "text-white");
}

function aumentarQtd(index) {
  cart[index].quantidade += 1;
  atualizarCarrinho();
}

function diminuirQtd(index) {
  cart[index].quantidade -= 1;

  if (cart[index].quantidade <= 0) {
    cart.splice(index, 1);
  }

  atualizarCarrinho();
}