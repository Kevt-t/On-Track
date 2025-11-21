// FullCalendar Setup
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        events: [],  // Events will be added dynamically
        dateClick: function(info) {
            // When a date is clicked, show the modal
            showModal(info.dateStr);
        }
    });

    // Render the calendar
    calendar.render();

    // Handle modal functionality
    var modal = document.getElementById('eventModal');
    var span = document.getElementsByClassName('close')[0];
    var eventForm = document.getElementById('eventForm');
    
    // Show the modal when a date is clicked
    function showModal(dateStr) {
        modal.style.display = 'block';

        // Update weight displays when sliders are moved
        let physicalSlider = document.getElementById('physicalWeight');
        let mentalSlider = document.getElementById('mentalWeight');
        let emotionalSlider = document.getElementById('emotionalWeight');
        let spiritualSlider = document.getElementById('spiritualWeight');
        let socialSlider = document.getElementById('socialWeight');

        physicalSlider.oninput = () => document.getElementById('physicalValue').textContent = physicalSlider.value;
        mentalSlider.oninput = () => document.getElementById('mentalValue').textContent = mentalSlider.value;
        emotionalSlider.oninput = () => document.getElementById('emotionalValue').textContent = emotionalSlider.value;
        spiritualSlider.oninput = () => document.getElementById('spiritualValue').textContent = spiritualSlider.value;
        socialSlider.oninput = () => document.getElementById('socialValue').textContent = socialSlider.value;
        
        // Handle form submission
        eventForm.onsubmit = function(e) {
            e.preventDefault();  // Prevent form from submitting traditionally

            // Gather form data
            let eventTitle = document.getElementById('eventTitle').value;
            let eventHours = parseInt(document.getElementById('eventHours').value) || 0;
            let eventMinutes = parseInt(document.getElementById('eventMinutes').value) || 0;
            let duration = (eventHours * 60 + eventMinutes) / 60;  // Convert to hours

            // Get selected health dimensions and their weights
            let healthDimensions = [];
            let dimensionWeights = {};
            let checkboxes = document.querySelectorAll('input[name="healthDimension"]:checked');

            checkboxes.forEach((checkbox) => {
                let dimension = checkbox.value;
                let weight = parseFloat(document.getElementById(`${dimension}Weight`).value);
                healthDimensions.push(dimension);
                dimensionWeights[dimension] = weight;
            });

            // Add event to calendar
            if (eventTitle && duration > 0 && healthDimensions.length > 0) {
                calendar.addEvent({
                    title: eventTitle,
                    start: dateStr,
                    allDay: true,
                    extendedProps: {
                        duration: duration,
                        healthDimensions: healthDimensions,
                        dimensionWeights: dimensionWeights  // Store weights here
                    }
                });

                // Hide the modal after submission
                modal.style.display = 'none';

                // Clear the form for next time
                eventForm.reset();

                // Update the health chart with new data
                updateHealthChart();
            } else {
                alert('Please fill out all fields.');
            }
        };
    }

    // Close the modal when the "X" is clicked
    span.onclick = function() {
        modal.style.display = 'none';
    };

    // Close the modal if the user clicks outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    // Health Dimensions Bar Chart Setup
    const ctx = document.getElementById('healthChart').getContext('2d');
    let healthData = {
        physical: 0,
        mental: 0,
        emotional: 0,
        spiritual: 0,
        social: 0
    };

    let healthChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Physical', 'Mental', 'Emotional', 'Spiritual', 'Social'],
            datasets: [{
                label: 'Time Spent (Hours)',
                data: Object.values(healthData),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
                borderColor: '#333',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Hours'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Health Dimensions'
                    }
                }
            }
        }
    });

    // Update Health Chart with new event data
    function updateHealthChart() {
        let events = calendar.getEvents();
        healthData = { physical: 0, mental: 0, emotional: 0, spiritual: 0, social: 0 };

        events.forEach(event => {
            let dimensions = event.extendedProps.healthDimensions || [];
            let duration = event.extendedProps.duration || 1;
            let weights = event.extendedProps.dimensionWeights || {};

            dimensions.forEach(dimension => {
                if (healthData.hasOwnProperty(dimension)) {
                    healthData[dimension] += duration * (weights[dimension] || 1);  // Apply weight to duration
                }
            });
        });

        // Update bar chart with new data
        healthChart.data.datasets[0].data = Object.values(healthData);
        healthChart.update();

        // Update recommendations based on new health data
        generateRecommendations();
    }

    // Recommendations based on Health Data
    function generateRecommendations() {
        let recommendations = [];

        if (healthData.physical < 3) recommendations.push("Consider doing some physical activity to improve your health.");
        if (healthData.mental < 3) recommendations.push("Spend time on mental exercises like reading or solving puzzles.");
        if (healthData.emotional < 2) recommendations.push("Try meditation or journaling for emotional balance.");
        if (healthData.spiritual < 2) recommendations.push("Spend time reflecting or engaging in a spiritual practice.");
        if (healthData.social < 2) recommendations.push("Connect with friends or family for your social well-being.");

        let recommendationsList = document.getElementById('recommendationsList');
        recommendationsList.innerHTML = '';

        recommendations.forEach(recommendation => {
            let li = document.createElement('li');
            li.textContent = recommendation;
            recommendationsList.appendChild(li);
        });
    }
});

