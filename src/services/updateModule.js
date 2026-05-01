export default async function updateModule(id, data) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/modules/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
        credentials: "include",
    });

    return response;
};