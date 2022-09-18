import { createTheme, NextUIProvider } from "@nextui-org/react"
import { useDarkMode } from "next-dark-mode"
import withDarkMode from 'next-dark-mode'

const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      primary: '#0070f3',
      success: '#0070f3',
      error: '#ff0000',
      warning: '#ff0000',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#000000',
      border: '#eaeaea',
      backdrop: '#ffffff',
      disabled: '#eaeaea',
      placeholder: '#eaeaea',
      hover: '#eaeaea',
      link: '#0070f3',
    },
  }
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      primaryLight: '#ff5e57',
      primary: '#ff0039',
      primaryDark: '#c4002d',
      secondaryLight: '#ffbd2e',
      secondary: '#ff9f1a',
      secondaryDark: '#c76e00',
      successLight: '#27c93f',
      success: '#10ac44',
      successDark: '#0a8439',
      errorLight: '#ff5e57',
      error: '#ff0039',
      errorDark: '#c4002d',
      warningLight: '#ffbd2e',
      warning: '#ff9f1a',
      warningDark: '#c76e00',
      background: '#000000',
      surface: '#000000',
      text: '#ffffff',
      border: '#eaeaea',
      backdrop: '#000000',
      disabled: '#eaeaea',

      switchColorHover: "#ff0039",
      primarySolidHover: "#ff0039",
      switchColor: "#2b6125",
      link: "#ff0039",
      primaryLightContrast: "#ffffff",
      inputColor: "#2e3032",
    },
  }
})

function App({ Component, pageProps }) {
  const { darkModeActive } = useDarkMode()

  return (
    <NextUIProvider theme={darkModeActive ? darkTheme : lightTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default withDarkMode(App)