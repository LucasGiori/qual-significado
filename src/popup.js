const input = document.getElementById("input");
const btn = document.getElementById("go");
const message = document.getElementById("message");

btn.onclick = function () {
  const url =
    `https://pt.wikipedia.org/api/rest_v1/page/summary/${input.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.extract_html
        ? message.innerHTML = data.extract_html
        : message.innerHTML =
          `<p>Nenhuma correspondencia para <b>${input.value}...</b></p>`;
    });
};
