import apiService from "./api-service";
const name = '/SanPham'
export const GetAllProduct = (maSP, loai, thuongHieu) => {
    let link = name + '?';
    if (maSP !== '' && maSP != null) link = link + 'maSP=' + maSP + '&'
    if (loai !== '' && loai != null) link = link + 'loai=' + loai + '&'
    if (thuongHieu !== '' && thuongHieu != null) link = link + 'thuongHieu=' + thuongHieu + '&'
    return apiService.get(link);
}
export const GetListTypeProduct = () => {
    return apiService.get(`TypeProduct`);
}
export const GetListBrand = () => {
    return apiService.get(`Brand`);
}
export const RemoveProductbyID = (id) => {
    return apiService.delete(`${name}?id=${id}`);
}
export const PostProduct = (data) => {
    return apiService.post(`${name}`, data);
}
export const PutProduct = (data) => {
    return apiService.put(`${name}`, data);
}
export const GetProductByID = (id) => {
    return apiService.get(`${name}/ID?id=${id}`);
}