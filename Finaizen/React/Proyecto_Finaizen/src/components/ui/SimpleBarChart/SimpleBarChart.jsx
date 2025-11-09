import styles from './SimpleBarChart.module.css';

/**
 * SimpleBarChart - Gráfica de barras simple
 * @param {Array} data - Array de objetos con { label, value, color }
 * @param {number} maxValue - Valor máximo para escalar las barras
 * @param {string} height - Altura del gráfico
 */
function SimpleBarChart({ data = [], maxValue, height = '200px' }) {
  const max = maxValue || Math.max(...data.map(item => item.value));

  return (
    <div className={styles.chartContainer} style={{ height }}>
      <div className={styles.bars}>
        {data.map((item, index) => {
          const percentage = (item.value / max) * 100;
          return (
            <div key={index} className={styles.barWrapper}>
              <div className={styles.barLabel}>{item.label}</div>
              <div className={styles.barContainer}>
                <div 
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SimpleBarChart;
