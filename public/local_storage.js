function saveText(){
    const inputText = document.getElementById("textInput");
    let savedTexts = JSON.parse(localStorage.getItem('savedTexts')) || [];
    savedTexts.unshift(inputText.value);    
    //Limit the saved text to the last 5
    savedTexts = savedTexts.slice(0, 5);

    if (/^\s*$/.test(savedTexts[0])) {
      alert("Nothing inputted");
    } 
    else{
      localStorage.setItem('savedTexts', JSON.stringify(savedTexts))
      
      // Update the dropdown list
      updateDropdown(savedTexts);

      /// Clear the input field
      document.getElementById('textInput').value = '';
    }
}


function updateDropdown(texts) {
    const dropdown = document.getElementById('textDropdown');
    dropdown.innerHTML = '';
  
    texts.forEach((text, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.className =index;
      option.textContent = text; // Set the textContent of the option to the text
      dropdown.appendChild(option);
    });
  }

document.addEventListener('DOMContentLoaded', () => {
    const savedTexts = JSON.parse(localStorage.getItem('savedTexts')) || [];
    updateDropdown(savedTexts);
});