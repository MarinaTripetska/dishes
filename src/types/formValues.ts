export type FormValues = {
  name: string;
  preparation_time: string;
  type: "pizza" | "soup" | "sandwich";
  no_of_slices?: number | string;
  diameter: number | string;
  spiciness_scale?: number | string;
  slices_of_bread?: number | string;
};
