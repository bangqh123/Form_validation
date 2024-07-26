const mainContainer = document.querySelector("#main");

let formData = {
  name: '',
  age: '',
  username: '',
  password: ''
};

function loadStep() {
  addHeader();
  addProgess();
  addBody();
  addformVali();
  addInput();
  addBtnBody();
  addprevBtn();
  addnextBtn();
  checkStepProgress();
}

function addHeader() {
  const headerContainer = document.createElement("div");
  headerContainer.classList.add("header");
  mainContainer.appendChild(headerContainer);
}

function createStep(iconClass, text) {
  const step = document.createElement("div");
  step.classList.add("step");
  const icon = document.createElement("i");
  icon.className = iconClass;
  step.appendChild(icon);

  if (text) {
    const span = document.createElement('span');
    span.textContent = text;
    step.appendChild(span);
  }

  return step;
}

function addProgess() {
  const headerContainer = document.querySelector(".header");
  const divProgress = document.createElement("div");
  divProgress.classList.add("progress-container");
  
  const progressBack = document.createElement('hr');
  progressBack.classList.add('progress-bar-back');

  const progressFront = document.createElement('hr');
  progressFront.classList.add('progress-bar-front');

  divProgress.appendChild(createStep('fas fa-times', ''));
  divProgress.appendChild(createStep('fas fa-times', ''));
  divProgress.appendChild(createStep('fas fa-times', ''));
  divProgress.appendChild(createStep('fas fa-times', ''));

  divProgress.appendChild(progressBack);
  divProgress.appendChild(progressFront);

  headerContainer.appendChild(divProgress);
}

function addBody() {
  const divBody = document.createElement("div");
  divBody.classList.add("body");
  mainContainer.appendChild(divBody);
}

function addformVali() {
  const bodyContainer = document.querySelector(".body");
  const formVali = document.createElement("div");
  formVali.id = "form-vali";
  bodyContainer.appendChild(formVali);
}

function addInput() {
  const formVali = document.querySelector("#form-vali");
  const textInput = document.createElement("input");
  textInput.classList.add("input-btn");
  textInput.type = "text";
  formVali.appendChild(textInput);
}

function addSelect() {
  const formVali = document.querySelector("#form-vali");
  const selectInput = document.createElement("select");
  selectInput.classList.add("select-btn");
  for (let i = 18; i <= 100; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectInput.appendChild(option);
  }
  formVali.appendChild(selectInput);
}

function addBtnBody() {
  const bodyContainer = document.querySelector(".body");
  const bodyBtn = document.createElement("div");
  bodyBtn.classList.add("btn-body");
  bodyContainer.appendChild(bodyBtn);
}

function addprevBtn() {
  const bodyBtn = document.querySelector(".btn-body");
  const prevBtn = document.createElement("button");
  prevBtn.classList.add("btn");
  prevBtn.id = "prev";
  prevBtn.disabled = true;

  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-arrow-left");

  prevBtn.appendChild(icon);
  bodyBtn.appendChild(prevBtn);
}

function addnextBtn() {
  const bodyBtn = document.querySelector(".btn-body");
  const nextBtn = document.createElement("button");
  nextBtn.classList.add("btn");
  nextBtn.id = "next";

  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-arrow-right");

  nextBtn.appendChild(icon);
  bodyBtn.appendChild(nextBtn);
}

