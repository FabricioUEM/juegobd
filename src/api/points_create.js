import { API_BASE_URL } from '../config/config.js';
// Definir la función fetchDataBestScore que realizará la solicitud HTTP
export async function pointsCreate(email, coins, level, hearts, seconds) {
    try {
        const response = await fetch(`${API_BASE_URL}/create-points`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                email : email,
                coins: coins,
                level: level,
                hearts: hearts,
                time:seconds
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Point created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating point:', error);
        throw error;
    }
}
