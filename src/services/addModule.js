export default async function addModule(data) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/modules/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
        credentials: "include",
    });

    return response;
};