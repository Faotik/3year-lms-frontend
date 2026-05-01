export default async function updateTest(payload) {
    const id = payload.id || payload._id;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tests/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload }),
        credentials: "include",
    });

    return response;
}
