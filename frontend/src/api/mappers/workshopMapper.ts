import { type Workshop } from "../../types/workshop";

export function mapWorkshopFromApi(data: any): Workshop {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    category: data.category,
    startDate: new Date(data.start_date ?? data.startDate),
    createdAt: new Date(data.created_at ?? data.createdAt),
  };
}
