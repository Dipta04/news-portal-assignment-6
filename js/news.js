const loadCategory=async()=>{
    const url=`https://openapi.programming-hero.com/api/news/categories`
    const res=await fetch(url);
    const data =await res.json();
    displayCategory(data.data.news_category);
}
const displayCategory=(category)=>{
    const newaCategory=document.getElementById('news-category');

   console.log(category);
   category.forEach(category => {
    const categoryDiv=document.createElement('div');
    categoryDiv.innerHTML=`
    <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
         
          <li class="nav-item">
            <a onclick="loadNews('${category.category_id?category.category_id:"Nothing found"}')" class="nav-link" href="#">${category.category_name}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>  
    `
    newaCategory.appendChild(categoryDiv);
   });  
  }
  

const loadNews=async(category_id)=>{
    const url=`https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res=await fetch(url);
    const data =await res.json();
    displayNews(data.data);
} 

const displayNews=shownews=>{
  
    const newsSection=document.getElementById('news-section');
    newsSection.innerHTML='';

   console.log(shownews);
   for(const News of shownews){
    const newsDiv=document.createElement('div');
    // newsDiv.classList.add('col');
    newsDiv.innerHTML=`
    <div class="col">
    <div class="card p-4">
      <img src="${News.thumbnail_url}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${News.title}</h5>
        <p class="overflow">${News.details?News.details.slice(0,100)+'...':News.details}</p>
        <div class="d-flex">
        <img class="author-img rounded me-2" src="${News.author.img?News.author.img:'no image'}">
        <p class="card-text">${News.author.name?News.author.name:"no author"}</p>
        <i class="fa-regular fa-eye ms-4 mt-2"> ${News.total_view}</i>
        </div>
        <button onclick="loadDetail('${News.category_id}')" class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#DetailModal">Load details</button>
    `;
    newsSection.appendChild(newsDiv);
    
  }
  toggleSpinner(false);
   }


const loadDetail=async(category_id)=>{
    const url=`https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res=await fetch(url);
    const data =await res.json();
    displayDetails(data.data);
}
const displayDetails=(totalData)=>{
    console.log(totalData);
    const details=document.getElementById('details');
    for(const fulldetail of totalData)
    {
        details.innerHTML=`
        <h5 class="card-title">${fulldetail.title}</h5>
        <p>${fulldetail.details}</p>
        <p>rating: ${fulldetail.rating.number?fulldetail.rating.number:'not found'}<p>
        `
    }

}

const toggleSpinner=isLoading=>{
  const loaderSection=document.getElementById('loader');
  if(isLoading){
      loaderSection.classList.remove('d-none');
  }
  else{
      loaderSection.classList.add('d-none');
  }
}

 loadNews() ;

loadCategory();
loadDetail();