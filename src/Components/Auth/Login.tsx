import React from "react";
import { Flex, Title } from "@mantine/core";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../../Hookes";
import { authLogin } from "../../Apis";
import { AuthProvider } from "../../@types";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  return (
    <Flex
      h={400}
      m={20}
      gap="md"
      justify="center"
      align="center"
      direction="column"
    >
      <Title order={4} align="center" color="blue">
        Login to save and review
      </Title>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            if (credentialResponse.credential) {
              const userId = await authLogin(
                AuthProvider.GOGGLE,
                credentialResponse.credential
              );
              if (userId) {
                dispatch({ type: "LOG_IN", userId });
                navigate("/result");
              } else {
                dispatch({ type: "LOG_OUT" });
                console.log("Login Failed");
              }
            }
          }}
          onError={() => {
            dispatch({ type: "LOG_OUT" });
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </Flex>
  );
}

export default Login;
