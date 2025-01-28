import axios from "axios";

export async function fetchPhHistory(fieldId) {
    const response = await axios.get(`http://localhost:5001/ph/history/${fieldId}`);
    return response.data;
}

export async function simulatePhData(fieldId) {
    const response = await axios.post(`http://localhost:5001/ph/simulate/${fieldId}`);
    return response.data;
}
