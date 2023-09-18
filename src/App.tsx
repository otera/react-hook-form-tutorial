import { Box, TextField, FormLabel } from "@mui/material";
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
    console.log("refine:" + args);
  });

function App() {
  //フォーム状態とメソッドを取得
  const {
    register, //フォームから入力された値のstate管理、バリデーション処理が可能
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onBlur",
    shouldUnregister: false,
    resolver: zodResolver(validationSchema),
  });

  type FormSchema = z.infer<typeof validationSchema>;

  const handleOnBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof FormSchema;
    const value = e.target.value;

    // 明示的に値を設定
    setValue(fieldName, value);

    // 明示的にバリデーションをトリガー
    await trigger(fieldName);

    console.log("handleOnBlur:" + e.target.value);
  };

  const onSubmit = (data: LoginForm) => {
    console.log("Submitted Data", data);
  };

  return (
    <div className="form-container">
      <h1>React-Hook-Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <FormLabel>名前</FormLabel>
          <TextField
            type="text"
            placeholder="田中　太郎"
            {...register("name")}
            onBlur={handleOnBlur}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Box>

        <Box mb={2}>
          <FormLabel>メールアドレス</FormLabel>
          <TextField
            type="email"
            placeholder="sample@example.com"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Box>

        <Box>
          <FormLabel>パスワード</FormLabel>
          <TextField
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>

        <button type="submit">送信</button>
      </form>
    </div>
  );
}

export default App;
