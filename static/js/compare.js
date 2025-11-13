const NOMBRES_METODOS = {
	1: 'Método de Bisección',
	2: 'Método de Regla Falsa',
	3: 'Método de la Secante',
};

const TARJETAS_COMPARACION = {
	metodo1: {
		selectId: 'metodo',
		titleId: 'metodo1-title',
		iterationsId: 'metodo1-iterations',
		resultId: 'metodo1-result',
		timeId: 'metodo1-time',
		headerId: 'headerResultados-metodo-1',
		bodyId: 'tablaResultados-metodo-1',
		cardId: 'comparisonCardMetodo1',
		fallbackTitulo: 'Método 1',
	},
	metodo2: {
		selectId: 'metodo_compare',
		titleId: 'metodo2-title',
		iterationsId: 'metodo2-iterations',
		resultId: 'metodo2-result',
		timeId: 'metodo2-time',
		headerId: 'headerResultados-metodo-2',
		bodyId: 'tablaResultados-metodo-2',
		cardId: 'comparisonCardMetodo2',
		fallbackTitulo: 'Método 2',
	},
};

function obtenerNombreMetodo(metodo) {
	return NOMBRES_METODOS[metodo] || '';
}

function generarHeader(metodo) {
	switch (metodo) {
		case 1:
		case 2:
			return `
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
		case 3:
			return `
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
		default:
			return '';
	}
}

function generarFilaFinal(metodo, resultado) {
	if (!resultado) {
		return '';
	}

	switch (metodo) {
		case 1:
		case 2:
			return `
				<tr class="results-table__row">
					<td class="results-table__td">${resultado.n ?? ''}</td>
					<td class="results-table__td">${resultado.a ?? ''}</td>
					<td class="results-table__td">${resultado.b ?? ''}</td>
					<td class="results-table__td">${resultado['f(a)'] ?? ''}</td>
					<td class="results-table__td">${resultado['f(b)'] ?? ''}</td>
					<td class="results-table__td">${resultado.xi ?? ''}</td>
					<td class="results-table__td">${resultado['f(xi)'] ?? ''}</td>
					<td class="results-table__td">${resultado.error ?? ''}</td>
				</tr>`;
		case 3:
			return `
				<tr class="results-table__row">
					<td class="results-table__td">${resultado.n ?? ''}</td>
					<td class="results-table__td">${resultado.i ?? ''}</td>
					<td class="results-table__td">${resultado.x0 ?? ''}</td>
					<td class="results-table__td">${resultado.xi ?? ''}</td>
					<td class="results-table__td">${resultado['f(x0)'] ?? ''}</td>
					<td class="results-table__td">${resultado['f(xi)'] ?? ''}</td>
					<td class="results-table__td">${resultado['xi+1'] ?? ''}</td>
					<td class="results-table__td">${resultado['f(xi+1)'] ?? ''}</td>
					<td class="results-table__td">${resultado.error ?? ''}</td>
				</tr>`;
		default:
			return '';
	}
}

function obtenerTextoResultado(metodo, resultado) {
	if (!resultado) {
		return 'No se obtuvo resultado válido.';
	}

	if (metodo === 3) {
		return `La raiz aproximada es xi+1 = ${resultado['xi+1'] ?? 'N/D'} (error = ${resultado.error ?? 'N/D'})`;
	}

	return `La raiz aproximada es xi = ${resultado.xi ?? 'N/D'} (error = ${resultado.error ?? 'N/D'})`;
}

function formatearDuracion(valor) {
	if (typeof valor !== 'number' || Number.isNaN(valor)) {
		return 'N/D';
	}
	return valor.toFixed(6);
}

function limpiarTarjeta(clave) {
	const config = TARJETAS_COMPARACION[clave];
	if (!config) {
		return;
	}

	const iterations = document.getElementById(config.iterationsId);
	const result = document.getElementById(config.resultId);
	const time = document.getElementById(config.timeId);
	const header = document.getElementById(config.headerId);
	const body = document.getElementById(config.bodyId);
	const card = document.getElementById(config.cardId);

	if (iterations) {
		iterations.textContent = '';
		iterations.classList.add('visually-hidden');
	}

	if (result) {
		result.textContent = '';
		result.classList.add('visually-hidden');
	}

	if (time) {
		time.textContent = '';
		time.classList.add('visually-hidden');
	}

	if (header) {
		header.innerHTML = '';
	}

	if (body) {
		body.innerHTML = '';
	}

	if (card) {
		card.classList.add('visually-hidden');
	}
}

