// Función para mostrar modal con diferentes tipos
function mostrarModal(titulo, mensaje, tipo = 'information') {
    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal__header-title');
    const modalText = document.getElementById('modal-text');
    const modalIcon = document.getElementById('modal-icon');

    // Verificar que los elementos existan
    if (!modal || !modalOverlay || !modalTitle || !modalText || !modalIcon) {
        console.error('No se encontraron los elementos del modal');
        alert(titulo + ': ' + mensaje);
        return;
    }

    const modalIconImg = modalIcon.querySelector('img');

    // Configurar título y mensaje
    modalTitle.textContent = titulo;
    modalText.textContent = mensaje;

    // Remover todas las clases de tipo anteriores
    modalIcon.classList.remove('information', 'warning', 'danger', 'correct');

    // Configurar icono y clase según el tipo
    let iconPath = '';
    switch (tipo) {
        case 'error':
        case 'danger':
            iconPath = '../static/imgs/icons/error.png';
            modalIcon.classList.add('danger');
            break;
        case 'warning':
            iconPath = '../static/imgs/icons/warning.png';
            modalIcon.classList.add('warning');
            break;
        case 'correct':
        case 'success':
            iconPath = '../static/imgs/icons/correct.png';
            modalIcon.classList.add('correct');
            break;
        case 'information':
        default:
            iconPath = '../static/imgs/icons/information.png';
            modalIcon.classList.add('information');
            break;
    }

    modalIconImg.src = iconPath;
    modalIconImg.alt = tipo;

    // Mostrar modal y overlay
    modal.classList.add('show');
    modalOverlay.classList.add('show');
}

// Función para cerrar modal
function closeModal() {
    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modal-overlay');

    modal.classList.remove('show');
    modalOverlay.classList.remove('show');
}

// Cerrar modal al hacer clic en el overlay
const overlay = document.getElementById('modal-overlay');
if (overlay) {
    overlay.addEventListener('click', closeModal);
}

// Función para mostrar error (actualizada)
function mostrarError(mensaje) {
    mostrarModal('Error', mensaje, 'error');
}

// Función para mostrar advertencia
function mostrarAdvertencia(mensaje) {
    mostrarModal('Advertencia', mensaje, 'warning');
}

// Función para mostrar información
function mostrarInformacion(mensaje) {
    mostrarModal('Información', mensaje, 'information');
}

// Función para mostrar éxito
function mostrarExito(mensaje) {
    mostrarModal('Éxito', mensaje, 'correct');
}

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
    const theader = document.getElementById('headerResultados');
    const tbody = document.getElementById('tablaResultados');
    tbody.innerHTML = '';
    let header = '';
    switch (parseInt(e)) {
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
    theader.innerHTML = header;
}

// Función para llenar la tabla con resultados
function llenarTabla(resultados, duracionSegundos) {
    const tbody = document.getElementById('tablaResultados');
    const it = document.getElementById('iterations');
    const result = document.getElementById('result');
    const time = document.getElementById('time-result');
    it.classList.remove('visually-hidden');
    result.classList.remove('visually-hidden');
    time.classList.remove('visually-hidden');
    const textoDuracion = typeof duracionSegundos === 'number'
        ? `El proceso tomó: ${duracionSegundos.toFixed(6)} s`
        : 'El proceso tomó: N/D';
    time.textContent = textoDuracion;
    let metodo = document.getElementById('metodo').value;
    tbody.innerHTML = '';

    resultados.forEach(resultado => {
        const fila = document.createElement('tr');
        fila.className = 'results-table__row';
        it.innerHTML = "La iteración converge en " + resultado.n + " iteraciones";

        switch (parseInt(metodo)) {
            case 1:
            case 2:
                result.innerHTML = "La raiz de aproximada es xi = " + resultado.xi;
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
                break;
            case 3:
                result.innerHTML = "La raiz de aproximada es xi + i = " + resultado['xi+1'];
                fila.innerHTML = `
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
        tbody.appendChild(fila);
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
        mostrarAdvertencia('Debe seleccionar un método');
        return;
    }

    if (!criterio) {
        mostrarAdvertencia('Debe seleccionar un criterio de error');
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
            tolerancia: 1e-6,
            max_iter: 100
        };

        // Hacer petición al backend
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
            // Llenar tabla con resultados
            llenarTabla(resultado.resultados, resultado.time);

            // Mostrar mensaje de éxito
            mostrarExito(`Método completado exitosamente`);
        } else {
            throw new Error(resultado.error || 'Error desconocido');
        }

    } catch (error) {
        console.error('Error:', error);
        mostrarError(error.message);
        limpiarTabla();
    }
}

// Función para limpiar la tabla
function limpiarTabla() {
    const tbody = document.getElementById('tablaResultados');
    tbody.innerHTML = '';
}