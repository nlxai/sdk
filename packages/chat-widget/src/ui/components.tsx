import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Theme } from "../theme";
import * as constants from "./constants";
import tinycolor from "tinycolor2";

// Mixins

export const hoverBg = `
  :hover::after {
    content: ' ';
    position: absolute;
    border-radius: 50%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export const focusShadow = (theme: Theme) => `
  box-shadow: 0 0 0 3px ${tinycolor(theme.primaryColor)
    .setAlpha(0.15)
    .toRgbString()};
`;

// PendingMessageDots

const bounceKeyframes = keyframes`
0% {
  transform: translate3d(0, 0, 0);
}

30% {
  transform: translate3d(0, -3px, 0);
}

60% {
  transform: translate3d(0, 0, 0);
}

100% {
  transform: translate3d(0, 0, 0);
}
`;

// The 'display: block !important' rule circumvents typical base CSS rules that set 'display: none' on empty HTML elements
const Dot = styled.div<{}>`
  display: block !important;
  width: 6px;
  height: 6px;
  flex: 0 0 6px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.darkMessageColor};
  animation: ${bounceKeyframes} 1s infinite ease-in-out;
  margin-right: 4px;
  &:last-of-type {
    margin-right: 0;
  }
  &:nth-of-type(1) {
    animation-delay: 0s;
  }
  &:nth-of-type(2) {
    animation-delay: -0.15s;
  }
  &:nth-of-type(3) {
    animation-delay: -0.3s;
  }
`;

const DotsContainer = styled.div<{}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 0;
`;

export const LoaderContainer = styled.div<{}>`
  display: flex;
`;

export const LoaderText = styled.span<{}>`
  display: inline-block;
  margin-left: 10px;
  font-size: ${constants.fontSize}px;
`;

export const PendingMessageDots: React.FunctionComponent<{}> = () => (
  <DotsContainer>
    <Dot />
    <Dot />
    <Dot />
  </DotsContainer>
);

// Container

const top = 20;
const bottom = 90;

export const Container = styled.div<{}>`
  position: fixed;
  top: ${(props) => {
    if (!props.theme.windowInnerHeight) {
      return `${top}px`;
    }
    return `${Math.max(
      props.theme.windowInnerHeight - props.theme.chatWindowMaxHeight - bottom,
      top,
    )}px`;
  }};
  right: ${top}px;
  bottom: ${bottom}px;
  width: calc(100% - 40px);
  border-radius: ${(props) => props.theme.borderRadius}px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.white};
  z-index: ${constants.largeZIndex};

  @media screen and (min-width: 360px) {
    & {
      width: 320px;
    }
  }

  & * {
    font-family: ${(props) => props.theme.fontFamily};
  }
`;

// Main

export const Main = styled.div<{}>`
  height: calc(100% - ${constants.bottomHeight}px);
  overflow: auto;
`;

// MessageGroups

export const MessageGroups = styled.div<{}>`
  padding: ${(props) => props.theme.spacing}px;
  box-sizing: border-box;

  z-index: 1;
  position: relative;

  & > * {
    margin-bottom: ${(props) => props.theme.spacing}px;
  }

  & > :last-child {
    margin-bottom: 0px;
  }
`;

// MessageGroup

export const MessageGroup = styled.div<{}>`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: ${(props) => props.theme.spacing / 2}px;
  }

  & > :last-child {
    margin-bottom: 0px;
  }
`;

// Message

export const Message = styled.div<{ type: "user" | "bot" }>`
  background-color: ${(props) =>
    props.type === "user"
      ? props.theme.darkMessageColor
      : props.theme.lightMessageColor};
  color: ${(props) => (props.type === "user" ? props.theme.white : "#676767")};
  padding: ${(props) => `${props.theme.spacing}px ${props.theme.spacing}px`};
  max-width: calc(100% - 20px);
  ${(props) =>
    props.type === "user"
      ? "margin-left: 20px; margin-right: 0; border-radius: 10px 10px 0 10px; align-self: flex-end;"
      : "margin-right: 20px; margin-left: 0; border-radius: 10px 10px 10px 0; align-self: flex-start;"}
  p {
    color: ${(props) =>
      props.type === "user" ? props.theme.white : "#232323"};
  }

  ul,
  ol {
    list-style-position: inside;
  }

  ul {
    list-style-type: disc;
  }

  ul ::marker {
    margin-right: 6px;
  }

  ol {
    list-style-type: decimal;
  }
`;