function actualizarTituloTarjeta(clave) {
	const config = TARJETAS_COMPARACION[clave];
	if (!config) {
		return;
	}

	const select = document.getElementById(config.selectId);
	const title = document.getElementById(config.titleId);

	if (!title) {
		return;
	}

	const metodo = parseInt(select?.value ?? '', 10);
	title.textContent = obtenerNombreMetodo(metodo) || config.fallbackTitulo;
}

function limpiarComparacion() {
	Object.keys(TARJETAS_COMPARACION).forEach(clave => limpiarTarjeta(clave));
	const section = document.getElementById('comparisonSection');
	if (section) {
		section.classList.add('visually-hidden');
	}
}

function renderTarjeta(clave, metodo, respuesta) {
	const config = TARJETAS_COMPARACION[clave];
	if (!config) {
		return false;
	}

	const resultados = Array.isArray(respuesta?.resultados) ? respuesta.resultados : [];
	if (!resultados.length) {
		mostrarAdvertencia(`El ${obtenerNombreMetodo(metodo)} no devolvió resultados.`);
		return false;
	}

	const final = resultados[resultados.length - 1];
	const header = document.getElementById(config.headerId);
	const body = document.getElementById(config.bodyId);
	const iterations = document.getElementById(config.iterationsId);
	const result = document.getElementById(config.resultId);
	const time = document.getElementById(config.timeId);
	const card = document.getElementById(config.cardId);

	if (header) {
		header.innerHTML = generarHeader(metodo);
	}

	if (body) {
		body.innerHTML = generarFilaFinal(metodo, final);
	}

	if (iterations) {
		iterations.textContent = `La iteración converge en ${final.n} iteraciones`;
		iterations.classList.remove('visually-hidden');
	}

	if (result) {
		result.textContent = obtenerTextoResultado(metodo, final);
		result.classList.remove('visually-hidden');
	}

	if (time) {
		const segundos = formatearDuracion(respuesta?.time);
		time.textContent = `El proceso tomó: ${segundos} s`;
		time.classList.remove('visually-hidden');
	}

	if (card) {
		card.classList.remove('visually-hidden');
	}

	return true;
}

async function solicitarMetodo(datosComunes, metodo) {
	const payload = {
		...datosComunes,
		metodo,
	};

	const response = await fetch('/calcular', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	const resultado = await response.json();

	if (!response.ok) {
		throw new Error(resultado.error || 'Error en el servidor');
	}

	if (!resultado.success) {
		throw new Error(resultado.error || 'Error desconocido');
	}

	return resultado;
}

async function compararEcuaciones() {
	const ecuacion = document.getElementById('ecuacion')?.value.trim();
	const metodo1 = parseInt(document.getElementById('metodo')?.value ?? '', 10);
	const metodo2 = parseInt(document.getElementById('metodo_compare')?.value ?? '', 10);
	const a = parseFloat(document.getElementById('a')?.value ?? '');
	const b = parseFloat(document.getElementById('b')?.value ?? '');
	const criterio = parseInt(document.getElementById('criterio')?.value ?? '', 10);

	if (!ecuacion) {
		mostrarError('Debe ingresar una ecuación');
		return;
	}

	if (!metodo1 || !metodo2) {
		mostrarAdvertencia('Debe seleccionar ambos métodos para comparar');
		return;
	}

	if (metodo1 === metodo2) {
		mostrarAdvertencia('Seleccione dos métodos distintos para realizar la comparación');
		return;
	}

	if (!criterio) {
		mostrarAdvertencia('Debe seleccionar un criterio de error');
		return;
	}

	if (Number.isNaN(a) || Number.isNaN(b)) {
		mostrarError('Los valores iniciales deben ser números válidos');
		return;
	}

	limpiarComparacion();

	try {
		const datosComunes = {
			ecuacion,
			a,
			b,
			criterio,
			tolerancia: 1e-6,
			max_iter: 100,
		};

		const [resultadoMetodo1, resultadoMetodo2] = await Promise.all([
			solicitarMetodo(datosComunes, metodo1),
			solicitarMetodo(datosComunes, metodo2),
		]);

		const mostradoMetodo1 = renderTarjeta('metodo1', metodo1, resultadoMetodo1);
		const mostradoMetodo2 = renderTarjeta('metodo2', metodo2, resultadoMetodo2);

		const section = document.getElementById('comparisonSection');
		if (section && (mostradoMetodo1 || mostradoMetodo2)) {
			section.classList.remove('visually-hidden');
		}

		if (mostradoMetodo1 || mostradoMetodo2) {
			mostrarExito('Comparación completada exitosamente');
		}
	} catch (error) {
		console.error('Error en la comparación:', error);
		mostrarError(error.message);
	}
}