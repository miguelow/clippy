let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")
const errorMsg = document.getElementById("error-msg-1")
const errorMsg2 = document.getElementById("error-msg-2")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a class='links' target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        if(!myLeads.includes(tabs[0].url)){
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads) )
            render(myLeads)
        }else{
            errorMsg2.style.display = "block"
            setTimeout(() => {
            errorMsg2.style.display = "none"
        }, 2000);
        }
    })
})

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    if(inputEl.value.length && !myLeads.includes(inputEl.value)){
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    }else if (inputEl.value.length && myLeads.includes(inputEl.value)) {
        errorMsg2.style.display = "block"
            setTimeout(() => {
            errorMsg2.style.display = "none"
        }, 2000)
        inputEl.value = ""
    }else{
        errorMsg.style.display = "block"
        setTimeout(() => {
            errorMsg.style.display = "none"
        }, 2000);
    }
})

inputEl.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      inputBtn.click();
    }
  });