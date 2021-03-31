const input = document.getElementById("input");
const message = document.getElementById("message");
const img = document.getElementById("img");
const form = document.getElementById("form");
const link = document.getElementById("link");
const baseUrl = "https://pt.wikipedia.org/api/rest_v1/page/summary/";

const onSubmit = (e) => {
  e.preventDefault();
  const { input } = form;

  let text = input.value.toString();
  text = replaceWhitespaceToUnderlined(text);

  text.length > 0 && searchText(text);
};

const searchText = async (inputText) => {
  const res = await fetch(baseUrl + inputText);
  const data = await res.json();

  renderHtml(data, inputText);
};

const renderHtml = (dataJson, inputText) => {
  const { extract_html, thumbnail, content_urls } = dataJson;

  extract_html
    ? (
      message.innerHTML = extract_html,
        link.setAttribute("href", content_urls?.desktop?.page),
        link.classList.remove("hidden"),
        thumbnail?.source
          ? img.setAttribute("src", thumbnail.source)
          : img.removeAttribute("src")
    )
    : (
      message.innerHTML =
        `<p>Nenhuma correspondencia para <b>${inputText}</b>...</p>`,
        link.classList.add("hidden"),
        img.removeAttribute("src")
    );
};

const replaceWhitespaceToUnderlined = (value) => {
  return value.replace(/( )+/g, '_');
}

form.addEventListener("submit", onSubmit);
