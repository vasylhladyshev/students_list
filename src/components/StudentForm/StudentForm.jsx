import { useForm } from "react-hook-form";
import { InputField } from "../InputField/InputField";
import { useEffect } from "react";

export const StudentForm = ({ onClose, selectedUser, setUsers, users }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      firstName: selectedUser ? selectedUser.name.split(" ")[0] : "",
      lastName: selectedUser ? selectedUser.name.split(" ")[1] : "",
      email: selectedUser ? selectedUser.email : "",
      university: selectedUser ? selectedUser.university : "",
      faculty: selectedUser ? selectedUser.faculty : "",
      role: selectedUser ? selectedUser.role : "",
      company: selectedUser ? selectedUser.company : "",
      status: selectedUser ? selectedUser.status : "Inactive",
      verified: selectedUser ? selectedUser.verified : false,
    },
  });

  useEffect(() => {
    if (selectedUser) {
      setValue("firstName", selectedUser.name.split(" ")[0]);
      setValue("lastName", selectedUser.name.split(" ")[1]);
      setValue("email", selectedUser.email);
      setValue("university", selectedUser.university);
      setValue("faculty", selectedUser.faculty);
      setValue("role", selectedUser.role);
      setValue("company", selectedUser.company);
      setValue("status", selectedUser.status);
      setValue("verified", selectedUser.verified);
    }
  }, [selectedUser, setValue]);

  const onSubmit = (data) => {
    if (selectedUser) {
      // Редактирование пользователя
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id
            ? { ...user, ...data, name: `${data.firstName} ${data.lastName}` }
            : user
        )
      );
    } else {
      // Добавление нового пользователя
      const newUser = {
        id: users.length + 1, // Генерация нового ID (лучше использовать uuid)
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        university: data.university,
        faculty: data.faculty,
        role: data.role,
        company: data.company,
        status: data.status,
        verified: data.verified,
        img: "/avatar/default.png", // Можно заменить на путь к аватару
      };

      setUsers((prevUsers) => [...prevUsers, newUser]);
    }

    reset(); // Очищаем форму
    onClose(); // Закрываем модальное окно
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="student-form">
      <InputField label="First Name" name="firstName" register={register} errors={errors} />
      <InputField label="Last Name" name="lastName" register={register} errors={errors} />
      <InputField label="Email" name="email" register={register} errors={errors} />
      <InputField label="University" name="university" register={register} errors={errors} />
      <InputField label="Faculty" name="faculty" register={register} errors={errors} />
      <InputField label="Role" name="role" register={register} errors={errors} />
      <InputField label="Company" name="company" register={register} errors={errors} />
      <InputField label="Status" name="status" register={register} errors={errors} />
      <div className="input-field">
        <label htmlFor="verified">Verified</label>
        <input type="checkbox" id="verified" {...register("verified")} />
      </div>

      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};
