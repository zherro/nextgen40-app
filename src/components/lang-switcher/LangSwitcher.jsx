import styles from "./LangSwitcher.module.css";
import useTranslations from '@/hooks/useTranslations';

export default function LangSwitcher() {
  const { lang, supportedLangs, setLang } = useTranslations();

  return (
    <select
      className={styles.dropdown}
      value={lang}
      onChange={(newLang) => setLang(newLang.target.value)}
    >
      {Object.entries(supportedLangs).map(
        ([code, name]) => (
          <option
            value={code}
            key={code}
          >
            {name}
          </option>
        ),
      )}
    </select>
  );
}
