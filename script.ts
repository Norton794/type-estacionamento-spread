interface IVeiculo {
  nome: string;
  placa: string;
  entrada: Date | string;
}

(function () {
  const $ = (query: string): HTMLInputElement | null =>
    document.querySelector(query);

  function calc(mil: number): string {
    const min = Math.floor(mil / 60000);
    const sec = Math.floor((mil % 60000) / 1000);

    return `${min}m e ${sec}s`;
  }

  function patio() {
    function ler(): IVeiculo[] {
      return localStorage.patio ? JSON.parse(localStorage.patio) : [];
    }
    function add(veiculo: IVeiculo, salvo?: boolean) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${veiculo.nome}</td>
        <td>${veiculo.placa}</td>
        <td>${veiculo.entrada}</td>
        <td><button class="delete" data-placa="${veiculo.placa}">X</button></td>
        `;

      row.querySelector(".delete")?.addEventListener("click", function () {
        del(this.dataset.placa);
      });

      $("#patio")?.appendChild(row);
      if (salvo) salvar([...ler(), veiculo]);
    }
    function del(placa: string) {
      const { entrada, nome } = ler().find(
        (veiculo) => veiculo.placa === placa
      );

      const tempo = calc(new Date().getTime() - new Date(entrada).getTime());

      if (
        confirm(`O veiculo ${nome} permaneceu por ${tempo}. Deseja encerrar`)
      ) {
        salvar(ler().filter((veiculo) => veiculo.placa !== placa));
        render();
      }
    }
    function salvar(veiculos: IVeiculo[]) {
      localStorage.setItem("patio", JSON.stringify(veiculos));
    }
    function render() {
      $("#patio")!.innerHTML = "";
      const patio = ler();
      if (patio.length) {
        patio.forEach((veiculo) => add(veiculo));
      }
    }
    return { ler, add, del, salvar, render };
  }
  patio().render();
  $("#cadastrar")?.addEventListener("click", () => {
    const nome: string | undefined = $("#nome")?.value;
    const placa: string | undefined = $("#placa")?.value;

    if (!nome || !placa) {
      alert("Campos obrigatórios");
      return;
    }

    patio().add({ nome, placa, entrada: new Date().toISOString() }, true);
  });
})();
