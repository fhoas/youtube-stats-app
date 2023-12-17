var mainInput = document.querySelector("#main-input");
var searchBtn = document.querySelector(".search-btn");
var details = document.querySelector(".details");
var playlistPhoto = document.querySelector("#playlist-photo");
var playlistName = document.querySelector("#playlist-name");
var creator = document.querySelector("#creator");
var uploadsCount = document.querySelector("#number-of-uploads");
var channelId = document.querySelector("#channel-id a");
var createDate = document.querySelector("#date-of-create");
var description = document.querySelector("#description");
var apiKey = "AIzaSyAAWd80-cy4Dy1la69ajGIKKdgM4QVR_TM";
var error = document.querySelector(".error");
var readMore = document.querySelector(".read-more");
var readLess = document.querySelector(".read-less");
var playlistVideos = document.querySelector(".playlist-videos");

searchBtn.addEventListener("click", function () {
  var playlistUrl = mainInput.value;
  if (playlistUrl == "") {
    alert("Paste URL!");
  } else {
var playlistId = playlistUrl.split("https://www.youtube.com/playlist?list=");
    const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&id=${playlistId}&key=${apiKey}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.pageInfo.totalResults === 0) {
          error.classList.remove("disable");
          error.classList.add("active");
          details.classList.add("disable");
          details.classList.remove("active");
          playlistVideos.classList.add("disable-important");
          playlistVideos.classList.remove("active-important");
        } else {
          playlistPhoto.src = data.items[0].snippet.thumbnails.maxres.url;
          playlistName.textContent = data.items[0].snippet.title;
          creator.textContent = data.items[0].snippet.channelTitle;
          uploadsCount.textContent = data.items[0].contentDetails.itemCount;
          channelId.textContent = data.items[0].snippet.channelId;
          description.textContent = data.items[0].snippet.localized.description.substring(0, 500) + "...";
          var Date = data.items[0].snippet.publishedAt;
          createDate.textContent = Date.substring(0, 10);
          details.classList.toggle("disable");
          details.classList.add("active");
          error.classList.add("disable");
          error.classList.remove("active");
          playlistVideos.classList.remove("disable-important");

          if (description.textContent.length > 200) {
            readMore.classList.remove("disable");
            readMore.classList.add("active");
          } else {
            readMore.classList.add("disable");
            readMore.classList.remove("active");
          }

          readMore.addEventListener("click", function () {
            description.textContent =
              data.items[0].snippet.localized.description.substring(
                0,
                description.length
              );
            readLess.classList.remove("disable");
            readLess.classList.add("active");
            readMore.classList.remove("active");
            readMore.classList.add("disable");
            readLess.addEventListener("click", function () {
              description.textContent =
                data.items[0].snippet.localized.description.substring(0, 250);
              readMore.classList.remove("disable");
              readMore.classList.add("active");
              readLess.classList.remove("active");
              readLess.classList.add("disable");
            });
          });

          playlistVideos.innerHTML = '';
          fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`
          )
            .then((res) => res.json())
            .then((json) => {
              for (let i = 0; i < json.pageInfo.totalResults; i++) {
                var images = json.items[i].snippet.thumbnails.maxres.url;
                var videoNames = json.items[i].snippet.title;
                var links = json.items[i].snippet.resourceId.videoId;
                playlistVideos.style.border = "2px solid white";
                playlistVideos.classList.remove("disable");
                playlistVideos.classList.add("active");
                playlistVideos.innerHTML += `<div class="video-box">
                <img id="video-image" src="${images}" alt="video-cover">
                <div id="video-name">${videoNames}</div>
                <button id="play-btn"><a href="https://www.youtube.com/watch?v=${links}">Watch</a></button>
                </div>`;
              }
            });
        }
      })

      .catch((error) => console.error(error));
  }
});