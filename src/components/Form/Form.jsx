import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormValidationSchema } from "../../schema/FormValidationSchema";
import { AiOutlineCalendar } from "react-icons/ai";
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
      console.error("Error:", error);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmitHandler)}>
      <h2 className={css.formTitle}>Book your campervan now</h2>
      <p className={css.formDescr}>
        Stay connected! We are always ready to help you.
      </p>
      <label className={css.label}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              className={css.formInput}
              type="text"
              {...field}
              placeholder="Name"
            />
          )}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </label>
      <label className={css.label}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              className={css.formInput}
              type="email"
              {...field}
              placeholder="Email"
            />
          )}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </label>
      <label className={css.label}>
        <Controller
          name="bookingDate"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <div className={css.datePickerWrapper}>
              <DatePicker
                className={css.formInput}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                placeholderText="Booking date"
                dateFormat="dd/MM/yyyy"
              />
              <AiOutlineCalendar className={css.calendarIcon} />
            </div>
          )}
        />
        {errors.bookingDate && <span>{errors.bookingDate.message}</span>}
      </label>
      <label className={css.label}>
        <Controller
          name="comment"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <textarea
              className={css.formTextArea}
              {...field}
              placeholder="Comment"
            />
          )}
        />
      </label>
      <button className={css.formBtn} type="submit">
        Send
      </button>
    </form>
  );
};

export default Form;
