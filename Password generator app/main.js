let range = document.querySelector("#range");
let lengthIndcator = document.querySelector("#length");
let genBtn = document.querySelector("#generate");
let options = document.querySelectorAll(".option input");
let passwdInput = document.querySelector("#passwd");
let diffLevel = document.querySelector("#stren-level");
let indicatorSpans = Array.from(document.querySelectorAll(`#show-strength span:not(:first-child)`));
let copyIcon = document.querySelector("#copy")

//clear inputs after reload
function clearInputs() {
    //uncheck all checkboxes
    options.forEach((option) => {
        option.checked = false;
    })

    range.value = 10;
    passwdInput.value = "";
}
clearInputs();

//map of all possible values
let passwdMap = {
    upper: "ABCDEFGHIGK",
    lower: "abcdefghigk",
    nums: "123455",
    symbol: "@#$*%-_",
}



//filter
let generate = () => {
    //hide pop up notification
    let pop = document.querySelector(".notif-pop");
    if(pop != null){
        pop.style.display = "none";
    }

    let checked = "";
    let randomNum = "";
    let isExcluded = false;
    options.forEach(option => {
        if (option.checked) {
            if (option.id !== "exclude") {
                checked += passwdMap[option.id];
            }
            else {
                isExcluded = true;
            }
        }
    })

    for (let i = 0; i < range.value; i++) {
        let randomChar = checked.length != 0 ? checked[Math.floor(Math.random() * checked.length)] : "";
        //exclude repeated
        if (isExcluded) {
            randomNum.includes(randomChar) || randomNum == " " ? i-- : randomNum += randomChar;
        } else {
            randomNum += randomChar;
        }
    }
    passwdInput.value = randomNum;
}
genBtn.addEventListener("click", generate);


let handleIndicator = () => {
    //reset background color
    for (let i = 0; i < indicatorSpans.length; i++) {
        indicatorSpans[i].style.cssText = "background-color:transparent";
    }
    if (range.value <= 7) {
        diffLevel.textContent = "weak";
        for (let i = 0; i < 2; i++) {
            indicatorSpans[i].style.cssText = "background-color:#ECC674";
        }
    } else if (range.value <= 14) {
        diffLevel.textContent = "medium";
        for (let i = 0; i < 3; i++) {
            indicatorSpans[i].style.cssText = "background-color:#ECC674";
        }
    } else {
        diffLevel.textContent = "strong";
        for (let i = 0; i < 4; i++) {
            indicatorSpans[i].style.cssText = "background-color:#ECC674";
        }
    }
}

//add event input to the range 
let updateRange = () => {
    lengthIndcator.textContent = range.value;
    //trigger generate function
    generate();
    //handle indicator of the level
    handleIndicator();
}

range.addEventListener("input", updateRange);
updateRange();

//copy function
copyIcon.addEventListener("click", () => {
    //copy input value to clipboard
    navigator.clipboard.writeText(passwdInput.value);
    copyIcon.classList.replace("fa-copy", "fa-check")
    setTimeout(() => {
        copyIcon.classList.replace("fa-check", "fa-copy")
        clearInputs();
        let popUp = document.createElement("div");
        popUp.className = "notif-pop";
        popUp.textContent = "copied to clipboard";
        document.body.appendChild(popUp);
        popUp.style.cssText = "background-color:#24232A; width:200px; padding:20px; color:#A5FFAF; text-align:center; text-transform:capitalize; font-size:1.2rem; position:absolute; top:0; left:50%; transform:translate(-50%)"
    }, 1000)
})