export const FailureMessage = styled.p<{}>`
  text-align: center;
  flex-wrap: wrap;
  font-size: ${constants.smallFontSize}px;
  border-radius: ${(props) => props.theme.borderRadius}px;
  color: #bf1c1c;
  & svg {
    display: inline-block;
    position: relative;
    top: -1px;
    flex: 0 0 ${constants.fontSize - 2}px;
    width: ${constants.fontSize - 2}px;
    height: ${constants.fontSize - 2}px;
    margin-right: 4px;
  }
`;

// MessageBody

export const MessageBody = styled.p<{}>`
  margin: 0;
  font-size: ${constants.fontSize}px;
  a,
  a:visited {
    color: inherit;
    font-size: ${constants.fontSize}px;
  }
  p {
    margin: 0;
    font-size: ${constants.fontSize}px;
  }
  img {
    max-width: 80px;
    max-height: 60px;
  }
`;

// Bottom

export const Bottom = styled.div<{}>`
  height: ${constants.bottomHeight}px;
  position: relative;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-bottom-left-radius: ${(props) => props.theme.borderRadius}px;
  border-bottom-right-radius: ${(props) => props.theme.borderRadius}px;
`;

export const IconButton = styled.button<{ disabled?: boolean }>`
  height: 35px;
  width: 35px;
  border-radius: 18px;
  flex: none;
  padding: 8px;
  font-size: ${constants.fontSize}px;
  ${(props) =>
    props.disabled
      ? `
  opacity: 0.6;
  `
      : `
  `}
  border: 0;
  box-shadow: none;
  color: ${(props) => props.theme.primaryColor};
  background: none;
  position: relative;
  cursor: pointer;

  :focus {
    outline: none;
    ${(props) => focusShadow(props.theme)}
  }

  :disabled {
    cursor: auto;
  }

  svg {
    fill: ${(props) => props.theme.primaryColor};
  }

  ${hoverBg}
`;

export const BottomButtonsContainer = styled.div<{}>`
  position: absolute;
  top: 50%;
  right: ${(props) => `${props.theme.spacing}px`};
  transform: translate3d(0, -50%, 0);
`;

export const Input = styled.input<{}>`
  display: block;
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: transparent;
  padding: ${(props) =>
    `0 ${2 * props.theme.spacing}px 0 ${2 * props.theme.spacing}px`};
  font-size: ${constants.fontSize}px;
  border: none;

  :focus {
    outline: none;
  }
`;

export const Pin = styled.button<{}>`
  position: fixed;
  background-color: ${(props) => props.theme.primaryColor};
  border: 0;
  right: 20px;
  bottom: 20px;
  width: 52px;
  height: 52px;
  border-radius: 30px;
  cursor: pointer;
  padding: 12px;
  color: ${(props) => props.theme.white};
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.4);
  z-index: ${constants.largeZIndex};

  :focus {
    outline: none;
  }

  > img {
    max-width: 30px;
    max-height: 30px;
  }

  > svg {
    fill: ${(props) => props.theme.white};
  }

  ${hoverBg}
`;

// PinBubble

export const PinBubble: React.FunctionComponent<{
  isActive: boolean;
  content: string;
  onClick: () => void;
}> = (props) => (
  <PinBubbleContainer isActive={props.isActive}>
    <PinBubbleButton onClick={props.onClick}>
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </PinBubbleButton>
    {props.content}
  </PinBubbleContainer>
);

