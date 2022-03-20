

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  links.forEach(link => {
    link.classList.toggle("fade");
  });
});
// text typing
const profile = `Junior front-end & Web Designer.`;

const profession = document.querySelector('#target');




let n;

function rerun(){
	profession.textContent = '';
	n = 0;
	typist(profile, profession);
};

rerun();

function interval(letter){
	console.log(letter);
	if(letter == ';' || letter == '.' || letter == ','){
		return Math.floor((Math.random() * 500) + 500);
	} else {
		return Math.floor((Math.random() * 130) + 5);
	}
}

function typist(text, target){
	if(typeof(text[n]) != 'undefined'){
		target.textContent += text[n];
	}
	n++;
	if(n < text.length){
		setTimeout(function(){
			typist(text, target)
		}, interval(text[n - 1]));
	} 
}





//creer un dynamic project card
const projectContainer =document.querySelector('.project-container');

projects.forEach(project => {         
    projectContainer.innerHTML += `
    <div class="project-card" data-tags="${project.id}">
        <a href=${project.link} target="_blank">
            <img src=img/${project.image} alt="">
            <div class="content">
                <h1 class="project-name">${project.name}</h1>
                <span class="tags">${project.tags}</span>
            </div>
        </a>
    </div>  
    `
    
})

//filters 
const filters= document.querySelectorAll('.filter-btn');
filters.forEach(filterBtn => {
    filterBtn.addEventListener('click', ()=>{
        let id =filterBtn.getAttribute('id');
        let projectCards =document.querySelectorAll('.project-card');
        
        console.log(projectCards)
        
        projectCards.forEach(card => {
            console.log(id)
            if(card.getAttribute('data-tags') == id){
                card.classList.remove('hide');
            }else{
                card.classList.add('hide');
            }

            if(id == "all")
            {
                card.classList.remove('hide');
            }
            
        })
        filters.forEach(btn => btn.classList.remove('active'));
        filterBtn.classList.add('active');

    })
    
})
//contact form
const contactBtn = document.querySelector('.contact-btn');
const firstName = document.querySelector('.first-name');
const lastName = document.querySelector('.last-name');
const email = document.querySelector('.email');
const msg = document.querySelector('.message');

contactBtn.addEventListener('click', ()=> {
    if(firstName.value.length && lastName.value.length && email.value.length && msg.value.length){
        fetch('/mail', {
            method:'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body:JSON.stringify({
                firstName:firstName.value,
                lastName:lastName.value,
                email:email.value,
                msg:msg.value,
            })
        })
        .then(res => res.json())
        .then(data=>{
            alert(data);
        })
    }

})
