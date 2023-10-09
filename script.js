function handleFormSubmit() {
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
	const chestPainType = document.getElementById('chestPainType').value;
    const restingBloodPressure = document.getElementById('restingBloodPressure').value;

	const cholesterol = document.getElementById('cholesterol').value;
    const restingECG = document.getElementById('restingECG').value;
    const maxHeartRate = document.getElementById('maxHeartRate').value;
	

    let sexValue;
    if (sex === 'male') {
        sexValue = 1;
    } else if (sex === 'female') {
        sexValue = 0;
    } else {
        console.error('Invalid sex value');
        return;
    }
	
	const bloodSugarTrueRadio = document.getElementById('bloodSugarTrue');
    const bloodSugarFalseRadio = document.getElementById('bloodSugarFalse');

	let bloodSugarValue = null;

    if (bloodSugarTrueRadio.checked) {
        bloodSugarValue = 1;
    } else if (bloodSugarFalseRadio.checked) {
        bloodSugarValue = 0;
    } else {
        console.error('Please select a value for Blood Sugar Levels.');
        return;
    }

	
	
	let exerciseAnginaValue = null;
	let exerciseSTDepressionValue = 2.5;
	
    exerciseSTDepressionValue = document.getElementById('exerciseSTDepressionValue').value;
	
	const exerciseAnginaTrueRadio = document.getElementById('exerciseAnginaTrue');
    const exerciseAnginaFalseRadio = document.getElementById('exerciseAnginaFalse');

    if (exerciseAnginaTrueRadio.checked) {
        exerciseAnginaValue = 0;
    } else if (exerciseAnginaFalseRadio.checked) {
        exerciseAnginaValue = 1;
    } else {
        console.error('Please select a value for Exercise Induced Angina.');
        return;
    }
	
	const slopeValue = document.getElementById('slope').value;
    const numOfMajorVesselsValue = document.getElementById('numOfMajorVessels').value;
    const thalValue = document.getElementById('Thal').value;
	
    console.log('Age:', age);
    console.log('Sex:', sexValue);
    console.log('Chest Pain Type:', chestPainType);
    console.log('Resting Blood Pressure:', restingBloodPressure);
    console.log('Cholesterol:', cholesterol);
    console.log('Blood Sugar Value:', bloodSugarValue);
    console.log('Resting ECG:', restingECG);
    console.log('Max Heart Rate:', maxHeartRate);
    console.log('Exercise Induced Angina Value:', exerciseAnginaValue);
    console.log('Exercise ST Depression Value:', exerciseSTDepressionValue);
    console.log('Slope Value:', slopeValue);
    console.log('Number of Major Vessels Value:', numOfMajorVesselsValue);
    console.log('Thal Value:', thalValue);

    // Display the age and sex values on the webpage
    /*const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `Age: ${age}, Sex: ${sexValue}, chestPainType: ${chestPainType}, restingBloodPressure: ${restingBloodPressure}, cholesterol: ${cholesterol},  bloodSugarValue: ${bloodSugarValue}, restingECG: ${restingECG}, maxHeartRate: ${maxHeartRate}, exerciseAnginaValue: ${exerciseAnginaValue}, exerciseSTDepressionValue: ${exerciseSTDepressionValue}, slopeValue: ${slopeValue}, numOfMajorVesselsValue: ${numOfMajorVesselsValue}, thalValue: ${thalValue}`;
	*/
    // Create an array object
    
	const loggedValuesArray = [age,sexValue,chestPainType,restingBloodPressure, cholesterol, bloodSugarValue , restingECG, maxHeartRate, exerciseAnginaValue, exerciseSTDepressionValue, slopeValue, numOfMajorVesselsValue, thalValue];
	
	
	console.log('Logged Values Array:', loggedValuesArray);

    fetch('/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loggedValuesArray)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Prediction result from Python:', data.result);
        // Update the HTML to display the prediction result
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `Predicted Outcome: ${data.result}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
	
}
