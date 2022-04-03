import * as yup from 'yup';

export const userRegistrationFormSchema = (inputType: string) => {
  if (inputType === 'email') {
    return yup.object().shape({
      email: yup
        .string()
        .email('Email must be a valid email.')
        .required('Please enter your e-mail.'),
    });
  } else if (inputType === 'password') {
    return yup.object().shape({
      password: yup
        .string()
        .required('Please enter your password.')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&=*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    });
  } else {
    return yup.object().shape({
      confirmPassword: yup
        .string()
        .required('Please confirm your password.')
        .oneOf([yup.ref("password"), null], "Passwords must match.")
    });
  }
}
