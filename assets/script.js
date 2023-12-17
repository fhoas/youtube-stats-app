var mainInput = document.querySelector("#main-input");
var searchBtn = document.querySelector(".search-btn");
var apiKey = "AIzaSyAAWd80-cy4Dy1la69ajGIKKdgM4QVR_TM";
var details = document.querySelector(".details");
var profilePhoto = document.querySelector("#profile-photo");
var profileName = document.querySelector("#profile-name");
var subscriberCount = document.querySelector("#number-of-subscriber");
var uploadsCount = document.querySelector("#number-of-uploads");
var viewsCount = document.querySelector("#number-of-views");
var createDate = document.querySelector("#date-of-create");
var description = document.querySelector("#description");
var channelStatistic = document.querySelector(".channel-statistic");
var error = document.querySelector(".error")

searchBtn.addEventListener("click", function () {
  var channelUrl = mainInput.value;
  if (channelUrl == "") {
    alert("Paste URL!");
  } else {
    var channelId = channelUrl.split("/").pop();
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${apiKey}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.pageInfo.totalResults === 0) {
          error.classList.toggle("disable")
          error.classList.add("active")
          details.classList.add("disable");
          details.classList.remove("active");
        } else {
          if(data.items[0].id == channelId){
          profilePhoto.src = data.items[0].snippet.thumbnails.high.url;
          profileName.textContent = data.items[0].snippet.title;
          subscriberCount.textContent =
            data.items[0].statistics.subscriberCount;
          uploadsCount.textContent = data.items[0].statistics.videoCount;
          viewsCount.textContent = data.items[0].statistics.viewCount;
          description.textContent = data.items[0].snippet.localized.description;
          var Date = data.items[0].snippet.publishedAt;
          createDate.textContent = Date.substring(0, 10);
          details.classList.toggle("disable");
          details.classList.add("active");
          error.classList.add("disable")
          error.classList.remove("active")
        } else if (data.items[0].snippet.customUrl == channelId) {
          alert("FERID BUNA GORE OZUNU YORDUN?")
        }
        }
        console.log(channelId)
      })
      .catch((error) => console.error(error));
  }
});