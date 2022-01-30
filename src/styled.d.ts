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
  }
}