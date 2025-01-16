"use server";

import {
  createDirectus,
  staticToken,
  rest,
  createItem
} from "@directus/sdk";

const apiUrl = process.env.DIRECTUS_URL!;
const apiToken = process.env.DIRECTUS_API_TOKEN!;
const saveToApi = process.env.SAVE_TO_API!;

const client = createDirectus(apiUrl).with(staticToken(apiToken)).with(rest());

export const saveColor = async ( color: string) => {
  if (saveToApi === "true") {
    client.request(createItem('color_conversions', { color }));
  }
}