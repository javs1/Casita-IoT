// Manejo del cambio de color para el interruptor de la puerta
const puertaSwitch = document.getElementById('puertaOb');
const puertaSensor = document.getElementById('puertaSensor');

puertaSwitch.addEventListener('change', () => {
    puertaSensor.style.backgroundColor = puertaSwitch.checked ? 'green' : 'red';
});

// Repite el mismo patrón para los interruptores de luz y ventana
// ...

// Puedes agregar lógica JavaScript adicional aquí si es necesario
