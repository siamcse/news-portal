const loadCategory = async() =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url)
    const data = await res.json()
    displayCategory(data.data.news_category);
}
const displayCategory = (categories) =>{
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category =>{
        // console.log(category);
        const li = document.createElement('li');
        li.classList.add('hover:bg-sky-400', 'rounded');
        li.innerHTML = `
            <a onclick="loadDetails(${category.category_id})" class="link link-hover p-2">${category.category_name}</a>
        `;
        categoryContainer.appendChild(li);
    })
}
const loadDetails = (detailsId) =>{
    fetch(`https://openapi.programming-hero.com/api/news/category/0${detailsId}`)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}
const displayDetails = (details) =>{
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = '';
    details.forEach(detail =>{
        console.log(detail);
        const{title, details, image_url, author, total_view} = detail;
        const {name, img, published_date} = author;
        console.log(img);
        const div = document.createElement('div');
        div.className = ('card md:card-side bg-base-100 shadow-xl mt-10');
        div.innerHTML = `
            <figure><img class="w-60 h-full" src="${image_url}" alt="Album"></figure>
            <div class="card-body">
                <h2 class="card-title">${title}</h2>
                <p>${details.length>500 ? details.slice(0,500)+' ...':details}</p>
                <div class="card-actions justify-between items-center">
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
                                <p>Rating:</p>
                            </div>
                            <button class="btn btn-primary">Details</button>
                        </div>
            </div>
        `;
        detailsContainer.appendChild(div);
    })
}
loadCategory();