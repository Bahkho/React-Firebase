import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { sendEmailVerification } from "firebase/auth";
//-----------------------------------------------------------------------------------------
const Hello = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser, googlelogin } = useAuth();
  //-----------------------------------------------------------------------------------------

  // console.log(auth?.currentUser?.email);

  const signUp = async () => {
    try {
      const userCredential = await createUser(email, password);
      //  await userCredential.user.confirmEmail();
      await sendEmailVerification(userCredential.user);
      alert("Check your email for verification to sign in");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };
  //-----------------------------------------------------------------------------------------
  const signInWithGoogle = async () => {
    try {
      await googlelogin();
      navigate("/info");
      // return <Navigate to="/homepage" replace={true} />;
    } catch (error) {
      setError(error.message);
      // console.error(error);
    }
  };

  //-----------------------------------------------------------------------------------------
  return (
    <div className="flex flex-col gap-8 justify-center items-center text-white mt-8">
      <h1 className="font-bold">Sign Up 👋🏾</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email..."
        className="p-2 w-[30%] text-slate-700 "
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        className="p-2 w-[30%] text-slate-700 "
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex flex-row justify-between w-[30%] gap-2">
        <button className=" bg-slate-700 px-4 py-2 " onClick={signUp}>
          Sign Up With Your Email
        </button>
        <button className=" bg-slate-700 px-4 py-2" onClick={signInWithGoogle}>
          Sign In With Goggle
        </button>
      </div>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="text-slate-700">
          Sign in
        </Link>{" "}
      </p>
    </div>
  );
};

export default Hello;
