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
        .required('Please enter investor\'s e-mail.'),
    });
  } else if (inputType === 'investorEmail' && !isManaged) {
    return yup.object().shape({
      investorEmail: yup
        .string()
        .optional(),
    });
  } else if (inputType === 'name') {
    return yup.object().shape({
      name: yup
        .string()
        .max(20, 'Maximal length of portfolio name is 20 characters.')
        .required('Please enter name for this portfolio.'),
    });
  } else if (inputType === 'description') {
    return yup.object().shape({
      description: yup
        .string()
        .max(240, 'Maximal length of portfolio description is 240 characters.')
        .optional(),
    });
  } else if (inputType === 'color') {
    return yup.object().shape({
      color: yup
        .string()
        .max(6, 'Maximal length of portfolio color is 6 characters.')
        .optional(),
    });
  } else {
    return yup.object().shape({
      url: yup
        .string()
        .optional(),
    });
  }
}

export const portfolioDetailFormSchema = (inputType: string) => {
  if (inputType === 'email') {
    return yup.object().shape({
      email: yup
        .string()
        .email('Email must be a valid email.')
        .max(40, 'Maximal length of investor email is 40 characters.')
        .required('Please enter investor\'s e-mail.'),
    });
  } else if (inputType === 'name') {
    return yup.object().shape({
      name: yup
        .string()
        .max(20, 'Maximal length of portfolio name is 20 characters.')
        .required('Please enter name for this portfolio.'),
    });
  } else if (inputType === 'description') {
    return yup.object().shape({
      description: yup
        .string()
        .max(240, 'Maximal length of portfolio description is 240 characters.')
        .optional(),
    });
  } else if (inputType === 'color') {
    return yup.object().shape({
      color: yup
        .string()
        .max(6, 'Maximal length of portfolio color is 6 characters.')
        .optional(),
    });
  } else {
    return yup.object().shape({
      url: yup
        .string()
        .optional(),
    });
  }
}

export const createTransactionFormSchema = (inputType: string) => {
  if (inputType === 'symbol') {
    return yup.object().shape({
      symbol: yup
        .string()
        .max(20, 'Maximal length of stock symbol is 20 characters.')
        .required('Stock symbol must not be empty.'),
    });
  } else if (inputType === 'sector') {
    return yup.object().shape({
      sector: yup
        .string()
        .max(20, 'Maximal length of stock sector is 20 characters.'),
    });
  } else if (inputType === 'time') {
    return yup.object().shape({
      time: yup
        .date()
    });
  } else if (inputType === 'numShares') {
    return yup.object().shape({
      numShares: yup
        .number()
        .required()
        .positive()
        .min(0.01, 'Number of shares can not be lower than 0.01.')
    });
  } else if (inputType === 'price') {
    return yup.object().shape({
      price: yup
        .number()
        .required()
        .positive()
        .min(0.0001, 'Stock price can not be lower than 0.0001.')
    });
  } else if (inputType === 'currency') {
    return yup.object().shape({
      currency: yup
        .string()
        .max(4, 'Maximal length of currency is 4 characters.')
        .required('Please enter currency for this stock.'),
    });
  } else if (inputType === 'commissions') {
    return yup.object().shape({
      commissions: yup
        .number()
        .optional()
        .positive()
        .min(0.01, 'Transaction commission can not be lower than 0.01.')
    });
  } else {
    return yup.object().shape({
      notes: yup
        .string()
        .optional(),
    });
  }
}
