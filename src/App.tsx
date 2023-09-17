import { TextField, FormLabel } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./App.css";

interface LoginForm {
  name: string;
  email: string;
  password: string;
}

const validationSchema = z
  .object({
    name: z
      // modeがonBlurの時、defaultValuesが無いとrequired_errorが表示される
      // .string({ required_error: "required_error" })
      .string()
      .nonempty("名前は必須です")
      .min(4, "名前は4文字以上で入力してください"),
    email: z
      .string()
      .nonempty("メールアドレスは必須です")
      .email("正しいメールアドレスを入力してください"),
    password: z
      .string()
      .nonempty("パスワードは必須です")
      .min(6, "パスワードは6文字以上で入力してください"),
  })
  .refine((args) => {
    // カスタムバリデーションロジックを追加
    console.log(args);
  });

function App() {
  //フォーム状態とメソッドを取得
  const {
    control,
    // register, //フォームから入力された値のstate管理、バリデーション処理が可能
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    shouldUnregister: false,
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log("Submitted Data", data);
  };

  return (
    <div className="form-container">
      <h1>React-Hook-Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>名前</FormLabel>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              // {...field}
              // start スプレッド構文を使わない場合は個別に指定
              // onChange,onBlurがないと動作しない
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              // end
              type="text"
              placeholder="田中　太郎"
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{ width: "100%" }}
            />
          )}
        />
        {/* <label htmlFor="">名前</label>
        <input
          type="text"
          id="name"
          // {...register("name", {
          //   required: "名前は必須です",
          //   minLength: { value: 4, message: "4文字以上で入力してください" },
          // })}
          {...register("name")}
        />
        {errors.name && <p>{errors.name.message as React.ReactNode}</p>} */}

        <FormLabel>メールアドレス</FormLabel>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              placeholder="sample@example.com"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ width: "100%" }}
            />
          )}
        />
        {/* <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          // {...register("email", {
          //   required: "メールアドレスは必須です",
          //   pattern: {
          //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          //     message: "正しいメールアドレスを入力してください",
          //   },
          // })}
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message as React.ReactNode}</p>} */}

        <FormLabel>パスワード</FormLabel>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ width: "100%" }}
            />
          )}
        />
        {/* <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          // {...register("password", {
          //   required: "パスワードは必須です",
          //   minLength: { value: 8, message: "8文字以上で入力してください" },
          // })}
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message as React.ReactNode}</p>} */}

        <button type="submit">送信</button>
      </form>
    </div>
  );
}

export default App;
