export default async function deleteTest(id) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tests/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
}
