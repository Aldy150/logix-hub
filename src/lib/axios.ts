import axios from 'axios';

const api = axios.create({
    // L'URL de ton backend Laravel
    baseURL: 'http://localhost:8000', 
    
    // INDISPENSABLE : Autorise l'envoi des cookies (session, XSRF)
    withCredentials: true, 
    
    // INDISPENSABLE : Permet à Axios de récupérer automatiquement 
    // le token CSRF dans les cookies pour l'envoyer dans les headers
    withXSRFToken: true, 
    
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
});

export default api;