import { Pizza, Sandwich, Soup } from "./formValues";

export type responseTypes = {
  id: number;
  name: string;
  preparation_time: string;
} & (Pizza | Soup | Sandwich);
