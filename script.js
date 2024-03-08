document.addEventListener("DOMContentLoaded", function () {
  const songList = document.getElementById("files");
  fetchSongs();

  async function fetchSongs() {
    try {
      const response = await fetch("http://127.0.0.1:5500/songs/");
      if (!response.ok) {
        throw new Error("Failed to fetch songs");
      }
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const fileElements = doc.querySelectorAll("#files > li > a");
      fileElements.forEach((fileElement) => {
        const fileName = fileElement.querySelector(".name").textContent;
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="/songs/${fileName}">${fileName}</a> `;
        songList.appendChild(listItem);
        console.log(listItem);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
});
