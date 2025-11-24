import { useState } from 'react';
import { Button } from '../../ui';
import styles from './ComprobanteModal.module.css';

/**
 * Modal para subir comprobantes (recibos, depósitos, etc.)
 * Se usa en los logros que requieren verificación
 */
function ComprobanteModal({ isOpen, onClose, logro, onSubmit }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [descripcion, setDescripcion] = useState('');

  // Maneja la selección del archivo
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida');
        return;
      }

      // Validar tamaño (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar los 5MB');
        return;
      }

      setSelectedFile(file);

      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Por favor selecciona un comprobante');
      return;
    }

    setLoading(true);

    try {
      // Simular subida de archivo (en producción sería una llamada a API)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // En producción, aquí subirías el archivo a un servidor o servicio de storage
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // const response = await fetch('/api/upload', { method: 'POST', body: formData });

      // Por ahora, usamos el preview como URL del comprobante
      const comprobanteData = {
        url: preview,
        descripcion,
        fecha: new Date(),
        nombreArchivo: selectedFile.name
      };

      onSubmit(comprobanteData);
      
      // Limpiar y cerrar
      setSelectedFile(null);
      setPreview(null);
      setDescripcion('');
      onClose();
    } catch (error) {
      console.error('Error al subir comprobante:', error);
      alert('Error al subir el comprobante. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // No renderizar si no está abierto
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Subir Comprobante</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.modalBody}>
          {/* Información del logro */}
          <div className={styles.logroInfo}>
            <div className={styles.logroIcon}>{logro.icono}</div>
            <div>
              <h3>{logro.nombre}</h3>
              <p>{logro.descripcion}</p>
              {logro.empresa && (
                <p className={styles.empresaTag}>
                  <strong>{logro.empresa}</strong>
                </p>
              )}
            </div>
          </div>

          {/* Formulario de subida */}
          <form onSubmit={handleSubmit}>
            {/* Area de drop/selección de archivo */}
            <div className={styles.uploadArea}>
              {!preview ? (
                <label className={styles.uploadLabel}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className={styles.fileInput}
                  />
                  <div className={styles.uploadPlaceholder}>
                    <span className={styles.uploadIcon}>📸</span>
                    <p>Haz click o arrastra tu comprobante aquí</p>
                    <p className={styles.uploadHint}>
                      Formatos: JPG, PNG (Máx. 5MB)
                    </p>
                  </div>
                </label>
              ) : (
                <div className={styles.previewContainer}>
                  <img src={preview} alt="Preview" className={styles.preview} />
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(null);
                    }}
                  >
                    Cambiar imagen
                  </button>
                </div>
              )}
            </div>

            {/* Campo de descripción opcional */}
            <div className={styles.formGroup}>
              <label htmlFor="descripcion">
                Descripción (opcional)
              </label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ej: Compra del 23/11/2025 - McDonald's Centro Comercial"
                rows={3}
                className={styles.textarea}
              />
            </div>

            {/* Información adicional */}
            <div className={styles.infoBox}>
              <p className={styles.infoIcon}>ℹ️</p>
              <div>
                <p><strong>¿Qué debo subir?</strong></p>
                <ul>
                  <li>Foto clara del recibo o factura</li>
                  <li>Comprobante de depósito bancario</li>
                  <li>Captura de pantalla de la transacción</li>
                </ul>
                <p className={styles.infoNote}>
                  Tu comprobante será verificado antes de desbloquear la recompensa.
                </p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className={styles.modalFooter}>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={!selectedFile || loading}
              >
                {loading ? 'Subiendo...' : 'Subir Comprobante'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ComprobanteModal;
