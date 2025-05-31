// Función para obtener los divisores propios de un número (excluyendo el propio número)
function getDivisors(n) {
    const divisors = [1];
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            divisors.push(i);
            if (i !== n / i && n / i !== n) divisors.push(n / i);
        }
    }
    return divisors.sort((a, b) => a - b);
}

// Función que verifica si un número es perfecto y retorna sus divisores si lo es
function getPerfectNumberInfo(n) {
    if (n < 2) return null;
    const divisors = getDivisors(n);
    const sum = divisors.reduce((acc, val) => acc + val, 0);
    if (sum === n) {
        return { number: n, divisors };
    }
    return null;
}

// Función para encontrar todos los números perfectos y sus divisores en un rango
function findPerfectNumbers(start, end) {
    const perfectNumbers = [];
    for (let i = start; i <= end; i++) {
        const info = getPerfectNumberInfo(i);
        if (info) {
            perfectNumbers.push(info);
        }
    }
    return perfectNumbers;
}

// Función para mostrar los resultados en la página web
function displayResults(perfectNumbers) {
    const resultsDiv = document.getElementById('results');
    if (perfectNumbers.length === 0) {
        resultsDiv.textContent = "No se encontraron números perfectos en este rango.";
    } else {
        resultsDiv.innerHTML = '<ul>' + perfectNumbers.map(obj => `<li>${obj.number} = ${obj.divisors.join(' + ')}</li>`).join('') + '</ul>';
    }
    document.getElementById('results-section').classList.remove('d-none');
}

// Función para descargar los resultados como un archivo .txt
function downloadResults(perfectNumbers, start, end) {
    let content = `Números perfectos en el rango ${start} a ${end}:\n`;
    if (perfectNumbers.length === 0) {
        content += "No se encontraron números perfectos.";
    } else {
        content += perfectNumbers.map(obj => `${obj.number} = ${obj.divisors.join(' + ')}`).join('\n');
    }
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `numeros_perfectos_${start}_a_${end}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Manejador de eventos para el formulario principal
document.getElementById('perfect-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const start = parseInt(document.getElementById('start').value, 10);
    const end = parseInt(document.getElementById('end').value, 10);

    if (isNaN(start) || isNaN(end) || start < 1 || end < 1 || start > end) {
        alert("Por favor, ingresa un rango válido (números naturales, inicio menor o igual al fin).");
        return;
    }

    const perfectNumbers = findPerfectNumbers(start, end);
    displayResults(perfectNumbers);

    // Asigna la función de descarga al botón correspondiente
    document.getElementById('download-btn').onclick = function() {
        downloadResults(perfectNumbers, start, end);
    };
}); 