const submitData = document.getElementById('submitData');

var jsonintial= document.getElementById("json-value")
var jsonFiltered = document.getElementById("filtered-json-value")

function processJSON(jsonObj) {
    if (typeof jsonObj === 'object') {
      let countE = 0;
      let sortedObj = {};
  
      for (let key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
          // Count 'e' and 'E' in the key
          countE += (key.match(/[eE]/g) || []).length;
  
          // Sort characters in descending order
          const sortedKey = key
            .split('')
            .sort((a, b) => b.localeCompare(a))
            .join('');

        sortedObj[sortedKey] = processJSON(jsonObj[key]);
        }
    }

        return { countE, ...sortedObj };
    } else if (Array.isArray(jsonObj)) {
      // Recursively process array elements
        return jsonObj.map(item => processJSON(item));
    } else {
      // Base case for non-object and non-array values
        return jsonObj;
    }
}


submitData.addEventListener('click', (e) => {
var optionElement = document.querySelector('option[class="0"]');
var urlValue = optionElement.textContent;
console.log(urlValue)
fetch(urlValue)
.then(response => {
    // Check if the response status is OK (HTTP 200-299)
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
        // Parse the JSON response
        return response.json();
    })
    .then(data => {
        // Handle the JSON data here
        console.log(data);
        var jsonString = JSON.stringify(data, null, 2); // The second argument (null) is for replacer function, and the third (2) is for indentation
        const resultJSON = processJSON(data);
        const resultJSONStr = JSON.stringify(resultJSON, null, 4);

    // Set the JSON string as innerHTML
    jsonintial.innerHTML = jsonString;
    // Set the filtered JSON string as innerHTML
    jsonFiltered.innerHTML = resultJSONStr;
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch or parsing
        console.error('Fetch error:', error);
    });
})





  // Process the JSON

  
  // Convert the result to a JSON string
