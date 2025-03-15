let data;

async function fetchData() {
  const response = await fetch('test.json');
  data = await response.json();
  loadSubjects();
}

// Function to populate subjects dropdown
function loadSubjects() {
  const subjectSelect = document.getElementById('subject');
  data.subjects.forEach(subject => {
    const option = document.createElement('option');
    option.value = subject.name;
    option.textContent = subject.name;
    subjectSelect.appendChild(option);
  });
}

// Function to load classes based on selected subject
function loadDatatwo() {
  const subjectName = document.getElementById('subject').value;
  const classSelect = document.getElementById('class');
  const chapterselect = document.getElementById('chapter');
  
 
  
  classSelect.innerHTML = '<option value="">Select Class</option>';
   
  chapterselect.innerHTML = '<option value="">Select chapter</option>';

  

 
 
  
  const selectedSubject = data.subjects.find(subject => subject.name === subjectName);
  console.log(selectedSubject)
  selectedSubject.classes.forEach(classInfo => {
    const option = document.createElement('option');
    option.value = classInfo.class;
    option.textContent = classInfo.class;
    classSelect.appendChild(option);

    
  });
}

// function to load chapters bases on sleected class

function loadchapters(){
  const subjectName = document.getElementById('subject').value;
  const className = document.getElementById('class').value;
  const chapterSelect = document.getElementById('chapter');
 
  chapterSelect.innerHTML = "" // basesd on drop down remove prvious chapter problem solve
  const selectedsubjects = data.subjects.find(subject => subject.name === subjectName);
  const selectedclass = selectedsubjects.classes.find(val => val.class === className);
  // subject.name similary work Object.key
  selectedclass.chapters.forEach(chapter =>{
    const option = document.createElement('option');
    option.value =  chapter.chapter;
    option.textContent = chapter.chapter;
    chapterSelect.appendChild(option);
    
  });

}

function generateTestPaper(){
  const subjectName = document.getElementById('subject').value;
  const className = document.getElementById('class').value;
  const chapterName = document.getElementById('chapter').value;
  const testPaperContainer = document.getElementById('questions-list');
  


  if(!subjectName || !className || !chapterName) {
    alert('Plear select subject, class and chapter');
    return;
  }

  const selectedsubjects = data.subjects.find(subject => subject.name === subjectName);
  const selectedclass = selectedsubjects.classes.find(info => info.class === className);
  const selectedchapter = selectedclass.chapters.find(chapter => chapter.chapter === chapterName);
  
  testPaperContainer.innerHTML = `<h2> ${subjectName } - ${className} - ${chapterName} </h2>`;

  selectedchapter.questions.forEach(question => {
    const questionDiv = document.createElement("div");
    questionDiv.setAttribute('onclick','moveQuestion(this)')
    questionDiv.setAttribute('class','question')
    if (question.type === "MCQ") {
      questionDiv.innerHTML = `
        <h2 class="questions"> <strong>Q:</strong>${question.question}</h2> <br>

        <ol class="mcq-options">
          ${question.options.map(option => `<li>${option}</li>`).join('')}
        </ol>
        <strong>Answer:</strong> ${question.answer} <br><br>
      `;
    } else if (question.type === "Short Answer") {
      questionDiv.innerHTML = `
        <strong>Q:</strong> ${question.question} <br>
        <strong>Answer:</strong> ${question.answer} <br><br>
      `;
    }

   
    
    testPaperContainer.appendChild(questionDiv)
  })
 


 
  
  
}


 function moveQuestion(question) {
  // Get the 'Transferred Questions' container
  const transferredList = document.getElementById("testpaper");

  // question to copy when you click using movequestion (this)
  // above the load chpaters set attributes

  const copiedQuestion = question.cloneNode(true);
  

  // Add the question to the new list
  transferredList.appendChild(copiedQuestion);
   copiedQuestion.setAttribute('onclick','delectfnx(this)')
   copiedQuestion.setAttribute('id','deletq')
       
   

}
// Function to handle transferring the question div

// click to remove question from test paper side
function delectfnx(deletQ){
  const deleteData = document.getElementById('deletq');
  deleteData.remove();

}

window.onload = fetchData;

