let node=0;
let forward=1;
let stat="https://api.ldjam.com/vx/node/get/";
let sor="https://ldjam.com"

const input = document.querySelector('input');
//input.addEventListener('input', submit);

function clearPage(){
	let element = document.getElementsByTagName("iframe");
	let len=element.length;//for some reason this doesn't stay constatant
	for(let i=0;i<len;i++){
		element[0].remove();//should always be 0 not i for some reason
	}
}

function submit(){
    node=input.value;
    forward=1;
    readApi();
}

function next(){
    node++;
    forward=1;
    readApi();
}

function previous(){
    node--;
    forward=0;
    readApi();
}

async function readApi(){
    document.getElementById("num").value=node;
    fetch(stat+node)
    .then(response => response.json())
    .then(data => {
        //console.log(data.node[0]) // Prints result from `response.json()` in getRequest
        if(data.node[0].type=="post"||data.node[0].type=="game"){
            createIFrame(sor+data.node[0].path);
        }
        else{
            if(forward>0){
                next();
            }
            else{
                previous();
            }
        }

    })
    .catch(error => console.error(error))

}

function createIFrame(url) {
    clearPage();
	const frame = document.createElement("iframe");
	frame.setAttribute("src", url);
	const currentDiv = document.getElementById("bottom");
	insertAfter(frame, currentDiv);
	return frame;
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
