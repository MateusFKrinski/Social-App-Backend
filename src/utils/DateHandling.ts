export function ValidateDate(dateValue: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(dateValue)) return false;

    const [year, month, day] = dateValue.split("-").map(Number);

    return !(month < 1 ||
        month > 12 ||
        day < 1 ||
        day > new Date(year, month, 0).getDate());
}
