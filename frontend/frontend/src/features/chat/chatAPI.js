

export const sendMessage = async (message) => {
    const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message })
    });


    if (!response.ok) {
        throw new Error("Failed to fetch from backend");
    }

    const data = await response.json();
    console.log('Backend response:', data);
    return data.response;
};

