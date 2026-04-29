export function createOption() {
    return "";
}

export function createQuestion() {
    return {
        question: "",
        options: ["", ""],
        correctAnswer: "",
        marks: 1
    };
}

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

export function toLocalDatetimeValue(isoString) {
    if (!isoString) return "";
    // Best-effort conversion for `<input type="datetime-local" />`
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return "";

    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
        date.getHours()
    )}:${pad(date.getMinutes())}`;
}

export function toISOFromLocalDatetime(localDatetime) {
    if (!localDatetime) return null;
    const date = new Date(localDatetime);
    if (Number.isNaN(date.getTime())) return null;
    return date.toISOString();
}

