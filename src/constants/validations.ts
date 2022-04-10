import * as yup from 'yup';

export const userRegistrationFormSchema = (inputType: string) => {
  if (inputType === 'email') {
    return yup.object().shape({
      email: yup
        .string()
        .email('Email must be a valid email.')
        .max(40, 'Maximal length of email is 40 characters.')
        .required('Please enter your e-mail.'),
    });
  } else if (inputType === 'password') {
    return yup.object().shape({
      password: yup
        .string()
        .required('Please enter your password.')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*=+])(?=.{8,})/,
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

export const userFormSchema = (inputType: string) => {
  if (inputType === 'firstName') {
    return yup.object().shape({
      firstName: yup
        .string()
        .max(40, 'Maximal length of first name is 40 characters.')
        .optional(),
    });
  } else {
    return yup.object().shape({
      lastName: yup
        .string()
        .max(40, 'Maximal length of first name is 40 characters.')
        .optional(),
    });
  }
}

export const portfolioCreationFormSchema = (inputType: string, isManaged: boolean) => {
  if (inputType === 'investorEmail' && isManaged) {
    return yup.object().shape({
      investorEmail: yup
        .string()
        .email('Email must be a valid email.')
        .max(40, 'Maximal length of investor email is 40 characters.')
        .required('Please enter your e-mail.'),
    });
  } else if (inputType === 'investorEmail' && !isManaged) {
    return yup.object().shape({
      investorEmail: yup
        .string()
        .optional(),
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
