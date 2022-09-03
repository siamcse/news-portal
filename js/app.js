const loadCategory = async() =>{
    isLoading(true);
    try {
        const url = 'https://openapi.programming-hero.com/api/news/categories';
        const res = await fetch(url)
        const data = await res.json()
        displayCategory(data.data.news_category);
    }
    catch(e){
        console.log(e);
    }
}
const displayCategory = (categories) =>{
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category =>{
        // console.log(category);
        const li = document.createElement('li');
        li.classList.add('hover:bg-sky-400', 'rounded');
        li.innerHTML = `
            <a id="anchor" onclick="loadDetails(${category.category_id},'${category.category_name}')" class="link link-hover p-3">${category.category_name}</a>
        `;
        categoryContainer.appendChild(li);
        loadDetails(05,'Entertainment');
        isLoading(false);
    })
}
const loadDetails = (detailsId,categoryName) =>{
    
    isLoading(true);
    document.getElementById('category-name').innerText = categoryName;
    try{
        fetch(`https://openapi.programming-hero.com/api/news/category/0${detailsId}`)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
    }
    catch(e){
        console.log(e);
    }
}
//display details in card
const displayDetails = (details) =>{
    const detailsContainer = document.getElementById('details-container');
    //array of object sorted
    details.sort((a,b) =>{
        return b.total_view - a.total_view;
    })
    isLoading(false);
    document.getElementById('news-number').innerText = details.length;
    detailsContainer.innerHTML = '';
    details.forEach(detail =>{
        // console.log(detail);
        const{_id, title, details, image_url, thumbnail_url, author, total_view,rating} = detail;
        const {name, img, published_date} = author;
        const div = document.createElement('div');
        div.className = ('card md:card-side bg-base-100 drop-shadow-xl mt-10');
        div.innerHTML = `
            <figure><img class="w-60 h-full" src="${thumbnail_url}" alt="Album"></figure>
            <div class="card-body">
                <h2 class="card-title">${title}</h2>
                <p>${details.length>500 ? details.slice(0,500)+'...':details}</p>
                <div class="card-actions flex-col md:flex-row justify-between md:items-center">
                    <div class="flex items-center gap-2">
                        <img class="rounded-full w-10 h-10" src="${img}" alt="Image not found">
                        <div>
                            <h6>${name ? name:'DATA NOT AVAILABLE'}</h6>
                            <p>${published_date ? published_date:'DATA NOT AVAILABLE'}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <img src="img/carbon_view.png" alt="">
                        <h5 class="text-xl font-bold">${total_view ? total_view:'DATA NOT AVAILABLE'}</h5>
                    </div>
                    <div>
                        <p>Rating: ${rating.number}</p>
                    </div>
                    <label onclick="loadModal('${_id}')" for="my-modal-4" class="btn btn-primary modal-button">Details<img src="img/arrow-right.png"/></label>
                </div>
            </div>
        `;
        detailsContainer.appendChild(div);
        
    })
}
//load modal
const loadModal = (newsId) =>{
    try{
        fetch(`https://openapi.programming-hero.com/api/news/${newsId}`) 
        .then(res => res.json())
        .then(data => displayModal(data.data[0])) 
    }
    catch(e){
        console.log(e);
    }
    
}
const displayModal = (newsId) =>{
    console.log(newsId);
    const {_id, title, details, image_url, thumbnail_url, author, total_view,rating} = newsId;
    const {name, img, published_date} = author;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <figure><img src="${image_url}" alt="" /></figure>
        <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <div class="card-actions flex-col md:flex-row justify-between md:items-center mt-6">
                <div class="flex items-center gap-2">
                    <img class="rounded-full w-10 h-10" src="${img}" alt="Image not found">
                    <div>
                        <h6>${name ? name:'Author name not found'}</h6>
                        <p>${published_date ? published_date:'Published date not found'}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <img src="img/carbon_view.png" alt="">
                    <h5 class="text-xl font-bold">${total_view ? total_view:0}</h5>
                </div>
                <div>
                    <p>Rating: ${rating.number}</p>
                </div>
            </div>
            <p>${details.length>500 ? details.slice(0,500)+'...':details}</p>
        </div>
    `;
}
const isLoading = (isTrue) =>{
    const spinner = document.getElementById('spinner');
    if(isTrue){
        spinner.classList.remove('hidden');
    }
    else{
        spinner.classList.add('hidden');
    }
}
loadCategory();