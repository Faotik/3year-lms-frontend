async function getAdminStats() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/statistic`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
};

export default getAdminStats;
