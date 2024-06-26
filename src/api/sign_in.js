import { API_BASE_URL } from '../config/config.js';
// Definir la función fetchDataBestScore que realizará la solicitud HTTP
export async function fetchSignIn(username, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Datos de las mejores puntuaciones recibidos:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener los datos de las mejores puntuaciones:', error);
        throw error;
    }
}