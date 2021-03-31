const input = document.getElementById("input");
const btn = document.getElementById("go");
const message = document.getElementById("message");
const link = document.getElementById("link")

btn.onclick = function () {
  const url =
    `https://pt.wikipedia.org/api/rest_v1/page/summary/${input.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if(data.extract_html){
        link.href = data.content_urls.desktop.page;
        link.classList.remove('hidden')

        return message.innerHTML = data.extract_html
      }

      link.classList.add('hidden')
      return message.innerHTML = `<p>Nenhuma correspondencia para <b>${input.value}...</b></p>`;
    });
};
