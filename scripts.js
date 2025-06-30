document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCadastro");

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const cep = document.getElementById("cep");
    const logradouro = document.getElementById("logradouro");
    const bairro = document.getElementById("bairro");
    const cidade = document.getElementById("cidade");
    const estado = document.getElementById("estado");
    const numero = document.getElementById('numero');

    const dadosSalvos = JSON.parse(localStorage.getItem("formulario"));
    if (dadosSalvos) {
        nome.value = dadosSalvos.nome || "";
        email.value = dadosSalvos.email || "";
        cep.value = dadosSalvos.cep || "";
        logradouro.value = dadosSalvos.logradouro || "";
        bairro.value = dadosSalvos.bairro || "";
        cidade.value = dadosSalvos.cidade || "";
        estado.value = dadosSalvos.estado || "";
        numero.value = dadosSalvos.numero || "";
    }

    cep.addEventListener("blur", async () => {
        const cepVal = cep.value.trim();
        if (cepVal.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepVal}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    logradouro.value = data.logradouro;
                    bairro.value = data.bairro;
                    cidade.value = data.localidade;
                    estado.value = data.uf;
                } else {
                    alert("CEP não encontrado!");
                }
            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
                alert("Erro ao buscar o endereço.");
            }
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const dados = {
            nome: nome.value,
            email: email.value,
            cep: cep.value,
            logradouro: logradouro.value,
            bairro: bairro.value,
            cidade: cidade.value,
            estado: estado.value,
            numero: numero.value,
        };

        localStorage.setItem("formulario", JSON.stringify(dados));
        alert("Dados salvos com sucesso!");
    });
});