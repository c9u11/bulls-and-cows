import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    borderColor: string;
    errorColor: string;
    accentColor: string;
    boxBgColor: string;
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