function checkStepProgress() {
  let currentStep = 0;
  const steps = ['name', 'age', 'username', 'password', 'done'];
  const placeholders = ['Enter your name', 'Select your age', 'Enter your username', 'Enter your password', ''];
  const stepsEl = document.querySelectorAll(".step");
  const progressEl = document.querySelector(".progress-bar-front");
  const prevEl = document.querySelector("#prev");
  const nextEl = document.querySelector("#next");

  function updateStepProgress() {

    stepsEl.forEach((stepEl, idx) => {
      const icon = stepEl.querySelector("i");
      let span = stepEl.querySelector("span");

      if (formData[steps[idx]].trim() !== '' || createStep === '4') {
        stepEl.classList.add("checked");
        icon.className = "fa-solid fa-check";
        if (!span) {
          span = document.createElement("span");
          stepEl.appendChild(span);
        }
        span.textContent = steps[idx].charAt(0).toUpperCase() + steps[idx].slice(1);
      } else {
        stepEl.classList.remove("checked");
        icon.className = "fas fa-times";
        if (span) {
          span.remove();
        }
      }
    });

    const checkedNumber = document.querySelectorAll(".checked");
    progressEl.style.width = ((checkedNumber.length) / (stepsEl.length - 1)) * 100 + "%";

    prevEl.disabled = currentStep === 0;
    nextEl.disabled = inputText.value.trim() === "";
  }

  mainContainer.addEventListener("input", () => {
    const formVali = document.querySelector("#form-vali");
    const inputEl = formVali.querySelector(currentStep === 1 ? "select" : "input");

    if (inputEl.value.trim() !== "") {
      stepsEl[currentStep].classList.add("checked");
      nextEl.disabled = false;
    } else {
      stepsEl[currentStep].classList.remove("checked");
      const icon = stepsEl[currentStep].querySelector("i");
      icon.className = "fas fa-times";
      const span = stepsEl[currentStep].querySelector("span");
      if (span) {
        span.remove();
      }
      nextEl.disabled = true;
    }
  });

  nextEl.addEventListener("click", () => {
    const formVali = document.querySelector("#form-vali");
    const inputEl = formVali.querySelector(currentStep === 1 ? "select" : "input");

    if (inputEl.value.trim() !== "") {
      formData[steps[currentStep]] = inputEl.value;
      currentStep = Math.min(currentStep + 1, steps.length - 1);
      formVali.textContent = "";

      if (currentStep === steps.length - 1) {
        const completionMessage = document.createElement("span");
        completionMessage.classList.add("done")
        completionMessage.textContent = "Form Completed!";
        formVali.appendChild(completionMessage);

        const icon = stepsEl[currentStep - 1].querySelector("i");
        icon.className = "fas fa-check";
        console.log()
        const pw = document.createElement('span')
        pw.textContent = "Password"
        icon.parentElement.append(pw)

        nextEl.disabled = true;
        prevEl.disabled = true;
      } else {
        if (currentStep === 1) {
          addSelect();
        } else {
          addInput();
        }
        const newInputEl = formVali.querySelector(currentStep === 1 ? "select" : "input");
        newInputEl.value = formData[steps[currentStep]] || '';
        newInputEl.placeholder = placeholders[currentStep];
        newInputEl.type = currentStep === 3 ? 'password' : 'text';
        updateStepProgress();
      }
    }   
  });

  prevEl.addEventListener("click", () => {
    if (currentStep > 0) {
      const formVali = document.querySelector("#form-vali");
      const inputEl = formVali.querySelector(currentStep === 1 ? "select" : "input");

      formData[steps[currentStep]] = inputEl.value;
      currentStep = Math.max(currentStep - 1, 0);
      formVali.innerHTML = "";
      if (currentStep === 1) {
        addSelect();
      } else {
        addInput();
      }
      const newInputEl = formVali.querySelector(currentStep === 1 ? "select" : "input");
      newInputEl.value = formData[steps[currentStep]] || '';
      newInputEl.placeholder = placeholders[currentStep];
      newInputEl.type = currentStep === 3 ? 'password' : 'text';
      updateStepProgress();
    }
  });

  const inputText = document.querySelector(".input-btn");
  inputText.value = formData[steps[currentStep]] || '';
  inputText.placeholder = placeholders[currentStep];
  inputText.type = currentStep === 3 ? 'password' : 'text';
  updateStepProgress();
}

document.addEventListener('DOMContentLoaded', loadStep);
