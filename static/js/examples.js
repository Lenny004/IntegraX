// examples.js - Lógica para ejemplos interactivos

/**
 * Ejecuta un ejemplo específico llamando al backend
 * @param {number} ejemploNum - Número del ejemplo (1-4)
 * @param {number} metodo - Método a usar (1=Bisección, 2=Regla Falsa, 3=Secante)
 * @param {string} ecuacion - Ecuación a resolver
 * @param {number} a - Valor inicial x0
 * @param {number} b - Valor inicial x1
 */
async function ejecutarEjemplo(ejemploNum, metodo, ecuacion, a, b) {
    const headerId = `header-example${ejemploNum}`;
    const tableId = `table-example${ejemploNum}`;
    const infoId = `info-example${ejemploNum}`;
    const resultsElement = document.getElementById(`results-example${ejemploNum}`);

    try {
        // Preparar datos para el backend
        const datos = {
            ecuacion: ecuacion,
            metodo: metodo,
            a: a,
            b: b,
            criterio: 1, // |xi+1 - xi|
            tolerancia: 1e-6,
            max_iter: 100
        };

        // Llamar al backend
        const response = await fetch('/calcular', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });

        const resultado = await response.json();

        if (!response.ok) {
            throw new Error(resultado.error || 'Error en el servidor');
        }

        if (resultado.success) {
            // Generar tabla de resultados
            generarTablaEjemplo(
                metodo,
                resultado.resultados,
                resultado.time,
                headerId,
                tableId,
                infoId
            );

            // Mostrar resultados
            if (resultsElement) {
                resultsElement.classList.add('active');
                resultsElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

        } else {
            throw new Error(resultado.error || 'Error desconocido');
        }

    } catch (error) {
        console.error('Error:', error);
        // Mostrar error con el modal
        if (typeof mostrarError === 'function') {
            mostrarError(`Error al ejecutar el ejemplo: ${error.message}`);
        } else {
            alert(`Error: ${error.message}`);
        }
    }
}

/**
 * Genera el header de la tabla según el método
 * @param {number} metodo - Método usado (1=Bisección, 2=Regla Falsa, 3=Secante)
 * @returns {string} HTML del header
 */
function generarHeaderTabla(metodo) {
    let header = '';
    
    switch (parseInt(metodo)) {
        case 1:
        case 2:
            header = `
                <tr class="results-table__header">
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
            header = `
                <tr class="results-table__header">
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
    
    return header;
}

/**
 * Genera las filas de la tabla con los resultados
 * @param {Array} resultados - Array de resultados del backend
 * @param {number} metodo - Método usado
 * @returns {string} HTML de las filas
 */
function generarFilasTabla(resultados, metodo) {
    let filas = '';
    
    resultados.forEach(resultado => {
        let fila = '<tr class="results-table__row">';
        
        switch (parseInt(metodo)) {
            case 1:
            case 2:
                fila += `
                    <td class="results-table__td">${resultado.n}</td>
                    <td class="results-table__td">${resultado.a}</td>
                    <td class="results-table__td">${resultado.b}</td>
                    <td class="results-table__td">${resultado['f(a)']}</td>
                    <td class="results-table__td">${resultado['f(b)']}</td>
                    <td class="results-table__td">${resultado['xi']}</td>
                    <td class="results-table__td">${resultado['f(xi)']}</td>
                    <td class="results-table__td">${resultado.error}</td>
                `;
                break;
            case 3:
                fila += `
                    <td class="results-table__td">${resultado.n}</td>
                    <td class="results-table__td">${resultado.i}</td>
                    <td class="results-table__td">${resultado['x0']}</td>
                    <td class="results-table__td">${resultado['xi']}</td>
                    <td class="results-table__td">${resultado['f(x0)']}</td>
                    <td class="results-table__td">${resultado['f(xi)']}</td>
                    <td class="results-table__td">${resultado['xi+1']}</td>
                    <td class="results-table__td">${resultado['f(xi+1)']}</td>
                    <td class="results-table__td">${resultado.error}</td>
                `;
                break;
        }
        
        fila += '</tr>';
        filas += fila;
    });
    
    return filas;
}

/**
 * Obtiene el nombre del método
 * @param {number} metodo - Número del método
 * @returns {string} Nombre del método
 */
function obtenerNombreMetodo(metodo) {
    const nombres = {
        1: 'Bisección',
        2: 'Regla Falsa',
        3: 'Secante'
    };
    return nombres[metodo] || 'Desconocido';
}

/**
 * Genera la tabla completa con resultados
 * @param {number} metodo - Método usado
 * @param {Array} resultados - Resultados del backend
 * @param {number} tiempo - Tiempo de ejecución
 * @param {string} headerId - ID del elemento header
 * @param {string} tableId - ID del elemento tabla
 * @param {string} infoId - ID del elemento info
 */
function generarTablaEjemplo(metodo, resultados, tiempo, headerId, tableId, infoId) {
    // Generar header
    const headerElement = document.getElementById(headerId);
    if (headerElement) {
        headerElement.innerHTML = generarHeaderTabla(metodo);
    }

    // Generar filas
    const tableElement = document.getElementById(tableId);
    if (tableElement) {
        tableElement.innerHTML = generarFilasTabla(resultados, metodo);
    }

    // Generar información
    const infoElement = document.getElementById(infoId);
    if (infoElement && resultados.length > 0) {
        const ultimoResultado = resultados[resultados.length - 1];
        const nombreMetodo = obtenerNombreMetodo(metodo);
        
        let raizAproximada;
        if (metodo === 1 || metodo === 2) {
            raizAproximada = ultimoResultado.xi;
        } else {
            raizAproximada = ultimoResultado['xi+1'];
        }

        const tiempoFormateado = typeof tiempo === 'number' 
            ? tiempo.toFixed(6) 
            : 'N/D';

        infoElement.innerHTML = `
            <p><strong>Método:</strong> ${nombreMetodo}</p>
            <p><strong>Iteraciones:</strong> ${ultimoResultado.n}</p>
            <p><strong>Raíz aproximada:</strong> x ≈ ${raizAproximada}</p>
            <p><strong>Tiempo de ejecución:</strong> ${tiempoFormateado} segundos</p>
        `;
    }
}