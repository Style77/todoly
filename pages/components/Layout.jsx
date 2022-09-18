import { Box } from "./Box.jsx";

const Layout = ({ children }) => (
    <Box
        css={{
            maxW: "100%"
        }}
    >
        {children}
    </Box>
);

export default Layout