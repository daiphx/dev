// Define the cities and their UTC offsets
const cities = [
  { name: 'Tokyo', offset: 9 },
  { name: 'San Francisco', offset: -7 },
  { name: 'Amsterdam', offset: 2 },
  { name: 'Bali', offset: 8 }
];

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const bgColor = urlParams.get('bgColor') || '#000000';
const fontColor = urlParams.get('fontColor') || '#FFD700';
const fontSize = urlParams.get('fontSize') || '24';

// Apply styles
document.body.style.backgroundColor = bgColor;
document.body.style.color = fontColor;
document.body.style.fontFamily = "'Seven Segment', sans-serif";

// Create clock container
const container = document.createElement('div');
container.style.display = 'grid';
container.style.gridTemplateColumns = 'repeat(2, 1fr)';
container.style.gap = '20px';
container.style.padding = '20px';
document.body.appendChild(container);

// Function to draw analog clock
function drawClock(ctx, time) {
  const centerX = 75;
  const centerY = 75;
  const radius = 70;

  // Clear canvas
  ctx.clearRect(0, 0, 150, 150);

  // Draw clock face
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = bgColor;
  ctx.fill();
  ctx.strokeStyle = fontColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw numbers
  ctx.font = '12px Arial';
  ctx.fillStyle = fontColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 1; i <= 12; i++) {
    const angle = (i - 3) * (Math.PI * 2) / 12;
    const x = centerX + Math.cos(angle) * (radius - 10);
    const y = centerY + Math.sin(angle) * (radius - 10);
    ctx.fillText(i.toString(), x, y);
  }

  // Draw hands
  const hour = time.getHours() % 12;
  const minute = time.getMinutes();
  const second = time.getSeconds();

  // Hour hand
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  const hourAngle = (hour + minute / 60) * (Math.PI * 2) / 12 - Math.PI / 2;
  ctx.lineTo(centerX + Math.cos(hourAngle) * 40, centerY + Math.sin(hourAngle) * 40);
  ctx.strokeStyle = fontColor;
  ctx.lineWidth = 4;
  ctx.stroke();

  // Minute hand
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  const minuteAngle = (minute + second / 60) * (Math.PI * 2) / 60 - Math.PI / 2;
  ctx.lineTo(centerX + Math.cos(minuteAngle) * 55, centerY + Math.sin(minuteAngle) * 55);
  ctx.strokeStyle = fontColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Second hand
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  const secondAngle = second * (Math.PI * 2) / 60 - Math.PI / 2;
  ctx.lineTo(centerX + Math.cos(secondAngle) * 60, centerY + Math.sin(secondAngle) * 60);
  ctx.strokeStyle = fontColor;
  ctx.lineWidth = 1;
  ctx.stroke();
}

// Function to update clocks
function updateClocks() {
  cities.forEach((city, index) => {
    const time = new Date();
    time.setHours(time.getUTCHours() + city.offset);

    const canvas = document.getElementById(`clock-${index}`);
    const ctx = canvas.getContext('2d');
    drawClock(ctx, time);

    const digital = document.getElementById(`digital-${index}`);
    digital.textContent = time.toLocaleTimeString('en-US', { hour12: false });
  });
}

// Create clocks
cities.forEach((city, index) => {
  const clockDiv = document.createElement('div');
  clockDiv.style.textAlign = 'center';

  const canvas = document.createElement('canvas');
  canvas.id = `clock-${index}`;
  canvas.width = 150;
  canvas.height = 150;
  clockDiv.appendChild(canvas);

  const cityName = document.createElement('div');
  cityName.textContent = city.name;
  cityName.style.marginTop = '10px';
  clockDiv.appendChild(cityName);

  const digital = document.createElement('div');
  digital.id = `digital-${index}`;
  digital.style.fontSize = `${fontSize}px`;
  clockDiv.appendChild(digital);

  container.appendChild(clockDiv);
});

// Update clocks every second
setInterval(updateClocks, 1000);
updateClocks(); // Initial update
