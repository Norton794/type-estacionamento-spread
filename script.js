"use strict";
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function add(veiculo, salvo) {
            var _a;
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${veiculo.nome}</td>
        <td>${veiculo.placa}</td>
        <td>${veiculo.entrada}</td>
        <td><a class="delete" data-placa="${veiculo.placa}">X</a></td>
        `;
            (_a = $("#patio")) === null || _a === void 0 ? void 0 : _a.appendChild(row);
            if (salvo)
                salvar([...ler(), veiculo]);
        }
        function del() { }
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        function render() {
            $("#patio").innerHTML = "";
            const patio = ler();
            if (patio.length) {
                patio.forEach(veiculo => add(veiculo));
            }
        }
        return { ler, add, del, salvar, render };
    }
    patio().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            alert("Campos obrigatórios");
            return;
        }
        patio().add({ nome, placa, entrada: new Date() }, true);
    });
})();
