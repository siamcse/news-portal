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
        const div = document.createElement('div');
        div.className = ('card lg:card-side bg-base-100 shadow-xl mt-10');
        div.innerHTML = `
            <figure><img class="w-60 h-full" src="${detail.image_url}" alt="Album"></figure>
            <div class="card-body">
                <h2 class="card-title">${detail.title}</h2>
                <p>${detail.details.length>500 ? detail.details.slice(0,500)+' ...':detail.details}</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Listen</button>
                </div>
            </div>
        `;
        detailsContainer.appendChild(div);
    })
}
loadCategory();