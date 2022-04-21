interface IVeiculo {
  nome: string;
  placa: string;
  entrada: Date;
}

(function () {
  const $ = (query: string): HTMLInputElement | null =>
    document.querySelector(query);

  function patio() {
    function ler(): IVeiculo[] {
        return localStorage.patio ? JSON.parse(localStorage.patio) : []
    }
    function add(veiculo: IVeiculo, salvo?: boolean) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${veiculo.nome}</td>
        <td>${veiculo.placa}</td>
        <td>${veiculo.entrada}</td>
        <td><a class="delete" data-placa="${veiculo.placa}">X</a></td>
        `;

      $("#patio")?.appendChild(row);
      if(salvo) salvar([...ler(), veiculo])
      
    }
    function del() {}
    function salvar(veiculos: IVeiculo[]) {
        localStorage.setItem("patio", JSON.stringify(veiculos))
    }
    function render() {
        $("#patio")!.innerHTML = "";
        const patio = ler()
        if(patio.length){
            patio.forEach(veiculo => add(veiculo));
        }
    }
    return { ler, add, del, salvar, render };
  }
  patio().render()
  $("#cadastrar")?.addEventListener("click", () => {
    const nome: string | undefined = $("#nome")?.value;
    const placa: string | undefined = $("#placa")?.value;

    if (!nome || !placa) {
      alert("Campos obrigatórios");
      return;
    }

    patio().add({ nome, placa, entrada: new Date() }, true);
  });
})();
