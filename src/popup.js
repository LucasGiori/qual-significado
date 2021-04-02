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
    return;
  }
  link.removeAttribute("href");
  link.classList.add("hidden");
  return;
  
};

const setOrRemoveThumbnailSrc = (dataJson) => {
  const { thumbnail } = dataJson;
  if (thumbnail?.source) {
    img.setAttribute("src", thumbnail.source)
    return;
  }
  img.removeAttribute("src");
  return;
};

const setInnerHtmlContent = (dataJson) => {
  const { extract, extract_html } = dataJson;
  const noMatchMessage = `Nenhuma correspondência para ${input.value}...`;
  const noMatchMessageFormatted =  `<p>Nenhuma correspondência para <b>${input.value}</b>...</p>`;

  if (extract_html) {
    typeWrite(element=message, text=extract, formatted_text=extract_html);
    return
  }
  typeWrite(element=message, text=noMatchMessage, formatted_text=noMatchMessageFormatted);
  return;
};

const typeWrite = (element, text, formatted_text = null) => {
  const textToArray = text.split('');
  const lengthArray = textToArray.length;

  element.innerHTML = ' ';

  textToArray.forEach((letter, index)=> {
    setTimeout(() => {
      element.innerHTML += letter;
    }, 2 * index);

    if (formatted_text != null && index === lengthArray-1) {
      setTimeout(() => {
        element.innerHTML = ' ';
        element.innerHTML = formatted_text;
      }, 2 * index)
    }
  });
}

const renderHtml = (dataJson) => {
  setInnerHtmlContent(dataJson);
  setOrRemoveLinkHref(dataJson);
  setOrRemoveThumbnailSrc(dataJson);
};

form.addEventListener("submit", onSubmit);
