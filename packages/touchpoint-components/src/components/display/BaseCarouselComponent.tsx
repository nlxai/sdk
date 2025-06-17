
import { 
  type CustomModalityComponent,
  Carousel, 
  CustomCard, 
  CustomCardImageRow, 
  CustomCardRow, 
  BaseText,
  React
} from "@nlxai/touchpoint-ui";

interface BaseCarouselCardData {
  id: string;
  name: string;
  imageUrl: string;
  endDate: string;
}

type BaseCarouselComponentData = BaseCarouselCardData[];

export const BaseCarouselComponent: CustomModalityComponent<BaseCarouselComponentData> = ({ data, conversationHandler }) => {
  const [selected, setSelected] = React.useState<number | null>(null);

  return (
    <Carousel>
      {data.map((exhibit, index) => (
        <CustomCard
          key={index}
          selected={selected === index}
          onClick={() => {
            setSelected(index);
            conversationHandler.sendChoice(exhibit.id);
          }}
        >
          <CustomCardImageRow src={exhibit.imageUrl} alt={exhibit.name} />
          <CustomCardRow
            left={
              <BaseText faded>
                <div />
              </BaseText>
            }
            right={<BaseText>{exhibit.name}</BaseText>}
          />
          <CustomCardRow
            left={<BaseText faded>Dates</BaseText>}
            right={<BaseText>Through {exhibit.endDate}</BaseText>}
          />
        </CustomCard>
      ))}
    </Carousel>
  );
};