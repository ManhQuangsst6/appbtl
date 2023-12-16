export const ConvertDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);

    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0'); // Thêm '0' đằng trước nếu tháng chỉ có 1 chữ số
    const day = dateTime.getDate().toString().padStart(2, '0'); // Thêm '0' đằng trước nếu ngày chỉ có 1 chữ số
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const seconds = dateTime.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}, ${day}/${month}/${year}`;
}