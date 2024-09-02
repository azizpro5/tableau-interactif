document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("tableau");
    const sumDisplay = document.getElementById("somme");
    let totalSum = 0;

    // Restaurer l'état du tableau à partir de localStorage
    if (localStorage.getItem("tableData")) {
        const tableData = JSON.parse(localStorage.getItem("tableData"));
        tableData.forEach((cellData, index) => {
            const cell = table.querySelector(`[data-index='${index}']`);
            if (cell) {
                cell.style.backgroundColor = cellData.color;
                if (cellData.color === "green") {
                    totalSum += parseInt(cell.textContent, 10);
                }
            }
        });
        sumDisplay.textContent = totalSum;
    }

    table.addEventListener("click", function (e) {
        if (e.target.tagName === "TD") {
            const cell = e.target;
            const value = parseInt(cell.textContent, 10);

            if (cell.style.backgroundColor === "green") {
                cell.style.backgroundColor = "white";
                totalSum -= value;
            } else {
                cell.style.backgroundColor = "green";
                totalSum += value;
            }

            sumDisplay.textContent = totalSum;

            // Sauvegarder l'état actuel dans localStorage
            const tableData = Array.from(table.querySelectorAll("td")).map((cell, index) => {
                return {
                    index: index,
                    color: cell.style.backgroundColor || "white"
                };
            });

            localStorage.setItem("tableData", JSON.stringify(tableData));
        }
    });
});
