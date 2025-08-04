// This is the code for dot plot

window.addEventListener("DOMContentLoaded", () => {
  const svg = d3.select("#grafico-horarios");
  const width = +svg.attr("width");
  const height = +svg.attr("height");
  const margin = { top: 10, right: 30, bottom: 60, left: 100 };


  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const x = d3.scaleTime()
    .domain([new Date(1970, 0, 1, 0, 0), new Date(1970, 0, 1, 23, 59)])
    .range([0, innerWidth]);

  const yPositions = {
    "Pedestrians": innerHeight / 3,
    "Cyclists": (2 * innerHeight) / 3
  };

  svg.append("text")
  .attr("x", width / 2)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .attr("font-size", "18px")
  .attr("font-weight", "bold")
  .text("TIME OF THE ACCIDENTS");

  g.append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(
      d3.axisBottom(x)
        .ticks(d3.timeHour.every(4))
        .tickFormat(d3.timeFormat("%I %p"))
    );

  Object.entries(yPositions).forEach(([label, y]) => {
    g.append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", y)
      .attr("y2", y)
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1);

    g.append("text")
      .attr("x", -10)
      .attr("y", y)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .attr("class", "line-label")
      .text(label);
  });

  function parseTime(timeStr) {
    if (!timeStr || !timeStr.includes(":")) return null;
    const [h, m] = timeStr.split(":").map(Number);
    return new Date(1970, 0, 1, h, m);
  }

  // CSV
  d3.csv("accidents_datetime.csv").then(data => {
    const points = [];

    data.forEach(d => {
      const pedTime = parseTime(d.PEDESTRIANS);
      const cicTime = parseTime(d.CYCLISTS);

      if (pedTime) {
        points.push({ time: pedTime, category: "Pedestrians" });
      }
      if (cicTime) {
        points.push({ time: cicTime, category: "Cyclists" });
      }
    });

    // Pontos
    g.selectAll(".dot")
      .data(points)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.time))
      .attr("cy", d => yPositions[d.category] + (Math.random() * 10 - 5)) // jitter ±5px
      .attr("r", 4)
      .attr("fill", d => d.category === "Pedestrians" ? "#ffff33" : "#ff7f00")
      .attr("fill-opacity", 0.6);

    // Legenda
    g.append("text")
      .attr("x", innerWidth)
      .attr("y", innerHeight + 40)
      .attr("text-anchor", "end")
      .attr("font-size", "10px")
      .attr("fill", "#555")
      .text("Data from URBS Curitiba (2020–2025)");
  }).catch(error => {
    console.error("Erro ao carregar CSV:", error);
  });
});
