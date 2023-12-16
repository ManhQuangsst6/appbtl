import apiService from "./api-service";
const name = '/Image'
export const PostImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        responseType: 'text',
    };
    return apiService.post(name, formData, config);
}
export const RemoveImage = (fileName) => {
    return apiService.delete(`${name}?imageName=${fileName}`, { responseType: 'text' });
}
export const GetImage = (fileName) => {
    return apiService.get(`${name}?imagePaths=${fileName}`, { responseType: 'blob' });
}