import { httpClient } from "./httpClient";

export async function getAlbumList(page = 1, size = 10) {
  return await httpClient.get("/albums", {
    params: { page, size },
  });
}

export async function getAlbum(albumId) {
  return await httpClient.get(`/albums/${albumId}`);
}

export async function createAlbum(data) {
  return await httpClient.post("/albums", data);
}

export async function updateAlbum(albumId, data) {
  return await httpClient.put(`/albums/${albumId}`, data);
}

export async function deleteAlbum(albumId) {
  return await httpClient.delete(`/albums/${albumId}`);
}
