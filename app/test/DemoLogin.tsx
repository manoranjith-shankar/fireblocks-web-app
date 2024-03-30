import React, { useEffect } from "react";
import { useAppStore } from "../AppStore";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

const LoginToDemoAppServer = () => {
  const { userId, loginToDemoAppServerStatus, automateInitialization, loginToDemoAppServer } = useAppStore();

  useEffect(() => {
    if (automateInitialization && userId === null) {
      loginToDemoAppServer();
    }
  }, [loginToDemoAppServer, automateInitialization, userId]);

  const handleLogin = () => {
    if (loginToDemoAppServerStatus !== "started") {
      loginToDemoAppServer();
    }
  };

  return (
    <Card title="Login">
      {userId && (
        <div className="mockup-code">
          <pre>
            <code>User ID: {userId}</code>
          </pre>
        </div>
      )}
      {loginToDemoAppServerStatus === "failed" && (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Unable to Login to Demo App Server</span>
          </div>
        </div>
      )}
      <Button
        label="Login to the Demo App Server"
        onClick={handleLogin}
        disabled={loginToDemoAppServerStatus === "started" || !!userId}
        inProgress={loginToDemoAppServerStatus === "started"}
      />
    </Card>
  );
};

export default LoginToDemoAppServer;