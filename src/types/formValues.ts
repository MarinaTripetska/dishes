export type FormValues = {
  name: string;
  preparation_time: string;
  type: "pizza" | "soup" | "sandwich";
  no_of_slices?: number | string;
  diameter?: number | string;
  spiciness_scale?: number | string;
  slices_of_bread?: number | string;
};

export type Pizza = {
  type: "pizza";
  no_of_slices: number;
  diameter: number;
};

export type Soup = {
  type: "soup";
  spiciness_scale: number;
};

export type Sandwich = {
  type: "sandwich";
  slices_of_bread: number;
};

export type DishValues = {
  name: string;
  preparation_time: string;
} & (Pizza | Soup | Sandwich);
