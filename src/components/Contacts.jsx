import React from "react";
import style from "./Contacts.module.css";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "../assets/icons";

function Contacts() {
  return (
    <main className={style.container}>
      <div className={style.header}>
        <h1 className={style.title}>Get In Touch</h1>
        <p className={style.subtitle}>Let's connect and discuss opportunities</p>
      </div>

      <div className={style.contactsGrid}>
        <div className={style.contactCard}>
          <div className={style.iconWrapper}>
            <EmailIcon width={24} height={24} />
          </div>
          <div className={style.contactInfo}>
            <h3 className={style.contactLabel}>Email</h3>
            <p className={style.contactValue}>dymitr.dworakowski.gmail.com</p>
            <button 
              className={style.copyButton}
              onClick={() => navigator.clipboard.writeText('dymitr.dworakowski.gmail.com')}
            >
              Copy Email
            </button>
          </div>
        </div>

        <div className={style.contactCard}>
          <div className={style.iconWrapper}>
            <GitHubIcon width={24} height={24} />
          </div>
          <div className={style.contactInfo}>
            <h3 className={style.contactLabel}>GitHub</h3>
            <a 
              href="https://github.com/DymitrDworakowski" 
              target="_blank" 
              rel="noreferrer"
              className={style.contactLink}
            >
              github.com/DymitrDworakowski
            </a>
          </div>
        </div>

        <div className={style.contactCard}>
          <div className={style.iconWrapper}>
            <LinkedInIcon width={24} height={24} />
          </div>
          <div className={style.contactInfo}>
            <h3 className={style.contactLabel}>LinkedIn</h3>
            <a 
              href="https://www.linkedin.com/in/dymitr-dworakowski/" 
              target="_blank" 
              rel="noreferrer"
              className={style.contactLink}
            >
              linkedin.com/in/dymitr-dworakowski
            </a>
          </div>
        </div>
      </div>

    </main>
  );
}

export default Contacts;