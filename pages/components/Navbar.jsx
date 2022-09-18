import { Switch } from "@nextui-org/react"
import { Navbar, Button, Text } from "@nextui-org/react";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa"
import { auth } from "../../firebase"
import useAuth from "../../hooks/useAuth"
import { useDarkMode } from "next-dark-mode"

const CustomNavbar = () => {
    const { darkModeActive, switchToDarkMode, switchToLightMode } = useDarkMode()
    const { isLoggedIn, user } = useAuth()

    const handleAuth = async () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const token = credential.accessToken
                // The signed-in user info.
                const user = result.user
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
                // The email of the user's account used.
                const email = error.customData.email
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error)
            })
    }

    const changeTheme = (e) => {
        if (darkModeActive) {
            switchToLightMode()
        } else {
            switchToDarkMode()
        }
    }

    return (
        <Navbar isCompact maxWidth="fluid" variant="static">
            <Navbar.Brand>
                <Text b color="inherit" hideIn="xs">
                    Todoly
                </Text>
            </Navbar.Brand>
            <Navbar.Content>
                <Switch
                    checked={darkModeActive}
                    onChange={changeTheme}
                    iconOn={<FaMoon />}
                    iconOff={<FaSun />}
                />
                {isLoggedIn && (
                    <>
                        <Navbar.Link onClick={() => auth.signOut()}>
                            Logout
                        </Navbar.Link>
                    </>
                )}
                {!isLoggedIn && (
                    <Button size="md" auto rounded onPress={() => handleAuth()}>
                        <FaGoogle />
                    </Button>
                )}
            </Navbar.Content>
        </Navbar>
    )
}

export default CustomNavbar