export const PinBubbleContainer = styled.div<{
  isActive: boolean;
}>`
  position: fixed;
  bottom: 84px;
  right: 19px;
  border-radius: 6px;
  box-sizing: border-box;
  width: fit-content;
  white-space: pre;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.3);
  height: 32px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  z-index: ${constants.largeZIndex};
  padding: 0px 16px 0px 0px;
  background-color: ${(props) =>
    tinycolor(props.theme.primaryColor).darken(10).toRgbString()};
  color: #fff;
  transition:
    opacity 0.2s,
    transform 0.2s;
  ${(props) =>
    props.isActive
      ? `
    opacity: 1;
    transform: translate3d(0, 0, 0);
    pointer-events: all;
    `
      : `
    opacity: 0;
    transform: translate3d(0, 10px, 0);
    pointer-events: none;
  `}
  ::after {
    position: absolute;
    top: 32px;
    right: 22px;
    content: " ";
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid
      ${(props) => tinycolor(props.theme.primaryColor).darken(10).toRgbString()};
  }
`;

// PinBubbleButton

export const PinBubbleButton = styled.button<{}>`
  width: 32px;
  height: 32px;
  border: 0;
  color: ${(props) => props.theme.white};
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background: none;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  svg {
    width: 100%;
    height: 100%;
    fill: ${(props) => props.theme.white};
  }
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  :focus {
    outline: none;
    box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.2);
  }
`;

// ChoicesContainer

export const ChoicesContainer = styled.div<{}>`
  margin-top: 10px;
  margin-bottom: -6px;

  > * {
    margin-right: 6px;
    margin-bottom: 6px;
  }

  > :last-child {
    margin-right: 0px;
  }
`;

// ChoiceButton

export const ChoiceButton = styled.button<{
  disabled?: boolean;
  selected?: boolean;
}>`
  ${(props) =>
    `
  background-color: ${props.theme.primaryColor};
  color: ${props.theme.white};
  `}
  ${(props) =>
    props.selected
      ? `
  outline: 2px solid ${props.theme.primaryColor};
  outline-offset: 2px;
  `
      : `
  `}
  ${(props) => {
    const hoverColor = tinycolor(props.theme.primaryColor)
      .brighten(5)
      .toRgbString();
    return props.disabled
      ? `
  opacity: 0.5;
      `
      : `
  cursor: pointer;

  :hover {
    background-color: ${hoverColor};
    border-color: ${hoverColor};
  }

  :focus {
    outline: none;
    ${focusShadow(props.theme)}
  }
      `;
  }}
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: 1px solid ${(props) => props.theme.primaryColor};
  font-size: ${constants.fontSize}px;
  padding: 4px 12px;

  & p,
  & em,
  & a,
  & strong,
  & span,
  & i,
  & b {
    font-size: ${constants.fontSize}px;
    margin: 0;

    ${(props) => `
    color: ${props.theme.white};
  `}
  }

  text-align: left;

  :focus {
    outline: none;
  }
`;

// TitleBar

export const TitleBar = styled.div<{}>`
  height: ${constants.bottomHeight}px;
  padding: 0 ${(props) => 2 * props.theme.spacing}px;
  border-top-left-radius: ${(props) => props.theme.borderRadius}px;
  border-top-right-radius: ${(props) => props.theme.borderRadius}px;
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
`;

// TitleContainer

export const TitleContainer = styled.div<{}>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

// Title

export const Title = styled.p<{}>`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: ${(props) => props.theme.white};
`;

// DiscreteButton

export const DiscreteLink = styled.a<{}>`
  color: ${(props) => props.theme.white};
  border: 0;
  display: inline-flex;
  width: 12px;
  height: 12px;
  align-items: center;
  font-size: 11px;
  border-radius: 4px;
  padding: 4px 8px;
  background: none;
  cursor: pointer;
  :hover {
    background: rgba(255, 255, 255, 0.2);
  }
  :focus {
    outline: none;
    box-shadow: 0 0 0 3px #dedede;
  }
  > svg {
    color: ${(props) => props.theme.white};
    width: 12px;
    height: 12px;
  }
`;

// TitleIcon

export const TitleIcon = styled.img<{}>`
  width: 22px;
  height: 22px;
  margin-right: 6px;
`;
