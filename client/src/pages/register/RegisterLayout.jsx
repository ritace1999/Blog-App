import { useState, useEffect } from "react";
import Layout from "../../components/authLayout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/form.module.css";
import { HiEnvelope, HiFingerPrint, HiUser } from "react-icons/hi2";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerValidate } from "../../lib/AuthValidation";
import { registerUser } from "../../services/index/apiService";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducer";
function Register() {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const navigate = useNavigate();

  const mutation = useMutation(registerUser, {
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      toast.success("Registration successful");
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      navigate("/login");
    }
  }, [navigate, userState.userInfo]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: registerValidate,
    onSubmit: async (values) => {
      const { cpassword, ...formFields } = values;

      mutation.mutate(formFields);
    },
  });

  return (
    <Layout>
      <section className="w-3/4 mx-auto flex flex-col gap-2">
        <div className="title">
          <h1 className="text-grey-800 text-4xl font bold py-4">
            Register Here
          </h1>
        </div>
        {/* form*/}
        <form
          className="flex flex-col gap-4 container"
          onSubmit={formik.handleSubmit}
        >
          <div
            className={`${styles.input_group} ${
              formik.errors.name && formik.touched.name ? "border-rose-500" : ""
            }`}
          >
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className={styles.input_text}
              {...formik.getFieldProps("name")}
            />
            <span className="icon flex items-center px-4">
              <HiUser size={20} />
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
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              {...formik.getFieldProps("email")}
            />
            <span className="icon flex items-center px-4">
              <HiEnvelope size={20} />
            </span>
          </div>

          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
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

          <div
            className={`${styles.input_group} ${
              formik.errors.cpassword && formik.touched.cpassword
                ? "border-rose-500"
                : ""
            }`}
          >
            <input
              type={`${show.cpassword ? "text" : "password"}`}
              name="cpassword"
              placeholder="Confirm Password"
              className={styles.input_text}
              {...formik.getFieldProps("cpassword")}
            />
            <span
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
              className="icon flex items-center px-4 cursor-pointer	"
            >
              <HiFingerPrint size={20} />
            </span>
          </div>
          {formik.errors.name && formik.touched.name ? (
            <span className="text-rose-500">{formik.errors.name}</span>
          ) : formik.errors.email && formik.touched.email ? (
            <span className="text-rose-500">{formik.errors.email}</span>
          ) : formik.errors.password && formik.touched.password ? (
            <span className="text-rose-500">{formik.errors.password}</span>
          ) : formik.errors.cpassword && formik.touched.cpassword ? (
            <span className="text-rose-500">{formik.errors.cpassword}</span>
          ) : (
            <></>
          )}

          <div className="input_button">
            <button className={styles.button} type="submit">
              Register
            </button>
          </div>
        </form>
        {/* bottom*/}
        <p className="text-center text-dark-light">
          Already have an account?
          <Link className="text-blue-500 hover:text-blue-700" to={"/login"}>
            Login Here.
          </Link>
        </p>
      </section>
    </Layout>
  );
}

export default Register;
