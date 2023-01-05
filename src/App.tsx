import { BrowserRouter } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { isDarkAtom } from "./atom/settingAtoms";
import RouterConfig from "./routes/RouterConfig";
import { darkTheme, lightTheme } from "./theme";

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
