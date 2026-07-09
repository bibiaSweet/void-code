const personagens = [
    { id: "L01", nome: "Ana Tomia", classe: "Guerreiro" },
    { id: "L02", nome: "Beto Neira", classe: "Criador" },
    { id: "L03", nome: "Sara Cura", classe: "Mago" },
    { id: "L04", nome: "Kowalski", classe: "Estrategista" },
    { id: "L05", nome: "Armando Barraco", classe: "Bárbaro" },
    { id: "L06", nome: "Caio Rolando da Rocha", classe: "Monge" },
    { id: "L07", nome: "Jacinto Dores", classe: "Curandeiro" },
    { id: "L08", nome: "Simas Turbo", classe: "Mecânico" },
    { id: "L09", nome: "Rolando Ler o", classe: "Ilusionista" },
    { id: "L10", nome: "Kowalski", classe: "Atirador" } 
];

const lista = document.getElementById("lista");
const seletor = document.getElementById("seletor");
const resultado = document.getElementById("resultado");

function atualizarTela() {
    lista.innerHTML = "";   
    seletor.innerHTML = ""; 
    
    personagens.forEach((personagem, i) => {
        const celula = document.createElement("div");
        celula.className = "celula";
        celula.id = "item-" + i;
        
        celula.innerHTML = `
            ${personagem.nome} <br>
            <small>Índice: ${i} | ID: ${personagem.id}</small> <br>
            <button onclick="removerPersonagem(${i})">X Remover</button>
        `;
        lista.appendChild(celula);

        let opcaoExiste = Array.from(seletor.options).some(opt => opt.value === personagem.nome);
        if (!opcaoExiste) {
            const opt = document.createElement("option");
            opt.value = personagem.nome;
            opt.textContent = personagem.nome;
            seletor.appendChild(opt);
        }
    });
}

function removerPersonagem(indice) {
    const removido = personagens.splice(indice, 1);
    resultado.textContent = `Removido: ${removido[0].nome}`;
    atualizarTela();
}

function inverterLista() {
    personagens.reverse();
    resultado.textContent = "Ordem invertida!";
    atualizarTela();
}

function limparDestaques() {
    document.querySelectorAll(".celula").forEach(celula => {
        celula.classList.remove("destaque");
    });
}

function buscarPorSelect() {
    limparDestaques();
    const nomeEscolhido = seletor.value;
    destacarPorNome(nomeEscolhido);
}

function buscarPorIndice() {
    limparDestaques();
    const indice = parseInt(document.getElementById("input-indice").value);
    
    if (indice >= 0 && indice < personagens.length) {
        document.getElementById("item-" + indice).classList.add("destaque");
        resultado.textContent = `Encontrado no índice ${indice}: ${personagens[indice].nome}`;
    } else {
        resultado.textContent = "Índice não existe.";
    }
}

function buscarPorNome() {
    limparDestaques();
    const nomeDigitado = document.getElementById("input-nome").value;
    destacarPorNome(nomeDigitado);
}

function destacarPorNome(nomeBusca) {
    let encontrados = [];
    personagens.forEach((personagem, i) => {
        if (personagem.nome.toLowerCase() === nomeBusca.toLowerCase()) {
            document.getElementById("item-" + i).classList.add("destaque");
            encontrados.push(i);
        }
    });

    if (encontrados.length > 0) {
        resultado.textContent = `Encontrado nos índices: ${encontrados.join(", ")}`;
    } else {
        resultado.textContent = "Nome não encontrado.";
    }
}

function filtrarPersonagens() {
    limparDestaques();
    const texto = document.getElementById("input-filtro").value.toLowerCase();
    
    if (texto.trim() === "") {
        resultado.textContent = "Digite algo para filtrar.";
        return;
    }

    let contador = 0;
    personagens.forEach((personagem, i) => {
        if (personagem.nome.toLowerCase().includes(texto)) {
            document.getElementById("item-" + i).classList.add("destaque");
            contador++;
        }
    });

    if (contador > 0) {
        resultado.textContent = `Foram encontrados ${contador} resultados.`;
    } else {
        resultado.textContent = "Nenhum resultado.";
    }
}

atualizarTela();