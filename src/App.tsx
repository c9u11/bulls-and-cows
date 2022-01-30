import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { isDarkAtom } from "./atom/themeAtoms";
import BaseLayout from "./components/BaseLayout";
import Content from "./components/Content";
import { darkTheme, lightTheme } from "./theme";

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <BaseLayout />
      <Content />
    </ThemeProvider>
  );
}

export default App;
