onload = ((event) => {
  const form = document.getElementById('search-form');
  const searchedField = document.getElementById('search-keyword');
  const responseContainer = document.getElementById('response-container');
  let searchedForText;

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchedField.value;
    getNews();
  });

  function getNews() {
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=fc629d33b11543df9fbf5dce70b52fbe`);
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;
    articleRequest.send();
  }

  function handleError() {
    console.log('Se ha presentado un error');
  }

  function addNews() {
    const data = JSON.parse(this.responseText);
    console.log(data);
    const article = data.response.docs[0];
    const title = article.headline.main;
    const snippet = article.snippet;

    let li = document.createElement('li');
    li.className = 'articleClass';
    li.innerHTML = snippet;
    responseContainer.appendChild(li);
  }
})();
