// Scrolling Code

const scroller = scrollama();

function esconderTodosGrupos() {
  d3.select("#acidentes_x5F_pedestres").classed("hidden", true);
  d3.select("#mortes_x5F_pedestres").classed("hidden", true);
  d3.select("#mortes_x5F_ciclistas").classed("hidden", true);
  d3.select("#acidentes_x5F_ciclistas").classed("hidden", true);
}

function mostrarCiclistas() {
  d3.select("#acidentes_x5F_ciclistas").classed("hidden", false);
}

function mostrarCiclistasComMortes() {
  d3.select("#acidentes_x5F_ciclistas").classed("hidden", false);
  d3.select("#mortes_x5F_ciclistas").classed("hidden", false);
}

function mostrarPedestres() {
  d3.select("#acidentes_x5F_pedestres").classed("hidden", false);
}

function mostrarPedestresComMortes() {
  d3.select("#acidentes_x5F_pedestres").classed("hidden", false);
  d3.select("#mortes_x5F_pedestres").classed("hidden", false);
}

function mostrarTodosGrupos() {
  d3.select("#acidentes_x5F_pedestres").classed("hidden", false);
  d3.select("#mortes_x5F_pedestres").classed("hidden", false);
  d3.select("#mortes_x5F_ciclistas").classed("hidden", false);
  d3.select("#acidentes_x5F_ciclistas").classed("hidden", false);
}

esconderTodosGrupos();

scroller
  .setup({
    step: ".step",
    offset: 0.6,
    debug: false
  })
  .onStepEnter(response => {
    const stepId = response.element.id;
    console.log("Entrou no:", stepId);

    if (stepId === "step-one") {
      esconderTodosGrupos();
      mostrarCiclistas();
    } else if (stepId === "step-two") {
      esconderTodosGrupos();
      mostrarCiclistasComMortes();
    } else if (stepId === "step-three") {
      esconderTodosGrupos();
      mostrarPedestres();
    } else if (stepId === "step-four") {
      esconderTodosGrupos();
      mostrarPedestresComMortes();
    } else if (stepId === "step-five") {
      esconderTodosGrupos();
      mostrarTodosGrupos();
    } else {
      esconderTodosGrupos();
    }
  });

window.addEventListener("resize", scroller.resize);
