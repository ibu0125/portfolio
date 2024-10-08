import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContactList.css"; // スタイルシートをインポート

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(localStorage.getItem("token"));

    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5274/api/Form/contacts"
        );
        setContacts(response.data); // 必要に応じてデータの取得形式を調整
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setError("お問い合わせを読み込むことができませんでした。");
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="contact-list-container">
      <h2>お問い合わせ一覧</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="contact-list">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <li key={contact.id} className="contact-item">
              <strong>名前:</strong> {contact.name} <br />
              <strong>メールアドレス:</strong> {contact.email} <br />
              <strong>メッセージ:</strong> {contact.message}
            </li>
          ))
        ) : (
          <p>お問い合わせはまだありません。</p>
        )}
      </ul>
    </div>
  );
}

export default ContactList;
