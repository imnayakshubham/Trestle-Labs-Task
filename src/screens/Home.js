import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { auth, db } from "../firebase.js";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext.js";
import Error from "./Error.js";
import "./Home.css";

function Home({ newmessage }) {
  const user = useContext(AuthContext).user;
  const provider = new firebase.auth.GoogleAuthProvider();
  const history = useHistory();
  const [loggedinstatus, setloggedinstatus] = useState();
  const [userauthdata, setuserauthdata] = useState([]);

  const handlesignup = async () => {
    try {
      const data = await auth.signInWithPopup(provider);
      setuserauthdata(data);
      if (data.user.uid) {
        setloggedinstatus(true);
      }
      localStorage.setItem("userinfo", JSON.stringify(data));
      await db
        .collection("users")
        .doc("user " + data.user.uid)
        .set({
          user_uid: data.user.uid,
          user_email: data.user.email,
          isloggedin: loggedinstatus,
        });

      history.push("/error");
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async () => {
    await auth.signOut();
    setloggedinstatus(false);

    localStorage.removeItem("userInfo");
    history.push("/");
  };
  return (
    <>
      <div className="home">
        {newmessage.length > 0 ? (
          <Error />
        ) : (
          <div>
            {user ? (
              <button className="btns" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button className="btns" onClick={handlesignup}>
                Signup
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
