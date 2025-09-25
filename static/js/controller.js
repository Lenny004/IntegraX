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
    let metodo = document.getElementById('metodo').value;
    tbody.innerHTML = '';

    resultados.forEach(resultado => {
        const fila = document.createElement('tr');
        fila.className = 'results-table__row';

        switch (parseInt(metodo)){
            case 1:
            case 2:
                fila.innerHTML = `
                <td class="results-table__td">${resultado.n}</td>
                <td class="results-table__td">${resultado.a}</td>
                <td class="results-table__td">${resultado.b}</td>
                <td class="results-table__td">${resultado['f(a)']}</td>
                <td class="results-table__td">${resultado['f(b)']}</td>
                <td class="results-table__td">${resultado['xi']}</td>
                <td class="results-table__td">${resultado['f(xi)']}</td>
                <td class="results-table__td">${resultado.error}</td>
            `;
            tbody.appendChild(fila);
                break;
        }
    });
}

// Función principal para procesar la ecuación
async function procesarEcuacion() {
    // Obtener valores del formulario
    const ecuacion = document.getElementById('ecuacion').value.trim();
    const metodo = document.getElementById('metodo').value;
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const criterio = parseInt(document.getElementById('criterio').value);

    // Validaciones básicas
    if (!ecuacion) {
        mostrarError('Debe ingresar una ecuación');
        return;
    }

    if (!metodo) {
        mostrarError('Debe seleccionar un método');
        return;
    }

    if (!criterio) {
        mostrarError('Debe seleccionar un criterio de error');
        return;
    }

    if (isNaN(a) || isNaN(b)) {
        mostrarError('Los valores iniciales deben ser números válidos');
        return;
    }

    try {
        // Preparar datos para enviar al backend
        const datos = {
            ecuacion: ecuacion,
            metodo: parseInt(metodo),
            a: a,
            b: b,
            criterio: criterio,
            tolerancia: 1e-6,  // Valor por defecto
            max_iter: 100     // Valor por defecto
        };

        // Hacer petición al backend
        const response = await fetch('/api/calcular', {
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
            // Llenar tabla con resultados
            llenarTabla(resultado.resultados);

            // Mostrar mensaje de éxito (opcional)
            console.log(`Método ${resultado.metodo} completado exitosamente`);
        } else {
            throw new Error(resultado.error || 'Error desconocido');
        }

    } catch (error) {
        console.error('Error:', error);
        mostrarError(error.message);
        limpiarTabla();
    }
}

// Función para mostrar mensajes de error
function mostrarError(mensaje) {
    alert('Error: ' + mensaje);
}

// Función para limpiar la tabla
function limpiarTabla() {
    const tbody = document.getElementById('tablaResultados');
    tbody.innerHTML = ``;
}