import styles from './SimpleBarChart.module.css';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import BalanceTooltipModal from '../../modals/BalanceTooltipModal';

/**
 * SimpleBarChart - Gráfica de barras simple
 * @param {Array} data - Array de objetos con { label, value, color, ingresos, egresos }
 * @param {number} maxValue - Valor máximo para escalar las barras
 * @param {string} height - Altura del gráfico
 * @param {string} title - Título de la gráfica
 */
function SimpleBarChart({ data = [], maxValue, height = '200px', title = 'Balance Mensual' }) {
  const [hoveredBar, setHoveredBar] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const barRefs = useRef([]);
  const max = maxValue || Math.max(...data.map(item => item.value));

  useEffect(() => {
    if (hoveredBar !== null && barRefs.current[hoveredBar]) {
      const barElement = barRefs.current[hoveredBar];
      const rect = barElement.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top,
        left: rect.left + rect.width / 2
      });
    }
  }, [hoveredBar]);

  const handleMouseEnter = (index) => {
    setHoveredBar(index);
  };

  const handleMouseLeave = () => {
    setHoveredBar(null);
  };

  return (
    <div className={styles.chartWrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.chartContainer} style={{ height }}>
        <div className={styles.bars}>
          {data.map((item, index) => {
            const percentage = (item.value / max) * 100;
            return (
              <div 
                key={index} 
                className={styles.barWrapper}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className={styles.barContainer}>
                  <div 
                    ref={(el) => (barRefs.current[index] = el)}
                    className={styles.bar}
                    style={{ 
                      height: `${percentage}%`,
                      backgroundColor: item.color || '#14b8a6'
                    }}
                  >
                    <span className={styles.barValue}>
                      ${item.value.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className={styles.barLabel}>{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Tooltip */}
      {hoveredBar !== null && data[hoveredBar].ingresos !== undefined && (
        <BalanceTooltipModal 
          data={data[hoveredBar]}
          position={tooltipPosition}
        />
      )}
    </div>
  );
}

SimpleBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string
    })
  ),
  maxValue: PropTypes.number,
  height: PropTypes.string,
  title: PropTypes.string
};

export default SimpleBarChart;
