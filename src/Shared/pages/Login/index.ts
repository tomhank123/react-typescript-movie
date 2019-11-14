import * as yup from "yup";
import { State } from "./types";

export const initialState: State = {
  email: "",
  password: "",
  remember: false
};

export const validationSchema = yup.object({
  email: yup
    .string()
    .email()
    .max(50, "Too Long!")
    .required(),
  password: yup
    .string()
    .min(6, "Too Short!")
    .max(20, "Too Long!")
    .required(),
  remember: yup
    .bool()
    .oneOf([true], "Please read and agree with Terms")
    .required()
});

export { default } from "./LoginPage";
