import React from "react";
import "./Form.css";
import { useForm } from "react-hook-form";
import axios from "axios";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:5195/api/formlist/post",
        {
          Name: data.name, // ここで直接取得
          Email: data.email, // ここで直接取得
          Message: data.message, // Messageを使用
        }
      );
      alert("お問い合わせを送信しました。");
      console.log(response.data);
    } catch (error) {
      alert("お問い合わせを送信できませんでした。");
      console.error(error); // エラー詳細を表示
    }
  };

  return (
    <div className="form">
      <div className="form-container">
        <h1>お問い合わせ</h1>
        <form onSubmit={handleSubmit(onsubmit)}>
          <label htmlFor="名前">名前</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "※名前は必須です" })}
          />
          <p className="error-message">{errors.name?.message}</p>

          <label htmlFor="メールアドレス">メールアドレス</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "※メールアドレスは必須です" })}
          />
          <p className="error-message">{errors.email?.message}</p>

          <label htmlFor="パスワード">パスワード</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "※パスワードは必須です" })}
          />
          <p className="error-message">{errors.password?.message}</p>

          <label htmlFor="textbox">お問い合わせ</label>
          <textarea
            id="message"
            {...register("message", {
              required: "※お問い合わせ内容は必須です",
            })} // registerでメッセージを管理
            style={{ height: "100px", width: "100%" }}
          />
          <p className="error-message">{errors.message?.message}</p>
          <button type="submit">送信</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
