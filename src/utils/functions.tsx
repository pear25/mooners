export function subtractHours(date: Date, hours: number) {
    date.setHours(date.getHours() - hours);
    return date;
}