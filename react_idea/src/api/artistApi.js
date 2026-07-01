import { httpClient } from "./httpClient";

export async function getArtistList(page = 1, size = 10) {
  return await httpClient.get("/artists", {
    params: { page, size },
  });
}

export async function getArtist(artistId) {
  return await httpClient.get(`/artists/${artistId}`);
}

export async function createArtist(data) {
  return await httpClient.post("/artists", data);
}

export async function updateArtist(artistId, data) {
  return await httpClient.put(`/artists/${artistId}`, data);
}

export async function deleteArtist(artistId) {
  return await httpClient.delete(`/artists/${artistId}`);
}
