'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from './page.module.css';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface EventExtendedProps {
  duration: number;
  healthDimensions: string[];
  dimensionWeights: { [key: string]: number };
}

interface CalendarEvent {
  title: string;
  start: string;
  allDay: boolean;
  extendedProps: EventExtendedProps;
}

interface HealthData {
  physical: number;
  mental: number;
  emotional: number;
  spiritual: number;
  social: number;
}

export default function DashboardPage() {
  const calendarRef = useRef<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventHours, setEventHours] = useState(0);
  const [eventMinutes, setEventMinutes] = useState(0);
  const [healthData, setHealthData] = useState<HealthData>({
    physical: 0,
    mental: 0,
    emotional: 0,
    spiritual: 0,
    social: 0,
  });
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // Health dimension selections
  const [dimensions, setDimensions] = useState({
    physical: { checked: false, weight: 1 },
    mental: { checked: false, weight: 1 },
    emotional: { checked: false, weight: 1 },
    spiritual: { checked: false, weight: 1 },
    social: { checked: false, weight: 1 },
  });

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    setShowModal(true);
  };

  const handleDimensionChange = (dimension: keyof typeof dimensions, checked: boolean) => {
    setDimensions(prev => ({
      ...prev,
      [dimension]: { ...prev[dimension], checked },
    }));
  };

  const handleWeightChange = (dimension: keyof typeof dimensions, weight: number) => {
    setDimensions(prev => ({
      ...prev,
      [dimension]: { ...prev[dimension], weight },
    }));
  };

  const updateHealthChart = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    const events = calendarApi.getEvents();
    const newHealthData: HealthData = {
      physical: 0,
      mental: 0,
      emotional: 0,
      spiritual: 0,
      social: 0,
    };

    events.forEach((event: any) => {
      const dims = event.extendedProps.healthDimensions || [];
      const duration = event.extendedProps.duration || 0;
      const weights = event.extendedProps.dimensionWeights || {};

      dims.forEach((dimension: string) => {
        if (dimension in newHealthData) {
          newHealthData[dimension as keyof HealthData] += duration * (weights[dimension] || 1);
        }
      });
    });

    setHealthData(newHealthData);
    generateRecommendations(newHealthData);
  };

  const generateRecommendations = (data: HealthData) => {
    const newRecommendations: string[] = [];

    if (data.physical < 3) {
      newRecommendations.push('Consider doing some physical activity to improve your health.');
    }
    if (data.mental < 3) {
      newRecommendations.push('Spend time on mental exercises like reading or solving puzzles.');
    }
    if (data.emotional < 2) {
      newRecommendations.push('Try meditation or journaling for emotional balance.');
    }
    if (data.spiritual < 2) {
      newRecommendations.push('Spend time reflecting or engaging in a spiritual practice.');
    }
    if (data.social < 2) {
      newRecommendations.push('Connect with friends or family for your social well-being.');
    }

    setRecommendations(newRecommendations);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const duration = (eventHours * 60 + eventMinutes) / 60;
    const selectedDimensions = Object.entries(dimensions)
      .filter(([_, value]) => value.checked)
      .map(([key, _]) => key);

    const dimensionWeights: { [key: string]: number } = {};
    selectedDimensions.forEach(dim => {
      dimensionWeights[dim] = dimensions[dim as keyof typeof dimensions].weight;
    });

    if (eventTitle && duration > 0 && selectedDimensions.length > 0) {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        calendarApi.addEvent({
          title: eventTitle,
          start: selectedDate,
          allDay: true,
          extendedProps: {
            duration,
            healthDimensions: selectedDimensions,
            dimensionWeights,
          },
        });

        // Reset form
        setShowModal(false);
        setEventTitle('');
        setEventHours(0);
        setEventMinutes(0);
        setDimensions({
          physical: { checked: false, weight: 1 },
          mental: { checked: false, weight: 1 },
          emotional: { checked: false, weight: 1 },
          spiritual: { checked: false, weight: 1 },
          social: { checked: false, weight: 1 },
        });

        // Update chart
        updateHealthChart();
      }
    } else {
      alert('Please fill out all fields.');
    }
  };

  const chartData = {
    labels: ['Physical', 'Mental', 'Emotional', 'Spiritual', 'Social'],
    datasets: [
      {
        label: 'Time Spent (Hours)',
        data: Object.values(healthData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
        borderColor: '#333',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Health Dimensions',
        },
      },
    },
  };

  return (
    <div className={styles.dashboardPage}>
      <header className={styles.header}>
        <h1>Welcome to On Track!</h1>
        <Link href="/" className={styles.logoutButton}>
          Logout
        </Link>
      </header>

      <div className={styles.mainContent}>
        <div className={styles.calendarContainer}>
          <h2>Your Calendar</h2>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            dateClick={handleDateClick}
            height="600px"
          />
        </div>

        <div className={styles.healthChartContainer}>
          <h2>Your Health Balance</h2>
          <div style={{ height: '400px' }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className={styles.recommendationsContainer}>
          <h2>Recommendations</h2>
          <ul className={styles.recommendationsList}>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Event Modal */}
      {showModal && (
        <div className={styles.modal} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Create New Event</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="eventTitle">Event Title:</label>
                <input
                  type="text"
                  id="eventTitle"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Duration:</label>
                <div className={styles.durationInputs}>
                  <input
                    type="number"
                    placeholder="Hours"
                    min="0"
                    value={eventHours}
                    onChange={(e) => setEventHours(parseInt(e.target.value) || 0)}
                  />
                  <input
                    type="number"
                    placeholder="Minutes"
                    min="0"
                    max="59"
                    value={eventMinutes}
                    onChange={(e) => setEventMinutes(parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Health Dimensions:</label>
                {Object.entries(dimensions).map(([key, value]) => (
                  <div key={key} className={styles.dimensionGroup}>
                    <div className={styles.dimensionHeader}>
                      <input
                        type="checkbox"
                        id={key}
                        checked={value.checked}
                        onChange={(e) =>
                          handleDimensionChange(key as keyof typeof dimensions, e.target.checked)
                        }
                      />
                      <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    </div>
                    {value.checked && (
                      <div className={styles.weightControl}>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.25"
                          value={value.weight}
                          onChange={(e) =>
                            handleWeightChange(
                              key as keyof typeof dimensions,
                              parseFloat(e.target.value)
                            )
                          }
                        />
                        <span>Weight: {value.weight}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button type="submit" className={styles.submitButton}>
                Add Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
