import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import GlobalStyle from "./styles/globalStyles";
import PomodoroTimer from "./components/pomodoroTimer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PomodoroTimer />
    </ThemeProvider>
  );
}

export default App;
