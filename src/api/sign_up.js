import { API_BASE_URL } from '../config/config.js';

// Definir la función fetchSignUp que realizará la solicitud HTTP para registro
export async function fetchSignUp(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Registro exitoso:', data);
        return data;
    } catch (error) {
        console.error('Error al intentar registrarse:', error);
        throw error;
    }
}