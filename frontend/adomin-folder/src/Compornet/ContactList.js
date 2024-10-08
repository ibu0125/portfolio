import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContactList.css"; // スタイルシートをインポート

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // ローディング状態を管理

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5195/api/formlist/get"
        );
        console.log(response.data); // データの構造を確認
        setContacts(response.data); // 取得したデータを設定
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setError("お問い合わせを読み込むことができませんでした。");
      } finally {
        setLoading(false); // ローディング完了
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="contact-list-container">
      <h2>お問い合わせ一覧</h2>
      {loading ? ( // ローディング中の表示
        <p>データを読み込んでいます...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <ul className="contact-list">
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <li key={index} className="contact-item">
                <strong>名前:</strong> {contact.Name} <br />
                <strong>メールアドレス:</strong> {contact.Email} <br />
                <strong>メッセージ:</strong> {contact.Message}
              </li>
            ))
          ) : (
            <p>お問い合わせはまだありません。</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default ContactList;
