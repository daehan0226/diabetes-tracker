import React from "react";
import { Flex, Title } from "@mantine/core";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <Flex
      h={400}
      m={20}
      gap="md"
      justify="center"
      align="center"
      direction="column"
    >
      <Title order={4} align="center">
        Login to save and review
      </Title>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              localStorage.setItem("token", credentialResponse.credential);
              navigate("/result");
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </Flex>
  );
}

export default Login;
