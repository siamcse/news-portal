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
        li.classList.add('hover:bg-sky-400', 'p-2', 'rounded');
        li.innerHTML = `
            <a onclick="loadDetails(${category.category_id})">${category.category_name}</a>
        `;
        categoryContainer.appendChild(li);
    })
}
const loadDetails = (detailsId) =>{
    fetch(`https://openapi.programming-hero.com/api/news/category/0${detailsId}`)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}

loadCategory();