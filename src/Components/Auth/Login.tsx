import React from "react";
import { Flex, Title } from "@mantine/core";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../../Hookes";
import { getUserId } from "../../Helper";

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
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              localStorage.setItem("token", credentialResponse.credential);
              dispatch({ type: "LOG_IN", userId: getUserId() });
              navigate("/result");
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
