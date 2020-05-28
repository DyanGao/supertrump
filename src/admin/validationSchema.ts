import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    required: "Pflichtfeld, bitte einen Wert eingeben",
    notType: "Bitte nur Zahlen eingeben",
  },
  number: {
    moreThan: "Bitte nur Zahlen größe als 0 eingeben",
  },
});

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  image: Yup.mixed().required(),
  size: Yup.number().moreThan(0).required(),
  weight: Yup.number().moreThan(0).required(),
  age: Yup.number().moreThan(0).required(),
  offspring: Yup.number().moreThan(0).required(),
  speed: Yup.number().moreThan(0).required(),
});

export default validationSchema;
