import React from "react";
import style from "./Contacts.module.css";

function Contacts() {
  return (
    <main className={style.container}>
      <h1 className={style.title}>Contact</h1>

      <p className={style.lead}>If you need to reach me, use the contacts below:</p>

      <ul className={style.list}>
        <li className={style.item}>
          <span className={style.label}>Email</span>
          <span className={style.value}>dymitr.dworakowski.gmail.com</span>
        </li>
        <li className={style.item}>
          <span className={style.label}>GitHub</span>
          <span className={style.value}>
            <a href="https://github.com/DymitrDworakowski" target="_blank" rel="noreferrer">
              https://github.com/DymitrDworakowski
            </a>
          </span>
        </li>
        <li className={style.item}>
          <span className={style.label}>LinkedIn</span>
          <span className={style.value}>
            <a href="https://www.linkedin.com/in/dymitr-dworakowski/" target="_blank" rel="noreferrer">
              https://www.linkedin.com/in/dymitr-dworakowski/
            </a>
          </span>
        </li>
      </ul>

      <p className={style.note}>
        Note: the email address is shown exactly as provided. If you want me to
        make it a mailto link or correct its format, tell me and I will update
        it.
      </p>
    </main>
  );
}

export default Contacts;
