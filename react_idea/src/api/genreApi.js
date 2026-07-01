import { httpClient } from "./httpClient";

export async function getGenreList(page = 1, size = 10) {
  return await httpClient.get("/genres", {
    params: { page, size },
  });
}

export async function getGenre(genreId) {
  return await httpClient.get(`/genres/${genreId}`);
}

export async function createGenre(data) {
  return await httpClient.post("/genres", data);
}

export async function updateGenre(genreId, data) {
  return await httpClient.put(`/genres/${genreId}`, data);
}

export async function deleteGenre(genreId) {
  return await httpClient.delete(`/genres/${genreId}`);
}
