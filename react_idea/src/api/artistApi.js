import {httpClient} from "./httpClient.js";

export async function getList(page = 1, size = 10) {
    // axios get
    const resp = await httpClient.get(`/artists`, {
        params: {page, size}
    });

    // return response
    return resp;
}

// 1. GET
const getResource = async () => {
    // Tương đương với: /api/v1/artists?page=1&size=10
    const resp = await httpClient.get('/artists', {
        params: { page: 1, size: 10 }
    });
    console.log(resp.data);
};

// 2. POST
const createResource = async (newArtistData) => {
    // Truyền trực tiếp Object, không cần JSON.stringify
    const resp = await httpClient.post('/artists', newArtistData);
    console.log(resp.data);
};

// 3. PUT
const updateResource = async (id, updatedData) => {
    const resp = await httpClient.put(`/artists/${id}`, updatedData);
    console.log(resp.data);
};

// 4. DELETE
const deleteResource = async (id) => {
    const resp = await httpClient.delete(`/artists/${id}`);
    console.log("Deleted");
};