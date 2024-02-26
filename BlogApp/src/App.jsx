import { useState, useEffect } from "react";
import authService from "./Auth/Auth";
import "./App.css";
import { logIn, logOut } from "./Store/AuthSlice"
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((useData) => {
        useData ? dispatch(logIn({ useData })) : dispatch(logOut());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <>
      <section className=" h-secreen w-full bg-gray-900">
        <div className="text-white"> YOYo</div>
        </section>
    </>
  ) : null;
}

export default App;
