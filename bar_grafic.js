// This is the code for a bar chart in D3

const margin = {top: 70, right: 20, bottom: 50, left: 40};
const width = 640 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select("#grafico-barras")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// CSV
d3.csv("accidents.csv").then(data => {
    
    const keys = ["Cyclists", "Pedestrians"];
    data.forEach(d => {
        d.Year = +d.Year; 
        keys.forEach(key => {
            d[key] = +d[key];
        });
    });

    // Title
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", -45) 
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("font-weight", "bold")  
        .text("BUS RUN-OVERS OF CYCLISTS AND PEDESTRIANS");

    // Subtitle
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", -25) 
        .attr("text-anchor", "middle")  
        .style("font-size", "12px") 
        .text("Accidents from 2020 to June 2025");

    // Data
    svg.append("text")
    .attr("x", width)
    .attr("y", height + 30)
    .attr("text-anchor", "end")
    .style("font-size", "10px")
    .style("fill", "#555")
    .text("Data from URBS Curitiba (2020–2025)");

        
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Year)) 
        .range([0, width])
        .padding(0.2);

    const innerXScale = d3.scaleBand()
        .domain(keys)
        .range([0, xScale.bandwidth()])
        .padding(0.05);

    const maxVal = d3.max(data, d => d3.max(keys, key => d[key]));
    const yScale = d3.scaleLinear()
        .domain([0, maxVal * 1.1])
        .range([height, 0]);

    const color = d3.scaleOrdinal()
        .domain(keys)
        .range(["#ff8400ff", "#f0c125ff"]);


    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));


    svg.append("g")
        .call(d3.axisLeft(yScale));


    const groups = svg.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", d => `translate(${xScale(d.Year)},0)`);

    groups.selectAll("rect")
        .data(d => keys.map(key => ({key, value: d[key]})))
        .enter().append("rect")
        .attr("x", d => innerXScale(d.key))
        .attr("y", d => yScale(d.value))
        .attr("width", innerXScale.bandwidth())
        .attr("height", d => height - yScale(d.value))
        .attr("fill", d => color(d.key));

    groups.selectAll("text")
        .data(d => keys.map(key => ({key, value: d[key]})))
        .enter().append("text")
        .attr("x", d => innerXScale(d.key) + innerXScale.bandwidth() / 2)
        .attr("y", d => yScale(d.value) - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("fill", "black")
        .text(d => d.value);

    // Legend
    const legend = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(d => d);
});