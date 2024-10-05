const loadCatagoryBtn = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => openUpBtn(data.categories))
        .catch(error => console.error(error))
};

// make btn and push to div dynamically
const openUpBtn = (categories) => {
    const btnDiv = document.getElementById('btnDiv');
    categories.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button id="for-get-btn-${item?.category_id}" onclick="clicableBtn(${item?.category_id})" class="btn get-class">
        ${item.category}
        </button>
        `;
        btnDiv.append(div)
    })
};

//clic-able Btn
const clicableBtn = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeClass()
            const gettingBtnId = document.getElementById(`for-get-btn-${id}`);
            gettingBtnId.classList.add('btn-style')
            secondCardCalling(data.category)
        })
        .catch(error => console.error(error))
}

// removeing btn style
const removeClass = () => {
    const getClass = document.getElementsByClassName('get-class');
    for (const element of getClass) {
        element.classList.remove('btn-style')
    }
}

const cardCalling = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => secondCardCalling(data.videos))
        .catch(error => console.error(error))
}

// time
const postDate = (time) => {
    const hour = parseInt(time / 3600);
    const remainingSec = time % 3600;
    const min = parseInt(remainingSec / 60);
    return `${hour} hour ${min} min ago`
};

// details bnt
const vedioDetails = async (vedioId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${vedioId}`);
    const data = await res.json();
    vedioDetailsReceive(data.video.authors);
};

const vedioDetailsReceive = (data) => {
    data.forEach(item => {
        console.log(item);
        const modalContent = document.getElementById('modal-content');
        modalContent.innerHTML =
            `
    <img class="object-cover" src="${item.profile_picture}"/>
    <p class="font-bold text-xl">
    ${item.profile_name}
    </p>
    `;
        document.getElementById('main-click-btn').click()
    })

}

const secondCardCalling = (videos) => {
    const cardDiv = document.getElementById('cardDiv');
    cardDiv.innerHTML = '';
    if (videos.length == 0) {
        cardDiv.classList.remove('grid');
        cardDiv.innerHTML = `
    
    <div class="h-[300px] gap-5 flex flex-col justify-center items-center text-center">
           <img src="assets/Icon.png" alt="">
            <p class="text-gray-900 text-3xl font-bold max-w-96">
            Oopps!! sorry,There is no content here
            </p>
        </div>

    `;
        return;
    } else {
        cardDiv.classList.add('grid')
    }
    videos.forEach(item => {
        const div = document.createElement('div');
        div.classList = 'card card-compact';
        div.innerHTML =
            `
        <figure class="w-80 relative">
            <img class="w-full h-[200px] rounded-md object-cover"
            src=${item.thumbnail}
             alt="Shoes" />
             ${item.others?.posted_date.length == 0 ? "" : `<p class="absolute bottom-2 right-2 bg-gray-900 p-1 text-white rounded-md">
                ${postDate(item.others.posted_date)}
             </p>`}
        </figure>

  <div class="py-3 flex gap-2">
    <div>
        <img class="w-8 h-8 object-cover rounded-full" src="${item.authors[0].profile_picture}" alt="">
    </div>
    <div>
       <h1 class="font-bold">
       ${item.title}
       </h1>
       <div class="flex items-center gap-2">
          <p class="text-gray-400">
          ${item.authors[0].profile_name}
          </p>
          <span>
          ${item.authors[0].verified ? `<img class="w-4 h-4" src="${"https://img.icons8.com/?size=48&id=SRJUuaAShjVD&format=png"}" alt="">` : ""}
          </span>
       </div>
       <p class="text-gray-400">
       ${item.others.views} views
       </p>
    </div>
    <button onclick="vedioDetails('${item.video_id}')" class="btn btn-sm text-gray-800 btn-error">
    details
    <button>
  </div>
        `;
        cardDiv.append(div)

    })

}

loadCatagoryBtn()
cardCalling()