// Creates an empty option string.
export function createOption() {
    return "";
}

// Creates a new question object with default values.
export function createQuestion() {
    return {
        question: "",
        options: ["", ""],
        correctAnswer: "",
        marks: 1
    };
}

// Creates a new test draft object with default values.
export function createTestDraft({ moduleId = "" } = {}) {
    return {
        id: "",
        title: "",
        description: "",
        moduleId,
        deadline: "",
        questions: [createQuestion()]
    };
}

// Converts an ISO date string to a format compatible with `<input type="datetime-local" />`.
export function toLocalDatetimeValue(isoString) {
    if (!isoString) return "";

    // Convert from ISO string to local datetime string.
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return "";

    // handler to convert month and date to two digits. Example: 1 -> 01
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
        date.getHours()
    )}:${pad(date.getMinutes())}`;
}

// Converts a local datetime string back to an ISO string.
export function toISOFromLocalDatetime(localDatetime) {

    // If the local datetime string is empty, return null.
    if (!localDatetime) {
        return null;
    }

    // Convert from local datetime string to ISO string.
    const date = new Date(localDatetime);
    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return date.toISOString();
}

