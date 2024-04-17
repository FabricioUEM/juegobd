import { API_BASE_URL } from '../config/config.js';
// Definir la función getCurrentWorld que realizará la solicitud HTTP
export async function getCurrentWorld(email) {
    try {
        const response = await fetch(`${API_BASE_URL}/points`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Datos del usuario con su puntuación:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener los datos de las mejores puntuaciones:', error);
        throw error;
    }
}