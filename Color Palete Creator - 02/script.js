// Select the "Generate Palette" button
const generateBtn = document.getElementById("generate-btn");

// Select the container holding all color boxes
const paletteContainer = document.querySelector(".palette-container");

// Event: Generate a new palette when button is clicked
generateBtn.addEventListener("click", generatePalette);

// Event: Handle copy-to-clipboard when clicking icons or color areas
paletteContainer.addEventListener("click", function(e) {
    // If the clicked element is the copy icon
    if (e.target.classList.contains("copy-btn")) {
        const hexValue = e.target.previousElementSibling.textContent;
        navigator.clipboard.writeText(hexValue)
            .then(() => showCopySuccess(e.target))
            .catch(err => console.log(err));

    // If the clicked element is the colored box itself
    } else if (e.target.classList.contains("color")) {
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
        const copyIcon = e.target.nextElementSibling.querySelector(".copy-btn");
        navigator.clipboard.writeText(hexValue)
            .then(() => showCopySuccess(copyIcon))
            .catch(err => console.log(err));
    }
});

/**
 * showCopySuccess
 * Changes the clicked icon to a green check mark for visual feedback.
 * After 1.5 seconds, it reverts back to the copy icon.
 * @param {HTMLElement} button - The icon element that was clicked.
 */
function showCopySuccess(button) {
    // Change to check mark
    button.classList.remove("far", "fa-copy");
    button.classList.add("fas", "fa-check");
    button.style.color = "#48bb78"; // green

    // Revert after 1.5 seconds
    setTimeout(() => {
        button.classList.remove("fas", "fa-check");
        button.classList.add("far", "fa-copy");
        button.style.color = "";
    }, 1500);
}

/**
 * generatePalette
 * Creates an array of 5 random colors and updates the display.
 */
function generatePalette() {
    const colors = [];
    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }
    updatePaletteDisplay(colors);
}

/**
 * generateRandomColor
 * Generates a random 6-digit HEX color.
 * @returns {string} A HEX color string.
 */
function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * updatePaletteDisplay
 * Updates the color boxes and hex values with new colors.
 * @param {string[]} colors - Array of HEX color strings.
 */
function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");
    colorBoxes.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        // Update background color and text
        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    });
}

// Generate an initial palette on page load
generatePalette();
