export default async function addTest(payload) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tests/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload }),
        credentials: "include",
    });

    return response;
}
