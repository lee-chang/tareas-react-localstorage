export const VisibilityControl = ({
  isChecked,
  setShowCompleted,
  cleanTasks,
}) => {
  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de limpiar la lista?")) {
      cleanTasks();
    }
  };

  return (
    <div className="d-flex justify-content-between bg-secondary text-white text-center p-2">
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setShowCompleted(e.target.checked)}
        />{" "}
        <label> Mostrar tareas hechas </label>
      </div>

      <button className="btn btn-danger bt-sm" onClick={handleDelete}>
        {" "}
        Limpiar{" "}
      </button>
    </div>
  );
};
