import { extendTheme, theme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const colors = {
  dark: {
    Nord0: "#2E3440",
    Nord1: "#3B4252",
    Nord2: "#434C5E",
  },
  light: {
    Nord4: "#D8DEE9",
    Nord5: "#E5E9F0",
    Nord6: "#ECEFF4",
  },
  aurora: {
    Nord7: "#8FBCBB",
    Nord8: "#88C0D0",
    Nord9: "#81A1C1",
    Nord10: "#5E81AC",
    Nord11: "#BF616A",
    Nord12: "#D08770",
    Nord13: "#EBCB8B",
    Nord14: "#A3BE8C",
    Nord15: "#B48EAD",
  },
};

const customTheme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        color: mode(colors.dark.Nord2, colors.light.Nord4)(props),
        bg: mode(colors.light.Nord6, colors.dark.Nord0)(props),
        backgroundImage: 'url("/assets/background-image.svg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      },
    }),
  },

  fonts: {
    ...theme.fonts,
    /** Example */
    // body: "Work Sans, sans-serif",
    // heading: "Markazi Text, serif",
  },

  colors: {
    ...theme.colors,
    /** Example */
    // teal: {
    //   ...theme.colors.teal,Email
    //   700: "#005661",
    //   500: "#00838e",
    //   300: "#4fb3be",
    // },
  },
  components: {
    Box: {
      baseStyle: {
        borderRadius: 15,
      },
    },
    FormControl: {
      parts: ["text", "label", "i", "input", "button"],
      baseStyle: (props) => ({
        backgroundColor: mode(colors.dark.Nord2, colors.light.Nord6)(props),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",

        maxWidth: "390px",
        maxHeight: "450px",

        minWidth: "350px",
        minHeight: "400px",

        borderRadius: 20,

        text: {
          fontSize: "40px",
          color: mode(colors.light.Nord6, colors.dark.Nord2)(props),
          fontWeight: "semibold",
          marginBottom: "5%",
        },
        label: {
          color: mode(colors.light.Nord6, colors.dark.Nord2)(props),
          fontSize: "15px",
          fontWeight: "lighter",
        },
        i: {
          backgroundColor: mode(colors.light.Nord6, colors.dark.Nord2)(props),
          marginBottom: "12%",
          height: "40px",
        },
        input: {
          color: mode(colors.dark.Nord2, colors.light.Nord6)(props),
          backgroundColor: mode(colors.light.Nord4, colors.dark.Nord0)(props),
          height: "40px",
          _placeholder: {
            color: mode(colors.dark.Nord2, colors.light.Nord6)(props),
          },
        },
        button: {
          marginTop: "4%",
          height: "40px",
        },
      }),
      sizes: {
        md: {
          width: "25%",
          marginRight: "8%",
          padding: "25px",
        },
      },
      defaultProps: {
        size: "md",
      },
    },
  },
});

export default customTheme;
