document.addEventListener('DOMContentLoaded', function() {
    const coordinateInput = document.getElementById('coordinates');
    const openMapsBtn = document.getElementById('openMapsBtn');
    const errorMessage = document.getElementById('error-message');

    // Função para mostrar mensagem de erro
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    // Função para esconder mensagem de erro
    function hideError() {
        errorMessage.classList.add('hidden');
    }

    // Função para validar coordenadas
    function validateCoordinates(coordString) {
        // Remove espaços extras
        coordString = coordString.trim();
        
        // Verifica se está vazio
        if (!coordString) {
            return { valid: false, error: 'Por favor, insira as coordenadas.' };
        }

        // Regex para validar formato de coordenadas
        // Aceita formatos como: -9.5265156264, -35.7837213732 ou -9.5265156264,-35.7837213732
        const coordPattern = /^(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)$/;
        const match = coordString.match(coordPattern);

        if (!match) {
            return { 
                valid: false, 
                error: 'Formato inválido. Use: latitude, longitude (ex: -9.5265156264, -35.7837213732)' 
            };
        }

        const latitude = parseFloat(match[1]);
        const longitude = parseFloat(match[2]);

        // Validar limites de latitude (-90 a 90)
        if (latitude < -90 || latitude > 90) {
            return { 
                valid: false, 
                error: 'Latitude deve estar entre -90 e 90.' 
            };
        }

        // Validar limites de longitude (-180 a 180)
        if (longitude < -180 || longitude > 180) {
            return { 
                valid: false, 
                error: 'Longitude deve estar entre -180 e 180.' 
            };
        }

        return { 
            valid: true, 
            latitude: latitude, 
            longitude: longitude 
        };
    }

    // Função para abrir Google Maps
    function openGoogleMaps(latitude, longitude) {
        const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(mapsUrl, '_blank');
    }

    // Event listener para o botão
    openMapsBtn.addEventListener('click', function() {
        hideError();
        
        const coordString = coordinateInput.value;
        const validation = validateCoordinates(coordString);

        if (!validation.valid) {
            showError(validation.error);
            coordinateInput.focus();
            return;
        }

        // Se chegou até aqui, as coordenadas são válidas
        openGoogleMaps(validation.latitude, validation.longitude);
    });

    // Event listener para Enter no campo de input
    coordinateInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            openMapsBtn.click();
        }
    });

    // Event listener para limpar erro quando o usuário começar a digitar
    coordinateInput.addEventListener('input', function() {
        if (!errorMessage.classList.contains('hidden')) {
            hideError();
        }
    });

    // Focar no campo de input quando a página carregar
    coordinateInput.focus();
});

