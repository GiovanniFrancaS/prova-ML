// Dados de entrada
let produtos = [
  "Tinta Acrílica","Tinta Acrílica","Tinta Acrílica","Tinta Acrílica","Tinta Acrílica","Tinta Acrílica","Tinta Acrílica","Tinta Acrílica","Tinta Acrílica","Tinta Acrílica","Tinta Acrílica","Tinta Acrílica",
  "Tinta Esmalte","Tinta Esmalte","Tinta Esmalte","Tinta Esmalte","Tinta Esmalte","Tinta Esmalte","Tinta Esmalte","Tinta Esmalte","Tinta Esmalte","Tinta Esmalte","Tinta Esmalte","Tinta Esmalte",
  "Tinta Látex","Tinta Látex","Tinta Látex","Tinta Látex","Tinta Látex","Tinta Látex","Tinta Látex","Tinta Látex","Tinta Látex","Tinta Látex","Tinta Látex","Tinta Látex",
  "Tinta Spray","Tinta Spray","Tinta Spray","Tinta Spray","Tinta Spray","Tinta Spray","Tinta Spray","Tinta Spray","Tinta Spray","Tinta Spray","Tinta Spray","Tinta Spray",
  "Tinta PVA","Tinta PVA"
];

let meses = [
  1,2,3,4,5,6,7,8,9,10,11,12,
  1,2,3,4,5,6,7,8,9,10,11,12,
  1,2,3,4,5,6,7,8,9,10,11,12,
  1,2,3,4,5,6,7,8,9,10,11,12,
  1,2
];

let vendas = [
  120,150,130,180,200,210,190,220,210,250,300,400,
  80,100,90,120,130,140,150,160,170,180,190,200,
  200,210,220,230,240,250,260,270,280,290,300,310,
  60,70,65,80,85,90,95,100,105,110,120,130,
  150,160
];

// Agrupar por produto
let dados = {};

for (let i = 0; i < produtos.length; i++) {
    if (!dados[produtos[i]]) {
        dados[produtos[i]] = {
            meses: [],
            vendas: []
        };
    }

    dados[produtos[i]].meses.push(meses[i]);
    dados[produtos[i]].vendas.push(vendas[i]);
}

console.log("Produto | Mês | Venda Real | Venda Prevista | R²");

for (let produto in dados) {
    let x = dados[produto].meses;
    let y = dados[produto].vendas;

    let n = x.length;

    let somaX = 0;
    let somaY = 0;
    let somaXY = 0;
    let somaX2 = 0;

    for (let i = 0; i < n; i++) {
        somaX += x[i];
        somaY += y[i];
        somaXY += x[i] * y[i];
        somaX2 += x[i] * x[i];
    }

    let a = (n * somaXY - somaX * somaY) / (n * somaX2 - somaX * somaX);
    let b = (somaY - a * somaX) / n;

    // R²
    let mediaY = somaY / n;
    let sqTotal = 0;
    let sqRes = 0;

    for (let i = 0; i < n; i++) {
        let yEstimado = a * x[i] + b;
        sqTotal += Math.pow(y[i] - mediaY, 2);
        sqRes += Math.pow(y[i] - yEstimado, 2);
    }

    let r2 = 1 - (sqRes / sqTotal);

    // Trimestres
    let trimestre1 = 0;
    let trimestre2 = 0;
    let trimestre3 = 0;
    let trimestre4 = 0;

    for (let i = 0; i < n; i++) {
        let yEstimado = a * x[i] + b;

        console.log(
            produto + " | " +
            x[i] + " | " +
            y[i] + " | " +
            yEstimado.toFixed(2) + " | " +
            r2.toFixed(4)
        );

        if (x[i] >= 1 && x[i] <= 3) trimestre1 += yEstimado;
        else if (x[i] >= 4 && x[i] <= 6) trimestre2 += yEstimado;
        else if (x[i] >= 7 && x[i] <= 9) trimestre3 += yEstimado;
        else if (x[i] >= 10 && x[i] <= 12) trimestre4 += yEstimado;
    }

    // Previsão próximos meses
    console.log("\nPrevisão próximos meses - " + produto);
    for (let mes = 13; mes <= 15; mes++) {
        let previsao = a * mes + b;
        console.log("Mês " + mes + ": " + previsao.toFixed(2));
    }

    // Trimestres
    console.log("\nPrevisão por trimestre - " + produto);
    console.log("1º trimestre: " + trimestre1.toFixed(2));
    console.log("2º trimestre: " + trimestre2.toFixed(2));
    console.log("3º trimestre: " + trimestre3.toFixed(2));
    console.log("4º trimestre: " + trimestre4.toFixed(2));

    // Tendência
    console.log("\nTendência:");

    if (trimestre4 > trimestre3 && trimestre3 > trimestre2 && trimestre2 > trimestre1) {
        console.log("Crescimento");
    } else if (trimestre4 === trimestre3) {
        console.log("Estável");
    } else {
        console.log("Queda");
    }

    console.log("-----------------------------------");
}