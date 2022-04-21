interface IVeiculo {
  nome: string;
  placa: string;
  entrada?: Date;
}

(function () {
  const $ = (query: string): HTMLInputElement | null =>
    document.querySelector(query);

  function patio() {
    function ler() {}
    function add(veiculo: IVeiculo) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${veiculo.nome}</td>
        <td>${veiculo.placa}</td>
        <td>${veiculo.entrada}</td>
        <td><a class="delete" data-placa="${veiculo.placa}">X</a></td>
        `;

      $("#patio")?.appendChild(row);
    }
    function del() {}
    function salvar() {}
    function render() {}
    return { ler, add, del, salvar, render };
  }

  $("#cadastrar")?.addEventListener("click", () => {
    const nome: string | undefined = $("#nome")?.value;
    const placa: string | undefined = $("#placa")?.value;

    if (!nome || !placa) {
      alert("Campos obrigatórios");
      return;
    }

    patio().add({ nome, placa, entrada: new Date() });
  });
})();
