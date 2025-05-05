export function formatDate(date: Date | undefined) {

    if (!date) {
        date = new Date()
    }

    return date.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}