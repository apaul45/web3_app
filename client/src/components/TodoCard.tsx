import { useState } from "react";

// @ts-ignore
function TodoCard({ task, editCallback, toggleCallback }) {
  const [editing, setEditing] = useState(false);

  const handleChange = (content: string) => {
    task.content = content;
  };

  const handleFinishClick = () => {
    editCallback(task.id, task.content);
    setEditing(false);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  return (
    <li className="list-element">
      {!task.completed && (
        <input
          type="checkbox"
          style={{ marginRight: "2rem" }}
          onClick={() => toggleCallback(task.id)}
        />
      )}

      {editing ? (
        !task.completed && (
          <>
            <input onChange={(event) => handleChange(event.target.value)} />

            <button onClick={handleFinishClick}>Finish</button>
          </>
        )
      ) : (
        <>
          {task.completed ? (
            <s>{task.content}</s>
          ) : (
            <>
              {task.content}
              <button style={{ marginLeft: "2rem" }} onClick={handleEditClick}>
                Edit
              </button>
            </>
          )}
        </>
      )}
    </li>
  );
}

export default TodoCard;
