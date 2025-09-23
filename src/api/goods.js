const API_URL = 'https://backendstore-production.up.railway.app';

export async function getProducts(){
    const res = await fetch(`${API_URL}/products`);
    if(!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}