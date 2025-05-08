export function formatDate(dateInput?: Date, includeHour: boolean = false): string {
    const date = dateInput ?? new Date();

    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    if (includeHour) {
        options.hour = "2-digit";
        options.minute = "2-digit";
    }

    return date.toLocaleDateString("pt-BR", options);
}