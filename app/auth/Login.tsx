import { useAppStore } from "@/app/AppStore";

export const Login = () => {
  const { login, loggedUser } = useAppStore();

  const handleLogin = () => {
    login();
  };

  return (
    <div className="mt-16">
      <div className="card">
        <div className="card-title">Authentication</div>
        <div className="card-content">
          <p>You must first login to be able to access the demo application</p>
        </div>
        <div className="card-actions">
          <button className="button" onClick={() => handleLogin()}>
            Sign In With Google
          </button>
        </div>
      </div>
    </div>
  );
};