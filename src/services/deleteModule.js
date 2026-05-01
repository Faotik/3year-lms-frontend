export default async function deleteModule(id) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/modules/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
};