import { 
  type CustomModalityComponent,
  Carousel, 
  CustomCard, 
  CustomCardImageRow, 
  BaseText 
} from "@nlxai/touchpoint-ui";

interface MuseumExhibitDetailsData {
  id: string;
  name: string;
  imageUrl: string;
  detailImageUrls: string[];
  endDate: string;
  galleryLocation: string;
  summary: string;
}

export const MuseumExhibitDetails: CustomModalityComponent<MuseumExhibitDetailsData> = ({ data }) => {
  const detailImageUrls = data.detailImageUrls;
  return (
    <>
      <Carousel>
        <CustomCard key={`main-${data.name}`}>
          <CustomCardImageRow src={data.imageUrl} alt={data.name} />
        </CustomCard>
        {detailImageUrls.map((imageUrl, index) => (
          <CustomCard key={`alt-${data.name}-${index}`}>
            <CustomCardImageRow src={imageUrl} alt={data.name} />
          </CustomCard>
        ))}
      </Carousel>
      <BaseText faded>Dates</BaseText>
      <BaseText>Through {data.endDate}</BaseText>

      <BaseText faded>Location</BaseText>
      <BaseText>{data.galleryLocation}</BaseText>

      <BaseText faded>About this exhibition</BaseText>
      <BaseText>{data.summary}</BaseText>
    </>
  );
};