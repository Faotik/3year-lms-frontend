async function getGraphStats() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/graphs/stats`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
};

export default getGraphStats;
