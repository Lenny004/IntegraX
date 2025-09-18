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

function mostrarParametros() {
    const metodo = document.getElementById('metodo').value;
    const parametrosDiv = document.getElementById('parametros');

    if (!metodo) {
        parametrosDiv.style.display = 'none';
        return;
    }

    parametrosDiv.style.display = 'block';
    let html = '';

    if (metodo === 'biseccion') {
        html = `
                    <div class="param-group">
                        <label>Límite inferior (a): <input type="number" id="a" value="0" step="0.1"></label>
                        <label>Límite superior (b): <input type="number" id="b" value="1" step="0.1"></label>
                    </div>
                    <div class="param-group">
                        <label>Criterio de error:
                            <select id="criterio">
                                <option value="1">|p - p_prev|</option>
                                <option value="2">|p - p_prev| / |p|</option>
                                <option value="3">|f(p)|</option>
                                <option value="4">|b - a| / 2</option>
                            </select>
                        </label>
                    </div>
                `;
    } else if (metodo === 'regla_falsa') {
        html = `
                    <div class="param-group">
                        <label>Límite inferior (a): <input type="number" id="a" value="0" step="0.1"></label>
                        <label>Límite superior (b): <input type="number" id="b" value="1" step="0.1"></label>
                    </div>
                    <div class="param-group">
                        <label>Criterio de error:
                            <select id="criterio">
                                <option value="1">|p - p_prev|</option>
                                <option value="2">|p - p_prev| / |p|</option>
                                <option value="3">|f(p)|</option>
                                <option value="4">|b - a| / 2</option>
                            </select>
                        </label>
                    </div>
                `;
    } else if (metodo === 'secante') {
        html = `
                    <div class="param-group">
                        <label>Valor inicial x0: <input type="number" id="x0" value="0" step="0.1"></label>
                        <label>Valor inicial x1: <input type="number" id="x1" value="1" step="0.1"></label>
                    </div>
                    <div class="param-group">
                        <label>Criterio de error:
                            <select id="criterio">
                                <option value="1">|xi+1 - xi|</option>
                                <option value="2">|xi+1 - xi| / |xi+1|</option>
                                <option value="3">|f(xi+1)|</option>
                            </select>
                        </label>
                    </div>
                `;
    }

    parametrosDiv.innerHTML = html;
}

async function procesarEcuacion() {
    const ecuacion = document.getElementById('ecuacion').value;
    const metodo = document.getElementById('metodo').value;

    if (!ecuacion || !metodo) {
        alert('Por favor, ingrese una ecuación y seleccione un método.');
        return;
    }

    const loading = document.getElementById('loading');
    const resultados = document.getElementById('resultados');

    loading.style.display = 'block';
    resultados.style.display = 'none';

    try {
        const data = {
            ecuacion: ecuacion,
            metodo: metodo
        };

        // Agregar parámetros específicos según el método
        if (metodo === 'biseccion') {
            data.a = document.getElementById('a').value;
            data.b = document.getElementById('b').value;
            data.criterio = document.getElementById('criterio').value;
        } else if (metodo === 'regla_falsa') {
            data.a = document.getElementById('a').value;
            data.b = document.getElementById('b').value;
            data.criterio = document.getElementById('criterio').value;
        } else if (metodo === 'secante') {
            data.x0 = document.getElementById('x0').value;
            data.x1 = document.getElementById('x1').value;
            data.criterio = document.getElementById('criterio').value;
        }

        const response = await fetch('http://localhost:5000/resolver', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const resultado = await response.json();
        mostrarResultados(resultado, metodo);

    } catch (error) {
        console.error('Error:', error);
        alert('Error al procesar la ecuación. Asegúrese de que el servidor esté ejecutándose.');
    } finally {
        loading.style.display = 'none';
    }
}

function mostrarResultados(resultado, metodo) {
    const resultadosDiv = document.getElementById('resultados');
    const tablaContainer = document.getElementById('tabla-container');
    const convergenciaInfo = document.getElementById('convergencia-info');

    if (resultado.error) {
        convergenciaInfo.innerHTML = `<div class="error-info"><strong>Error:</strong> ${resultado.error}</div>`;
        tablaContainer.innerHTML = '';
        resultadosDiv.style.display = 'block';
        return;
    }

    // Generar tabla según el método
    let tablaHTML = '';

    if (metodo === 'biseccion' || metodo === 'regla_falsa') {
        tablaHTML = `
                    <table class="results-table">
                        <thead>
                            <tr>
                                <th>n</th>
                                <th>a</th>
                                <th>b</th>
                                <th>f(a)</th>
                                <th>f(b)</th>
                                <th>p</th>
                                <th>f(p)</th>
                                <th>Error</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

        resultado.resultados.forEach(fila => {
            tablaHTML += `
                        <tr>
                            <td>${fila.n}</td>
                            <td>${fila.a}</td>
                            <td>${fila.b}</td>
                            <td>${fila.fa}</td>
                            <td>${fila.fb}</td>
                            <td>${fila.p}</td>
                            <td>${fila.fp}</td>
                            <td>${fila.error}</td>
                        </tr>
                    `;
        });
    } else if (metodo === 'secante') {
        tablaHTML = `
                    <table class="results-table">
                        <thead>
                            <tr>
                                <th>n</th>
                                <th>i</th>
                                <th>x0</th>
                                <th>xi</th>
                                <th>f(x0)</th>
                                <th>f(xi)</th>
                                <th>xi+1</th>
                                <th>f(xi+1)</th>
                                <th>Error</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

        resultado.resultados.forEach(fila => {
            tablaHTML += `
                        <tr>
                            <td>${fila.n}</td>
                            <td>${fila.i}</td>
                            <td>${fila.x0}</td>
                            <td>${fila.xi}</td>
                            <td>${fila.fx0}</td>
                            <td>${fila.fxi}</td>
                            <td>${fila.xi1}</td>
                            <td>${fila.fxi1}</td>
                            <td>${fila.error}</td>
                        </tr>
                    `;
        });
    }

    tablaHTML += `
                        </tbody>
                    </table>
                `;

    tablaContainer.innerHTML = tablaHTML;

    // Información de convergencia
    if (resultado.convergencia) {
        convergenciaInfo.innerHTML = `
                    <div class="convergence-info">
                        <strong>✅ Convergencia alcanzada</strong><br>
                        Iteraciones: ${resultado.iteraciones}<br>
                        Raíz aproximada: ${resultado.raiz}
                    </div>
                `;
    } else {
        convergenciaInfo.innerHTML = `
                    <div class="error-info">
                        <strong>⚠️ ${resultado.mensaje}</strong>
                    </div>
                `;
    }

    resultadosDiv.style.display = 'block';
}