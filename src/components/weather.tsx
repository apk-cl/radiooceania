import type { WeatherData, ForecastDay } from '../lib/weather'

export function WeatherWidget({ weather }: { weather: WeatherData | null }) {
  if (!weather) {
    return (
      <section class="section weather-section">
        <div class="container">
          <h2 class="section-title">Clima</h2>
          <p style="opacity:0.6">Información del clima no disponible.</p>
        </div>
      </section>
    )
  }

  return (
    <section class="section weather-section">
      <div class="container">
        <h2 class="section-title">Clima en {weather.location}</h2>
        <div class="weather-card" id="weather-card">
          <div class="weather-main" id="weather-toggle">
            <img
              src={weather.icon.startsWith('//') ? `https:${weather.icon}` : weather.icon}
              alt={weather.condition}
              class="weather-icon"
              width="64"
              height="64"
            />
            <div class="weather-temp">
              <span class="temp-value">{weather.temp}°</span>
              <span class="temp-condition">{weather.condition}</span>
            </div>
            <span class="weather-toggle-icon" id="weather-toggle-icon">+</span>
          </div>
          <div class="weather-details">
            <div class="weather-detail">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.6">
                <path d="M12 2.69l5 4.5a7 7 0 11-10 0l5-4.5z" />
              </svg>
              <span>{weather.humidity}% Humedad</span>
            </div>
            <div class="weather-detail">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.6">
                <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1120.5 12H2" />
              </svg>
              <span>{weather.wind} km/h Viento</span>
            </div>
          </div>
          {weather.forecast && (
            <div class="weather-forecast" id="weather-forecast">
              <div class="forecast-grid">
                {weather.forecast.map((day: ForecastDay) => (
                  <div class="forecast-day">
                    <span class="forecast-date">{formatDate(day.date)}</span>
                    <img
                      src={day.icon.startsWith('//') ? `https:${day.icon}` : day.icon}
                      alt={day.condition}
                      class="forecast-icon"
                      width="48"
                      height="48"
                    />
                    <div class="forecast-temps">
                      <span class="forecast-high">{day.maxtemp}°</span>
                      <span class="forecast-low">{day.mintemp}°</span>
                    </div>
                    <span class="forecast-condition">{day.condition}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var toggle = document.getElementById('weather-toggle');
          var forecast = document.getElementById('weather-forecast');
          var icon = document.getElementById('weather-toggle-icon');
          if (!forecast) return;
          
          function checkMobile() {
            if (window.innerWidth <= 768) {
              forecast.style.display = 'none';
              icon.style.display = 'block';
            } else {
              forecast.style.display = 'block';
              icon.style.display = 'none';
            }
          }
          
          checkMobile();
          window.addEventListener('resize', checkMobile);
          
          toggle.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
              if (forecast.style.display === 'none') {
                forecast.style.display = 'block';
                icon.textContent = '−';
              } else {
                forecast.style.display = 'none';
                icon.textContent = '+';
              }
            }
          });
        })();
      `}} />
      <style>{weatherStyles}</style>
    </section>
  )
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
}

const weatherStyles = `
.weather-section {
  background: linear-gradient(180deg, #154360 0%, #0B2333 100%);
  color: #FFFFFF;
}
.weather-card {
  position: relative;
  background: rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 2rem;
}
.weather-main {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  cursor: default;
}
.weather-toggle-icon {
  display: none;
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  font-size: 1.5rem;
  font-weight: 300;
  opacity: 0.4;
  cursor: pointer;
  color: #F5F5F5;
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 8px;
  background: rgba(255,255,255,0.05);
  transition: background 0.2s;
}
.weather-toggle-icon:hover { background: rgba(255,255,255,0.1); }
.weather-icon { width: 64px; height: 64px; filter: brightness(1.1); }
.weather-temp { display: flex; flex-direction: column; }
.temp-value { font-size: 2.75rem; font-weight: 800; line-height: 1; color: #fff; letter-spacing: -1px; }
.temp-condition { font-size: 0.88rem; opacity: 0.6; margin-top: 0.25rem; }

.weather-details {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.weather-detail {
  display: flex; align-items: center; gap: 0.5rem;
  font-size: 0.85rem; opacity: 0.65;
}

.weather-forecast {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.forecast-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.forecast-day {
  text-align: center;
  padding: 1rem;
  background: rgba(255,255,255,0.02);
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.04);
  transition: background 0.2s;
}
.forecast-day:hover { background: rgba(255,255,255,0.05); }
.forecast-icon { width: 48px; height: 48px; margin: 0.5rem 0; filter: brightness(1.1); }
.forecast-date { font-size: 0.78rem; font-weight: 600; opacity: 0.6; }
.forecast-temps { display: flex; justify-content: center; gap: 0.5rem; margin: 0.25rem 0; }
.forecast-high { font-weight: 700; color: #e8725c; }
.forecast-low { opacity: 0.4; }
.forecast-condition { font-size: 0.72rem; opacity: 0.45; }

@media (max-width: 768px) {
  .weather-main { cursor: pointer; }
  .weather-toggle-icon { display: flex !important; }
  .weather-forecast {
    display: none;
    margin-top: 1rem;
    padding-top: 1rem;
  }
  .forecast-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  .forecast-day {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-align: left;
    padding: 0.75rem 1rem;
  }
  .forecast-icon { width: 36px; height: 36px; margin: 0; }
  .forecast-temps { margin: 0; }
}
`
