

## Modality Schemas

**MuseumKBCitations**

Used to render the source details component

```json
{
  "content": "",
  "fileName": "",
  "pageNumber": 1,
  "score": 1
}
```

**ExhibitCarousel**

``html
<Carousel>
<Card>
<Hero Image>
<Name>
<Card>
<Carousel>
```

```json
[
  {
    "id": "exhibit-1",
    "name": "Modern Art Collection",
    "imageUrl": "https://nlx-kb-onboarding-images.s3.us-east-1.amazonaws.com/exhibit-1/main-image.jpg",
    "detailImageUrl": "https://nlx-kb-onboarding-images.s3.us-east-1.amazonaws.com/exhibit-1/alt-image-1.jpg",
    "name": "Typography and Visual Communication",
    "summary": "Explore the cutting edge of contemporary design through bold typographic installations, conceptual case studies, and experimental visual languages. This exhibition showcases how today's designers are reimagining communication, breaking boundaries between art and design, and creating new visual vocabularies for our digital age.",
    "endDate": "July 3",  
    "galleryLocation": "Gallery A, Floor 2, West Wing"
  },
  {
    "id": "exhibit-2",
    "imageUrl": "https://nlx-kb-onboarding-images.s3.us-east-1.amazonaws.com/exhibit-2/main-image.jpg",
    "detailImageUrl": "https://nlx-kb-onboarding-images.s3.us-east-1.amazonaws.com/exhibit-2/alt-image-1.jpg",
    "name": "European Paintings 1400-1800",
    "summary": "Journey through four centuries of artistic mastery in this prestigious collection of European paintings. From Renaissance religious scenes to Baroque portraits and Romantic landscapes, explore how the greatest artists in history captured the human experience through revolutionary techniques in light, color, and composition.",
    "endDate": "January 14",
    "galleryLocation": "Floor 3, East Wing"
  },
  {
    "id": "exhibit-3",
    "imageUrl": "https://nlx-kb-onboarding-images.s3.us-east-1.amazonaws.com/exhibit-3/main-image.jpg",
    "detailImageUrl": "https://nlx-kb-onboarding-images.s3.us-east-1.amazonaws.com/exhibit-3/alt-image-1.jpg",
    "name": "Material Dialogues: Contemporary Sculpture",
    "summary": "A dynamic exploration of form and material featuring bold sculptural works that challenge traditional boundaries. From gleaming chrome figures to vibrant ceramic forms with expressive faces, this exhibition showcases how contemporary artists transform industrial and everyday materials into provocative statements about emotion, identity, and human connection.",
    "endDate": "October 3",
    "galleryLocation": "Main Hall, Ground Floor"
  },
  {
    "id": "exhibit-4",
    "imageUrl": "https://nlx-kb-onboarding-images.s3.us-east-1.amazonaws.com/exhibit-4/main-image.jpg",
    "detailImageUrl": "https://nlx-kb-onboarding-images.s3.us-east-1.amazonaws.com/exhibit-4/alt-image-1.jpg",
    "name": "Inside the Artist's Studio",
    "summary": "Step into the creative sanctuary where bold abstract forms come to life. This intimate studio tour showcases the working space and recent paintings exploring playful figures, vivid colors, and surrealist compositions that dance between consciousness and dreams.",
    "endDate": "May 22",
    "galleryLocation": "Studio D, Floor 4, West Wing"
  }
]
```
**ExhibitDetails**

```json
{
  "id": "exhibit-1",
  "imageUrl": "https://example.com/nature-palette-main.jpg",
  "detailImageUrl": "https://example.com/modern-art-detail.jpg",
  "name": "Modern Art Collection",
  "summary": "A stunning collection of contemporary pieces exploring themes of identity, technology, and human connection in the 21st century.",
  "endDate": "July 3",
  "galleryLocation": "Gallery A, Floor 2, West Wing"
}
```

```json
{
  "id": "exhibit-2",
  "detailImageUrl": "https://example.com/ancient-civ-detail.jpg",
  "name": "Ancient Civilizations",
  "summary": "Journey through time with artifacts and reconstructions from Egypt, Greece, Rome, and Mesopotamia, showcasing 5,000 years of human achievement.",
  "endDate": "January 14",
  "galleryLocation": "Main Hall, Ground Floor"
}
```

```json
{
  "id": "exhibit-3",
  "detailImageUrl": "https://example.com/ancient-civ-detail.jpg",
  "name": "Ancient Civilizations",
  "summary": "Journey through time with artifacts and reconstructions from Egypt, Greece, Rome, and Mesopotamia, showcasing 5,000 years of human achievement.",
  "endDate": "May 22",
  "galleryLocation": "Main Hall, Ground Floor"
}
```

```json
{
  "id": "exhibit-4",
  "detailImageUrl": "https://example.com/studio-tour-detail.jpg",
  "name": "Inside the Artist's Studio: Abstract Expressions",
  "summary": "Step into the creative sanctuary where bold abstract forms come to life. This intimate studio tour showcases the working space and recent paintings exploring playful figures, vivid colors, and surrealist compositions that dance between consciousness and dreams.",
  "endDate": "October 3",
  "galleryLocation": "Main Hall, Ground Floor"
}
```

```html
<Card>
<OtherImage/>
<Name/>
<Summary/>
<Dates/>
<Gallery-Location/>
<Other-Exhibits-Button/><Exit-Button/>
</Card>
```