const input = document.getElementById("input");
const message = document.getElementById("message");
const img = document.getElementById("img");
const form = document.getElementById("form");
const link = document.getElementById("link");
const baseUrl = "https://pt.wikipedia.org/api/rest_v1/page/summary/";

const onSubmit = (e) => {
  e.preventDefault();
  const { input } = form;
  const text = input.value.toString();
  const formatedText = replaceWhitespaceToUnderlined(text);
  formatedText.length > 0 && searchText(formatedText);
};

const replaceWhitespaceToUnderlined = (value) => {
  return value.replace(/( )+/g, "_");
};

const searchText = async (inputText) => {
  const res = await fetch(baseUrl + inputText);
  const data = await res.json();
  renderHtml(data);
};

const setOrRemoveLinkHref = (dataJson) => {
  const { content_urls } = dataJson;
  if (content_urls?.desktop) {
    link.setAttribute("href", content_urls.desktop?.page);
    link.classList.remove("hidden");
  } else {
    link.removeAttribute("href");
    link.classList.add("hidden");
  }
};

const setOrRemoveThumbnailSrc = (dataJson) => {
  const { thumbnail } = dataJson;
  thumbnail?.source
    ? img.setAttribute("src", thumbnail.source)
    : img.removeAttribute("src");
};

const setInnerHtmlContent = (dataJson) => {
  const { extract_html } = dataJson;
  if (extract_html) {
    message.innerHTML = extract_html;
  } else {
    message.innerHTML =
      `<p>Nenhuma correspondência para <b>${input.value}</b>...</p>`;
  }
};

const renderHtml = (dataJson) => {
  setInnerHtmlContent(dataJson);
  setOrRemoveLinkHref(dataJson);
  setOrRemoveThumbnailSrc(dataJson);
};

form.addEventListener("submit", onSubmit);
