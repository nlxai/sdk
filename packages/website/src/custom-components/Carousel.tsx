import "./Carousel.css";
import { createElement, FC, useState } from "react";
import htm from "htm";

const html = htm.bind(createElement);

interface Document {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  url: string;
}

export const carouselExampleData: Document[] = [
  {
    id: "1",
    name: "Pumpkin season is here",
    description: "Time to fire up the oven and ask for that family recipe.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1694425773107-c3c44e345e1e?auto=format&fit=crop&q=80&w=388&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: ""
  },
  {
    id: "2",
    name: "Snacks galore",
    description:
      "Time to fill up the batteries with a collection of finest savory appetizers.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1695558759057-7922f0d53386?auto=format&fit=crop&q=80&w=387&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: ""
  },
  {
    id: "3",
    name: "Fancy coffee time",
    description:
      "Every time! The new drink trends are in, and caffeine lovers are all for them.",
    imageUrl:
      "https://images.unsplash.com/photo-1668854360535-4537b57d615f?auto=format&fit=crop&q=80&w=387&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: ""
  }
];

export const Carousel: FC<{ data: Document[] }> = ({ data }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return html`
    <div className="chat-carousel-container">
      <div className="chat-carousel-slides">
        ${data.map(
          document =>
            html`
              <div
                className=${`chat-carousel-slide ${
                  selectedId === document.id
                    ? "chat-carousel-slide--active"
                    : ""
                }`}
                key=${document.id}
                onClick=${() => {
                  setSelectedId(document.id);
                }}
              >
                <div className="chat-carousel-title">${document.name}</div>
                <div
                  className="chat-carousel-image"
                  style=${{
                    backgroundImage: `url(${document.imageUrl})`
                  }}
                />
                <div className="chat-carousel-description">
                  ${document.description}
                </div>
              </div>
            `
        )}
      </div>
    </div>
  `;
};
