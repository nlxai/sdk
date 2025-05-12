import { Icons, html, React, CustomCard, Carousel, BaseText, SmallText, IconButton, TextButton, CustomCardImageRow, CustomCardRow, DateInput } from '@nlxai/touchpoint-ui';
import { type DateInputExample, type ProductCard, type CarouselExample, type CarouselExampleItem, type ButtonExample, type IconButtonExample } from '../../types/TouchpointBasicExamplesTypes';


export const ProductCardComponent = ({ data, conversationHandler }: { data: ProductCard; conversationHandler: any }) => {
  const handler = conversationHandler;
  const [selected, setSelected] = React.useState<string | null>(null);
  console.log(data);
  const component = (
    <CustomCard
      key={data.id}
      selected={selected === data.id}
      onClick={() => {
        setSelected(data.id);
        handler.sendChoice(data.id);
      }}
      >
        <CustomCardImageRow
          src={data.productImageUrl}
          alt={data.name}
        />
        <CustomCardRow
          left={<BaseText>${data.name}</BaseText>}
          right={<BaseText>${data.price}</BaseText>}
        />
      </CustomCard>
    );
  return component;
};

export const CarouselExampleComponent = ({ data, conversationHandler }:  { data: CarouselExample; conversationHandler: any }) => {
  const handler = conversationHandler;
  const [selected, setSelected] = React.useState<number | null>(null);
  console.log(data);
  const component = (<Carousel>
    {data.map((cardData, cardIndex) => (
      <CustomCard
        key={cardIndex}
        selected={selected === cardIndex}
        onClick={() => {
          setSelected(cardIndex);
          handler.sendChoice(cardData.id);
        }}
      >
        <CustomCardImageRow
          src={cardData.imageUrl}
          alt="Alt Text"
        />
        <CustomCardRow
          left={<BaseText>{cardData.leftText}</BaseText>}
          right={<BaseText>{cardData.rightText}</BaseText>}
        />
      </CustomCard>
    ))}
  </Carousel>);
  return component;
};


export const ButtonExampleComponent = ({ data, conversationHandler }: {data: ButtonExample; conversationHandler: any }) => {
  const handler = conversationHandler;
  console.log(data);
  const component = (
    <TextButton
      label={data.buttonLabel}
      Icon={Icons.ArrowForward}
      onClick={() => handler.sendChoice(data.buttonId)}
    />
  );
  return component;
};

export const IconButtonExampleComponent = ({ data, conversationHandler }: {data: IconButtonExample, conversationHandler: any }) => {
  const handler = conversationHandler;
  console.log(data);
  const component = (
    <IconButton
      label={data.buttonLabel}
      Icon={Icons.ArrowForward}
      onClick={() => handler.sendChoice(data.buttonId)}
      type="main"
  />
  );
  return component;

};

export const DateInputExampleComponent = ({ data, conversationHandler }: {data: DateInputExample, conversationHandler: any}) => {
  return (
    <DateInput
      onSubmit={(date: string) =>
        conversationHandler.sendSlots({ TouchpointDateInputResult: date })
      }
    />)
};