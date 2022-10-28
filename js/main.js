const form = document.querySelector("#novoItem")
const lista = document.querySelector("#lista")
const itens = JSON.parse(localStorage.getItem("listaViagem")) ||  []

const carregarItens = (itens) =>{
    itens.forEach(item => {
        criarElemento(item)
    });
}
     
form.addEventListener("submit", (evento) => {
    evento.preventDefault()
    
    const nome = evento.target.elements["nome"]
    const quantidade = evento.target.elements["quantidade"]
    
    const item = {
        "nome": nome.value, 
        "quantidade": quantidade.value
    }

    let existeItem = itens.find(elemento => elemento.nome == item.nome)

    if (existeItem) {
        atualizarElemento(item)
        atualizarItem(item)
    } else {
        criarElemento(item)
        gravarItem(item)
    }

    nome.value = ""
    quantidade.value = ""
})

const gravarItem = (item) => {
    itens.push(item)
    localStorage.setItem("listaViagem", JSON.stringify(itens))
}

const atualizarItem = (item) => {
    itens[itens.findIndex(elemento => elemento.nome == item.nome)] = item
    localStorage.setItem("listaViagem", JSON.stringify(itens))
}

const excluirItem = (item) => {
    itens.splice(itens.findIndex(elemento => elemento.nome === item), 1)
    localStorage.setItem("listaViagem", JSON.stringify(itens))
}

const atualizarElemento = (item) => {
    elemento = document.querySelector("[data-id='"+item.nome+"']")
    elemento.innerHTML = item.quantidade
}

const excluirElemento = (item) => {
    item.remove()
}

const criarElemento = (item) => {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item", "teste")

    const idItem = document.createElement("strong")
    idItem.innerHTML = item.quantidade
    idItem.dataset.id = item.nome

    novoItem.appendChild(idItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(criarBotaoExcluir(item))
    lista.appendChild(novoItem)
}

const criarBotaoExcluir = (item) => {
    const botaoExcluir = document.createElement("button")
    botaoExcluir.innerText = "X"
    botaoExcluir.addEventListener("click", function() {
        excluirElemento(this.parentNode)
        excluirItem(item.nome)
    })
    return botaoExcluir
}

carregarItens(itens)