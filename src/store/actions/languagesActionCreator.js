import { languageTr, languageEn, languageDe } from "./languagesActions";
import { fetchArticles } from "./articlesActionCreator";

//if session information is lost it gets data from localstorage and set user data
export function setLanguage(lang) {
  return dispatch => {
    if (lang === "en") {
      dispatch(languageEn(lang));
      localStorage.setItem("language", "en");
      return dispatch(fetchArticles());
    } else if (lang === "de") {
      dispatch(languageDe(lang));
      localStorage.setItem("language", "de");
      return dispatch(fetchArticles());
    } else {
      dispatch(languageTr(lang));
      localStorage.setItem("language", "tr");
      return dispatch(fetchArticles());
    }
  };
}

