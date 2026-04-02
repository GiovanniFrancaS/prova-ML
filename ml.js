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

// Quantidade
let n = meses.length;

// Somatórios
let somaX = 0;
let somaY = 0;
let somaXY = 0;
let somaX2 = 0;

for (let i = 0; i < n; i++) {
    somaX += meses[i];
    somaY += vendas[i];
    somaXY += meses[i] * vendas[i];
    somaX2 += meses[i] * meses[i];
}

// Regressão
let a = (n * somaXY - somaX * somaY) / (n * somaX2 - somaX * somaX);
let b = (somaY - a * somaX) / n;

// R²
let mediaY = somaY / n;
let sqTotal = 0;
let sqRes = 0;
let r2 = []

for (let i = 0; i < n; i++) {
    let yEstimado = a * meses[i] + b;
    sqTotal += Math.pow(vendas[i] - mediaY, 2);
    sqRes += Math.pow(vendas[i] - yEstimado, 2);
    r3 = 1 - (sqRes / sqTotal);
    r2.push(r3)
}


// Trimestres
let trimestre1 = 0;
let trimestre2 = 0;
let trimestre3 = 0;
let trimestre4 = 0;

// Saída
console.log("Produto | Mês | Venda Real | Venda Prevista | R²");

for (let i = 0; i < n; i++) {
    let yEstimado = a * meses[i] + b;

    console.log(
        produtos[i] + " | " +
        meses[i] + " | " +
        vendas[i] + " | " +
        yEstimado.toFixed(2) + " | " +
        r2[i].toFixed(4)
    );

    if (meses[i] >= 1 && meses[i] <= 3) trimestre1 += yEstimado;
    else if (meses[i] >= 4 && meses[i] <= 6) trimestre2 += yEstimado;
    else if (meses[i] >= 7 && meses[i] <= 9) trimestre3 += yEstimado;
    else if (meses[i] >= 10 && meses[i] <= 12) trimestre4 += yEstimado;
}

// 5. Previsão próximos 3 meses
console.log("\nPrevisão próximos meses:");
for (let mes = 13; mes <= 15; mes++) {
    let previsao = a * mes + b;
    console.log("Mês " + mes + ": " + previsao.toFixed(2));
}

// Resultado trimestral
console.log("\nPrevisão por trimestre:");
console.log("1º trimestre: " + trimestre1.toFixed(2));
console.log("2º trimestre: " + trimestre2.toFixed(2));
console.log("3º trimestre: " + trimestre3.toFixed(2));
console.log("4º trimestre: " + trimestre4.toFixed(2));

// Tendência
console.log("\nTendência:");

if (trimestre4 > trimestre3 && trimestre3 > trimestre2 && trimestre2 > trimestre1) {
    console.log("Crescimento");
} else if (trimestre4 === trimestre3) {
    console.log("Estavel");
} else {
    console.log("Queda");
}