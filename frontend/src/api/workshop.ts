import { http } from "./http";
import { type Workshop } from "../types/workshop";
import { mapWorkshopFromApi } from "./mappers/workshopMapper";

export const listWorkshops = async (): Promise<Workshop[]> => {
  const res = await http.get("/talleres/");
  return res.data.map(mapWorkshopFromApi);
};

export const getWorkshop = async (workshopId: number): Promise<Workshop> => {
  const res = await http.get(`/talleres/${workshopId}/`);
  return mapWorkshopFromApi(res.data);
};

export const createWorkshop = async (
  name: string,
  description: string,
  category: string,
  startDate: Date,
): Promise<Workshop> => {
  const res = await http.post("/talleres/", {
    name,
    description,
    start_date: startDate,
    category,
  });
  return mapWorkshopFromApi(res.data);
};

export const updateWorkshop = async (
  workshopId: number,
  name: string,
  description: string,
  category: string,
  start_date: Date,
): Promise<Workshop> => {
  const res = await http.put(`/talleres/${workshopId}/`, {
    name,
    description,
    category,
    start_date,
  });
  return mapWorkshopFromApi(res.data);
};

export const deleteWorkshop = async (workshopId: number): Promise<void> => {
  await http.delete(`/talleres/${workshopId}/`);
};
