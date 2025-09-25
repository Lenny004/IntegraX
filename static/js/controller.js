function toggleMode() {
    const theme = document.getElementById('theme');
    const toggleButton = document.getElementById('toggleButton');
    const toggleCircle = document.getElementById('toggleCircle');

    if (theme.classList.contains('theme--light')) {
        theme.classList.remove('theme--light');
        theme.classList.add('theme--dark');
        toggleButton.classList.add('toggle__button--active');
        toggleCircle.classList.add('toggle__circle--active');
    } else {
        theme.classList.remove('theme--dark');
        theme.classList.add('theme--light');
        toggleButton.classList.remove('toggle__button--active');
        toggleCircle.classList.remove('toggle__circle--active');
    }
}

function headerTabla(e) {
    const THEADER = document.getElementById('headerResultados');
    let header = '';
    switch (parseInt(e)){
        case 1:
            header =
                `<tr class="results-table__header">
                    <th class="results-table__th">n</th>
                    <th class="results-table__th">a</th>
                    <th class="results-table__th">b</th>
                    <th class="results-table__th">f(a)</th>
                    <th class="results-table__th">f(b)</th>
                    <th class="results-table__th">xi</th>
                    <th class="results-table__th">f(xi)</th>
                    <th class="results-table__th">error</th>
                </tr>`;
            break;
        case 2:
            header =
                `<tr class="results-table__header">
                    <th class="results-table__th">n</th>
                    <th class="results-table__th">a</th>
                    <th class="results-table__th">b</th>
                    <th class="results-table__th">f(a)</th>
                    <th class="results-table__th">f(b)</th>
                    <th class="results-table__th">xi</th>
                    <th class="results-table__th">f(xi)</th>
                    <th class="results-table__th">error</th>
                </tr>`;
            break;
        case 3:
            header =
                `<tr class="results-table__header">
                    <th class="results-table__th">n</th>
                    <th class="results-table__th">i</th>
                    <th class="results-table__th">x0</th>
                    <th class="results-table__th">xi</th>
                    <th class="results-table__th">f(x0)</th>
                    <th class="results-table__th">f(xi)</th>
                    <th class="results-table__th">xi+1</th>
                    <th class="results-table__th">f(xi+1)</th>
                    <th class="results-table__th">error</th>
                </tr>`;
            break;
    }
    THEADER.innerHTML = header;
}

// Función para llenar la tabla con resultados
function llenarTabla(resultados) {
    const tbody = document.getElementById('tablaResultados');
    tbody.innerHTML = '';

    resultados.forEach(resultado => {
        const fila = document.createElement('tr');
        fila.className = 'results-table__row';

        fila.innerHTML = `
            <td class="results-table__td">${resultado.n}</td>
            <td class="results-table__td">${resultado.i}</td>
            <td class="results-table__td">${resultado.x0}</td>
            <td class="results-table__td">${resultado.xi}</td>
            <td class="results-table__td">${resultado['f(x0)']}</td>
            <td class="results-table__td">${resultado['f(xi)']}</td>
            <td class="results-table__td">${resultado['xi+1']}</td>
            <td class="results-table__td">${resultado['f(xi+1)']}</td>
            <td class="results-table__td">${resultado.error}</td>
        `;

        tbody.appendChild(fila);
    });
}