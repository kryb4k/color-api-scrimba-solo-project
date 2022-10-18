
const generateButton = document.getElementById("get-scheme")
const colorMode = document.getElementById("scheme-choose")

generateButton.addEventListener("click", getColorsScheme)

function getColorsScheme(){
    const pickedColor = document.getElementById("fav-color").value
    const hexCode = pickedColor.slice(1)
    
    const endpoint = `scheme?hex=${hexCode}&mode=${colorMode.value}&count=5`    
    fetch(`https://www.thecolorapi.com/${endpoint}`)
        .then(res => res.json())
        .then(color => {
            for (let i=0; i < 5; i++) {
                function fillColors() {
                    const hexColor = color.colors[i].hex.value
                    const columnColor = document.getElementById(`col-${i}`)
                    columnColor.style.backgroundColor = hexColor
                    const columnName = document.getElementById(`col-${i}-name`)
                    columnName.innerHTML = `${hexColor}`
                }
            fillColors()
            
            const targetColor = document.getElementById(`col-${i}-name`);
            targetColor.addEventListener("click", copyToClipboard);
            
            function copyToClipboard(){
                const hexCode = document.getElementById(`col-${i}-name`)
                const readyCode = hexCode.textContent.slice(0,7)
                navigator.clipboard.writeText(`${readyCode}`)
            }
            }
        })
}
