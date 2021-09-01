import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Error from "./screens/Error";
import { useEffect, useState } from "react";
import { AuthProvider } from "./AuthContext";

function App() {
  const [newmessage, setnewmessage] = useState("");

  useEffect(() => {
    function setCookie(cname, cvalue, seconds) {
      var d = new Date();
      d.setTime(d.getTime() + seconds * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    window.addEventListener("beforeunload onbeforeunload", function () {
      document.cookie =
        "ic_window_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
    const callCenterInterval = setInterval(validateCallCenterTab, 1000);

    function validateCallCenterTab() {
      var win_id_cookie_duration = 2;

      if (!window.name) {
        window.name = Math.random().toString();
      }

      if (
        !getCookie("ic_window_id") ||
        window.name === getCookie("ic_window_id")
      ) {
        setCookie("ic_window_id", window.name, win_id_cookie_duration);
      } else if (getCookie("ic_window_id") !== window.name) {
        var message =
          "You cannot have this website open in multiple tabs. " +
          "Please close them until there is only one remaining. Thanks!";
        setnewmessage(message);
        clearInterval(callCenterInterval);
        throw "Multiple call center tabs error. Program terminating.";
      }
    }
  }, []);

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <AuthProvider>
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Home newmessage={newmessage} />}
              ></Route>
              <Route exact path="/error" component={Error}></Route>
            </Switch>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
