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
    name: "The Sporty",
    description: "For those looking to cover some serious distance.",
    imageUrl: "./images/mikkel-bech-yjAFnkLtKY0-unsplash.jpg",
    url: "",
  },
  {
    id: "2",
    name: "The Hip",
    description: "Time to hit the streets on that brand new fixie.",
    imageUrl: "./images/robert-bye-tG36rvCeqng-unsplash.jpg",
    url: "",
  },
  {
    id: "3",
    name: "The Scenic",
    description: "Never compromise on style with this classic remake.",
    imageUrl: "./images/sole-bicycles-zbFU4MM9WGQ-unsplash.jpg",
    url: "",
  },
];

export const Carousel: FC<{ data: Document[] }> = ({ data }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return html`
    <div className="chat-carousel-container">
      <div className="chat-carousel-slides">
        ${data.map(
          (document) => html`
            <div
              className=${`chat-carousel-slide ${
                selectedId === document.id ? "chat-carousel-slide--active" : ""
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
                  backgroundImage: `url(${document.imageUrl})`,
                }}
              />
              <div className="chat-carousel-description">
                ${document.description}
              </div>
            </div>
          `,
        )}
      </div>
    </div>
  `;
};
