import { API_BASE_URL } from '../config/config.js';
// Definir la función fetchDataBestScore que realizará la solicitud HTTP
export async function finalScore(email, score) {
    try {
        const response = await fetch(`${API_BASE_URL}/final-scores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                email : email,
                score: score,
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Final score created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating final score:', error);
        throw error;
    }
}
