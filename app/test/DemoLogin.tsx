import React, { useEffect } from "react";
import { useAppStore } from "../AppStore";

export const LoginToDemoAppServer: React.FC = () => {
  const { userId, loginToDemoAppServerStatus, automateInitialization, loginToDemoAppServer } = useAppStore();

  useEffect(() => {
    if (automateInitialization && userId === null) {
      loginToDemoAppServer();
    }
  }, [loginToDemoAppServer, automateInitialization, userId]);

  const handleLogin = () => {
    setTimeout(() => {
      loginToDemoAppServer();
    }, 5000);
  };

  return (
    <div className="card">
      <div className="card-title">Login</div>
      <div className="card-actions">
        <button
          className="button"
          disabled={loginToDemoAppServerStatus === "started" || !!userId}
          onClick={handleLogin}
        >
          {loginToDemoAppServerStatus === "started" ? "Logging in..." : "Login to the Demo App Server"}
        </button>
      </div>
      {userId && (
        <div>
          <pre>
            <code>User ID: {userId}</code>
          </pre>
        </div>
      )}
      {loginToDemoAppServerStatus === "failed" && (
        <div>
          <div>
            <span>Unable to Login to Demo App Server</span>
          </div>
        </div>
      )}
    </div>
  );
};