import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import defaultLang from '../core/config/i18nConfig';
import { setLangAsync } from '../context/reducer/i18nSlice';

export default function useTranslations() {
  const dispatch = useDispatch();

  const t = useSelector((state) => state.i18n.translations);
  const setLang = (lang) => dispatch(setLangAsync(lang));
  const lang = useSelector((state) => state.i18n.lang);
  const supportedLangs = useSelector(
    (state) => state.i18n.supportedLangs,
  );
  const status = useSelector((state) => state.i18n.status);

  useEffect(() => {
    let language = localStorage.getItem('locale') ? localStorage.getItem('locale') : defaultLang
    setLang(language)
  }, [])

  return {
    t,
    lang,
    setLang,
    supportedLangs,
    status,
  };
}
