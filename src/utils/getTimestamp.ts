export function GetTimestamp() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    return timestamp;
}