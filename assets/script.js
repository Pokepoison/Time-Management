// Function to get the current date and time in the format you desire
 function getCurrentDateTime() {
  return dayjs().format('dddd, MMMM D, YYYY h:mm:ss A');
}

// Function to update the "currentDay" element with the current date and time
function updateCurrentDateTime() {
  const currentDayElement = document.getElementById('currentDay');
  if (currentDayElement) {
    currentDayElement.textContent = getCurrentDateTime();
  }
}

// Call the updateCurrentDateTime function when the page loads
window.onload = updateCurrentDateTime;

// If you want to update the date and time continuously, you can use setInterval
setInterval(updateCurrentDateTime, 1000); // Uncomment this line if you want continuous updates every second

// Function to get the current date in the format "YYYY-MM-DD"
function getCurrentDate() {
  return dayjs().format('YYYY-MM-DD');
}

// Function to get the current hour in 24-hour format
function getCurrentHour() {
  return dayjs().hour();
}

  // Function to apply appropriate classes to the time blocks based on the current hour
 function updateBlockClasses() {
    const currentDate = getCurrentDate();
    const currentHour = getCurrentHour();
    const timeBlocks = document.querySelectorAll('.time-block');

    $(".time-block").each(function() {
        var $timeBlock = $(this);
        var timeBlockHour = parseInt($timeBlock.attr("id").split("-")[1]);
        if (timeBlockHour < currentHour) {
          $timeBlock.addClass("past");
        } else if (timeBlockHour === currentHour) {
          $timeBlock.addClass("present");
        } else {
          $timeBlock.addClass("future");
        }
      });
    }

    // Function to handle click events on the time block to allow entering an event
  function handleTimeBlockClick(event) {
    const textarea = event.currentTarget.querySelector('textarea');
    if (textarea) {
      textarea.focus();
    }
  }

  // Function to handle click events on the save buttons to save events to local storage
  function handleSaveButtonClick(event) {
    const timeBlock = event.currentTarget.parentElement;
    const time = timeBlock.id.split('-')[1];
    const eventText = timeBlock.querySelector('textarea').value.trim();

    if (eventText !== '') {
      const events = JSON.parse(localStorage.getItem('events')) || {};
      events[time] = eventText;
      localStorage.setItem('events', JSON.stringify(events));
    }
  }

  // Function to render the saved events from local storage
  function renderSavedEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || {};

    Object.keys(events).forEach((time) => {
      const eventText = events[time];
      const timeBlock = document.getElementById(`hour-${time}`);

      if (timeBlock) {
        const textarea = timeBlock.querySelector('textarea');
        if (textarea) {
          textarea.value = eventText;
        }
      }
    });
  }

  // Function to set up event listeners for time blocks and save buttons
  function setupEventListeners() {
    const timeBlocks = document.querySelectorAll('.time-block');
    const saveButtons = document.querySelectorAll('.saveBtn');

    timeBlocks.forEach((block) => {
      block.addEventListener('click', handleTimeBlockClick);
    });

    saveButtons.forEach((button) => {
      button.addEventListener('click', handleSaveButtonClick);
    });
  }

  // Function to initialize the scheduler app
  function initSchedulerApp() {
    updateBlockClasses();
    renderSavedEvents();
    setupEventListeners();
  }

  // Call the updateBlockClasses function when the page loads
  window.onload = () => {
    updateBlockClasses();
    initSchedulerApp();
  };

  // Call the initSchedulerApp function when the page loads
  window.onload = initSchedulerApp;