import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "../Button/Button";
import { FormValidationSchema } from "../../schema/FormValidationSchema";
import css from "./Form.module.css";

const Form = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(Yup.object().shape(FormValidationSchema)),
  });

  const onSubmitHandler = async (data) => {
    console.log(data);
    try {
      await handleSubmit(data);
      reset();
      window.location.reload();
    } catch (error) {
      console.error("Помилка при обробці форми:", error);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmitHandler)}>
      <label>
        Name:
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => <input type="text" {...field} />}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </label>
      <label>
        Email:
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => <input type="email" {...field} />}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </label>
      <label>
        Booking Date:
        <Controller
          name="bookingDate"
          control={control}
          defaultValue=""
          render={({ field }) => <input type="date" {...field} />}
        />
        {errors.bookingDate && <span>{errors.bookingDate.message}</span>}
      </label>
      <label>
        Comment:
        <Controller
          name="comment"
          control={control}
          defaultValue=""
          render={({ field }) => <textarea {...field} />}
        />
        {errors.comment && <span>{errors.comment.message}</span>}
      </label>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
