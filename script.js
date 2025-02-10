/**
 * Renders the poems on the page.
 * @param {Array} poems - Array of poem objects.
 */
function renderPoems(poems) {
  const poemsContainer = document.getElementById('poems');
  poemsContainer.innerHTML = ''; // Clear any previous content

  poems.forEach((poem, index) => {
      const poemDiv = document.createElement('div');
      poemDiv.classList.add('poem');
      poemDiv.style.setProperty('--order', index);

      // Create and append the poem title
      const titleEl = document.createElement('div');
      titleEl.classList.add('poem-title');
      titleEl.textContent = poem.title;
      poemDiv.appendChild(titleEl);

      // Create and append each line of the poem
      poem.lines.forEach(line => {
          const lineEl = document.createElement('p');
          lineEl.classList.add('poem-line');
          lineEl.textContent = line;
          poemDiv.appendChild(lineEl);
      });

      poemsContainer.appendChild(poemDiv);
  });

  // Once poems are rendered, fetch and display write-ups after them
  fetchWriteups();
}

/**
* Fetches and renders the write-ups from 'writeups.json' after the poems.
*/
function fetchWriteups() {
  fetch('writeups.json')
      .then(response => response.json())
      .then(data => {
          renderWriteups(data);
      })
      .catch(error => console.error('Error fetching write-ups:', error));
}

/**
* Renders the write-ups **AFTER** the poems.
* @param {Array} writeups - Array of write-up objects.
*/
function renderWriteups(writeups) {
  const poemsContainer = document.getElementById('poems'); // Get poems container
  const writeupsContainer = document.createElement('div'); // Create write-ups container
  writeupsContainer.id = 'writeups';

  writeups.forEach((writeup, index) => {
      const sectionDiv = document.createElement('div');
      sectionDiv.classList.add('writeup');
      sectionDiv.style.setProperty('--order', index);

      // Add title
      const titleEl = document.createElement('h2');
      titleEl.textContent = `${writeup.section}: ${writeup.title}`;
      sectionDiv.appendChild(titleEl);

      // Add content paragraphs
      writeup.content.forEach(paragraph => {
          const paragraphEl = document.createElement('p');
          paragraphEl.textContent = paragraph;
          sectionDiv.appendChild(paragraphEl);
      });

      writeupsContainer.appendChild(sectionDiv);
  });

  // Append write-ups **after** the poems
  poemsContainer.after(writeupsContainer);
}

/**
* Fetches the poems from 'sonnets.json' and renders them first.
*/
function fetchPoems() {
  fetch('sonnets.json')
      .then(response => response.json())
      .then(data => {
          renderPoems(data);
      })
      .catch(error => console.error('Error fetching poems:', error));
}

// Fetch and render poems first, then write-ups, when the document is ready
document.addEventListener('DOMContentLoaded', fetchPoems);

  
  /* --- Falling Snowflakes Effect --- */
  
  /**
   * Creates a single blue snowflake element that falls from the top.
   */
  function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    // Use a Unicode snowflake or any character/icon you prefer.
    snowflake.textContent = '❄';
    
    // Random horizontal position
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    
    // Random size between 10px and 30px
    const size = 10 + Math.random() * 20;
    snowflake.style.fontSize = size + 'px';
    
    // Random animation duration between 5s and 10s
    const duration = 5 + Math.random() * 5;
    snowflake.style.animationDuration = duration + 's';
    
    // Set the color to blue and add glow class
    snowflake.style.color = "#00BFFF";
    snowflake.classList.add('blue-snowflake');
    
    document.body.appendChild(snowflake);
    
    // Remove the snowflake after the animation is complete
    setTimeout(() => {
      snowflake.remove();
    }, duration * 1000);
  }
  
  // Create blue snowflakes at regular intervals (e.g., every 300ms)
  setInterval(createSnowflake, 300);
  