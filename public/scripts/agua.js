function updateWaterLevel() {
    const input = document.getElementById('percentageInput');
    const waterLevel = document.getElementById('waterLevel');
    const percentage = parseFloat(input.value);

    if (percentage >= 0 && percentage <= 100) {
        waterLevel.style.height = `${percentage}%`;
    } else {
        alert('Porcentaje inválido. Ingrese un número entre 0 y 100.');
    }
}
