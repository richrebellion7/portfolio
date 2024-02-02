let portfolio = [];

function addStock() {
    const stockName = document.getElementById('stockName').value;
    const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
    const numStocks = parseInt(document.getElementById('numStocks').value);
    const currentPrice = parseFloat(document.getElementById('currentPrice').value);

    const investment = purchasePrice * numStocks;
    const profitLoss = (currentPrice - purchasePrice) * numStocks;

    const stockData = {
        stockName,
        purchasePrice,
        numStocks,
        currentPrice,
        investment,
        profitLoss
    };

    portfolio.push(stockData);

    updateTable();
}

function updateTable() {
    const outputTable = document.getElementById('outputTable');
    outputTable.innerHTML = '';

    const table = document.createElement('table');
    const headerRow = table.insertRow();
    const headers = ['Stock Name', 'Purchase Price', 'Current Price', 'Profit/Loss', 'Amount'];
    
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    portfolio.forEach(stock => {
        const row = table.insertRow();
        const values = [stock.stockName, stock.purchasePrice, stock.currentPrice, stock.profitLoss >= 0 ? 'Profit' : 'Loss', Math.abs(stock.profitLoss)];
        
        values.forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });
    });

    outputTable.appendChild(table);
    drawBarGraph();
}

function drawBarGraph() {
    const barGraphCanvas = document.getElementById('barGraph');
    const ctx = barGraphCanvas.getContext('2d');
    ctx.clearRect(0, 0, barGraphCanvas.width, barGraphCanvas.height);

    const totalInvestment = portfolio.reduce((total, stock) => total + stock.investment, 0);

    const barWidth = barGraphCanvas.width / portfolio.length;
    
    portfolio.forEach((stock, index) => {
        const barHeight = (stock.investment / totalInvestment) * barGraphCanvas.height;
        const x = index * barWidth;
        const y = barGraphCanvas.height - barHeight;

        ctx.fillStyle = stock.profitLoss >= 0 ? '#9EB384' : '#CEDEBD';
        ctx.fillRect(x, y, barWidth, barHeight);
    });

    // Draw scale and index
    ctx.fillStyle = '#435334';
    ctx.font = '12px Arial';

    portfolio.forEach((stock, index) => {
        const x = (index + 0.5) * barWidth;
        const y = barGraphCanvas.height - 5;
        ctx.fillText(stock.stockName, x, y, barWidth);
    });

    ctx.fillText('Total Investment', barGraphCanvas.width / 2, barGraphCanvas.height + 15);
    ctx.fillText('Scale: 1 unit = ' + totalInvestment, barGraphCanvas.width / 2, barGraphCanvas.height + 30);
}