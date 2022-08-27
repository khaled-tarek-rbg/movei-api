const apiKey = "api_key=98d1d0a81a0db0211361f9a3a0f8d0dc";
const apiRequest= "https://api.themoviedb.org/3";
const apiPopularMoveis = apiRequest+"/discover/movie?sort_by=popularity.desc&"+apiKey;
const main = document.querySelector(".main");
const imgApi = "https://image.tmdb.org/t/p/w500";
const form = document.querySelector(".form")
const input = document.querySelector(".search")
const searchApi = apiRequest+"/search/movie?"+apiKey;

let container = []


getMovei(apiPopularMoveis);
function getMovei(url){
   fetch(url).then((res)=> res.json())
   .then((data)=>{
    // console.log(data)
      //array of object
     showMovei(data.results);
     container = data.results
})
}
// https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=98d1d0a81a0db0211361f9a3a0f8d0dc





//https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=98d1d0a81a0db0211361f9a3a0f8d0dc

//https://api.themoviedb.org/3/search/movie?api_key=98d1d0a81a0db0211361f9a3a0f8d0dc&query=hard

  function showMovei(data){
      
    let design = ""   ;//array of object

      data.map((item)=>{ 
        console.log(item); //individual objects access it through its key key
       design+=`
       <div class = 'movei'>
        <div class= "img-container"
        ><img src= ${imgApi+item.poster_path}></div>
        
        <div class="movei-info">
            <h3>${item.original_title}</h3>
            <span class = ${getcolor(item.vote_average)} >${item.vote_average}</span>
        </div>
        <div class="movei-desc">
            <p>${item.overview}</p>
        </div>
        </div>
        `
 })

 main.innerHTML = design
    
 }
 function getcolor(vote){
    if(vote >= 8){
        return 'green';
    }
   else if(vote >=5){
        return 'orange';
    }
    else{
        return "red";
    }
 }

 form.addEventListener("submit" , (e)=>{
     e.preventDefault();
     const submiter = input.value;
     console.log(submiter)
    if(submiter != ""){
        getMovei(searchApi+'&query='+submiter)
    }
    else{
         getMovei(apiPopularMoveis);
    }

 })



input.addEventListener('keyup' , ()=>{

    let newContainer = container.filter((item)=>item.original_title.includes(input.value) == true)
    
    showMovei(newContainer);
})

    




