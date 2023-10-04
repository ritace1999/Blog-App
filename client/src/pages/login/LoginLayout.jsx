import { useState, useEffect } from "react";
import Layout from "../../components/authLayout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/form.module.css";
import { HiEnvelope, HiFingerPrint } from "react-icons/hi2";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loginValidate } from "../../lib/AuthValidation";
import { loginUser } from "../../services/index/apiService";
import { userActions } from "../../store/reducers/userReducer";

function LoginLayout() {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const navigate = useNavigate();

  const mutation = useMutation((values) => loginUser(values), {
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      toast.success("Login successful");
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidate,
    onSubmit: async (values) => {
      mutation.mutate(values);
    },
  });
  return (
    //  {/*Title*/}
    <Layout className=" container">
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-grey-800 text-4xl font bold py-4">Login Here</h1>
        </div>
        {/* form*/}
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? "border-rose-500"
                : ""
            }`}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              {...formik.getFieldProps("email")}
            />
            <span className="icon flex items-center px-4">
              {" "}
              <HiEnvelope size={20} />
            </span>
          </div>

          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? "border-rose-500"
                : ""
            }`}
          >
            <input
              type={`${show.password ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              onClick={() => setShow({ ...show, password: !show.password })}
              className="icon flex items-center px-4 cursor-pointer	"
            >
              <HiFingerPrint size={20} />
            </span>
          </div>

          {formik.errors.email && formik.touched.email ? (
            <span className="text-rose-500">{formik.errors.email}</span>
          ) : formik.errors.password && formik.touched.password ? (
            <span className="text-rose-500">{formik.errors.password}</span>
          ) : (
            <></>
          )}

          <div className="input_button">
            <button className={styles.button} type="submit">
              Login
            </button>
          </div>
        </form>
        {/* bottom*/}
        <p className="text-center text-dark-light">
          Don't have an account yet?
          <Link className="text-blue-500 hover:text-blue-700" to={"/register"}>
            Register Here.
          </Link>
        </p>
        <span>
          <Link
            className="text-blue-500 hover:text-blue-700"
            to={"/forget-password"}
          >
            Forget Password?
          </Link>
        </span>
      </section>
    </Layout>
  );
}

export default LoginLayout;
