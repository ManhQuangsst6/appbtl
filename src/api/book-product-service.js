import apiService from "./api-service";
const name = '/Order'
export const GetAllOrder = (nameSearch, time) => {
    let link = name + '?';
    if (nameSearch !== '' && nameSearch != null) link = link + 'name=' + nameSearch + '&'
    if (time !== '' && time != null) link = link + 'time=' + time + '&'
    return apiService.get(link);
}
export const PostOrder = (data) => {
    return apiService.post(`${name}`, data);
}
export const GetOrderByID = (id) => {
    return apiService.get(`${name}/item?id=` + id);
}