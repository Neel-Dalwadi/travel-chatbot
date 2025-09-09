

export const sendMessage = async (message) => {
    const token = localStorage.getItem("token");
    console.log('Sending message to backend:', message);
    const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
        },
        credentials: "include",
        body: JSON.stringify({ message })
    });
    console.log('Backend response status:', response.status);

    if (!response.ok) {
        throw new Error("Failed to fetch from backend");
    }

    const data = await response.json();
    console.log('Backend response:', data);
    return data.response;
};

