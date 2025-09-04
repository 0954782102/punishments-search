let punishments = {};

fetch('punishments.json')
  .then(res => res.json())
  .then(data => punishments = data);

document.getElementById("search").addEventListener("input", function() {
  const query = this.value.trim().toLowerCase();
  const resultBox = document.getElementById("result");

  if (!query) {
    resultBox.textContent = "Тут з'явиться покарання";
    return;
  }

  let results = [];
  for (let key in punishments) {
    if (key.includes(query)) {
      results.push(`${punishments[key].rule}: ${key.toUpperCase()}: ${punishments[key].punishment}`);
    }
  }

  resultBox.textContent = results.length > 0 ? results.join('\n') : "Покарання не знайдено";
});