import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
        global: {
            body: {
                minH: "100dvh",
            },
            ".chakra-avatar:has(.chakra-avatar__img)": {
                // Since we override the avatar colors, images may end up with a slight bg leaking through
                // This ensures the bg is always transparent when an image is present
                bg: "none",
            },
        },
    },
    fonts: {
        // heading: `'DM Sans', sans-serif`,
        // body: `'DM Sans', sans-serif`,
    },
    colors: {
        white: "#ffffff",
        black: "#242930",
        gray: {
            100: "#F6F9FF",
            200: "#EEF2FB",
            300: "#E3E9F6",
            400: "#D1D8E9",
            500: "#929DBB",
            600: "#6A7697",
            800: "#444D67",
        },
        purple: {
            100: "#EFEDFD",
            200: "#DFDAFB",
            300: "#BEB3FF",
            400: "#9685FF",
            500: "#5E47E9",
            600: "#4D3ABF", // generated
            700: "#3C2E94", // generated
            "opacity.10": "rgba(94, 71, 233, 0.1)",
        },
        linkedinBlue: {
            // note: chakraui has a "linkedin" scheme color but it's not correct.
            500: "#0A66C2",
            600: "#084C92",
        },
    },
    shadows: {
        // "2xl": "0 25px 50px -10px var(--chakra-colors-gray-200)",
        elevation4: "0 4px 20px 0 rgba(134, 136, 184, 0.2)", // #8688b8 20% opacity
    },
    components: {
        Container: {
            baseStyle: {
                maxW: "container.xl",
            },
        },
        Button: {
            baseStyle: {
                cursor: "pointer",
                borderRadius: "full",
                fontWeight: "normal",
            },
            sizes: {
                md: {
                    fontSize: "sm",
                },
            },
        },
        Card: {
            baseStyle: {
                // https://chakra-ui.com/docs/components/card/theming#anatomy
                container: {
                    bg: "white",
                    shadow: "elevation4",
                    borderRadius: "lg",
                    p: 6,
                },
                header: { p: 0, pb: 6, mb: 6, borderBottom: "1px solid", borderColor: "gray.200" },
                body: { p: 0 },
                // footer: { p: 8, pt: 0 },
            },
            variants: {
                subtle: {
                    container: {
                        bg: "gray.200",
                        shadow: "none",
                    },
                },
            },
        },

        Tag: {
            variants: {
                loader: {
                    container: {
                        bg: "purple.opacity.10",
                        gap: 3,
                        borderRadius: "full",
                        size: "lg",
                        px: 4,
                    },
                    label: {
                        color: "purple.500",
                        fontSize: "sm",
                    },
                },
            },
        },
        Heading: {
            baseStyle: {
                fontWeight: "700",
            },
            variants: {
                h1: {
                    fontSize: "3xl",
                },
                h2: {
                    fontSize: "2xl",
                },
                h3: {
                    fontSize: "xl",
                },
            },
        },
        Text: {
            baseStyle: {
                color: "gray.800",
            },
            variants: {
                labelCaps: {
                    textTransform: "uppercase",
                    fontSize: "xs",
                    color: "gray.500",
                    fontWeight: "bold",
                },
                title: {
                    fontSize: "md",
                    fontWeight: "bold",
                },
                body2: {
                    fontSize: "sm",
                },
                label: {
                    fontSize: "xs",
                    fontWeight: "bold",
                },
            },
        },
        StackDivider: {
            baseStyle: {
                borderColor: "gray.50",
            },
        },
        Input: {
            variants: {
                ghost: {
                    field: {
                        bg: "gray.100",
                        borderRadius: "full",
                        color: "gray.500",
                        _placeholder: { color: "gray.400" },
                    },
                    element: {
                        color: "gray.500",
                    },
                },
            },
        },
        Modal: {
            baseStyle: {
                footer: {
                    bg: "gray.50",
                    borderRadius: "inherit",
                },
            },
        },
    },
});
