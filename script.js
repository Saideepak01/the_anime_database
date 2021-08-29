//Creating title and text input the fetch input from user
function searchbar(){
  const main = document.createElement('div');
  main.innerHTML =`
  <p class="title">The <span>ANIME</span> database</p>
  <div class=topsearch>
  <form>
    <label for="searchbar">Search for anime!</label>
    <input type="text" class="searchon" name="searchbar" placeholder="....type naruto or any anime u love">
    <button type="submit" class="searchinglist" onclick='search(event)'>Search</button>
  </form>
  </div>
  `;
  document.querySelector(".box").append(main);
}
searchbar();//calling fn

//on clicking the search button or clicking enter, search function triggers
function search(event){
  event.preventDefault(); //to prevent reload of page during search
  const test = document.querySelector('.searchon');
  const inputtext = test.value;
  if(inputtext.length < 3){
    window.alert("Enter more than 3 characters");
  }else{
    fetching(inputtext);
  }
}

//This fetching function takes the user input from search function and calls the Jinkan API using async/await by GET method 
async function fetching(input){
  try{
  const data = await fetch(`https://api.jikan.moe/v3/search/anime?q=${input}`,{
    method: "GET"
  });
  const convertingapi = await data.json();
  console.log(convertingapi);
  document.querySelector(".maincontent").innerHTML ="";//to make a screen refresh so when again searching this can avoid appending the objects line by line
  databox(convertingapi.results);
  }catch(err){
    document.querySelector(".box").append("Sorry for the inconvenience, TRY AGAIN LATER");
  }
}

//After fetching the requested object for displaying as cards on screen, the objects are passed in template string and appended to screen
function databox(boxes){
  boxes.forEach(box =>{
  // for(let i = 0; i <= boxes.length; i++){
    let searchresultbox = document.createElement('div');
    searchresultbox.innerHTML = `
      <div class="mainbox">
          <img class="center" src=${box.image_url} width="160px" height="250px">
          <p><b>Title:</b> ${box.title}</p>
          <p><b>Start date:</b> ${new Date(box.start_date).toDateString()}</p>
          <p><b>End date:</b> ${new Date(box.end_date).toDateString()}</p>
          <p><b>Type of series:</b> ${box.type}</p>
          <p><b>IMDb rating:</b> ${box.score}</p>
      </div>
   `;
    document.querySelector(".maincontent").append(searchresultbox);
  });
}