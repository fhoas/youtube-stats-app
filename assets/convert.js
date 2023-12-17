var btn = document.querySelector(".search-btn")
var inputArea = document.querySelector(".data-input")
var result = document.querySelector(".result")


btn.addEventListener("click", function(){
  var username = inputArea.value
  fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&forUsername=${username}&key=AIzaSyAAWd80-cy4Dy1la69ajGIKKdgM4QVR_TM`)
      .then(res => res.json())
      .then(json => {
        if (json.pageInfo.totalResults === 0) {
          alert('Something Went Wrong');
        } else {
          result.textContent = json.items[0].id
        }
      });
})