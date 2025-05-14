export type ProductCard = {
  id: string;
  name: string;
  price: string;
  productImageUrl: string;
};

export type ButtonExample = {
  buttonId: string;
  buttonLabel: string;
};

export type IconButtonExample = {
  buttonId: string;
  buttonLabel: string;
};

export type CarouselExampleItem = {
  id: string;
  imageUrl: string;
  leftText: string;
  rightText: string;
};

export type CarouselExample = CarouselExampleItem[];

export type DateInputExample = { slotId: string };
