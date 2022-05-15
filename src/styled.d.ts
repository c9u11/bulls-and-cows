import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primaryTextColor: string;
    secondaryTextColor: string;
    bgColor: string;
    borderColor: string;
    errorColor: string;
    accentColor: string;
    boxBgColor: string;
    boxTextColor: string;
    initBgColor: string;
    initBorderColor: string;
    focusBgColor: string;
    typedBorderColor: string;
    errorBorderColor: string;
    emptyBgColor: string;
    emptyBorderColor: string;
    halfBgColor: string;
    halfBorderColor: string;
    fullBgColor: string;
    fullBorderColor: string;
  }
}